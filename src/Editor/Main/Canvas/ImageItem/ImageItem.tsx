import { useCurrentImageService } from "@/Editor/Main/Canvas/ImageItem/useCurrentImageService";
import type { FC } from "react";

export const ImageItem: FC = () => {
  const imageState = useCurrentImageService();

  if (!imageState) return null;

  const { url, width, height } = imageState;
  return <img src={url} crossOrigin="anonymous" alt="" width={width} height={height} />;
};
