import {useState, useEffect} from "react";
import debounce from 'lodash.debounce'

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
    const debounceResize = debounce(() => {
      setWindowSize(window.innerWidth);
    }, 100);
    window.addEventListener("resize", debounceResize);
    debounceResize();
    return () => window.removeEventListener("resize", debounceResize);
  }, []);
  return {
    xs: windowSize < ScreenSizes.xs,
    sm: windowSize < ScreenSizes.sm && windowSize > ScreenSizes.xs,
    md: windowSize < ScreenSizes.md && windowSize > ScreenSizes.sm,
    lg: windowSize < ScreenSizes.lg && windowSize > ScreenSizes.md,
  };
}
