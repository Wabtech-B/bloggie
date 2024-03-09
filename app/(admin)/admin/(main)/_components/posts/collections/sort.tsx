"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Sort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /**
   * Creates a query string with the given sort parameter.
   * @param {string} sort - The sort parameter to include in the query string.
   * @returns {string} The generated query string.
   */
  const createQueryString = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams);
      if (sort !== "none") {
        params.set("sort", sort);
      } else {
        params.set("sort", "");
      }
      return params.toString();
    },
    [searchParams]
  );

  /**
   * Handles the change event of the sort dropdown and updates the URL query string
   * with the selected value.
   * @param {string} value - The selected value from the sort dropdown.
   */
  const handleSortChange = (value: string) => {
    const updatedQueryString = createQueryString(value);

    router.push(`${pathname}?${updatedQueryString}`, { scroll: false });
  };

  return (
    <div className="ml-2">
      <Select onValueChange={(value) => handleSortChange(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Sort By:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="popular">Popular (More Views)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
