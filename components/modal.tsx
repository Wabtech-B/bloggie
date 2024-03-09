"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  variant?: "small" | "medium" | "large" | "full" | "scrollable";
  title?: string;
  openTrigger?: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = "medium",
  title,
  openTrigger,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (isOpen || isInternalOpen) {
      document.querySelector("body")?.classList.add("modal");
    } else {
      document.querySelector("body")?.classList.remove("modal");
    }

    return () => document.querySelector("body")?.classList.remove("modal");
  }, [isInternalOpen, isOpen]);

  const modalSizeClass = (() => {
    switch (variant) {
      case "small":
        return "max-w-[300px]";
      case "medium":
        return "max-w-[600px]";
      case "large":
        return "max-w-[800px]";
      case "full":
        return "max-w-full h-full !w-full !rounded-none";
      case "scrollable":
        return "max-w-[600px] h-[85%] overflow-y-auto";
      default:
        return "max-w-[600px]";
    }
  })();

  return (
    <>
      {/* Custom Trigger */}
      {openTrigger &&
        React.cloneElement(openTrigger as React.ReactElement, {
          onClick: () => handleOpen(),
        })}
      <AnimatePresence>
        {(isOpen || isInternalOpen) && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <motion.div
              ref={modalRef}
              className={`bg-white dark:bg-background border border-border shadow rounded-lg ${modalSizeClass} mx-auto relative w-[98%]`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {title && (
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-b-zinc-300 dark:border-b-zinc-600">
                  <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-200">
                    {title}
                  </h2>
                  <button
                    className=" text-gray-500 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-600"
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
              )}
              {children}
              <button
                className={`absolute top-2 right-2 text-gray-500 dark:text-gray-200 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-600 ${
                  title ? "hidden" : ""
                }`}
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
                </svg>{" "}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
