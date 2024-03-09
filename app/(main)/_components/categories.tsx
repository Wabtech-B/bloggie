import { getPostCategories } from "@/actions/categories";
import { getPostTags } from "@/actions/home/posts";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const categories: (Category & { _count: { posts: number } })[] =
    await getPostCategories("");
  const tags = await getPostTags();

  return (
    <>
      {categories.length > 0 && (
        <div className="py-10">
          <h1 className="text-2xl md:text-3xl text-center mb-4 font-bold">
            Explore By Categories & Tags
          </h1>
          <div className="bg-slate-50 dark:bg-gray-900 py-10 px-6 mt-4">
            <h1 className="text-xl md:text-2xl font-bold uppercase">
              categories
            </h1>
            <div className="flex-align-center gap-2 flex-wrap mt-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.name}`}
                  className="px-5 py-1 border bg-background shadow-sm rounded-lg hover:text-brand"
                >
                  {category.name} ({category._count.posts})
                </Link>
              ))}
            </div>
            <div className="mt-2">
              <Separator />
              <div className="mt-2">
                <h1 className="text-xl md:text-2xl font-bold uppercase">
                  tags
                </h1>
              </div>
              <div className="mt-3 flex-align-center gap-2 flex-wrap">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="px-5 py-1 border bg-background shadow-sm rounded-lg hover:text-brand"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
