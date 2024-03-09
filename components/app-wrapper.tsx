"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import useSidebar from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      className={cn(
        "pt-20 grid grid-cols-1 lg:grid-cols-250-auto transition-a",
        isCollapsed && isDesktop && "lg:grid-cols-60-auto"
      )}
    >
      {children}
    </div>
  );
};

export default AppWrapper;
