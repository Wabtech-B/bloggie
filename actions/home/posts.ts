"use server";

import { prisma } from "@/lib/prismadb";

type QueryParam = {
  search?: string;
  page: number;
  limit: number;
};

// Get QueryConditions
const QueryConditions = (search: string) => {
  return search
    ? {
        OR: search.split(" ").map((word) => ({
          OR: [
            { title: { contains: word, mode: "insensitive" } },
            { description: { contains: word, mode: "insensitive" } },
            {
              category: {
                name: { contains: word, mode: "insensitive" },
              },
            },
            { tags: { has: word } },
          ],
        })),
      }
    : {};
};

// ----------------------------GET SINGLE POST AND RELATED POSTS + COMMENTS ----------------------------------------------------------------------------------
export const getPost = async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { category: true, author: true, comments: true },
  });

  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post!.category.id,
      NOT: {
        id: post!.id,
      },
    },
    include: {
      category: { select: { name: true } },
      author: { select: { name: true, image: true } },
    },
    take: 6,
  });

  return {
    post,
    relatedPosts,
  };
};

// ----------------------------GET POSTS BY CATEGORY ----------------------------------------------------------------------------------
export const getPostsByCategory = async (
  category: string,
  { page, limit }: QueryParam
) => {
  const skip = limit * (page - 1);
  const posts = await prisma.post.findMany({
    where: {
      category: { name: category },
      isPublished: true,
    },
    include: {
      category: { select: { name: true } },
      author: { select: { name: true, image: true } },
    },
    skip,
    take: limit,
  });

  const count = await prisma.post.count({
    where: {
      category: { name: category },
      isPublished: true,
    },
  });

  const pages = Math.ceil(count / limit);

  return {
    posts,
    pages,
  };
};
// ----------------------------GET POSTS BY TAG ----------------------------------------------------------------------------------
export const getPostsByTag = async (
  tag: string,
  { page, limit }: QueryParam
) => {
  const skip = limit * (page - 1);
  const posts = await prisma.post.findMany({
    where: {
      tags: { has: tag },
      isPublished: true,
    },
    include: {
      category: { select: { name: true } },
      author: { select: { name: true, image: true } },
    },
    skip,
    take: limit,
  });

  const count = await prisma.post.count({
    where: {
      tags: { has: tag },
      isPublished: true,
    },
  });

  const pages = Math.ceil(count / limit);

  return {
    posts,
    pages,
  };
};

// ----------------------------GET POSTS BY SEARCH ----------------------------------------------------------------------------------
export const getPostsBySearch = async ({ search, page, limit }: QueryParam) => {
  const skip = limit * (page - 1);
  const query: any = QueryConditions(search!);
  const posts = await prisma.post.findMany({
    where: {
      AND: [query, { isPublished: true }],
    },
    include: {
      category: { select: { name: true } },
      author: { select: { name: true, image: true } },
    },
    skip,
    take: limit,
  });

  const count = await prisma.post.count({
    where: {
      AND: [query, { isPublished: true }],
    },
  });

  const pages = Math.ceil(count / limit);

  return {
    posts,
    pages,
    total: count,
  };
};

// ----------------------------GET POST TAGS ----------------------------------------------------------------------------------
export const getPostTags = async () => {
  const posts = await prisma.post.findMany();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));
  return tags;
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
