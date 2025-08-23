import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,

  users: defineTable({
    email: v.string(),
    credits: v.optional(v.number()),
  }).index("by_email", ["email"]),

  user_subreddits: defineTable({
    userId: v.id("users"),
    subredditId: v.id("subreddits"),
  })
    .index("by_user", ["userId"])
    .index("by_user_sub", ["userId", "subredditId"]),

  subreddits: defineTable({
    name: v.string(), // "webdev"
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    subscribers: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    lastFetchedAt: v.optional(v.number()),
  }).index("by_name", ["name"]),

  posts: defineTable({
    subredditId: v.id("subreddits"),
    redditId: v.string(), // for eg,"1mxxo6m"
    title: v.string(),
    selftext: v.optional(v.string()),
    author: v.string(),
    permalink: v.string(),
    url: v.string(),
    score: v.number(),
    numComments: v.number(),
    createdUtc: v.number(),
    fetchedAt: v.number(),
    flair: v.optional(v.string()),
  })
    .index("by_sub_created", ["subredditId", "createdUtc"])
    .index("by_sub_redditId", ["subredditId", "redditId"]),

  comments: defineTable({
    postId: v.id("posts"),
    subredditId: v.id("subreddits"),
    redditId: v.string(),
    parentRedditId: v.optional(v.string()),
    body: v.optional(v.string()), // deleted comments safe
    author: v.string(),
    score: v.number(),
    createdUtc: v.number(),
    fetchedAt: v.number(),
  })
    .index("by_post", ["postId"])
    .index("by_sub_created", ["subredditId", "createdUtc"]),

  chats: defineTable({
    userId: v.id("users"),
    subredditIds: v.optional(v.array(v.id("subreddits"))), // multi-tag support
    role: v.string(), // "user" | "assistant"
    content: v.string(),
    relatedPostIds: v.optional(v.array(v.id("posts"))),
    createdAt: v.number(),
  }).index("by_user_time", ["userId", "createdAt"]),

  embeddings: defineTable({
    parentType: v.string(), // "post" | "comment"
    parentId: v.union(v.id("posts"), v.id("comments")),
    subredditId: v.id("subreddits"),
    embedding: v.array(v.number()),
    content: v.string(), // raw text used for embedding
    metadata: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_parent", ["parentType", "parentId"])
    .index("by_subreddit", ["subredditId", "createdAt"]),

  listing_meta: defineTable({
    subredditId: v.id("subreddits"),
    kind: v.string(), // "hot" | "new" | "top:day" etc.
    fetchedAt: v.number(),
    after: v.optional(v.string()),
    etag: v.optional(v.string()),
    lastModified: v.optional(v.string()),
  }).index("by_sub_kind", ["subredditId", "kind"]),

  reddit_tokens: defineTable({
    kind: v.string(), // "app" | "user" (future-proof)
    accessToken: v.string(),
    tokenType: v.string(), // "bearer"
    expiresAt: v.number(), // epoch time in ms
    createdAt: v.number(),
  }).index("by_kind", ["kind"]),
});

export default schema;
