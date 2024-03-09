"use server";

import { prisma } from "@/lib/prismadb";
import { CommentSchemaType } from "@/types";

// ----------------------------GET COMMENTS----------------------------------------------------------------------------------
export const getComments = async (postId: string) => {
  return await prisma.comment.findMany({
    where: {
      postId,
      isApproved: true,
    },
    select: {
      content: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ----------------------------ADD COMMENT----------------------------------------------------------------------------------
export const addComment = async (postId: string, data: CommentSchemaType) => {
  try {
    await prisma.comment.create({
      data: {
        ...data,
        postId,
      },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
