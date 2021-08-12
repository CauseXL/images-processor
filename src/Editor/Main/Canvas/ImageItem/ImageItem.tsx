import { useValue } from "@/core/utils";
import { useIsToolActive } from "@/Editor/LeftSideabr/ToolMenu/ToolMenu";
import { getCurrentImage } from "@/logic/get/currentImage";
import { css } from "@emotion/css";
import type { CSSProperties, FC } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- comp

export const ImageItem: FC<{ style?: CSSProperties }> = ({ style }) => {
  const { width, height, url } = useValue(getCurrentImage);
  const isToolActive = useIsToolActive();

  const borderStyle = {
    border: isToolActive ? "2px solid #54dec5" : undefined,
    margin: isToolActive ? "-2px" : 0,
  };

  return (
    <div className={tw`flex min-w-full min-h-full`} style={style}>
      <div className={tw`flex-shrink-0 m-auto p-5`}>
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
