"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { ImSpinner2 } from "react-icons/im";

interface TrashSelectedModalProps {
  trashSelectedModal: boolean;
  setTrashSelectedModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleTrashSelectedRecords: () => void;
}
const TrashSelectedModal = ({
  trashSelectedModal,
  setTrashSelectedModal,
  handleTrashSelectedRecords,
}: TrashSelectedModalProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Modal
        isOpen={trashSelectedModal}
        onClose={() => setTrashSelectedModal(false)}
      >
        <div className="p-4">
          <h3 className="font-bold text-lg">Confirm</h3>
          <p className="py-4">
            Are you sure you want to trash all the selected row(s)? You can
            restored them later
          </p>
          <div className="flex-align-center gap-3 my-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setTrashSelectedModal(false)}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => startTransition(handleTrashSelectedRecords)}
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

export default TrashSelectedModal;
