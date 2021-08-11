import { store } from "@/core/utils";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";
import { useCropperContainer, WRAPPER_PADDING } from "./useCropperContainer";

// * --------------------------------------------------------------------------- state

interface CropperContainerType {
  width: number;
  height: number;
}
// TODO: 这个应该没用了 // XuYuCheng 2021/08/11
export const cropperContainer = store<CropperContainerType>({ width: 0, height: 0 });
export const getCropperContainer = () => cropperContainer.get();

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
  width: 1320px;
  height: 720px;
  padding: ${WRAPPER_PADDING}px;
`;
