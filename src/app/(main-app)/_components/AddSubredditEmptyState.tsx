import { Button } from "@/components/ui/button";
import { type FC } from "react";

interface AddSubredditEmptyStateProps {
  setActiveColumn: (col: number) => void;
  setIsDialogOpen: (bool: boolean) => void;
}

const AddSubredditEmptyState: FC<AddSubredditEmptyStateProps> = ({
  setActiveColumn,
  setIsDialogOpen,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[400px]">
      <span className="text-gray-400">No subreddits added yet</span>
      <Button
        onClick={() => {
          setActiveColumn(0);
          setIsDialogOpen(true);
        }}
      >
        Add Subreddit
      </Button>
    </div>
  );
};

export default AddSubredditEmptyState;
