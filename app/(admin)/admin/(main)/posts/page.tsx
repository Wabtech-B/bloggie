import React from "react";
import { getPosts } from "@/actions/posts";
import PostsList from "../_components/posts/posts-list";
import PostFilters from "../_components/posts/post-filters";

const Posts = async ({
  searchParams,
}: {
  searchParams: { filter: string; search: string };
}) => {
  const posts = await getPosts(searchParams.filter, searchParams.search);

  const formattedPosts = posts?.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category.name,
    author: post.author.name!,
    coverImage: post.coverImage,
    published: post.isPublished,
    trashed: post.isTrashed,
    comments: post._count.comments,
    views: post.views,
    date: post.createdAt,
  }));

  return (
    <div>
      <PostFilters />
      <PostsList posts={formattedPosts!} />
    </div>
  );
};

export default Posts;
