import { TTPost } from "@/types";
import CardTwo from "./post-cards/card-two";

interface SimpleGridImageProps {
  posts: TTPost[];
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
}

const SimpleGridImage = ({
  posts,
  showAuthor,
  showTags,
  showDescription,
}: SimpleGridImageProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {posts.map((post) => (
        <CardTwo
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

export default SimpleGridImage;
