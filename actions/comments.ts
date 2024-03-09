"use server";

import { prisma } from "@/lib/prismadb";

// ----------------------------GET COMMENTS ----------------------------------------------------------------------------------
export const getComments = async (postId: string, search: string) => {
  let whereCondition: any = { postId };

  if (search) {
    whereCondition.OR = [
      { content: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  return await prisma.comment.findMany({
    where: whereCondition,
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ----------------------------GET SINGLE COMMENT ----------------------------------------------------------------------------------
export const getComment = async (commentId: string) => {
  return await prisma.comment.findUnique({
    where: { id: commentId },
  });
};

// ---------------------------- DELETE A COMMENT ----------------------------------------------------------------------------------
export const deleteComment = async (commentId: string) => {
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE MULTIPLE COMMENTS----------------------------------------------------------------------------------
export const deleteComments = async (commentIds: string[]) => {
  try {
    await prisma.comment.deleteMany({
      where: { id: { in: commentIds } },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------APPROVE COMMENT----------------------------------------------------------------------------------
export const approveComment = async (commentId: string) => {
  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        isApproved: true,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------APPROVE COMMENTS----------------------------------------------------------------------------------
export const approveComments = async (commentIds: string[]) => {
  try {
    await prisma.comment.updateMany({
      where: { id: { in: commentIds } },
      data: {
        isApproved: true,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------UN APPROVE COMMENT----------------------------------------------------------------------------------
export const unApproveComment = async (commentId: string) => {
  try {
    await prisma.comment.update({
      where: { id: commentId },
      data: {
        isApproved: false,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
