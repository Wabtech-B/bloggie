"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsGrid } from "react-icons/bs";

interface BreadcrumbProps {
  separator: string | React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ separator }) => {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "admin");

  // Exclude UUIDs from the breadcrumb
  const excludePaths = (path: string) =>
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      path
    );
  const filteredPaths = pathSegments.filter(excludePaths);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="list-none flex-align-center flex-wrap">
        <li className="flex-align-center">
          <Link
            href="/admin"
            className="text-brand hover:underline flex-align-center px-2 py-[3px] rounded hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <BsGrid />
            <span className="ml-2">Dashboard</span>
          </Link>
          {filteredPaths.length > 0 && <span>{separator}</span>}
        </li>
        {filteredPaths.map((path, index) => {
          if (path !== "/") {
            return (
              <li key={index} className="flex-align-center">
                {index !== filteredPaths.length - 1 ? (
                  <>
                    <Link
                      href={`/admin/${filteredPaths
                        .slice(0, index + 1)
                        .join("/")}`}
                      className="text-brand hover:underline capitalize text-sm px-2 py-[3px] rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      {path.replace(/[-]+/g, " ")}
                    </Link>
                    <span>
                      {index < filteredPaths.length - 1 && (
                        <span>{separator}</span>
                      )}
                    </span>
                  </>
                ) : (
                  <div className="capitalize text-sm shrink-0">
                    {path.replace(/[-]+/g, " ")}
                  </div>
                )}
              </li>
            );
          }
          return null;
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
