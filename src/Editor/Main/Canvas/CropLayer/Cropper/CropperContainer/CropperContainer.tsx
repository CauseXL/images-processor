import { WRAPPER_PADDING } from "@/constant";
import { store, useValue } from "@/core/utils";
import { useScale } from "@/Editor/Main/logic/scale";
import { getCropData } from "@/logic/get/cropData";
import { getTureCropSize } from "@/utils/getTureCropSize";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo, useRef } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- state

interface CropperContainerType {
  width: number;
  height: number;
}
// TODO: 这个应该没用了 // XuYuCheng 2021/08/11
export const cropperContainer = store<CropperContainerType>({ width: 0, height: 0 });
export const getCropperContainer = () => cropperContainer.get();

// * --------------------------------------------------------------------------- serv

export const useCropperContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cropInfo = useValue(getCropData);
  const { width, height } = getTureCropSize(cropInfo);
  const scale = useScale();

  const wrapperStyle = {
    width: width * scale + WRAPPER_PADDING * 2,
    height: height * scale + WRAPPER_PADDING * 6,
  };

  return { containerRef, wrapperStyle };
};

// * --------------------------------------------------------------------------- comp

// TODO: 宽度超出视窗，调整 scroll 使之居中 // XuYuCheng 2021/08/13
export const CropperContainer: FC = memo(({ children }) => {
  const { containerRef, wrapperStyle } = useCropperContainer();
  return useMemo(
    () => (
      <div ref={containerRef} className={cx("cropper-container", tw`w-full h-full overflow-auto relative`, container)}>
        <div className={cx("cropper-wrapper", tw`m-auto`, wrapper)} style={wrapperStyle}>
          <div className={tw`relative w-full h-full select-none`}>{children}</div>
        </div>
      </div>
    ),
    [children, containerRef, wrapperStyle],
  );
});

// * --------------------------------------------------------------------------- style

const container = css`
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

const wrapper = css`
  padding: ${WRAPPER_PADDING}px;
  padding-top: ${WRAPPER_PADDING * 3}px;
  padding-bottom: ${WRAPPER_PADDING * 3}px;
`;
