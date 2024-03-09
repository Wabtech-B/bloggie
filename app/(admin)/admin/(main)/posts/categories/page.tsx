import React from "react";
import CategoriesList from "../../_components/posts/categories/categories-list";
import { getPostCategories } from "@/actions/categories";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

const Categories = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  const session = await auth();
  if (session?.user.role !== "ADMIN") notFound();
  const categories = await getPostCategories(searchParams.search);

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    name: category.name,
    date: category.createdAt,
    posts: category._count?.posts || 0,
  }));

  return (
    <div>
      <CategoriesList categories={formattedCategories} />
    </div>
  );
};

export default Categories;
