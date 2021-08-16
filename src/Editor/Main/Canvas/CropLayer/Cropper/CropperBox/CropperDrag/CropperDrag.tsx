import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { useScale } from "@/Editor/Main/logic/scale";
import { useMove } from "@/hooks/useMove";
import { getCropData } from "@/logic/get/cropData";
import { getTureCropSize } from "@/utils/getTureCropSize";
import { cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- serv

export const useCropperDrag = () => {
  const cropInfo = useValue(getCropData);
  const { width, height } = getTureCropSize(cropInfo);
  const { width: cropWidth, height: cropHeight } = cropInfo;
  const scale = useScale();

  const maxLeft = width - cropWidth;
  const maxTop = height - cropHeight;

  const { moveProps } = useMove({
    onMove: ({ deltaX, deltaY }) => {
      const offsetX = deltaX / scale;
      const offsetY = deltaY / scale;
      rafBatch(() => {
        cropData.set((data) => {
          const [newTop, newLeft] = [data.y + offsetY, data.x + offsetX];
          const [resTop, resLeft] = [limitPos(newTop, maxTop), limitPos(newLeft, maxLeft)];
          data.y = resTop;
          data.x = resLeft;
        });
      }).then();
    },
  });

  return { moveProps };
};

// * --------------------------------------------------------------------------- comp

export const CropperDrag: FC = memo(() => {
  const { moveProps } = useCropperDrag();

  return useMemo(
    () => (
      <div {...moveProps} className={cx("cropper-face cropper-move", tw`absolute w-full h-full cursor-move inset-0`)} />
    ),
    [moveProps],
  );
});

// * --------------------------------------------------------------------------- util

const limitPos = (newVal: number, maxVal: number) => {
  if (newVal < 0) return 0;
  return newVal > maxVal ? maxVal : newVal;
};
