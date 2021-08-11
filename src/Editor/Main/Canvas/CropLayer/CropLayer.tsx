import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { updateCurrentImageCropInfo } from "@/logic/action/currentImage";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import type { CSSProperties, FC } from "react";
import { useEffect } from "react";
// @ts-ignore
import { tw } from "twind";
import { Cropper } from "./Cropper/Cropper";

// * --------------------------------------------------------------------------- comp

export const CropLayer: FC<{ style?: CSSProperties }> = ({ style }) => {
  const cropInfo = useValue(getCurrentImage).crop;
  const cropStore = useValue(getCropData);

  useEffect(() => {
    // init
    rafBatch(() => {
      cropData.set(cropInfo);
    }).then();
    // sync
    return () => {
      cropStore && updateCurrentImageCropInfo(cropStore);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={tw`m-auto my-24 w-full h-full`} style={{ ...style }}>
      <Cropper />
    </div>
  );
};
