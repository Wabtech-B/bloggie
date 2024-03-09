import { TTPost } from "@/types";
import CardOne from "./post-cards/card-one";

interface SimpleGridProps {
  posts: TTPost[];
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
}

const SimpleGrid = ({
  posts,
  showAuthor,
  showTags,
  showDescription,
}: SimpleGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
      {posts.map((post) => (
        <CardOne
          post={post}
          key={post.id}
          showAuthor={showAuthor}
          showTags={showTags}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
};

export default SimpleGrid;
