"use client";
import { deleteComment } from "@/actions/comments";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface DeleteCommentProps {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentId: string;
}
const DeleteComment = ({
  deleteModal,
  setDeleteModal,
  currentId,
}: DeleteCommentProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const isPreview = usePreview();

  const onDelete = async (id: string) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await deleteComment(id);
      setDeleteModal(false);
      router.refresh();
      toast.success("Comment deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className="p-4">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this comment?</p>
          <p className="text-red-500">
            Note: All nested comments/replies will be deleted too
          </p>
          <div className="flex-align-center gap-3 my-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteModal(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => startTransition(() => onDelete(currentId))}
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex-align-center gap-x-2">
                  <ImSpinner2 className="animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteComment;
