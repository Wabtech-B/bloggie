"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const filters = [
  {
    label: "All",
    filter: "all",
  },
  {
    label: "Published",
    filter: "published",
  },
  {
    label: "Drafts",
    filter: "draft",
  },
  {
    label: "Trash",
    filter: "trash",
  },
];

const PostFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clickedFilter = searchParams.get("filter") || "all";
  const pathname = usePathname();

  /**
   * Creates a query string with the given filter value.
   * @param {string} filter - The filter value to include in the query string.
   * @returns {string} The query string with the filter value.
   */
  const createQueryString = useCallback((filter: string) => {
    const params = new URLSearchParams();
    params.set("filter", filter);
    return params.toString();
  }, []);

  /**
   * Handles updating the url with the selected filter
   * @param {string} filter - The filter to be applied or removed.
   */
  const onClick = (filter: string) => {
    const currentFilters = clickedFilter.split(",");

    let updatedFilters;
    if (currentFilters.includes(filter)) {
      updatedFilters = currentFilters.filter((filter) => filter !== filter);
    } else {
      updatedFilters = [filter];
    }

    const updatedQueryString = createQueryString(filter);
    if (filter === "all") {
      router.push(`/admin/posts`, { scroll: false });
    } else {
      router.push(`${pathname}?${updatedQueryString}`, { scroll: false });
    }
  };

  return (
    <div className="flex-align-center gap-2 mb-5 overflow-auto hide-scrollbar">
      {filters.map((filter) => (
        <div
          key={filter.label}
          onClick={() => onClick(filter.filter)}
          className={cn(
            "px-3 py-1 cursor-pointer shrink-0 select-none",
            clickedFilter.includes(filter.filter) &&
              "border-b-2 border-b-brand text-brand"
          )}
        >
          {filter.label}
        </div>
      ))}
    </div>
  );
};

export default PostFilters;
