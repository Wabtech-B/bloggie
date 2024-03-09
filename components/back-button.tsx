"use client";

import { FiChevronUp } from "react-icons/fi";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
      });
    };
  }, []);

  return (
    <button
      className={cn(
        "fixed bottom-0 right-0 grid mb-4 mr-4 z-[999] cursor-default sm:cursor-pointer rounded-full shadow w-9 h-9 place-items-center bg-brand shadow-brand/60 text-white opacity-0 [visibility:hidden] transition-a",
        showButton && "opacity-100 [visibility:visible]"
      )}
      onClick={() => window.scrollTo(0, 0)}
    >
      <FiChevronUp />
    </button>
  );
};

export default BackToTopButton;
