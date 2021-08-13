import { WRAPPER_PADDING } from "@/constant";
import { useValue } from "@/core/utils";
import { useIsToolActive } from "@/Editor/LeftSideabr/ToolMenu/ToolMenu";
import { getCurrentImage } from "@/logic/get/currentImage";
import { css, cx } from "@emotion/css";
import type { CSSProperties, FC } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- comp

// TODO: 宽度超出视窗，调整 scroll 使之居中 // XuYuCheng 2021/08/13
export const ImageItem: FC<{ style?: CSSProperties }> = ({ style }) => {
  const { width, height, url } = useValue(getCurrentImage);
  const isToolActive = useIsToolActive();

  const borderStyle = {
    border: isToolActive ? "2px solid #54dec5" : undefined,
    margin: isToolActive ? "-2px" : 0,
  };

  return (
    <div className={tw`flex min-w-full min-h-full relative`} style={style}>
      <div className={cx(tw`flex-shrink-0 m-auto`, padding)} style={{ paddingTop: "60px", width: "1120px" }}>
        <div style={{ width, height, ...borderStyle, boxSizing: "content-box" }}>
          <div className={tw`relative origin-center w-full h-full overflow-hidden`}>
            <div className={tw`absolute`} style={{ width, height }}>
              <img alt="" crossOrigin="anonymous" className={image} src={url} width={width} height={height} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const image = css`
  display: block;
  image-orientation: 0deg;
  max-height: none !important;
  max-width: none !important;
  min-height: 0 !important;
  min-width: 0 !important;
  width: 100%;
  height: 100%;
`;

const padding = css`
  &.m-auto {
    margin-top: 0;
  }
  padding: ${WRAPPER_PADDING}px;
  padding-top: ${WRAPPER_PADDING * 3}px;
  padding-bottom: ${WRAPPER_PADDING * 3}px;
`;
