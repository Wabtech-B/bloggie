"use client";

import Drawer from "@/components/drawer";
import ModeToggle from "@/components/mode-toggle";
import ProfileDropdown from "@/components/profile-dropdown";
import { useDrawer } from "@/hooks/useDrawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Links from "./links";

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isCollapsed } = useSidebar();
  const { closeDrawer, openDrawer, isDrawerOpen } = useDrawer();

  return (
    <header
      className={cn(
        "fixed left-0 top-0 py-2 bg-background z-20 ml-0 lg:ml-[250px] transition-a w-full lg:w-[calc(100%-250px)]",
        isCollapsed && isDesktop && "!ml-0 !w-full"
      )}
    >
      <nav className="flex-center-between lg:justify-end px-2">
        <div className="lg:hidden">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              className="mx-auto object-contain"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="flex-align-center">
          <ProfileDropdown />
          <div className="flex-align-center ml-2">
            <div className="hidden md:block">
              <ModeToggle />
            </div>
            <div className="lg:hidden">
              <button
                className="ml-2 w-10 h-10 flex-center-center border shadow-sm rounded-lg lg:hidden"
                onClick={openDrawer}
              >
                <MenuIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} size="small">
          <Links />
        </Drawer>
      </div>
    </header>
  );
};

export default Navbar;
