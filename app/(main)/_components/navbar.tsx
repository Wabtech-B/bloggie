import React from "react";
import Logo from "./logo";
import SocialIcons from "./social-icons";
import MobileMenu from "./mobile-menu";
import Links from "./links";
import SearchInput from "./search-input";
import { getPostCategories } from "@/actions/home/categories";
import ModeToggle from "@/components/mode-toggle";

const Navbar = async () => {
  const categories = await getPostCategories();

  return (
    <header className="py-1 relative">
      <nav className="flex-center-between max-w-7xl px-2 mx-auto">
        {/* Logo */}
        <Logo />

        {/* Social Icons */}
        <div className="hidden md:block">
          <SocialIcons />
        </div>

        <div className="flex-align-center">
          {/* Theme Switcher */}
          <div className="ml-2">
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu categories={categories} />
          </div>
        </div>
      </nav>
      {/* Links and Serach */}
      <div className="flex-center-center bg-slate-100 mt-2 dark:bg-gray-900 py-2">
        <div className="hidden md:block ">
          <Links categories={categories} />
        </div>
        <div className="md:ml-6 w-full md:w-fit px-3 sm:px-6 md:px-0">
          <SearchInput />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
