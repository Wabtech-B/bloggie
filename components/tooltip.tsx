"use client";

import React, { ReactNode, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

interface TooltipProps {
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, position, text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const ref = useRef();

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const getPostion = () => {
    switch (position) {
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
        break;
      case "top":
        return "bottom-full mb-4 left-1/2 -translate-x-1/2";
        break;
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
        break;
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
        break;

      default:
        return "bottom-full mb-4 left-1/2 -translate-x-1/2";
        break;
    }
  };

  return (
    <>
      <div className="relative inline-block">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        <CSSTransition
          in={isTooltipVisible}
          timeout={1000}
          classNames="tooltip"
          unmountOnExit
          nodeRef={ref}
        >
          <div
            className={`
            absolute px-2 py-1 bg-background border border-border dark:text-gray-200 text-sm rounded-md opacity-100 transition-opacity duration-300 pointer-events-auto whitespace-nowrap ${getPostion()}
             z-[10]
            `}
          >
            {text}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default Tooltip;
