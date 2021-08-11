import { useIsCropMod } from "@/Editor/LeftSideabr/ToolMenu/ToolMenu";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { useRef } from "react";
// @ts-ignore
import { tw } from "twind";
import { CropLayer } from "./CropLayer/CropLayer";
import { ImageItem } from "./ImageItem/ImageItem";

// * --------------------------------------------------------------------------- comp

export const Canvas: FC = () => {
  const isCropMod = useIsCropMod();
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={ref} className={cx("CENTER_CONTAINER", tw`w-full h-full overflow-auto`, center)}>
      {/* <CropLayer style={{ display: isCropMod ? undefined : "none" }} /> */}
      {/* <ImageItem style={{ display: isCropMod ? "none" : undefined }} /> */}
      {isCropMod ? <CropLayer /> : <ImageItem />}
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const center = css`
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
