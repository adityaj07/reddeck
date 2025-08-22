import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type FC } from "react";

interface DeleteConfirmationDialogProps<T = string> {
  isOpen: boolean; // Controls open state
  onClose: () => void; // Close handler
  itemName?: T; // Name or label of the entity to delete
  onDelete: () => void; // Action to perform on confirm delete
  title?: string; // Optional custom title
  description?: string; // Optional custom description
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  itemName,
  onDelete,
  title = "Delete Item",
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-sm text-gray-400">
            {description
              ? description
              : `Are you sure you want to delete ${
                  itemName?.trim() ?? "this item"
                }? This action cannot be undone.`}
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
