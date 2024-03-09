"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  separator: string | React.ReactNode;
}

const HomeBreadcrumbs: React.FC<BreadcrumbProps> = ({ separator }) => {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter(
      (segment) =>
        segment !== "" &&
        !segment.startsWith("categories") &&
        !segment.startsWith("tags")
    );

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
            href="/"
            className="text-brand hover:underline flex-align-center px-2 py-[3px] rounded hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <Home className="w-4 h-4" />
            <span className="ml-2">Home</span>
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
                      href={`/${filteredPaths.slice(0, index + 1).join("/")}`}
                      className="text-brand hover:underline capitalize text-sm px-2 py-[3px] rounded hover:bg-gray-100 dark:hover:bg-gray-900"
                    >
                      {decodeURI(path.replace(/[-]+/g, " "))}
                    </Link>
                    <span>
                      {index < filteredPaths.length - 1 && (
                        <span>{separator}</span>
                      )}
                    </span>
                  </>
                ) : (
                  <div className="capitalize text-sm shrink-0 ml-2">
                    {path.length > 30
                      ? `${decodeURI(path.replace(/[-]+/g, " ")).slice(
                          0,
                          30
                        )}...`
                      : decodeURI(path.replace(/[-]+/g, " "))}
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

export default HomeBreadcrumbs;
