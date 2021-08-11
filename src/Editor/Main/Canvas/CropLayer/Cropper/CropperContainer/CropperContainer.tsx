import { WRAPPER_PADDING } from "@/constant";
import { store, useValue } from "@/core/utils";
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

  const wrapperStyle = {
    width: width + WRAPPER_PADDING * 2,
    height: height + WRAPPER_PADDING * 2,
  };

  return { containerRef, wrapperStyle };
};

// * --------------------------------------------------------------------------- comp

export const CropperContainer: FC = memo(({ children }) => {
  const { containerRef, wrapperStyle } = useCropperContainer();
  return useMemo(
    () => (
      <div ref={containerRef} className={cx("cropper-container", tw`w-full h-full overflow-auto relative`)}>
        <div className={cx("cropper-wrapper", tw`m-auto`, wrapper)} style={wrapperStyle}>
          <div className={tw`relative w-full h-full select-none`}>{children}</div>
        </div>
      </div>
    ),
    [children, containerRef, wrapperStyle],
  );
});

// * --------------------------------------------------------------------------- style

const wrapper = css`
  padding: ${WRAPPER_PADDING}px;
`;
