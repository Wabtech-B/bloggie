"use client";
import { movePostToTrash } from "@/actions/posts";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface TrashPostProps {
  trashModal: boolean;
  setTrashModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentId: string;
}
const TrashPost = ({
  trashModal,
  setTrashModal,
  currentId,
}: TrashPostProps) => {
  const [isPending, startTransition] = useTransition();
  const isPreview = usePreview();

  /**
   * Moves a post to the trash and displays a success toast message.
   * @param {string} id - The ID of the post to be moved to trash.
   */
  const onTrash = async (id: string) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await movePostToTrash(id);
      setTrashModal(false);
      toast.success("Post moved to trash");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={trashModal} onClose={() => setTrashModal(false)}>
        <div className="p-4">
          <h3 className="font-bold text-lg">Confirm</h3>
          <p className="py-4">
            Are you sure you want to trash this post? You can always restore it!
          </p>
          <div className="flex-align-center gap-3 my-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setTrashModal(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => startTransition(() => onTrash(currentId))}
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex-align-center gap-x-2">
                  <ImSpinner2 className="animate-spin" />
                  <span>Trashing...</span>
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

export default TrashPost;
