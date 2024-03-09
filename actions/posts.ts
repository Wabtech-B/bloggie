"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";
import { PostSchemaType } from "@/types";
import { revalidatePath } from "next/cache";

type ExtraPostData = {
  authorId: string;
  slug: string;
  coverImage: string;
};

type ExtraPostUpdateData = {
  slug: string;
  coverImage: string;
};

// ----------------------------GET POSTS WITH OPTIONAL FILTERS AND SEARCH ----------------------------------------------------------------------------------
export const getPosts = async (filter: string, search: string) => {
  const whereConditions: any[] = [];

  switch (filter) {
    case "published":
      whereConditions.push({ isPublished: true });
      break;
    case "draft":
      whereConditions.push({ isPublished: false });
      break;
    case "trash":
      whereConditions.push({ isTrashed: true });
      break;
    default:
      whereConditions.push({ isTrashed: false });
  }

  // Search
  if (search) {
    whereConditions.push({
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { category: { name: { contains: search, mode: "insensitive" } } },
        { author: { name: { contains: search, mode: "insensitive" } } },
        { content: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  const session = await auth();
  if (!session) return;

  /**
   * Retrieves the current user from the database based on their email address and checks their role.
   * If the user is not an admin, they can get all posts, otherwise they can see their own posts
   */

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });
  const userRole = currentUser?.role;

  if (userRole !== "ADMIN") {
    whereConditions.push({ authorId: currentUser!.id });
  }

  const posts = await prisma.post.findMany({
    where: {
      AND: whereConditions.length > 0 ? whereConditions : undefined,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      author: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts;
};

// ----------------------------GET SINGLE POST ----------------------------------------------------------------------------------
export const getPost = async (postId: string) => {
  return await prisma.post.findUnique({
    where: { id: postId },
    include: { category: true, author: true },
  });
};

// ----------------------------ADD POST ----------------------------------------------------------------------------------
export const addPost = async (
  data: PostSchemaType,
  extraData: ExtraPostData
) => {
  try {
    await prisma.post.create({
      data: {
        ...data,
        ...extraData,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------UPDATE POST ----------------------------------------------------------------------------------
export const updatePost = async (
  postId: string,
  data: PostSchemaType,
  extraData: ExtraPostUpdateData
) => {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        ...data,
        ...extraData,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- UPDATE POST VIEWS ----------------------------------------------------------------------------------
export const updatePostViews = async (postId: string) => {
  await prisma.post.update({
    where: { id: postId },
    data: {
      views: { increment: 1 },
    },
  });
};

// ----------------------------DELETE POST ----------------------------------------------------------------------------------
export const deletePost = async (postId: string) => {
  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- DELETE MULTIPLE POSTS----------------------------------------------------------------------------------
export const deletePosts = async (postIds: string[]) => {
  try {
    await prisma.post.deleteMany({
      where: { id: { in: postIds } },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------PUBLISH/UNPUBLISH POST ----------------------------------------------------------------------------------
export const publishPost = async (postId: string, isPublished: boolean) => {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        isPublished,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- PUBLISH POSTS----------------------------------------------------------------------------------
export const publishPosts = async (postIds: string[]) => {
  try {
    await prisma.post.updateMany({
      where: { id: { in: postIds } },
      data: {
        isPublished: true,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- UNPUBLISH POSTS----------------------------------------------------------------------------------
export const unPublishPosts = async (postIds: string[]) => {
  try {
    await prisma.post.updateMany({
      where: { id: { in: postIds } },
      data: {
        isPublished: false,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- MOVE POST TO TRASH----------------------------------------------------------------------------------
export const movePostToTrash = async (postId: string) => {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        isTrashed: true,
        isPublished: false,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- RESTORE POST FROM TRASH----------------------------------------------------------------------------------
export const restorePostFromTrash = async (postId: string) => {
  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        isTrashed: false,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- MOVE POSTS TO TRASH----------------------------------------------------------------------------------
export const movePostsToTrash = async (postIds: string[]) => {
  try {
    await prisma.post.updateMany({
      where: { id: { in: postIds } },
      data: {
        isTrashed: true,
        isPublished: false,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ---------------------------- RESTORE POSTS FROM TRASH----------------------------------------------------------------------------------
export const restorePostsFromTrash = async (postIds: string[]) => {
  try {
    await prisma.post.updateMany({
      where: { id: { in: postIds } },
      data: {
        isTrashed: false,
      },
    });
    revalidatePath("/admin/posts");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
