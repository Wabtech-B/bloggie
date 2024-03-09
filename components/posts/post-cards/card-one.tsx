import Avatar from "@/components/avatar";
import Badge from "@/components/badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import { TTPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CardOneProps {
  post: TTPost;
  showAuthor: boolean;
  showTags: boolean;
  showDescription: boolean;
  width?: string;
}

const CardOne = ({
  post,
  showAuthor,
  showTags,
  showDescription,
  width,
}: CardOneProps) => {
  return (
    <Link
      href={`/${post.slug}`}
      className={cn("block group p-2 border rounded-lg shrink-0", width)}
      title={post.title}
    >
      <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
        />
        {showTags && (
          <div className="absolute bottom-2 p-1 flex-align-center gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Badge label={tag} key={tag} />
            ))}
          </div>
        )}
      </div>
      <div className="p-2 mt-2">
        <div className="flex-align-center">
          <div className="shrink-0">
            <Badge
              label={post.category.name}
              className="!bg-brand !text-slate-100"
            />
          </div>
          <span className="text-sm text-muted-foreground ml-2">
            {formatRelativeTime(post.datePublished)}
          </span>
        </div>
        <h1 className="text-lg md:text-xl group-hover:text-brand transition-colors capitalize mt-4 line-clamp-2">
          {post.title}
        </h1>
        {showDescription && (
          <div className="my-2">
            <p className="line-clamp-2">{post.description}</p>
          </div>
        )}

        {showAuthor && (
          <div className="flex-align-center gap-x-2">
            <div className="shrink-0">
              {post.author.image ? (
                <Avatar src={post.author.image} size="small" />
              ) : (
                <Avatar size="small" />
              )}
            </div>
            <div>
              <h1>{post.author.name}</h1>
              <p className="text-sm">Author</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CardOne;
