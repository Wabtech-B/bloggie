/* eslint-disable @next/next/no-img-element */
"use client";

import { removeImage } from "@/actions/home/users";
import { ImageUpload } from "@/components/image-upload";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { usePreview } from "@/hooks/usePreview";
import { useEdgeStore } from "@/lib/edgestore";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface EditProfileImageProps {
  editModal: boolean;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const UpdateProfileImage = ({
  editModal,
  setEditModal,
  image,
  setImage,
}: EditProfileImageProps) => {
  const { edgestore } = useEdgeStore();
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { update, data } = useSession();
  const isPreview = usePreview();

  const onReset = () => {
    setEditModal(false);
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      setLoading(true);
      await update({ image });
      toast.success("Image Updated successfully");
      onReset();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFile = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      setDeleting(true);
      await edgestore.publicFiles.delete({
        url: data?.user.image!,
      });
      await removeImage(data?.user.id!);
      setImage("");
      toast.success("Image deleted");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">Edit Profile Image</h3>
          <div>
            <label htmlFor="category">
              Image (Delete old image to upload new one)
            </label>
            {image && (
              <div className="relative">
                <img
                  src={image}
                  alt="Image"
                  className="w-[150px] h-[150px] object-cover my-2 mx-auto rounded-full"
                />
                <div
                  className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform cursor-pointer"
                  onClick={deleteFile}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-md border bg-white transition-all duration-300 hover:h-6 hover:w-6 border-border0 dark:bg-black">
                    {deleting ? (
                      <ImSpinner2 className="text-gray-500 dark:text-gray-400 text-sm animate-spin" />
                    ) : (
                      <X
                        className="text-gray-500 dark:text-gray-400"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {!image && <ImageUpload setImage={setImage} />}
          </div>

          <div className="flex-align-center gap-3 my-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onReset();
              }}
            >
              Cancel
            </Button>
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <div className="flex-align-center gap-x-2">
                  <ImSpinner2 className="animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProfileImage;
