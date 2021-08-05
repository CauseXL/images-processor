import { useScroll } from "@/hooks/useScroll";
import { css } from "@emotion/react";
import type { FC, RefObject } from "react";
import { useMemo, useRef } from "react";
import tw from "twin.macro";
import { useScale } from "../logic/scale";
import { ImageItem } from "./ImageItem/ImageItem";
import { useCanvasService } from "./useCanvasService";

// * --------------------------------------------------------------------------- service

const useCanvas = (ref: RefObject<HTMLElement>) => {
  const { width, height } = useCanvasService();
  const scale = useScale();

  const containerStyle = useMemo(
    () => ({ width: ~~(width * scale), height: ~~(height * scale) }),
    [height, scale, width],
  );
  const canvasStyle = useMemo(
    () => ({ width, height, transform: `scale(${scale})`, transformOrigin: "0 0" }),
    [height, scale, width],
  );

  // * ---------------------------

  const { setScroll } = useScroll(ref);

  return { containerStyle, canvasStyle, setScroll };
};

// * --------------------------------------------------------------------------- comp

export const Canvas: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { containerStyle, canvasStyle } = useCanvas(ref);

  return (
    <div css={[tw`w-full h-full overflow-auto`, centerContainerStyle]} ref={ref} className="CENTER_CONTAINER">
      <div css={tw`flex min-w-full min-h-full`}>
        <div css={tw`flex-shrink-0 p-10 m-auto`}>
          <div css={[canvasContainerStyle, pageCheckerboardBgStyle]} style={containerStyle}>
            <div css={tw`relative w-full h-full overflow-hidden`} style={canvasStyle}>
              {/* <button onClick={() => setScroll({ scrollX: 200 })}>点击调整 scroll</button> */}
              <ImageItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const centerContainerStyle = css`
  overflow: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const canvasContainerStyle = css`
  box-sizing: content-box;
  border: 2px solid #54dec5;
`;

// * ---------------------------

const cbGray = `hsl(0, 0%, 80%)`;
const cbWhite = `hsl(0, 0%, 100%)`;
const cbSize = 10;

const pageCheckerboardBgStyle = css`
  background: linear-gradient(45deg, ${cbWhite} 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, ${cbWhite} 0), linear-gradient(45deg, ${cbWhite} 25%, transparent 0),
    linear-gradient(45deg, transparent 75%, ${cbWhite} 0), ${cbGray};
  background-position: 0 0, ${cbSize}px ${cbSize}px, ${cbSize}px ${cbSize}px, ${cbSize * 2}px ${cbSize * 2}px;
  background-size: ${cbSize * 2}px ${cbSize * 2}px;
`;
