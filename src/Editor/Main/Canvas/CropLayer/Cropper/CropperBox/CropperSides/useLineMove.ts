import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { useMove } from "@/hooks/useMove";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { CropperLineType } from "./CropperSides";

// * --------------------------------------------------------------------------- constant

export const MIN_CROP_LENGTH = 20;

// * --------------------------------------------------------------------------- serv

export const useLineMove = (direction: CropperLineType) => {
  const cropInfo = useValue(getCropData);
  const originInfo = useValue(getCurrentImage).origin;

  const { width, height } = originInfo;
  const { x: cropLeft, y: cropTop, width: cropWidth, height: cropHeight } = cropInfo;

  const { moveProps } = useMove({
    onMove: ({ deltaX, deltaY }) => {
      rafBatch(() => {
        cropData.set((data) => {
          if (direction === "left") {
            const [minLeft, minWidth] = [0, MIN_CROP_LENGTH];
            const [maxLeft, maxWidth] = [cropLeft + cropWidth - MIN_CROP_LENGTH, cropLeft + cropWidth];
            const [newLeft, newWidth] = [data.x + deltaX, data.width - deltaX];
            const [resLeft, resWidth] = [limitSize(newLeft, minLeft, maxLeft), limitSize(newWidth, minWidth, maxWidth)];
            data.x = resLeft;
            data.width = resWidth;
          }

          if (direction === "top") {
            const [minTop, minHeight] = [0, MIN_CROP_LENGTH];
            const [maxTop, maxHeight] = [cropTop + cropHeight - MIN_CROP_LENGTH, cropTop + cropHeight];
            const [newTop, newHeight] = [data.y + deltaY, data.height - deltaY];
            const [resTop, resHeight] = [limitSize(newTop, minTop, maxTop), limitSize(newHeight, minHeight, maxHeight)];
            data.y = resTop;
            data.height = resHeight;
          }

          if (direction === "right") {
            const minWidth = MIN_CROP_LENGTH;
            const maxWidth = width - cropLeft;
            const newWidth = data.width + deltaX;
            data.width = limitSize(newWidth, minWidth, maxWidth);
          }

          if (direction === "bottom") {
            const minHeight = MIN_CROP_LENGTH;
            const maxHeight = height - cropTop;
            const newHeight = data.height + deltaY;
            data.height = limitSize(newHeight, minHeight, maxHeight);
          }
        });
      }).then();
    },
  });

  return { moveProps };
};

// * --------------------------------------------------------------------------- util

export const limitSize = (val: number, min: number, max: number) => (val < min ? min : val > max ? max : val);
