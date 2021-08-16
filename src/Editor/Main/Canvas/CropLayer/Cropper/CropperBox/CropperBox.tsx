import { useValue } from "@/core/utils";
import { useScale } from "@/Editor/Main/logic/scale";
import { getCropData } from "@/logic/get/cropData";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";
import { CropperCenter } from "./CropperCenter/CropperCenter";
import { CropperCorner } from "./CropperCorner/CropperCorner";
import { CropperDashed } from "./CropperDashed/CropperDashed";
import { CropperDrag } from "./CropperDrag/CropperDrag";
import { CropperSides } from "./CropperSides/CropperSides";
import { CropperViewer } from "./CropperViewer/CropperViewer";

// * --------------------------------------------------------------------------- serv

const useCropperBox = () => {
  const { x, y, width, height } = useValue(getCropData);
  const scale = useScale();

  // return { width, height, left, top };
  // TODO: transform 会造成边缘抖动，之后用 top/left 方案替代 // XuYuCheng 2021/08/11

  return {
    width: width * scale,
    height: height * scale,
    transform: `translateX(${x * scale}px) translateY(${y * scale}px)`,
  };
};

// * --------------------------------------------------------------------------- comp

export const CropperBox: FC = memo(() => {
  const cropperBoxStyle = useCropperBox();

  return useMemo(
    () => (
      <div className={cx("cropper-crop-box", tw`absolute`, cropBox)} style={cropperBoxStyle}>
        <CropperViewer />
        <CropperDashed />
        <CropperCenter />
        <CropperDrag />
        <CropperSides />
        <CropperCorner />
      </div>
    ),
    [cropperBoxStyle],
  );
});

// * --------------------------------------------------------------------------- style

const cropBox = css`
  z-index: 1;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-transform: translateZ(0) scale(1, 1);
`;
