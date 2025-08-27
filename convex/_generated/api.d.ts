/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as conversations_mutations from "../conversations/mutations.js";
import type * as conversations_queries from "../conversations/queries.js";
import type * as http from "../http.js";
import type * as messages_mutations from "../messages/mutations.js";
import type * as subreddits_actions from "../subreddits/actions.js";
import type * as subreddits_mutations from "../subreddits/mutations.js";
import type * as subreddits_queries from "../subreddits/queries.js";
import type * as users_queries from "../users/queries.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "conversations/mutations": typeof conversations_mutations;
  "conversations/queries": typeof conversations_queries;
  http: typeof http;
  "messages/mutations": typeof messages_mutations;
  "subreddits/actions": typeof subreddits_actions;
  "subreddits/mutations": typeof subreddits_mutations;
  "subreddits/queries": typeof subreddits_queries;
  "users/queries": typeof users_queries;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
