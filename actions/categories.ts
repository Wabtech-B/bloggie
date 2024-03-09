"use server";

import { prisma } from "@/lib/prismadb";
import { PostCategorySchemaType } from "@/types";
import { revalidatePath } from "next/cache";

// ----------------------------GET POST CATEGORIES ----------------------------------------------------------------------------------
export const getPostCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          posts: {
            where: { isPublished: true },
          },
        },
      },
    },
  });
};

// ----------------------------GET SINGLE POST CATEGORY----------------------------------------------------------------------------------
export const getCategory = async (categoryId: string) => {
  return await prisma.category.findUnique({
    where: { id: categoryId },
  });
};

// ----------------------------ADD A POST CATEGORY----------------------------------------------------------------------------------
export const addCategory = async (data: PostCategorySchemaType) => {
  try {
    const exisitingCategory = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (exisitingCategory) {
      throw new Error("Category Already Exists");
    }
    await prisma.category.create({
      data,
    });
    revalidatePath("/admin/posts/categories");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------UPDATE A POST CATEGORY----------------------------------------------------------------------------------
export const updateCategory = async (
  categoryId: string,
  data: PostCategorySchemaType
) => {
  try {
    const exisitingCategory = await prisma.category.findUnique({
      where: { name: data.name },
    });

    if (exisitingCategory && exisitingCategory.id !== categoryId) {
      throw new Error("Category Already Exists");
    }
    await prisma.category.update({
      where: { id: categoryId },
      data,
    });
    revalidatePath("/admin/posts/categories");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE A POST CATEGORY----------------------------------------------------------------------------------
export const deleteCategory = async (categoryId: string) => {
  try {
    await prisma.category.delete({ where: { id: categoryId } });
    revalidatePath("/admin/posts/categories");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE MULTIPLE POST CATEGORIES----------------------------------------------------------------------------------
export const deletePostCategories = async (categoryIds: string[]) => {
  try {
    await prisma.category.deleteMany({
      where: { id: { in: categoryIds } },
    });
    revalidatePath("/admin/posts/categories");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
