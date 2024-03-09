"use client";

import { removePostFromCollection } from "@/actions/collections";
import { usePreview } from "@/hooks/usePreview";
import { X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

interface RemovePostFromCollectionProps {
  postId: string;
  collectionId: string;
}

const RemovePostFromCollection = ({
  postId,
  collectionId,
}: RemovePostFromCollectionProps) => {
  const [loading, setLoading] = useState(false);
  const isPreview = usePreview();

  /**
   * Removes a post from a collection.
   * @param {string} postId - The ID of the post to remove.
   * @param {string} collectionId - The ID of the collection to remove the post from.
   */
  const onRemovePostFromCollection = async (
    postId: string,
    collectionId: string
  ) => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      setLoading(true);
      await removePostFromCollection(postId, collectionId);
      toast.success("Post removed from collection");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-1 hover:bg-slate-300 dark:hover:bg-gray-700 cursor-pointer rounded-lg"
      onClick={() => onRemovePostFromCollection(postId, collectionId)}
    >
      {loading ? (
        <ImSpinner2 className="animate-spin" />
      ) : (
        <X className="w-4 h-4 text-red-500 shrink-0" />
      )}
    </div>
  );
};

export default RemovePostFromCollection;
