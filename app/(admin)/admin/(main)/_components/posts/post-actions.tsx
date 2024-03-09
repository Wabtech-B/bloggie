"use client";

import RowActions from "@/components/row-actions";
import { ArchiveRestore, Recycle } from "lucide-react";
import { useState } from "react";
import { BiChat } from "react-icons/bi";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import DeletePost from "./delete-post-modal";
import TrashPost from "./trash-post-modal";
import { useSearchParams } from "next/navigation";
import { restorePostFromTrash } from "@/actions/posts";
import toast from "react-hot-toast";

const PostActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [trashModal, setTrashModal] = useState(false);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "not-trash";

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  const confirmTrash = async () => {
    setTrashModal(true);
  };

  /**
   *  Restores a post from the trash and displays a loading toast message
   */
  const onRestore = async () => {
    try {
      toast.loading("Processing...", { duration: 1000 });
      await restorePostFromTrash(id);
      toast.success("Post restored");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <RowActions
        actions={[
          {
            icon: <FiEdit className="text-muted-foreground" />,
            text: "Edit",
            link: true,
            url: `/admin/posts/${id}/edit`,
          },
          {
            icon: <FiEye className="text-muted-foreground" />,
            text: "Preview",
            link: true,
            url: `/admin/posts/${id}/preview`,
          },
          {
            icon: <BiChat className="text-muted-foreground" />,
            text: "Comments",
            link: true,
            url: `/admin/posts/${id}/comments`,
          },
          {
            icon:
              filter === "trash" ? (
                <ArchiveRestore className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Recycle className="w-4 h-4 text-muted-foreground" />
              ),
            text: filter === "trash" ? "Restore" : "Move to Trash",
            onclick: () => (filter === "trash" ? onRestore() : confirmTrash()),
          },
          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
          },
        ]}
      />
      <DeletePost
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />
      <TrashPost
        trashModal={trashModal}
        setTrashModal={setTrashModal}
        currentId={id}
      />
    </div>
  );
};

export default PostActions;
