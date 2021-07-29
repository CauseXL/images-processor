import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { waterfallSize } from "../Editor/RightSidebar/size";
import { useRafState } from "./useRafState";
import { useWaterFall } from "./useWaterFall";

const log = console.log.bind(console);

export const useDrag = ({ list, minWidth }: { list: any; minWidth: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // const [width, setWidth] = useState<number>(minWidth || 0);
  const [width, setWidth] = useRafState<number>(minWidth || 0);

  // const [start, setStart] = useState(0);
  const [start, setStart] = useRafState(0);
  const [enableDrag, setEnableDrag] = useState(false);

  const { positionList, calc } = useWaterFall({
    list: list,
    containerWidth: width,
    width: waterfallSize.width,
    gap: waterfallSize.gap,
    subNodeHeight: waterfallSize.nameHeightWithMargin,
  });

  useEffect(() => {
    calc();
  }, [calc]);

  const onDown = useCallback(
    (e: MouseEvent) => {
      const moveX = e.clientX;
      setStart(moveX);
      setEnableDrag(true);
      log("down", start, width);
    },
    // [start, width],
    [start, width, setStart],
  );

  const onMove = useCallback(
    (e: MouseEvent) => {
      const move = e.clientX;
      const offset = start - move;
      const w = width + offset;
      setWidth(w);
      setStart(e.clientX);
      calc();
    },
    // [start, width, calc],
    [start, width, calc, setStart, setWidth],
  );

  const onUp = useCallback(
    (e: MouseEvent) => {
      setEnableDrag(false);
      const moveX = e.clientX;
      const offset = start - moveX;
      const w = width + offset;
      if (w < minWidth) {
        setWidth(minWidth);
      } else {
        setWidth(w);
      }
      setStart(moveX);
      log("up", start, width);
      calc();
    },
    // [start, width, minWidth, calc],
    [start, width, minWidth, calc, setStart, setWidth],
  );

  useLayoutEffect(() => {
    document.body.style.cursor = enableDrag ? "ew-resize" : "auto";
  }, [enableDrag]);

  useLayoutEffect(() => {
    if (barRef.current) {
      barRef.current.onmousedown = onDown;
    }
  }, [onDown]);

  useLayoutEffect(() => {
    if (enableDrag) {
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    } else {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [enableDrag, onMove, onUp]);

  return { barRef, contentRef, width, positionList };
};
