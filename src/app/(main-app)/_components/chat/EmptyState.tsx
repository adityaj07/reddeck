import { MessageSquarePlus, PlusCircle, Search } from "lucide-react";
import { FC } from "react";

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

export default EmptyState;
