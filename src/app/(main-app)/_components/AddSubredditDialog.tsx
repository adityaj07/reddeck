import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useGetSubredditData from "@/hooks/use-get-subreddit";
// import useGetSubredditData from "@/hooks/dataFetchingHooks/useGetSubreddit";
import { type FC } from "react";

interface AddSubredditDialogProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (bool: boolean) => void;
  inputValue: string;
  setInputValue: (input: string) => void;
  handleAddSubreddit: () => void;
  error: string | undefined;
  isLoading: boolean;
}

const AddSubredditDialog: FC<AddSubredditDialogProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  inputValue,
  setInputValue,
  handleAddSubreddit,
  error,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddSubreddit();
  };

  const { clearError } = useGetSubredditData();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Enter the name of the subreddit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              clearError();
            }}
            placeholder="r/example"
            className="border rounded p-2 bg-gray-900 text-white w-full"
          />
          {error && <span className="text-red-500 text-sm">{error}</span>}
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
            {isLoading ? "Adding..." : "Add Subreddit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubredditDialog;
