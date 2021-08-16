import { CropType } from "@/core/data/types";
import { store } from "@/core/utils";

export type CropDataType = CropType & { originWidth: number; originHeight: number; aspectRatio: number | null };

export const defaultCropInfo: CropDataType = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotate: 0,
  flip: [1, 1],
  originWidth: 0,
  originHeight: 0,
  aspectRatio: null,
};

export const cropData = store<CropDataType>(defaultCropInfo);
