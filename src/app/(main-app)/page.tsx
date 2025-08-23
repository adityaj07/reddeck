"use client";

import { MessageSquarePlus, PlusCircle, Search } from "lucide-react";
import { type FC } from "react";
import { AI_Prompt } from "./_components/animated-ai-input";

interface PageProps {}

const EmptyState: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 py-10 text-muted-foreground">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <MessageSquarePlus className="h-10 w-10 text-primary" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          No conversations yet
        </h2>
        <p className="text-sm">
          Start by chatting with AI or adding a subreddit to get context.
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm w-full max-w-xs">
        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-accent hover:text-accent-foreground transition">
          <PlusCircle className="h-4 w-4" />
          Add a subreddit
        </button>
        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-accent hover:text-accent-foreground transition">
          <Search className="h-4 w-4" />
          Explore trending topics
        </button>
      </div>
    </div>
  );
};

const Page: FC<PageProps> = ({}) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-6">
        <EmptyState />
      </div>

      {/* Chat input docked at bottom */}
      <div className="sticky bottom-0 flex justify-center bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <AI_Prompt className="w-[90%] md:w-4/6" />
      </div>
    </div>
  );
};

export default Page;
