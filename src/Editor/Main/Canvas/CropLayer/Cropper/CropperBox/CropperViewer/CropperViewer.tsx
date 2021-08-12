import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { getTransformStyle } from "@/utils/getTransformStyle";
import { getTureCropSize } from "@/utils/getTureCropSize";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React, { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- serv

const useCropperViewer = () => {
  const { url } = useValue(getCurrentImage).origin;
  const cropInfo = useValue(getCropData);
  const { width, height } = getTureCropSize(cropInfo);
  const { x, y, flip, rotate } = cropInfo;
  const [scaleX, scaleY] = flip;

  const imgStyle = {
    transformOrigin: `0 0`,
    transform: getTransformStyle({
      width,
      height,
      rotate,
      scaleX,
      scaleY,
      crop: { top: y, left: x },
    }),
  };

  return { url, imgStyle };
};

// * --------------------------------------------------------------------------- comp

export const CropperViewer: FC = memo(() => {
  const { url, imgStyle } = useCropperViewer();

  return useMemo(
    () => (
      <span className={cx(tw`block overflow-hidden w-full h-full`, imgWrapper)}>
        <img alt="" crossOrigin="anonymous" src={url} style={imgStyle} className={cx(image)} />
      </span>
    ),
    [url, imgStyle],
  );
});

// * --------------------------------------------------------------------------- style

const imgWrapper = css`
  outline: 2px solid #01d9e1;
`;

const image = css`
  display: block;
  image-orientation: 0deg;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
`;
