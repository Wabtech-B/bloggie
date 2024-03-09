import { getPost } from "@/actions/posts";
import Avatar from "@/components/avatar";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import GoBack from "@/components/goback";
import { formatRelativeTime } from "@/lib/utils";
import Image from "next/image";
hljs.configure({});

const Preview = async ({ params }: { params: { id: string } }) => {
  const post = await getPost(params.id);

  return (
    <div>
      <GoBack />
      <div className="mt-4">
        <div key={post!.id} className="p-2 border border-border rounded-lg">
          <div className="relative h-[200px] sm:h-[300px] w-full">
            <Image
              src={post!.coverImage}
              alt={post!.title}
              fill
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-5 sm:flex-align-center gap-x-3">
            <h1 className="text-3xl font-bold">{post!.title}</h1>

            <div className="mt-3 w-fit sm:mt-0 text-sm py-[3px] px-3 bg-brand/20 text-brand rounded-full">
              {post!.category.name}
            </div>
          </div>
          <div className="my-2 flex-align-center flex-wrap gap-x-2">
            {post!.tags.map((tag) => (
              <span
                key={tag}
                className="mt-3 sm:mt-0 text-sm py-[3px] px-3 bg-slate-100 dark:bg-slate-900 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex-align-center gap-x-2">
            <div>
              {post!.author.image ? (
                <Avatar src={post!.author.image} />
              ) : (
                <Avatar />
              )}
            </div>
            <div>
              <h1>{post!.author.name}</h1>
              <span className="text-sm text-muted-foreground">
                Posted {formatRelativeTime(post!.datePublished)}
              </span>
            </div>
          </div>

          <div className="mt-4 post-content">
            <div dangerouslySetInnerHTML={{ __html: post!.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
