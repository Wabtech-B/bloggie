"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Links from "./links";
import Tooltip from "@/components/tooltip";

const Sidebar = () => {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      className={cn(
        "fixed z-[99] w-[250px] left-0 h-screen top-0 p-4 border-r border-r-border hidden lg:block transition-a",
        isDesktop && isCollapsed && "!w-[60px] !p-0",
        !isCollapsed && "overflow-y-auto"
      )}
    >
      <div
        className={cn(
          "absolute top-7 right-2 z-[99]  cursor-pointer",
          isCollapsed && isDesktop && "top-12 right-4"
        )}
        onClick={toggleCollapse}
      >
        <Tooltip
          text={isCollapsed ? "Expand" : "Collapse"}
          position={isCollapsed ? "right" : "left"}
        >
          <div className="w-8 h-8 rounded-full flex-center-center bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-900">
            <span className={cn("transition-a", isCollapsed && "rotate-180")}>
              <ChevronLeft className="w-5 h-5 text-brand" />
            </span>
          </div>
        </Tooltip>
      </div>
      {/* Logo */}
      <Link
        href="/admin"
        className="hidden lg:block !opacity-100 text-center pr-3"
      >
        <div className="flex-align-center gap-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1
            className={cn(
              "text-2xl font-semibold",
              isCollapsed && isDesktop && "hidden"
            )}
          >
            Bloggie
          </h1>
        </div>
      </Link>

      <div className="mt-1">
        <Links />
      </div>
    </div>
  );
};

export default Sidebar;
