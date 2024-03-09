import Scrollable from "@/components/scrollable";
import { TTPost } from "@/types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CardTwo from "./post-cards/card-two";

interface SimpleGridScrollableImageProps {
  posts: TTPost[];
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
}

const SimpleGridScrollableImage = ({
  posts,
  showAuthor,
  showTags,
  showDescription,
}: SimpleGridScrollableImageProps) => {
  return (
    <Scrollable
      rightControl={
        <button className="p-2 rounded-full bg-brand hover:bg-brand/80 text-white">
          <FiChevronRight />
        </button>
      }
      leftControl={
        <button className="p-2 rounded-full bg-brand hover:bg-brand/80 text-white">
          <FiChevronLeft />
        </button>
      }
      autoDisableControls
    >
      {posts.map((post) => (
        <CardTwo
          post={post}
          key={post.id}
          showAuthor={showAuthor}
          showTags={showTags}
          showDescription={showDescription}
          width="w-[400px]"
        />
      ))}
    </Scrollable>
  );
};

export default SimpleGridScrollableImage;
