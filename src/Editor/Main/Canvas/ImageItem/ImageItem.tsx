import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import type { FC } from "react";

export const ImageItem: FC = () => {
  const { url, width, height } = useValue(getCurrentImage);

  return <img src={url} crossOrigin="anonymous" alt="" width={width} height={height} />;
};
