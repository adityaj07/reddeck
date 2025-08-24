import Markdown from "@/components/markdown";
import { cn } from "@/lib/utils";
import { UIMessage } from "ai";
import { FC } from "react";

interface ChatMessageProps {
  message: UIMessage;
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const lastPart = message.parts[message.parts.length - 1];
  return (
    <div
      className={cn(
        "mb-2 flex max-w-[80%] flex-col prose dark:prose-invert",
        message.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      <div
        className={cn(
          "prose dark:prose-invert rounded-lg px-3 py-2 text-sm",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted first:prose-p:mt-0"
        )}
      >
        {message.role === "assistant" && (
          <div className="text-muted-foreground mb-1 flex items-center gap-1 text-xs font-medium">
            AI Assistant
          </div>
        )}
        {lastPart?.type === "text" && <Markdown>{lastPart.text}</Markdown>}
      </div>
    </div>
  );
};

export default ChatMessage;
