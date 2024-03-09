"use client";

import { updatePostViews } from "@/actions/home/posts";
import Avatar from "@/components/avatar";
import Badge from "@/components/badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import { TTPost } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CardThreeProps {
  post: TTPost;
  showAuthor: boolean;
  showDescription: boolean;
  width?: string;
  height?: string;
}

const CardThree = ({
  post,
  showAuthor,
  showDescription,
  width,
  height,
}: CardThreeProps) => {
  return (
    <Link
      href={`/${post.slug}`}
      className={cn("group p-2 border rounded-lg shrink-0", width)}
      title={post.title}
      onClick={async () => await updatePostViews(post!.id)}
    >
      <div className="grid grid-cols-5">
        <div
          className={cn(
            "relative w-full h-[50px] sm:h-full rounded-lg overflow-hidden col-span-1",
            height && height
          )}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="col-span-4 ml-2">
          <h1 className="text-lg md:text-xl group-hover:text-brand transition-colors capitalize mb-2 line-clamp-1">
            {post.title}
          </h1>
          <div className="flex-align-center">
            <div className="shrink-0 mb-2">
              <Badge
                label={post.category.name}
                className="!bg-brand !text-slate-100"
              />
            </div>
            <span className="text-sm text-muted-foreground ml-2 shrink-0 flex-1 truncate">
              {formatRelativeTime(post.datePublished)}
            </span>
          </div>
          {showDescription && (
            <div className="my-2">
              <p className="line-clamp-2">{post.description}</p>
            </div>
          )}

          {showAuthor && (
            <div className="gap-x-2 hidden sm:flex-align-center">
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
      </div>
    </Link>
  );
};

export default CardThree;
