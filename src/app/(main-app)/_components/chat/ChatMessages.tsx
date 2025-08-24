"use client"

import { UIMessage } from "ai";
import { FC, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import Loader from "./Loader";

interface ChatMessagesProps {
  messages: UIMessage[];
  isLoading: boolean;
}

const ChatMessages: FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // Trigger scroll whenever messages or loading changes
  useEffect(scrollToBottom, [messages, isLoading]);

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {isLoading && <Loader />}
      <div ref={messagesEndRef} />
    </div>
  );
};
