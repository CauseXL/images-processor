import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
// @ts-ignore
import { tw } from "twind";
import { CropperCenter } from "./CropperCenter/CropperCenter";
import { CropperCorner } from "./CropperCorner/CropperCorner";
import { CropperDashed } from "./CropperDashed/CropperDashed";
import { CropperDrag } from "./CropperDrag/CropperDrag";
import { CropperSides } from "./CropperSides/CropperSides";
import { CropperViewer } from "./CropperViewer/CropperViewer";

// * --------------------------------------------------------------------------- util

// * --------------------------------------------------------------------------- serv

const useCropperBox = () => {
  const { x: left, y: top, width, height } = useValue(getCropData);
  // return { width, height, left, top };
  // TODO: transform 会造成抖动，之后用 top/left 方案替代 // XuYuCheng 2021/08/11
  return { width, height, transform: `translateX(${left}px) translateY(${top}px)` };
};

// * --------------------------------------------------------------------------- comp

export const CropperBox: FC = () => {
  const cropperBoxStyle = useCropperBox();

  return (
    <div className={cx("cropper-crop-box", tw`absolute`, cropBox)} style={cropperBoxStyle}>
      <CropperViewer />
      <CropperDashed />
      <CropperCenter />
      <CropperDrag />
      <CropperSides />
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
