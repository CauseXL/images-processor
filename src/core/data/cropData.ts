import { CropType } from "@/core/data/types";
import { store } from "@/core/utils";

export const defaultCropInfo: CropType = { x: 0, y: 0, width: 0, height: 0, flip: [1, 1] };
export const cropData = store<CropType>(defaultCropInfo);
