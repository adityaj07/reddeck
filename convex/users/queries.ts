import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "../_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      //   name: user.name,
      email: user.email,
      //   avatar: user.avatar, // or whatever fields you have
    };
  },
});
