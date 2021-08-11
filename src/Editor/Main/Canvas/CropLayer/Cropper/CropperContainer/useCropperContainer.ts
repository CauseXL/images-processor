import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import { useRef } from "react";

export const WRAPPER_PADDING = 30;

// * --------------------------------------------------------------------------- serv

export const useCropperContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    origin: { width, height },
  } = useValue(getCurrentImage);
  const wrapperStyle = {
    width: width + WRAPPER_PADDING * 2,
    height: height + WRAPPER_PADDING * 2,
  };

  return { containerRef, wrapperStyle };
};
