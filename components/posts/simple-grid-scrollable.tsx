import Scrollable from "@/components/scrollable";
import { TTPost } from "@/types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CardOne from "./post-cards/card-one";

interface SimpleGridScrollableProps {
  posts: TTPost[];
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
}

const SimpleGridScrollable = ({
  posts,
  showAuthor,
  showTags,
  showDescription,
}: SimpleGridScrollableProps) => {
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
        <CardOne
          post={post}
          key={post.id}
          showAuthor={showAuthor}
          showTags={showTags}
          showDescription={showDescription}
          width="w-[320px]"
        />
      ))}
    </Scrollable>
  );
};

export default SimpleGridScrollable;
