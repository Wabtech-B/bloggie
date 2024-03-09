"use server";

import { prisma } from "@/lib/prismadb";

// ----------------------------GET COLLECTIONS----------------------------------------------------------------------------------
export const getCollections = async (search: string) => {
  return await prisma.collection.findMany({
    where: {
      showOnHomePage: true,
      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: {
      position: "asc",
    },
    include: {
      posts: {
        where: { isPublished: true },
        include: {
          category: { select: { name: true } },
          author: { select: { name: true, image: true } },
        },
      },
    },
  });
};
