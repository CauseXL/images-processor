import { cropData } from "@/core/data/cropData";
import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import type { CSSProperties, FC } from "react";
import { memo, useEffect, useMemo } from "react";
import { Cropper } from "./Cropper/Cropper";

// * --------------------------------------------------------------------------- comp

export const CropLayer: FC<{ style?: CSSProperties }> = memo(({ style }) => {
  const currImage = useValue(getCurrentImage);

  useEffect(() => {
    const { width, height, origin } = currImage;
    const { width: originWidth, height: originHeight } = origin;
    cropData.set({ ...currImage.crop, originWidth, originHeight, aspectRatio: width / height });
  }, [currImage]);

  return useMemo(() => <Cropper />, [style]);
});
