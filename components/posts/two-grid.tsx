import { TTPost } from "@/types";
import CardThree from "./post-cards/card-three";
import CardTwo from "./post-cards/card-two";

interface TwoGridProps {
  posts: TTPost[];
  showAuthor: boolean;
  showTags: boolean;
}

const TwoGrid = ({ posts, showAuthor }: TwoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.slice(0, 1).map((post) => (
        <CardTwo
          post={post}
          key={post.id}
          showAuthor={showAuthor}
          showTags={false}
          showDescription={false}
          height={posts.length < 2 ? "h-[250px]" : "h-[300px] md:h-full"}
        />
      ))}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {posts.slice(1, posts.length).map((post) => (
          <CardThree
            post={post}
            key={post.id}
            showAuthor={false}
            showDescription={false}
            height="xl:h-[50px]"
          />
        ))}
      </div>
    </div>
  );
};

export default TwoGrid;
