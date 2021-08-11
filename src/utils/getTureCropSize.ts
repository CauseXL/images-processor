import { CropDataType } from "@/core/data/cropData";

/**
 * cropData の 派生数据
 * 根据 rotate 来获取显示的宽高
 */
export const getTureCropSize = (cropData: CropDataType) => {
  const { rotate, originHeight, originWidth } = cropData;
  const isVertical = rotate === 90 || rotate === -90;

  const width = isVertical ? originHeight : originWidth;
  const height = isVertical ? originWidth : originHeight;

  return { width, height };
};
