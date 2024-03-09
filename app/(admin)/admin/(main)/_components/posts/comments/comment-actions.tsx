"use client";

import { approveComment, unApproveComment } from "@/actions/comments";
import RowActions from "@/components/row-actions";
import { usePreview } from "@/hooks/usePreview";
import { Verified } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import DeleteComment from "./delete-comment-modal";

const CommentActions = ({
  id,
  isApproved,
}: {
  id: string;
  isApproved: boolean;
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const router = useRouter();
  const isPreview = usePreview();

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  // Approve a comment
  const onApprove = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      toast.loading("Processing...", { duration: 1000 });
      await approveComment(id);
      router.refresh();
      toast.success("Comment approved");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Un approve a comment
  const onUnApprove = async () => {
    if (isPreview) {
      toast.error("Please, this is a demo. Can't modify our database");
      return;
    }
    try {
      toast.loading("Processing...", { duration: 1000 });
      await unApproveComment(id);
      router.refresh();
      toast.success("Comment unapproved");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <RowActions
        actions={[
          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
          },
          {
            icon: <Verified className="text-muted-foreground w-4 h-4" />,
            text: isApproved ? "Unapprove" : "Approve",
            onclick: () => (isApproved ? onUnApprove() : onApprove()),
          },
        ]}
      />
      <DeleteComment
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />
    </div>
  );
};

export default CommentActions;
