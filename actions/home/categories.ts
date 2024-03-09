"use server";

import { prisma } from "@/lib/prismadb";

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

// ----------------------------GET SINGLE POST CATEGORY BY NAME----------------------------------------------------------------------------------
export const getCategory = async (name: string) => {
  return await prisma.category.findUnique({
    where: { name },
  });
};
