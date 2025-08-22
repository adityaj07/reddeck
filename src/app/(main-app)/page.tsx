"use client";

import { type FC } from "react";
import { AI_Prompt } from "./_components/animated-ai-input";
import ResizableSubredditSection from "./_components/ResizableSubredditSection";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Main content area - centered */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl h-[600px]">
          <ResizableSubredditSection />
        </div>
      </div>

      {/* AI Prompt fixed at bottom */}
      <div className="flex justify-center pb-6">
        <AI_Prompt className="w-[90%] md:w-4/6" />
      </div>
    </div>
  );
};

export default page;
