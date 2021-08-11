import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { updateCurrentImageCropInfo } from "@/logic/action/currentImage";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import type { CSSProperties, FC } from "react";
import { memo, useEffect, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";
import { Cropper } from "./Cropper/Cropper";

// * --------------------------------------------------------------------------- comp

export const CropLayer: FC<{ style?: CSSProperties }> = memo(({ style }) => {
  const currImage = useValue(getCurrentImage);
  const cropStore = useValue(getCropData);

  // init when mount
  useEffect(() => {
    rafBatch(() => {
      const { width: originWidth, height: originHeight } = currImage.origin;
      cropData.set({ ...currImage.crop, originWidth, originHeight });
    }).then();
    // eslint-disable-next-line
  }, []);

  // sync when unmount
  useEffect(() => {
    return () => {
      const { width, height, x, y, flip } = cropStore;
      updateCurrentImageCropInfo({ width, height, x, y, flip });
    };
  }, [cropStore]);

  return useMemo(
    () => (
      <div className={tw`m-auto my-24 w-full h-full`} style={{ ...style }}>
        <Cropper />
      </div>
    ),
    [style],
  );
});
