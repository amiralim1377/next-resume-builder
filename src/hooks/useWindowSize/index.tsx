import { useEffect, useState } from "react";

export function useWindowSize(debounceMs = 250) {
  const isClient = typeof window !== "undefined";

  const [size, setSize] = useState(() => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  }));

  useEffect(() => {
    if (!isClient) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceMs);
    };

    window.addEventListener("resize", handleResize);

    // Update immediately on mount
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceMs, isClient]);

  return size;
}
