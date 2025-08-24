import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const insertAppToken = internalMutation({
  args: {
    accessToken: v.string(),
    tokenType: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("reddit_tokens", {
      kind: "app",
      accessToken: args.accessToken,
      tokenType: args.tokenType,
      expiresAt: args.expiresAt,
      createdAt: args.createdAt,
    });
  },
});

export const upsertSubreddit = internalMutation({
  args: {
    name: v.string(),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    subscribers: v.optional(v.number()),
  },
  returns: v.id("subreddits"),
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subreddits")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: Date.now(),
        lastFetchedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("subreddits", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastFetchedAt: Date.now(),
    });
  },
});

export const upsertPost = internalMutation({
  args: {
    subredditId: v.id("subreddits"),
    redditId: v.string(),
    title: v.string(),
    selftext: v.optional(v.string()),
    author: v.string(),
    permalink: v.string(),
    url: v.string(),
    score: v.number(),
    numComments: v.number(),
    createdUtc: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_sub_redditId", (q) =>
        q.eq("subredditId", args.subredditId).eq("redditId", args.redditId)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { ...args, fetchedAt: Date.now() });
      return existing._id;
    }

    return await ctx.db.insert("posts", {
      ...args,
      fetchedAt: Date.now(),
    });
  },
});
