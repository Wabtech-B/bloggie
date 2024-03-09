"use client";

import { cn } from "@/lib/utils";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface ScrollableProps {
  children: React.ReactNode;
  leftControl?: JSX.Element;
  rightControl?: JSX.Element;
  autoHideControls?: boolean;
  autoDisableControls?: boolean;
}

const Scrollable: React.FC<ScrollableProps> = ({
  children,
  leftControl,
  rightControl,
  autoHideControls = false,
  autoDisableControls = false,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = listRef.current!.scrollLeft;
    setScrollPosition(position);
  };

  useEffect(() => {
    listRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      listRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNext = () => {
    listRef.current!.scrollLeft += 200;
  };

  const handleBack = () => {
    listRef.current!.scrollLeft -= 200;
  };
  return (
    <div>
      <div className="relative">
        {/* Custom Controls */}
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              autoHideControls && scrollPosition === 0 ? "hidden" : "block",
              autoDisableControls && scrollPosition === 0
                ? "opacity-50 pointer-events-none"
                : ""
            )}
          >
            {leftControl &&
              React.cloneElement(leftControl as React.ReactElement, {
                onClick: () => handleBack(),
              })}
          </div>
          <div
            className={cn(
              autoHideControls &&
                listRef.current &&
                scrollPosition + listRef.current.clientWidth ===
                  listRef.current.scrollWidth
                ? "hidden"
                : "block",
              autoDisableControls &&
                listRef.current &&
                scrollPosition + listRef.current.clientWidth ===
                  listRef.current.scrollWidth
                ? "opacity-50 pointer-events-none"
                : ""
            )}
          >
            {rightControl &&
              React.cloneElement(rightControl as React.ReactElement, {
                onClick: () => handleNext(),
              })}
          </div>
        </div>

        {/* Default Left Control */}
        {!leftControl && (
          <button
            className={`hidden ${
              scrollPosition === 0 ? "sm:hidden" : "sm:flex"
            } bg-gradient-to-r from-white dark:from-background via-white dark:via-background to-transparent h-full w-28 items-center justify-start  absolute left-0 top-1/2 -translate-y-1/2 z-20`}
            onClick={handleBack}
          >
            <div className="w-10 h-10 flex-center-center rounded-full bg-gray-900 text-brand">
              <BsChevronLeft className="text-xl" />
            </div>
          </button>
        )}

        {/* Scrollable Content */}
        <div
          className="flex p-2 space-x-4 overflow-x-auto hide-scrollbar scroll-smooth"
          ref={listRef}
        >
          {children}
        </div>

        {/* Default Right Control */}
        {!rightControl && (
          <button
            className={`hidden ${
              listRef.current &&
              scrollPosition + listRef.current.clientWidth ===
                listRef.current.scrollWidth
                ? "sm:hidden"
                : "sm:flex"
            } bg-gradient-to-l from-white dark:from-background via-white dark:via-background to-transparent h-full w-28  items-center justify-end absolute right-0 top-1/2 -translate-y-1/2 z-20`}
            onClick={handleNext}
          >
            <div className="w-10 h-10 flex-center-center rounded-full bg-gray-900 text-brand">
              <BsChevronRight className="text-xl" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Scrollable;
