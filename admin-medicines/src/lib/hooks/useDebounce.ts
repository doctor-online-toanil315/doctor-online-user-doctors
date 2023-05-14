import { useEffect, useRef } from "react";

export const useDebounce = (
  callback: any,
  dependencies: any[],
  timeout: number
) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [...dependencies]);
};

export const useDebounceWithoutDependencies = (ms: number) => {
  const debounceRef = useRef<any>(null);
  const setDebounce = (callback: any) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      callback();
    }, ms);
  };

  return {
    debounceRef: debounceRef.current,
    setDebounce,
  };
};
