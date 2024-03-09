"use server";

import { prisma } from "@/lib/prismadb";
import { UserSchemaType, UserUpdateSchemaType } from "@/types";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

// ----------------------------GET USERS ----------------------------------------------------------------------------------
export const getUsers = async (role: UserRole, search: string) => {
  let whereCondition: any = {};

  if (role) {
    whereCondition.role = role;
  }

  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  return await prisma.user.findMany({
    where: whereCondition,
    orderBy: {
      createdAt: "desc",
    },
  });
};

// ----------------------------GET SINGLE USER----------------------------------------------------------------------------------
export const getUser = async (userId: string) => {
  return await prisma.user.findUnique({ where: { id: userId } });
};

// ----------------------------ADD A USER----------------------------------------------------------------------------------
export const addUser = async (data: UserSchemaType) => {
  try {
    const exisitingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (exisitingEmail) {
      throw new Error("Email Already Exists");
    }
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role as UserRole,
        password: await bcrypt.hash(data.password, 10),
      },
    });
    revalidatePath("/admin/users");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------UPDATE A USER----------------------------------------------------------------------------------
export const updateUser = async (
  userId: string,
  data: UserUpdateSchemaType
) => {
  try {
    const exisitingEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exisitingEmail && exisitingEmail.id !== userId) {
      throw new Error("User with that Email Already Exists");
    }
    await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        role: data.role as UserRole,
      },
    });
    revalidatePath("/admin/users");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE A USER----------------------------------------------------------------------------------
export const deleteUser = async (userId: string) => {
  try {
    await prisma.user.delete({ where: { id: userId } });
    revalidatePath("/admin/users");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE MULTIPLE USERS----------------------------------------------------------------------------------
export const deleteUsers = async (userIds: string[]) => {
  try {
    await prisma.user.deleteMany({ where: { id: { in: userIds } } });
    revalidatePath("/admin/users");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
