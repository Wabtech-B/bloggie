import RowActions from "@/components/row-actions";
import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteCollection from "./delete-collection-modal";
import { Collection } from "@prisma/client";
import { getCollection } from "@/actions/collections";
import EditCollection from "./edit-collection";

const CollectionsActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editDrawer, setEditDrawer] = useState(false);
  const [collection, setCollection] = useState<Collection | null>(null);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  /**
   * Handles the edit action for a collection.
   */
  const onEdit = async () => {
    const collection = await getCollection(id);
    setCollection(collection);
    setEditDrawer(true);
  };

  return (
    <>
      <RowActions
        actions={[
          {
            icon: <FiEdit />,
            text: "Edit",
            onclick: () => onEdit(),
          },
          {
            icon: <FiTrash />,
            text: "Delete",
            onclick: () => confirmDelete(),
          },
        ]}
      />

      <DeleteCollection
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />

      {editDrawer && (
        <EditCollection
          editDrawer={editDrawer}
          setEditDrawer={setEditDrawer}
          collection={collection!}
        />
      )}
    </>
  );
};

export default CollectionsActions;
