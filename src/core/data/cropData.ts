import { CropType } from "@/core/data/types";
import { store } from "@/core/utils";

type CropDataType = CropType & { originWidth: number; originHeight: number };

export const defaultCropInfo: CropDataType = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  flip: [1, 1],
  originWidth: 0,
  originHeight: 0,
};

export const cropData = store<CropDataType>(defaultCropInfo);
