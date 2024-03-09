"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useDrawer } from "@/hooks/useDrawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

type SubLink = {
  linkText: string;
  url: string;
};

interface SubMenuProps {
  linkText: string;
  subLinks: SubLink[];
  isOpen: boolean;
  handleClick: () => void;
  icon: React.ReactNode;
}

const Submenu = ({
  linkText,
  subLinks,
  isOpen,
  handleClick,
  icon,
}: SubMenuProps) => {
  const submenuRef = useRef<HTMLUListElement>(null);
  const submenuWrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isCollapsed } = useSidebar();
  const user = useCurrentUser();
  const { closeDrawer } = useDrawer();

  /**
   * Updates the height of the submenu wrapper based on the current state of the submenu.
   */
  useEffect(() => {
    const linksHeight = submenuRef?.current?.getBoundingClientRect().height;
    if (isDesktop) {
      submenuWrapperRef!.current!.style!.height =
        isOpen && !isCollapsed ? linksHeight + "px" : "0px";
    } else {
      submenuWrapperRef!.current!.style!.height = isOpen
        ? linksHeight + "px"
        : "0px";
    }
  }, [isCollapsed, isDesktop, isOpen]);

  const isActive = subLinks.some(
    (subLink) =>
      pathname === subLink.url ||
      (pathname.startsWith(subLink.url || "") && subLink.url !== "/")
  );

  return (
    <>
      <div
        className={cn(
          "pl-2 py-3 flex-center-between gap-x-3 cursor-pointer group relative",
          isActive && "text-brand bg-inherit",
          isDesktop && isCollapsed && ""
        )}
        onClick={handleClick}
      >
        <div className="flex-align-center gap-x-3">
          <div className={cn(isCollapsed && isDesktop && "ml-2")}>
            <span>{icon}</span>
          </div>
          <span
            className={cn(
              isActive && "text-brand bg-inherit",
              isCollapsed && isDesktop && "hidden"
            )}
          >
            {linkText}
          </span>
        </div>
        <div>
          <FiChevronDown
            className={cn(
              "transition-a",
              isOpen && "rotate-180",
              isCollapsed && isDesktop && "hidden"
            )}
          />
        </div>
      </div>
      <div ref={submenuWrapperRef} className="transition-a overflow-hidden h-0">
        <ul
          className={cn(
            "pl-10",
            isCollapsed &&
              isDesktop &&
              "absolute z-[99] shadow-lg border left-full opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto bg-white dark:bg-gray-900 px-4 py-1 -mt-16 group-hover:-mt-8 transition-a w-[160px]"
          )}
          ref={submenuRef}
        >
          {isCollapsed && isDesktop && (
            <p className="mb-1 pb-1 border-b uppercase text-gray-900 dark:text-slate-100">
              {linkText}
            </p>
          )}
          {subLinks?.map(({ linkText, url }) => {
            const isExcludedLink = ["Categories", "Collections"].includes(
              linkText
            );

            // Check if the user is an admin
            const isAdmin = user?.role === "ADMIN";

            if (isExcludedLink && !isAdmin) {
              return null;
            }
            const isSubmenuActive = pathname === url;
            return (
              <li
                key={linkText}
                className={cn(
                  "relative text-muted-foreground hover:text-gray-900 dark:hover:text-slate-100  transition-a py-2 after:absolute after:w-2 after:h-2 after:border after:rounded-full after:-left-5 after:top-1/2 after:-translate-y-1/2 after:border-gray-700",
                  isSubmenuActive &&
                    "after:border-0 after:bg-brand !bg-inherit !text-brand",
                  isCollapsed && isDesktop && "after:-left-3"
                )}
                onClick={closeDrawer}
              >
                <Link href={url} className="block">
                  {linkText}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Submenu;
