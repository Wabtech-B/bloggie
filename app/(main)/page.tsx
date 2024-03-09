import { getCollections } from "@/actions/home/collections";
import SimpleGrid from "@/components/posts/simple-grid";
import SimpleGridImage from "@/components/posts/simple-grid-image";
import SimpleGridScrollable from "@/components/posts/simple-grid-scrollable";
import SimpleGridScrollableImage from "@/components/posts/simple-grid-scrollable-image";
import SimpleTwoGrid from "@/components/posts/simple-two-grid";
import ThreeGrid from "@/components/posts/three-grid";
import TwoGrid from "@/components/posts/two-grid";
import TwoImageGrid from "@/components/posts/two-image-grid";
import { cn } from "@/lib/utils";
import { TTPost } from "@/types";
import Categories from "./_components/categories";

const BlogPosts = async ({
  searchParams,
}: {
  searchParams: { search: string };
}) => {
  const collections = await getCollections(searchParams.search);

  const getListType = (displayType: string, posts: TTPost[]) => {
    switch (displayType) {
      case "simple_image_grid":
        return (
          <SimpleGridImage
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
            showDescription={posts.every((post) => post.showDescription)}
          />
        );
      case "simple_scrollable_grid":
        return (
          <SimpleGridScrollable
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
            showDescription={posts.every((post) => post.showDescription)}
          />
        );
      case "simple_scrollable_image_grid":
        return (
          <SimpleGridScrollableImage
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
            showDescription={posts.every((post) => post.showDescription)}
          />
        );
      case "simple_two_grid":
        return (
          <SimpleTwoGrid
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showDescription={posts.every((post) => post.showDescription)}
          />
        );
      case "two_image_grid":
        return (
          <TwoImageGrid
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
            showDescription={posts.every((post) => post.showDescription)}
          />
        );
      case "two_grid":
        return (
          <TwoGrid
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
          />
        );
      case "three_grid":
        return (
          <ThreeGrid
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
          />
        );
      default:
        return (
          <SimpleGrid
            posts={posts}
            showAuthor={posts.every((post) => post.showAuthor)}
            showTags={posts.every((post) => post.showTags)}
            showDescription={posts.every((post) => post.showDescription)}
          />
        );
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-3">
        {collections.slice(0, 1).map((collection) => (
          <div key={collection.id} className="mt-14 first:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
              {collection.name}
            </h1>
            <div
              className={cn(
                (collection.displayType === "simple_scrollable_grid" ||
                  collection.displayType === "simple_scrollable_grid") &&
                  "-mt-8"
              )}
            >
              {getListType(collection.displayType, collection.posts)}
            </div>
          </div>
        ))}
        {/* Categories */}
        <Categories />
        {collections.slice(1, collections.length).map((collection) => (
          <div key={collection.id} className="mt-14 first:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
              {collection.name}
            </h1>
            <div
              className={cn(
                (collection.displayType === "simple_scrollable_grid" ||
                  collection.displayType === "simple_scrollable_grid") &&
                  "-mt-8"
              )}
            >
              {getListType(collection.displayType, collection.posts)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
