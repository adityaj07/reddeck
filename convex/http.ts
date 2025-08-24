import { google } from "@ai-sdk/google";
import { getAuthUserId } from "@convex-dev/auth/server";
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";
import { httpRouter } from "convex/server";
import { StatusCodes } from "../src/lib/status-codes";
import { httpAction } from "./_generated/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/api/chat",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return Response.json(
        {
          error: StatusCodes.UNAUTHORIZED.label,
        },
        {
          status: StatusCodes.UNAUTHORIZED.code,
        }
      );
    }

    const { messages }: { messages: UIMessage[] } = await req.json();

    const lastMessages = messages.slice(-10);

    const result = streamText({
      model: google("gemini-2.0-flash-lite"),
      system: "You are a helpful assistant that answers the user's questions.",
      messages: convertToModelMessages(lastMessages),
      stopWhen: stepCountIs(10),
      onError(error) {
        console.error("streamText error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        Vary: "origin",
      }),
    });
  }),
});

// CORS config
http.route({
  path: "/api/chat",
  method: "OPTIONS",
  handler: httpAction(async (_, request) => {
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ) {
      return new Response(null, {
        headers: new Headers({
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Digest, Authorization",
          "Access-Control-Max-Age": "86400",
        }),
      });
    } else {
      return new Response();
    }
  }),
});

export default http;
