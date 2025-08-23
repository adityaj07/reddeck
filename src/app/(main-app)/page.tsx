"use client";

import { type FC } from "react";
import { AI_Prompt } from "./_components/animated-ai-input";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center px-6">
        <div className="w-full max-w-3xl text-center text-muted-foreground">
          <p className="text-lg">
            Start chatting or add a subreddit from the header →
          </p>
        </div>
      </div>

      {/* Chat input docked at bottom */}
      <div className="sticky bottom-0 flex justify-center bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-6">
        <AI_Prompt className="w-[90%] md:w-4/6" />
      </div>
    </div>
  );
};

export default page;
