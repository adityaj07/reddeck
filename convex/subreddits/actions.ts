"use node";

import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { Id } from "../_generated/dataModel";
import { action, internalAction } from "../_generated/server";

const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID!;
const REDDIT_SECRET = process.env.REDDIT_CLIENT_SECRET!;

export const getAppToken = internalAction({
  args: {},
  handler: async (ctx, args): Promise<string | null> => {
    // we check if token exists and is valid
    const token = await ctx.runQuery(internal.subreddits.queries.getToken, {});

    const now = Date.now();
    if (token && token.expiresAt > now + 60_000) {
      return token.accessToken;
    }

    // Fetch new token
    const auth = Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_SECRET}`).toString(
      "base64"
    );
    const resp = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const json = await resp.json();
    const accessToken = json.access_token;
    const expiresIn = json.expires_in * 1000;

    // insert the token in db
    await ctx.runMutation(internal.subreddits.mutations.insertAppToken, {
      accessToken,
      tokenType: json.token_type,
      expiresAt: now + expiresIn,
      createdAt: now,
    });

    return accessToken;

    return null;
  },
});

export const addSubreddit = action({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx); //gets the userId of the loggedIn user else null

    if (!userId) {
      throw new Error("User must be authenticated to add a subreddit.");
    }

    const accessToken = await ctx.runAction(
      internal.subreddits.actions.getAppToken,
      {}
    );
    const cleanName = name.replace(/^r\//, "").toLowerCase();

    // fetch the subreddit metadata
    const subResp = await fetch(
      `https://oauth.reddit.com/r/${cleanName}/about`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!subResp.ok) throw new Error("Subreddit not found");
    const subJson = await subResp.json();
    const subData = subJson.data;

    const upsertedSubredditId: Id<"subreddits"> = await ctx.runMutation(
      internal.subreddits.mutations.upsertSubreddit,
      {
        name: cleanName,
        title: subData.title,
        description: subData.public_description,
        subscribers: subData.subscribers,
      }
    );

    // Fetch top posts
    const postsResp = await fetch(
      `https://oauth.reddit.com/r/${cleanName}/hot?limit=10`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const postsJson = await postsResp.json();

    for (const post of postsJson.data.children) {
      const p = post.data;
      await ctx.runMutation(internal.subreddits.mutations.upsertPost, {
        subredditId: upsertedSubredditId,
        redditId: p.id,
        title: p.title,
        selftext: p.selftext || "",
        author: p.author,
        permalink: p.permalink,
        url: p.url,
        score: p.score,
        numComments: p.num_comments,
        createdUtc: p.created_utc * 1000,
      });
    }

    // TODO: enqueue embeddings job

    return { success: true, subredditId: upsertedSubredditId };
  },
});
