import { sidebarLinks } from "@/constants/sidebarLinks";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useMediaQuery from "@/hooks/useMediaQuery";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Submenu from "./submenu";

const Links = () => {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<{
    sectionIndex: number;
    linkIndex: number;
  } | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isCollapsed } = useSidebar();
  const user = useCurrentUser();

  /**
   * Handles the click event on a sub-menu item.
   * @param {number} sectionIndex - The index of the section containing the sub-menu item.
   * @param {number} linkIndex - The index of the sub-menu item.
   * @returns None
   */
  const handleSubMenuClick = (sectionIndex: number, linkIndex: number) => {
    setOpenIndex((prevIndex) => {
      if (
        prevIndex === null ||
        prevIndex.sectionIndex !== sectionIndex ||
        prevIndex.linkIndex !== linkIndex
      ) {
        return { sectionIndex, linkIndex };
      } else {
        return null;
      }
    });
  };

  return (
    <div className={cn(isCollapsed && isDesktop && "mt-8")}>
      {sidebarLinks?.map(({ label, links }, sectionIndex) => (
        <div key={label}>
          <h5
            className={cn(
              "text-xs text-gray-400 mb-2 mt-4",
              isCollapsed && isDesktop && "hidden"
            )}
          >
            {label}
          </h5>
          {links?.map(({ linkText, icon, url, subLinks }, linkIndex) => {
            // Check if the link is related to users
            const isUserLink = linkText.toLowerCase().includes("user");

            // Check if the user is an admin
            const isAdmin = user.role === "ADMIN";

            // Do not render the link if it's related to users or notifications and the user is not an admin
            if (isUserLink && !isAdmin) {
              return null;
            }

            const isActive =
              pathname === url ||
              (pathname.startsWith(url || "") && url !== "/admin");
            return (
              <div key={linkText} className="relative group">
                {!subLinks ? (
                  <Link
                    href={url}
                    className={cn(
                      "px-2 py-3 flex-center-between gap-x-3",
                      isActive && "text-brand"
                    )}
                  >
                    <div className="flex-align-center gap-x-3">
                      <div className={cn(isCollapsed && isDesktop && "ml-2")}>
                        <span>{icon}</span>
                      </div>
                      <span
                        className={cn(
                          isCollapsed &&
                            isDesktop &&
                            "absolute z-[99] shadow-lg border opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto left-full bg-white dark:bg-gray-900 px-3 py-1 -mt-8 group-hover:mt-0 transition-a"
                        )}
                      >
                        {linkText}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <Submenu
                    linkText={linkText}
                    icon={icon}
                    subLinks={subLinks}
                    isOpen={
                      openIndex !== null &&
                      openIndex.sectionIndex === sectionIndex &&
                      openIndex.linkIndex === linkIndex
                    }
                    handleClick={() =>
                      handleSubMenuClick(sectionIndex, linkIndex)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Links;
