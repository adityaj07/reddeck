import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { sanitizeSubredditInput } from "@/utils";

import useGetSubredditData from "@/hooks/use-get-subreddit";
import { MoreVertical, RefreshCw, Trash2 } from "lucide-react";
import { type FC, Fragment, useState } from "react";
import { toast } from "sonner";
import AddSubredditDialog from "./AddSubredditDialog";
import AddSubredditEmptyState from "./AddSubredditEmptyState";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

interface RedditPost {
  id: string;
  title: string;
  author: string;
  url: string;
  ups: number;
  num_comments: number;
  permalink: string;
}

interface Subreddit {
  name: string;
  posts: RedditPost[];
}

const ResizableSubredditSection: FC = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<number>(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [subredditToDelete, setSubredditToDelete] = useState<number | null>(
    null
  );
  const [loadingIndexes, setLoadingIndexes] = useState<Record<number, boolean>>(
    {}
  );

  const { error, isLoading, fetchSubreddit } = useGetSubredditData();

  const handleDeleteSubreddit = () => {
    if (subredditToDelete !== null) {
      setSubreddits((prev) =>
        prev.filter((_, idx) => idx !== subredditToDelete)
      );
      setSubredditToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleRefreshSubreddit = async (index: number) => {
    const name = subreddits[index]?.name;
    if (!name) return;

    setLoadingIndexes((prev) => ({ ...prev, [index]: true }));

    const refreshed = await fetchSubreddit(name);

    if (refreshed) {
      setSubreddits((prev) => {
        const copy = [...prev];
        copy[index] = refreshed;
        return copy;
      });
    }

    setLoadingIndexes((prev) => ({ ...prev, [index]: false }));
  };

  const handleAddSubreddit = async () => {
    const raw = inputValue.trim();
    if (!raw) return;

    const name = sanitizeSubredditInput(raw);

    // Check for duplicates
    const isDuplicate = subreddits.some(
      (sub) => sub.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("You have already added this subreddit");
      return;
    }

    const fetched = await fetchSubreddit(name);
    if (!fetched) return;

    setSubreddits((prev) => {
      const next = [...prev];
      // If activeColumn points to the placeholder (== prev.length), append.
      // Else replace/insert at that index.
      if (activeColumn >= 0 && activeColumn < next.length) {
        next[activeColumn] = fetched;
      } else {
        next.push(fetched);
      }
      return next;
    });

    setInputValue("");
    setIsDialogOpen(false);
  };

  const renderColumn = (subreddit: Subreddit | null, index: number) => {
    if (!subreddit) {
      return (
        <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
          <span className="text-muted-foreground">No subreddit added</span>
          <Button
            onClick={() => {
              setActiveColumn(index);
              setIsDialogOpen(true);
            }}
          >
            Add Subreddit
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full w-full bg-background">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-border flex-shrink-0">
          <h2 className="font-semibold text-lg text-foreground">
            r/{subreddit.name}
          </h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleRefreshSubreddit(index)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSubredditToDelete(index);
                  setDeleteDialogOpen(true);
                }}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Scrollable posts - takes remaining space */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {loadingIndexes[index] ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-800/50 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            subreddit.posts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-border bg-card shadow-sm p-4 hover:shadow-md transition flex-shrink-0"
              >
                <a
                  href={`https://reddit.com${post.permalink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-foreground hover:underline block"
                >
                  {post.title}
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Posted by <span className="font-medium">u/{post.author}</span>{" "}
                  • {post.ups} upvotes • {post.num_comments} comments
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {subreddits?.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <AddSubredditEmptyState
            setActiveColumn={setActiveColumn}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full w-full rounded-lg border overflow-hidden"
        >
          {subreddits.map((sub, idx) => (
            <Fragment key={sub.name || idx}>
              <ResizablePanel defaultSize={100 / (subreddits.length + 1)}>
                {renderColumn(sub, idx)}
              </ResizablePanel>
              <ResizableHandle withHandle />
            </Fragment>
          ))}

          <ResizablePanel defaultSize={100 / (subreddits.length + 1)}>
            {renderColumn(null, subreddits.length)}
          </ResizablePanel>
        </ResizablePanelGroup>
      )}

      {/* Dialogs */}
      <AddSubredditDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleAddSubreddit={handleAddSubreddit}
        error={error}
        isLoading={isLoading}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSubredditToDelete(null);
        }}
        itemName={
          subredditToDelete !== null
            ? subreddits && subreddits[subredditToDelete]?.name
            : undefined
        }
        onDelete={handleDeleteSubreddit}
        title="Delete Subreddit"
      />
    </div>
  );
};

export default ResizableSubredditSection;
