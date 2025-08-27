import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { internalMutation, mutation } from "../_generated/server";

export const createConversation = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const conversationId = await ctx.db.insert("conversations", {
      userId: args.userId,
      title: args.title,
      createdAt: now,
      updatedAt: now,
    });

    return conversationId;
  },
});

export const deleteConversation = mutation({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, { conversationId }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");

    const convo = await ctx.db.get(conversationId);
    if (!convo) return { ok: false, reason: "Not found" as const };
    if (String(convo.userId) !== String(userId)) throw new Error("Forbidden");

    // Delete the conversation first.
    await ctx.db.delete(conversationId);

    // Start batched deletion of messages.
    await ctx.scheduler.runAfter(
      0,
      internal.conversations.mutations.deleteConversationMessagesBatch,
      {
        conversationId,
        cursor: null,
        batchSize: 50, // keep well under read/write limits
      }
    );

    return { ok: true as const };
  },
});

export const deleteConversationMessagesBatch = internalMutation({
  args: {
    conversationId: v.id("conversations"),
    cursor: v.union(v.string(), v.null()),
    batchSize: v.number(),
  },
  handler: async (ctx, { conversationId, cursor, batchSize }) => {
    const page = await ctx.db
      .query("messages")
      .withIndex("by_conversation_time", (q) =>
        q.eq("conversationId", conversationId)
      )
      .paginate({ cursor, numItems: batchSize });

    for (const m of page.page) {
      await ctx.db.delete(m._id);
    }

    if (!page.isDone) {
      await ctx.scheduler.runAfter(
        0,
        internal.conversations.mutations.deleteConversationMessagesBatch,
        {
          conversationId,
          cursor: page.continueCursor,
          batchSize,
        }
      );
    }
  },
});
