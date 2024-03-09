"use client";

import RowActions from "@/components/row-actions";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteUser from "./delete-user-modal";

const UserActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);

  /**
   * Sets the delete modal state to true, triggering a confirmation dialog for deletion.
   */
  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  return (
    <div>
      <RowActions
        actions={[
          {
            icon: <FiEdit />,
            text: "Edit",
            link: true,
            url: `/admin/users/${id}/edit`,
          },
          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
          },
        ]}
      />
      <DeleteUser
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />
    </div>
  );
};

export default UserActions;
