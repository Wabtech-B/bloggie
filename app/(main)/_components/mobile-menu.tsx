"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Links from "./links";
import { Category } from "@prisma/client";

const MobileMenu = ({ categories }: { categories: Category[] }) => {
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    mobileWrapperRef.current!.style.height = isMobileMenuOpen ? "100vh" : "0px";

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <div ref={mobileMenuRef}>
      <div
        onClick={toggleMobileMenu}
        className="ml-1 w-9 h-9 shadow-sm flex-center-center border rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </div>
      <div
        ref={mobileWrapperRef}
        className="absolute z-20 w-full overflow-hidden h-0 top-full left-0 bg-slate-100 dark:bg-gray-900  transition-a"
      >
        <div
          ref={mobileNavRef}
          className="p-4 border border-border"
          onClick={closeMobileMenu}
        >
          <Links
            className="flex-col space-x-0 !items-start space-y-4"
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
