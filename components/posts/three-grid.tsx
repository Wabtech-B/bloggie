import { TTPost } from "@/types";
import CardOne from "./post-cards/card-one";
import CardTwo from "./post-cards/card-two";

interface ThreeGridProps {
  posts: TTPost[];
  showAuthor: boolean;
  showTags: boolean;
}

const ThreeGrid = ({ posts, showAuthor, showTags }: ThreeGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-1 md:grid md:gap-4 lg:gap-0 grid-cols-2 lg:grid-cols-1">
        {posts.slice(0, 2).map((post) => (
          <div className="mt-4 md:mt-0 lg:mt-4 first:mt-0" key={post.id}>
            <CardOne
              post={post}
              showAuthor={false}
              showTags={showTags}
              showDescription={false}
            />
          </div>
        ))}
      </div>
      <div className="lg:col-span-2">
        {posts.slice(2, 3).map((post) => (
          <CardTwo
            post={post}
            key={post.id}
            showAuthor={showAuthor}
            showTags={showTags}
            showDescription={true}
            height={posts.length < 2 ? "h-[250px]" : "h-[300px] lg:h-full"}
          />
        ))}
      </div>
      <div className="lg:col-span-1 md:grid md:gap-4 lg:gap-0 grid-cols-2 lg:grid-cols-1">
        {posts.slice(3, 5).map((post) => (
          <div className="mt-4 md:mt-0 lg:mt-4 first:mt-0" key={post.id}>
            <CardOne
              post={post}
              showAuthor={false}
              showTags={showTags}
              showDescription={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeGrid;
