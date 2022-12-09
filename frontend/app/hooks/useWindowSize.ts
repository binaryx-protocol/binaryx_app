import {useState, useEffect} from "react";

export enum ScreenSizes {
  xs = 480,
  sm = 768,
  md = 1024,
  lg = 1200
}

interface ScreenSizeInterface {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
}

export const useWindowSize = (): ScreenSizeInterface => {
  const [windowSize, setWindowSize] = useState(0);
  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return {
    xs: windowSize < ScreenSizes.xs,
    sm: windowSize < ScreenSizes.sm && windowSize > ScreenSizes.xs,
    md: windowSize < ScreenSizes.md && windowSize > ScreenSizes.sm,
    lg: windowSize < ScreenSizes.lg && windowSize > ScreenSizes.md,
  };
}
