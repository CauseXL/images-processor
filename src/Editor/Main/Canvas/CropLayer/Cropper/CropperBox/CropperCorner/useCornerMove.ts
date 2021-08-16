import { MIN_CROP_LENGTH as min } from "@/constant";
import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { useMove } from "@/hooks/useMove";
import { getCropData, useCropRatioLocked } from "@/logic/get/cropData";
import { limitSize } from "@/utils/limitSize";
import { CornerDirectionType } from "./CropperCorner";

// TODO: calculateLogic --> pureFunc // XuYuCheng 2021/08/11
// TODO: 简化代码 // XuYuCheng 2021/08/16
export const useCornerMove = (direction: CornerDirectionType) => {
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

            const [minLeft, minTop, minWidth, minHeight] = [0, 0, min, min];

            if (direction === "nw") {
              const [maxLeft, maxTop, maxWidth, maxHeight] = [l + w - min, t + h - min, l + w, t + h];
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
              const [maxTop, maxWidth, maxHeight] = [t + h - min, W - l, h + t];
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
              const [maxWidth, maxHeight] = [W - l, H - t];
              const [newWidth, newHeight] = [data.width + deltaX, data.height + deltaY];
              const [resWidth, resHeight] = [
                limitSize(newWidth, minWidth, maxWidth),
                limitSize(newHeight, minHeight, maxHeight),
              ];
              data.width = resWidth;
              data.height = resHeight;
            }

            if (direction === "sw") {
              const [maxLeft, maxWidth, maxHeight] = [l + w - min, l + w, H - t];
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
          } else {
            // * --------------------------------------------------------------------------- 锁定比例

            const ratio = w / h;
            const [minWidth, minHeight] = ratio > 1 ? [ratio * min, min] : [ratio * min, min];

            if (direction === "nw") {
              const [areaW, areaH] = [w + l, h + t];
              const areaRatio = areaW / areaH;

              const [maxWidth, maxHeight] = ratio > areaRatio ? [areaW, areaW / ratio] : [areaH * ratio, areaH];
              const [minLeft, minTop] = [areaW - maxWidth, areaH - maxHeight];
              const [maxLeft, maxTop] = [areaW - minWidth, areaH - minHeight];

              const [newLeft, newTop, newWidth, newHeight] = [
                data.x + deltaX,
                data.y + deltaX / ratio,
                data.width - deltaX,
                data.height - deltaX / ratio,
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

            // * ---------------------------

            if (direction === "ne") {
              const [areaW, areaH] = [w + r, h + t];
              const areaRatio = areaW / areaH;

              const [maxWidth, maxHeight] = ratio > areaRatio ? [areaW, areaW / ratio] : [areaH * ratio, areaH];
              const minTop = areaH - maxHeight;
              const maxTop = areaH - minHeight;
              const [newTop, newWidth, newHeight] = [
                data.y - deltaX / ratio,
                data.width + deltaX,
                data.height + deltaX / ratio,
              ];
              const [resTop, resWidth, resHeight] = [
                limitSize(newTop, minTop, maxTop),
                limitSize(newWidth, minWidth, maxWidth),
                limitSize(newHeight, minHeight, maxHeight),
              ];
              data.y = resTop;
              data.width = resWidth;
              data.height = resHeight;
            }

            // * ---------------------------

            if (direction === "se") {
              const [areaW, areaH] = [w + r, h + b];
              const areaRatio = areaW / areaH;

              const [maxWidth, maxHeight] = ratio > areaRatio ? [areaW, areaW / ratio] : [areaH * ratio, areaH];
              const [newWidth, newHeight] = [data.width + deltaX, data.height + deltaX / ratio];
              const [resWidth, resHeight] = [
                limitSize(newWidth, minWidth, maxWidth),
                limitSize(newHeight, minHeight, maxHeight),
              ];
              data.width = resWidth;
              data.height = resHeight;
            }

            // * ---------------------------

            if (direction === "sw") {
              const [areaW, areaH] = [w + l, h + b];
              const areaRatio = areaW / areaH;

              const [maxWidth, maxHeight] = ratio > areaRatio ? [areaW, areaW / ratio] : [areaH * ratio, areaH];
              const minLeft = areaW - maxWidth;
              const maxLeft = areaW - minWidth;
              const [newLeft, newWidth, newHeight] = [
                data.x + deltaX,
                data.width - deltaX,
                data.height - deltaX / ratio,
              ];
              const [resLeft, resWidth, resHeight] = [
                limitSize(newLeft, minLeft, maxLeft),
                limitSize(newWidth, minWidth, maxWidth),
                limitSize(newHeight, minHeight, maxHeight),
              ];
              data.x = resLeft;
              data.width = resWidth;
              data.height = resHeight;
            }
          }
        });
      }).then();
    },
  });

  return { moveProps };
};
