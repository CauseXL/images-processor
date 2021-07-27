import { useRafState } from "@/hooks/useRafState";
import { off, on } from "@/hooks/util";
import { RefObject, useEffect } from "react";

export const useScroll = (ref: RefObject<HTMLElement>) => {
  if (typeof ref !== "object" || typeof ref.current === "undefined") {
    // eslint-disable-next-line no-console
    console.error("`useScroll` expects a single ref argument.");
  }

  const [state, setState] = useRafState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      on(ref.current, "scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        off(ref.current, "scroll", handler);
      }
    };
  }, [ref]);

  const setScroll = ({ scrollX, scrollY }: { scrollX?: number; scrollY?: number }) => {
    if (ref.current) {
      if (scrollX) ref.current.scrollLeft = scrollX;
      if (scrollY) ref.current.scrollTop = scrollY;
    }
  };

  return {
    scrollX: state.x,
    scrollY: state.y,
    setScroll,
  };
};
