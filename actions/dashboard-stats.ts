"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prismadb";

export const getDashboardStats = async () => {
  const session = await auth();

  /**
   * Retrieves the current user from the database based on their email address and checks their role.
   */

  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user.email! },
  });

  const userRole = currentUser?.role;
  // Number of Posts for the currently logged-in user (excluding admin)
  const postsCount = await prisma.post.count({
    where: {
      authorId: userRole !== "ADMIN" ? currentUser!.id : undefined,
    },
  });

  // Number of Views for the currently logged-in user (excluding admin)
  const views = await prisma.post.aggregate({
    _sum: {
      views: true,
    },
    where: {
      authorId: userRole !== "ADMIN" ? currentUser!.id : undefined,
    },
  });

  // Number of Comments for the currently logged-in user (excluding admin)
  const commentsCount = await prisma.comment.count({
    where: {
      post: {
        authorId: userRole !== "ADMIN" ? currentUser!.id : undefined,
      },
    },
  });
  //   Number of users
  const usersCount = await prisma.user.count();

  return {
    numberOfUsers: usersCount,
    numberOfPosts: postsCount!,
    numberOfViews: views._sum.views || 0,
    numberOfComments: commentsCount!,
  };
};
