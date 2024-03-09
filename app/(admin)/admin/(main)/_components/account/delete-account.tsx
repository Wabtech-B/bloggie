"use client";

import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isPreview = usePreview();

  /**
   * Deletes the user account by sending a DELETE request to the "/api/auth/delete-account" endpoint.
   */
  const deleteAccount = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.delete(`/api/auth/delete-account`);
      toast.success(response.data);
      await signOut();
    } catch (error: any) {
      console.log(error);
      toast.error("Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-2 sm:p-4  rounded-lg border border-border">
      <div className="flex-center-between flex-col md:flex-row gap-6">
        <div>
          <h2 className="text-2xl font-semibold">Delete Account</h2>
          <p className="mt-1 ">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </p>
        </div>

        <div className="self-end flex-shrink-0">
          <Button variant="destructive" onClick={() => setIsModalOpen(true)}>
            Delete account
          </Button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h1 className="text-xl font-semibold mb-2">
              Are you absolutely sure?
            </h1>
            <p>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>

            <div className="flex-align-center justify-end gap-x-3 mt-4">
              <Button
                variant="outline"
                autoFocus
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="uppercase"
                disabled={loading}
                onClick={deleteAccount}
              >
                {loading ? (
                  <div className="flex-center-center gap-x-2">
                    <ImSpinner2 className="animate-spin" />
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteAccount;
