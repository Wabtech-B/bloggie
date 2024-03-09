"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: "small" | "medium" | "large";
  openTrigger?: JSX.Element;
  children: React.ReactNode;
  className?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = "left",
  size = "medium",
  openTrigger,
  children,
  className,
}) => {
  const [isInternalOpen, setIsInternalOpen] = useState(false);

  const handleOpen = () => {
    setIsInternalOpen(true);
  };
  const handleClose = () => {
    setIsInternalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (openTrigger) {
          handleClose();
        } else {
          if (onClose) {
            onClose();
          }
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose, openTrigger]);

  const handleOverlayClick = () => {
    if (openTrigger) {
      handleClose();
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  const handleCloseButtonClick = () => {
    if (openTrigger) {
      handleClose();
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  const drawerDimensions = (() => {
    if (position === "left" || position === "right") {
      switch (size) {
        case "small":
          return "max-w-[250px] w-full h-screen overflow-y-auto";
        case "medium":
          return "max-w-[320px] w-full h-screen overflow-y-auto";
        case "large":
          return "max-w-[600px] w-full h-screen overflow-y-auto";
        default:
          return "max-w-[320px] w-full h-screen overflow-y-auto";
      }
    } else if (position === "top" || position === "bottom") {
      switch (size) {
        case "small":
          return "w-full h-[150px]";
        case "medium":
          return "w-full h-[320px]";
        case "large":
          return "w-full h-[600px]";
        default:
          return "w-full h-[320px]";
      }
    }
  })();

  return (
    <>
      {/* Custom Trigger */}
      {openTrigger &&
        React.cloneElement(openTrigger as React.ReactElement, {
          onClick: () => handleOpen(),
        })}

      <div className="relative">
        <AnimatePresence>
          {(isOpen || isInternalOpen) && (
            <motion.div
              className="fixed top-0 left-0 w-screen h-screen z-[999] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleOverlayClick}
            >
              <motion.div
                className={cn(
                  "fixed bg-background shadow-lg px-4",
                  position === "left"
                    ? "left-0"
                    : position === "right"
                    ? "right-0"
                    : "",

                  position === "top"
                    ? "top-0"
                    : position === "bottom"
                    ? "bottom-0"
                    : "",
                  drawerDimensions,
                  className
                )}
                initial={{
                  x:
                    position === "left"
                      ? "-100%"
                      : position === "right"
                      ? "100%"
                      : 0,
                  y:
                    position === "top"
                      ? "-100%"
                      : position === "bottom"
                      ? "100%"
                      : 0,
                }}
                animate={{ x: 0, y: 0 }}
                exit={{
                  x:
                    position === "left"
                      ? "-100%"
                      : position === "right"
                      ? "100%"
                      : 0,
                  y:
                    position === "top"
                      ? "-100%"
                      : position === "bottom"
                      ? "100%"
                      : 0,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end p-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-600"
                    onClick={handleCloseButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div>{children}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Drawer;
