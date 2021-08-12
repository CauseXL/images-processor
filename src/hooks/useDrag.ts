import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { waterfallSize } from "../Editor/RightSidebar/size";
import { useRafState } from "./useRafState";
import { useWaterFall } from "./useWaterFall";
import { off, on } from "./util";

const log = console.log.bind(console);

interface IDragProps<T> {
  list: T[];
  minWidth: number;
  maxWidth: number;
  screenWidth: number;
}
export interface ISize {
  width: number;
  height: number;
}

export const useDrag = <T extends ISize>({ list, minWidth, maxWidth, screenWidth }: IDragProps<T>) => {
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useRafState<number>(minWidth || 0);

  const [x, setX] = useRafState(0);
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

  const widthSet = useCallback(
    (w: number, x: number) => {
      if (w > maxWidth) {
        setWidth(maxWidth);
        const maxOffset = screenWidth - maxWidth;
        setX(maxOffset);
      } else if (w < minWidth) {
        setWidth(minWidth);
        const minOffset = screenWidth - minWidth;
        setX(minOffset);
      } else {
        setWidth(w);
        setX(x);
      }
    },
    [screenWidth, maxWidth, minWidth, setWidth, setX],
  );

  const onDown = useCallback(
    (e: MouseEvent) => {
      const newX = e.clientX;
      setX(newX);
      setEnableDrag(true);
      log("down", x, width);
    },
    [x, setX, width],
  );

  const onMove = useCallback(
    (e: MouseEvent) => {
      const newX = e.clientX;
      const offset = x - newX;
      const w = width + offset;
      widthSet(w, newX);
      calc();
    },
    [width, x, widthSet, calc],
  );

  const onUp = useCallback(
    (e: MouseEvent) => {
      setEnableDrag(false);
      const newX = e.clientX;
      const offset = x - newX;
      const w = width + offset;
      widthSet(w, newX);
      log("up", offset, width);
      calc();
    },
    [width, x, widthSet, calc],
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
      on(document, "mousemove", onMove);
      on(document, "mouseup", onUp);
    } else {
      off(document, "mousemove", onMove);
      off(document, "mouseup", onUp);
    }
    return () => {
      off(document, "mousemove", onMove);
      off(document, "mouseup", onUp);
    };
  }, [enableDrag, onMove, onUp]);

  return { barRef, contentRef, width, positionList };
};
