import { useCallback, useEffect, useRef } from "react";

// 防抖
export const useDebounce = <T extends any[]>(
  fn: (...args: T) => void,
  ms = 0
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  return useCallback(
    (...args: T) => {
      timeout.current && clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        callback.current.apply(this, args);
      }, ms);
    },
    [ms]
  );
};
