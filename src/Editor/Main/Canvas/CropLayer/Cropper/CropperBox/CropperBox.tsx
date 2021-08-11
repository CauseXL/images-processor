import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
// @ts-ignore
import { tw } from "twind";
import { CropperCenter } from "./CropperCenter/CropperCenter";
import { CropperCorner } from "./CropperCorner/CropperCorner";
import { CropperDashed } from "./CropperDashed/CropperDashed";
import { CropperDrag } from "./CropperDrag/CropperDrag";
import { CropperLine } from "./CropperLine/CropperLine";
import { CropperViewer } from "./CropperViewer/CropperViewer";

// * --------------------------------------------------------------------------- serv

const useCropBox = () => {
  const { crop, origin } = useValue(getCurrentImage);
  const { x: left, y: top } = crop;
  const { width, height } = origin;

  // return { width, height, left, top };
  // TODO: transform 会造成抖动，之后用 top/left 方案替代 // XuYuCheng 2021/08/11
  return { width, height, transform: `translateX(${left}px) translateY(${top}px)` };
};

// * --------------------------------------------------------------------------- comp

export const CropperBox: FC = () => {
  const cropperBoxStyle = useCropBox();
  return (
    <div className={cx("cropper-crop-box", tw`absolute`, cropBox)} style={cropperBoxStyle}>
      <CropperViewer />
      <CropperDashed />
      <CropperCenter />
      <CropperDrag />
      <CropperLine />
      <CropperCorner />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const cropBox = css`
  z-index: 1;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-transform: translateZ(0) scale(1, 1);
`;
