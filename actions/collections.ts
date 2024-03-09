"use server";

import { prisma } from "@/lib/prismadb";
import { CollectionSchemaType } from "@/types";
import { revalidatePath } from "next/cache";

// ----------------------------GET COLLECTIONS----------------------------------------------------------------------------------
export const getCollections = async (search: string) => {
  return await prisma.collection.findMany({
    where: {
      ...(search ? { name: { contains: search, mode: "insensitive" } } : {}),
    },
    orderBy: {
      position: "asc",
    },
    include: {
      posts: true,
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });
};

// ----------------------------GET POSTS WITH COLLECTIONS----------------------------------------------------------------------------------
export const getCollectionsPosts = async (sort: string) => {
  const orderBy = (() => {
    switch (sort) {
      case "latest":
        return { createdAt: "desc" as const };
      case "oldest":
        return { createdAt: "asc" as const };
      case "popular":
        return { views: "desc" as const };
      default:
        return { createdAt: "desc" as const };
    }
  })();
  return await prisma.post.findMany({
    orderBy,
    include: {
      collections: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
};

// ----------------------------GET SINGLE POST COLLECTION----------------------------------------------------------------------------------
export const getCollection = async (collectionId: string) => {
  return await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      posts: true,
    },
  });
};

// ----------------------------GET SINGLE COLLECTION AND POSTS + CATEGORIES----------------------------------------------------------------------------------
export const getCollectionPosts = async (collectionId: string) => {
  return await prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      posts: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
};

// ----------------------------ADD A POST COLLECTION----------------------------------------------------------------------------------
export const addCollection = async (data: CollectionSchemaType) => {
  try {
    const exisitingCollection = await prisma.collection.findUnique({
      where: { name: data.name },
    });

    if (exisitingCollection) {
      throw new Error("Collection Already Exists");
    }
    // Find the maximum position value
    const maxPositionCollection = await prisma.collection.findFirst({
      select: {
        position: true,
      },
      orderBy: {
        position: "desc",
      },
    });

    const newPosition = (maxPositionCollection?.position || 0) + 1;
    await prisma.collection.create({
      data: {
        ...data,
        position: newPosition,
      },
    });
    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------UPDATE A COLLECTION----------------------------------------------------------------------------------
export const updateCollection = async (
  collectionId: string,
  data: CollectionSchemaType
) => {
  try {
    const exisitingCollection = await prisma.collection.findFirst({
      where: { name: data.name },
    });

    if (exisitingCollection && exisitingCollection.id !== collectionId) {
      throw new Error("Collection Already Exists");
    }
    await prisma.collection.update({
      where: { id: collectionId },
      data,
    });
    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE A COLLECTION----------------------------------------------------------------------------------
export const deleteCollection = async (collectionId: string) => {
  try {
    await prisma.collection.delete({ where: { id: collectionId } });
    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------DELETE MULTIPLE COLLECTIONS----------------------------------------------------------------------------------
export const deleteCollections = async (collectionIds: string[]) => {
  try {
    await prisma.collection.deleteMany({
      where: { id: { in: collectionIds } },
    });
    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type Data = {
  id: string;
  position: number;
};

// ----------------------------SORT COLLECTIONS ----------------------------------------------------------------------------------
export const sortCollections = async (data: Data[]) => {
  try {
    for (let item of data) {
      await prisma.collection.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------MOVE POSTS TO A COLLECTION ----------------------------------------------------------------------------------
export const movePostToCollection = async (
  postId: string,
  collectionId: string
) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: { posts: true },
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    // Check if the post is already associated with the collection
    const isPostInCollection = collection.posts.some((p) => p.id === postId);

    if (isPostInCollection) {
      throw new Error("Post already in collection");
    }

    const updatedPostsIds = [...collection.postsIDs, postId];

    await prisma.collection.update({
      where: { id: collectionId },
      data: { postsIDs: { set: updatedPostsIds } },
    });

    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// ----------------------------REMOVE POST FROM A COLLECTION ----------------------------------------------------------------------------------
export const removePostFromCollection = async (
  postId: string,
  collectionId: string
) => {
  try {
    const collection = await prisma.collection.findUnique({
      where: { id: collectionId },
      include: { posts: true },
    });

    if (!collection) {
      throw new Error("Collection not found");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const newPostIds = collection.postsIDs.filter((id) => id !== postId);

    await prisma.collection.update({
      where: { id: collectionId },
      data: { postsIDs: { set: newPostIds } },
    });
    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};

type PostData = {
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
  displayType: string;
  showOnHomePage: boolean;
};

// ---------------------------- UPDATE COLLECTION AND POSTS ----------------------------------------------------------------------------------
export const updateCollectionAndPosts = async (
  collectionId: string,
  postsIDs: string[],
  data: PostData
) => {
  try {
    // Update Posts
    await prisma.post.updateMany({
      where: { id: { in: postsIDs } },
      data: {
        showAuthor: data.showAuthor,
        showTags: data.showTags,
        showDescription: data.showDescription,
      },
    });
    // Update Collection
    await prisma.collection.update({
      where: { id: collectionId },
      data: {
        displayType: data.displayType,
        showOnHomePage: data.showOnHomePage,
      },
    });
    revalidatePath("/admin/posts/collections");
  } catch (error: any) {
    throw new Error(error.message);
  }
};
