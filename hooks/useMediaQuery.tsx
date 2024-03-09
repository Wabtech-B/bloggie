/* This hook is useful in scenarios where you want to know the current device dimension/size e.g desktop, tablet, mobile.
You could then apply different conditions depending on the screen size/dimension

// Usage:
const isDesktop = useMediaQuery('(max-width: 1024px)');
const isMobile = useMediaQuery('(max-width: 600px)');

if(isDesktop && isMobile) -> Do something

*/

"use client";

import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;
