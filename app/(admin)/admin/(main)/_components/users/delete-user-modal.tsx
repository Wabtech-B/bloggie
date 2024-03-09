"use client";
import { deleteUser } from "@/actions/users";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { usePreview } from "@/hooks/usePreview";

interface DeleteUserProps {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  currentId: string;
}
const DeleteUser = ({
  deleteModal,
  setDeleteModal,
  currentId,
}: DeleteUserProps) => {
  const [isPending, startTransition] = useTransition();
  const currentUser = useCurrentUser();
  const isPreview = usePreview();

  /**
   * Deletes a user with the given ID.
   * @param {string} id - The ID of the user to delete.
   */
  const onDelete = async (id: string) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      await deleteUser(id);
      if (currentUser?.id === id) {
        await signOut();
        toast.success("Logging you out");
        return;
      }
      setDeleteModal(false);
      toast.success("User deleted");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className="p-4">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this user?</p>
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

export default DeleteUser;
