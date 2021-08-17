/* eslint-disable */
import { MIN_CROP_LENGTH as min, MIN_CROP_LENGTH } from "@/constant";
import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { useMove } from "@/hooks/useMove";
import { getCropData, useCropRatioLocked } from "@/logic/get/cropData";
import { limitSize } from "@/utils/limitSize";
import { CropperLineType } from "./CropperSides";

// TODO: calculateLogic --> pureFunc // XuYuCheng 2021/08/11
// TODO: 简化代码 // XuYuCheng 2021/08/16
export const useLineMove = (direction: CropperLineType) => {
  const [isLocked] = useCropRatioLocked();
  const { width: w, height: h, y: t, x: l, originWidth: W, originHeight: H } = useValue(getCropData);
  const r = W - w - l;
  const b = H - h - t;

  const { moveProps } = useMove({
    onMove: ({ deltaX, deltaY }) => {
      rafBatch(() => {
        cropData.set((data) => {
          if (!isLocked) {
            // * --------------------------------------------------------------------------- 自由状态

            if (direction === "left") {
              const [minLeft, minWidth] = [0, MIN_CROP_LENGTH];
              const [maxLeft, maxWidth] = [l + w - MIN_CROP_LENGTH, l + w];
              const [newLeft, newWidth] = [data.x + deltaX, data.width - deltaX];
              const [resLeft, resWidth] = [
                limitSize(newLeft, minLeft, maxLeft),
                limitSize(newWidth, minWidth, maxWidth),
              ];
              data.x = round(resLeft);
              data.width = round(resWidth);
            }

            if (direction === "top") {
              const [minTop, minHeight] = [0, MIN_CROP_LENGTH];
              const [maxTop, maxHeight] = [t + h - MIN_CROP_LENGTH, t + h];
              const [newTop, newHeight] = [data.y + deltaY, data.height - deltaY];
              const [resTop, resHeight] = [
                limitSize(newTop, minTop, maxTop),
                limitSize(newHeight, minHeight, maxHeight),
              ];
              data.y = round(resTop);
              data.height = round(resHeight);
            }

            if (direction === "right") {
              const minWidth = MIN_CROP_LENGTH;
              const maxWidth = W - l;
              const newWidth = data.width + deltaX;
              data.width = round(limitSize(newWidth, minWidth, maxWidth));
            }

            if (direction === "bottom") {
              const minHeight = MIN_CROP_LENGTH;
              const maxHeight = H - t;
              const newHeight = data.height + deltaY;
              data.height = round(limitSize(newHeight, minHeight, maxHeight));
            }
          } else {
            // * --------------------------------------------------------------------------- 锁定比例

            const ratio = w / h;
            const [minWidth, minHeight] = ratio > 1 ? [ratio * min, min] : [ratio * min, min];

            if (direction === "left") {
              const [newLeft, newTop, newWidth, newHeight] = [
                data.x + deltaX,
                data.y + deltaX / 2 / ratio,
                data.width - deltaX,
                data.height - deltaX / ratio,
              ];

              if (
                newLeft >= 0 &&
                newTop >= 0 &&
                H - newHeight - newTop >= 0 &&
                newWidth >= MIN_CROP_LENGTH &&
                newHeight >= MIN_CROP_LENGTH
              ) {
                data.y = round(newTop);
                data.x = round(newLeft);
                data.width = round(newWidth);
                data.height = round(newHeight);
              }
            }

            // * ---------------------------

            if (direction === "top") {
              const [newLeft, newTop, newWidth, newHeight] = [
                data.x + (deltaY / 2) * ratio,
                data.y + deltaY,
                data.width - deltaY * ratio,
                data.height - deltaY,
              ];

              if (
                newLeft >= 0 &&
                newTop >= 0 &&
                W - newWidth - newLeft >= 0 &&
                newWidth >= MIN_CROP_LENGTH &&
                newHeight >= MIN_CROP_LENGTH
              ) {
                data.y = round(newTop);
                data.x = round(newLeft);
                data.width = round(newWidth);
                data.height = round(newHeight);
              }
            }

            // * ---------------------------

            if (direction === "right") {
              const [newTop, newWidth, newHeight] = [
                data.y - deltaX / 2 / ratio,
                data.width + deltaX,
                data.height + deltaX / ratio,
              ];

              if (
                newTop >= 0 &&
                H - newHeight - newTop >= 0 &&
                W - newWidth - l >= 0 &&
                newWidth >= MIN_CROP_LENGTH &&
                newHeight >= MIN_CROP_LENGTH
              ) {
                data.y = round(newTop);
                data.width = round(newWidth);
                data.height = round(newHeight);
              }
            }

            // * ---------------------------

            if (direction === "bottom") {
              const [newLeft, newWidth, newHeight] = [
                data.x - (deltaY / 2) * ratio,
                data.width + deltaY * ratio,
                data.height + deltaY,
              ];

              if (
                newLeft >= 0 &&
                H - newHeight - t >= 0 &&
                W - newWidth - newLeft >= 0 &&
                newWidth >= MIN_CROP_LENGTH &&
                newHeight >= MIN_CROP_LENGTH
              ) {
                data.x = round(newLeft);
                data.width = round(newWidth);
                data.height = round(newHeight);
              }
            }
          }
        });
      }).then();
    },
  });

  return { moveProps };
};

const round = (val: number) => Number(val.toFixed(2));
