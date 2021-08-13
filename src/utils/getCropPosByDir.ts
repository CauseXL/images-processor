import { CropDataType } from "@/core/data/cropData";
import { DirectionType } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropDirection/DirectionTable";
import { getTureCropSize } from "./getTureCropSize";

export const getCropPosByDir = (cropData: CropDataType, direction: DirectionType) => {
  const { width, height } = cropData;
  const { width: containerWidth, height: containerHeight } = getTureCropSize(cropData);

  const [maxX, maxY] = [containerWidth - width, containerHeight - height];
  const [centerX, centerY] = [(containerWidth - width) / 2, (containerHeight - height) / 2];

  const positionMap: Record<DirectionType, { x: number; y: number }> = {
    tl: { x: 0, y: 0 },
    t: { x: centerX, y: 0 },
    tr: { x: maxX, y: 0 },
    l: { x: 0, y: centerY },
    c: { x: centerX, y: centerY },
    r: { x: maxX, y: centerY },
    bl: { x: 0, y: maxY },
    b: { x: centerX, y: maxY },
    br: { x: maxX, y: maxY },
  };

  return positionMap[direction];
};
