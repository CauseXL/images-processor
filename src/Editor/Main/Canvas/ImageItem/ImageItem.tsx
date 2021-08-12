import { useValue } from "@/core/utils";
import { useIsToolActive } from "@/Editor/LeftSideabr/ToolMenu/ToolMenu";
import { getCurrentImage } from "@/logic/get/currentImage";
import type { CSSProperties, FC } from "react";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

// TODO: 切换模式时会有抖动，可以用 display 来进行优化// XuYuCheng 2021/08/12
// TODO: 精简当前代码，直接使用当前的宽高和 url // XuYuCheng 2021/08/12
export const ImageItem: FC<{ style?: CSSProperties }> = ({ style }) => {
  const imageState = useValue(getCurrentImage);
  const isToolActive = useIsToolActive();

  const {
    origin: { width, height, url },
    crop: {
      width: cropWidth,
      height: cropHeight,
      x,
      y,
      flip: [scaleX, scaleY],
    },
  } = imageState;

  const imageWrapperStyle = {
    width: cropWidth,
    height: cropHeight,
    top: -y,
    left: -x,
  };

  const borderStyle = {
    border: isToolActive ? "2px solid #54dec5" : undefined,
    margin: isToolActive ? "-2px" : 0,
  };

  // TODO: separate logic demo // XuYuCheng 2021/08/10
  return (
    <div css={tw`flex min-w-full min-h-full`} style={style}>
      <div css={tw`flex-shrink-0 m-auto p-5`}>
        <div style={{ width: cropWidth, height: cropHeight, ...borderStyle, boxSizing: "content-box" }}>
          <div css={tw`relative origin-center w-full h-full overflow-hidden`}>
            <div style={{ ...imageWrapperStyle, transform: `scale(${scaleX}, ${scaleY})` }} css={tw`absolute`}>
              <img src={url} crossOrigin="anonymous" alt="" width={cropWidth} height={cropHeight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
