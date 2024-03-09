"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { ImSpinner2 } from "react-icons/im";

interface DeleteSelectedModalProps {
  deleteSelectedModal: boolean;
  setDeleteSelectedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSelectedRecords: () => void;
}
const DeleteSelectedModal = ({
  deleteSelectedModal,
  setDeleteSelectedModal,
  handleDeleteSelectedRecords,
}: DeleteSelectedModalProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Modal
        isOpen={deleteSelectedModal}
        onClose={() => setDeleteSelectedModal(false)}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete all the selected row(s)?
          </p>
          <div className="flex-align-center gap-3 my-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteSelectedModal(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => startTransition(handleDeleteSelectedRecords)}
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

export default DeleteSelectedModal;
