"use client";

import { useChat } from "@ai-sdk/react";
import { useAuthToken } from "@convex-dev/auth/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef } from "react";
import { ChatInputBox } from "./_components/animated-ai-input";
import ChatMessage from "./_components/chat/ChatMessage";
import EmptyState from "./_components/chat/EmptyState";
import Loader from "./_components/chat/Loader";

const convexSiteUrl = process.env.NEXT_PUBLIC_CONVEX_URL?.replace(
  /.cloud$/,
  ".site"
);

const Page = () => {
  const token = useAuthToken();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${convexSiteUrl}/api/chat`,
      headers: { Authorization: `Bearer ${token}` },
    }),
    messages: [],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isProcessing = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isProcessing && <Loader />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat input docked at bottom */}
      <div className="sticky bottom-0 flex justify-center bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ChatInputBox
          className=" md:w-full"
          onSendMessage={(text) => sendMessage({ text })}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};

export default Page;
