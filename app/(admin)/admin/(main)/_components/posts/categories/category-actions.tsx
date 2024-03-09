"use client";

import { getCategory } from "@/actions/categories";
import RowActions from "@/components/row-actions";
import { Category } from "@prisma/client";
import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import DeleteCategory from "./delete-category-modal";
import EditCategory from "./edit-category-modal";

const CategoryActions = ({ id }: { id: string }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  const confirmDelete = async () => {
    setDeleteModal(true);
  };

  /**
   * Handles the edit action for a category.
   */
  const onEdit = async () => {
    const category = await getCategory(id);
    setCategory(category);
    setEditModal(true);
  };

  return (
    <div>
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
      <DeleteCategory
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        currentId={id}
      />
      {editModal && (
        <EditCategory
          editModal={editModal}
          setEditModal={setEditModal}
          category={category!}
        />
      )}
    </div>
  );
};

export default CategoryActions;
