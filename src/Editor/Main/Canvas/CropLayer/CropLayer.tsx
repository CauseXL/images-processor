import { cropData } from "@/core/data/cropData";
import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import type { CSSProperties, FC } from "react";
import { memo, useEffect, useMemo } from "react";
import { Cropper } from "./Cropper/Cropper";

// * --------------------------------------------------------------------------- comp

// TODO: 裁切层的数据初始化还需要设计一下 // XuYuCheng 2021/08/17
// TODO: 用函数来作数据转换 // XuYuCheng 2021/08/17
// TODO: 在这个位置收敛 crop 的 width height 信息（使用 container 替代频繁地注入 originWidth originHeight） // XuYuCheng 2021/08/17
export const CropLayer: FC<{ style?: CSSProperties }> = memo(({ style }) => {
  const currImage = useValue(getCurrentImage);

  useEffect(() => {
    const { width, height } = currImage;

    cropData.set({
      ...currImage.crop,
      originWidth: width,
      originHeight: height,
      aspectRatio: width / height,
      rotate: currImage.crop.rotate ?? 0,
    });
  }, [currImage]);

  return useMemo(() => <Cropper />, [style]);
});
