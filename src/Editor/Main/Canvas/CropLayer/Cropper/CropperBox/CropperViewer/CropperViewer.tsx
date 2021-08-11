import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- serv

const useCropperViewer = () => {
  const { url } = useValue(getCurrentImage);

  const imgStyle = {
    transformOrigin: `0 0`,
  };

  return { url, imgStyle };
};

// * --------------------------------------------------------------------------- comp

export const CropperViewer: FC = () => {
  const { url, imgStyle } = useCropperViewer();

  return (
    <span className={cx(tw`block overflow-hidden w-full h-full`, imgWrapper)}>
      <img alt="" crossOrigin="anonymous" src={url} style={imgStyle} className={cx(image)} />
    </span>
  );
};

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
