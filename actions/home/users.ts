"use server";

import { prisma } from "@/lib/prismadb";

// ----------------------------GET USERS ----------------------------------------------------------------------------------
export const getUsers = async () => {
  return await prisma.user.findMany({
    select: { role: true },
    orderBy: {
      createdAt: "desc",
    },
  });
};
// ---------------------------- REMOVE PROFILE IMAGE ----------------------------------------------------------------------------------
export const removeImage = async (userId: string) => {
  try {
    await prisma.user.update({ where: { id: userId }, data: { image: null } });
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
