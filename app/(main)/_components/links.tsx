"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type Link = {
  id: string;
  linkText: string;
  url?: string;
  categories?: Link[];
};

const Links = ({
  className,
  categories,
}: {
  className?: string;
  categories: Category[];
}) => {
  const pathname = decodeURI(usePathname());
  const user = useCurrentUser();

  const formattedCategories = categories.map((category) => ({
    id: category.id,
    linkText: category.name,
    url: `/categories/${category.name}`,
  }));

  const links: Link[] = [
    {
      id: uuidv4(),
      linkText: "Home",
      url: "/",
    },
    ...formattedCategories.slice(0, 2),
    {
      id: uuidv4(),
      linkText: "All Categories",
      categories: formattedCategories,
    },
  ];

  if (user && (user.role === "ADMIN" || user.role === "AUTHOR")) {
    links.push({
      id: uuidv4(),
      linkText: "Dashboard",
      url: "/admin",
    });
  }

  return (
    <ul className={cn("flex-align-center space-x-6", className)}>
      {links.map((link) => {
        const isActive =
          pathname === link.url ||
          (pathname.startsWith(link.url!) && link.url !== "/");
        return (
          <React.Fragment key={link.id}>
            {link.linkText !== "All Categories" && (
              <li>
                <Link
                  href={link.url!}
                  className={cn(
                    "uppercase hover:text-brand transition-colors",
                    isActive && "text-brand border-brand"
                  )}
                >
                  {link.linkText}
                </Link>
              </li>
            )}
            {link.linkText === "All Categories" && (
              <li className="cursor-pointer relative group">
                <div
                  className={cn(
                    "flex-align-center uppercase",
                    isActive && "!text-brand"
                  )}
                >
                  {link.linkText}
                  <ChevronsUpDown className="h-4 w-4 ml-2 hidden md:block" />
                </div>
                <div className="md:absolute z-20 w-[300px] mt-2 md:mt-0 md:translate-y-4 md:opacity-0 md:[visibility:hidden] top-full left-1/2 md:-translate-x-1/2 dark:bg-gray-800 bg-white dark:md:bg-slate-900 border border-border p-4 rounded-lg group-hover:translate-y-0 group-hover:opacity-100 group-hover:[visibility:visible] transition-a">
                  <div
                    className={cn(
                      "flex flex-col gap-y-2",
                      categories?.length > 5 &&
                        "items-center flex-row gap-4 flex-wrap"
                    )}
                  >
                    {link?.categories?.map((category) => (
                      <Link
                        key={category.id}
                        href={category.url!}
                        className={cn(
                          "capitalize hover:text-brand transition-colors",
                          pathname === category.url && "text-brand border-brand"
                        )}
                      >
                        {category.linkText}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Links;
