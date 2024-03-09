import CardThree from "@/components/posts/post-cards/card-three";
import { TTPost } from "@/types";

interface RelatedPostsProps {
  posts: TTPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <>
      {posts.length > 0 && (
        <div>
          <h1 className="text-2xl font-bold">Related Posts</h1>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
            {posts.map((post) => (
              <CardThree
                post={post}
                key={post.id}
                showAuthor={false}
                showDescription={false}
                height="h-[50px] sm:h-full"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedPosts;
