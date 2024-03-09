import { TTPost } from "@/types";
import CardThree from "./post-cards/card-three";

interface SimpleTwoGridProps {
  posts: TTPost[];
  showAuthor: boolean;
  showDescription: boolean;
}

const SimpleTwoGrid = ({
  posts,
  showAuthor,
  showDescription,
}: SimpleTwoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <CardThree
          post={post}
          key={post.id}
          showAuthor={showAuthor}
          showDescription={showDescription}
          height="h-[50px] sm:h-full"
        />
      ))}
    </div>
  );
};

export default SimpleTwoGrid;
