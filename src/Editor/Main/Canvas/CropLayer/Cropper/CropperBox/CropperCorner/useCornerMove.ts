import { MIN_CROP_LENGTH } from "@/constant";
import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { useMove } from "@/hooks/useMove";
import { getCropData } from "@/logic/get/cropData";
import { limitSize } from "@/utils/limitSize";
import { CornerDirectionType } from "./CropperCorner";

// TODO: calculateLogic --> pureFunc // XuYuCheng 2021/08/11
export const useCornerMove = (direction: CornerDirectionType) => {
  const { width, height, y: top, x: left, originWidth, originHeight } = useValue(getCropData);

  const { moveProps } = useMove({
    onMove: ({ deltaX, deltaY }) => {
      rafBatch(() => {
        cropData.set((data) => {
          if (direction === "nw") {
            const [minLeft, minTop, minWidth, minHeight] = [0, 0, MIN_CROP_LENGTH, MIN_CROP_LENGTH];
            const [maxLeft, maxTop, maxWidth, maxHeight] = [
              left + width - MIN_CROP_LENGTH,
              top + height - MIN_CROP_LENGTH,
              left + width,
              top + height,
            ];
            const [newLeft, newTop, newWidth, newHeight] = [
              data.x + deltaX,
              data.y + deltaY,
              data.width - deltaX,
              data.height - deltaY,
            ];
            const [resLeft, resTop, resWidth, resHeight] = [
              limitSize(newLeft, minLeft, maxLeft),
              limitSize(newTop, minTop, maxTop),
              limitSize(newWidth, minWidth, maxWidth),
              limitSize(newHeight, minHeight, maxHeight),
            ];
            data.y = resTop;
            data.x = resLeft;
            data.width = resWidth;
            data.height = resHeight;
          }

          if (direction === "ne") {
            const [minTop, minWidth, minHeight] = [0, MIN_CROP_LENGTH, MIN_CROP_LENGTH];
            const [maxTop, maxWidth, maxHeight] = [top + height - MIN_CROP_LENGTH, originWidth - left, height + top];
            const [newTop, newWidth, newHeight] = [data.y + deltaY, data.width + deltaX, data.height - deltaY];
            const [resTop, resWidth, resHeight] = [
              limitSize(newTop, minTop, maxTop),
              limitSize(newWidth, minWidth, maxWidth),
              limitSize(newHeight, minHeight, maxHeight),
            ];
            data.y = resTop;
            data.width = resWidth;
            data.height = resHeight;
          }

          if (direction === "se") {
            const [minWidth, minHeight] = [MIN_CROP_LENGTH, MIN_CROP_LENGTH];
            const [maxWidth, maxHeight] = [originWidth - left, originHeight - top];
            const [newWidth, newHeight] = [data.width + deltaX, data.height + deltaY];
            const [resWidth, resHeight] = [
              limitSize(newWidth, minWidth, maxWidth),
              limitSize(newHeight, minHeight, maxHeight),
            ];
            data.width = resWidth;
            data.height = resHeight;
          }

          if (direction === "sw") {
            const [minLeft, minWidth, minHeight] = [0, MIN_CROP_LENGTH, MIN_CROP_LENGTH];
            const [maxLeft, maxWidth, maxHeight] = [left + width - MIN_CROP_LENGTH, left + width, originHeight - top];
            const [newLeft, newWidth, newHeight] = [data.x + deltaX, data.width - deltaX, data.height + deltaY];
            const [resLeft, resWidth, resHeight] = [
              limitSize(newLeft, minLeft, maxLeft),
              limitSize(newWidth, minWidth, maxWidth),
              limitSize(newHeight, minHeight, maxHeight),
            ];
            data.x = resLeft;
            data.width = resWidth;
            data.height = resHeight;
          }
        });
      }).then();
    },
  });

  return { moveProps };
};
