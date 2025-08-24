import { getAuthUserId } from "@convex-dev/auth/server";
import { Doc } from "../_generated/dataModel";
import { internalQuery } from "../_generated/server";

export const getToken = internalQuery({
  args: {},
  handler: async (ctx, args): Promise<Doc<"reddit_tokens"> | null> => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }
    const token = await ctx.db
      .query("reddit_tokens")
      .withIndex("by_kind", (q) => q.eq("kind", "app"))
      .first();

    return token;
  },
});
