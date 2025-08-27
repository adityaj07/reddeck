import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      role: "user",
      userId: args.userId,
      content: args.content,
      createdAt: Date.now(),
    });
  },
});
