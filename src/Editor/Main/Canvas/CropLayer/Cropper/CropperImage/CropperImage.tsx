import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";
import { useCropperImage } from "./useCropperImage";

// * --------------------------------------------------------------------------- comp

export const CropperImage: FC = memo(() => {
  const { url, onLoad, imgStyle, imgWrapperStyle } = useCropperImage();

  return useMemo(() => {
    return (
      <div className={cx("cropper-canvas", tw`absolute`, canvas)} style={imgWrapperStyle}>
        <img alt="" src={url} onLoad={onLoad} style={imgStyle} className={cx(image)} />
        <div className={cx(tw`absolute inset-0`, skin)} />
      </div>
    );
  }, [url, onLoad, imgStyle, imgWrapperStyle]);
});

// * --------------------------------------------------------------------------- style

const canvas = css`
  background-color: transparent;
`;

const skin = css`
  background-color: rgba(255, 255, 255, 0.5);
`;

const image = css`
  display: block;
  image-orientation: 0deg;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
`;
