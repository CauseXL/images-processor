import { store } from "@/core/state-util";
import { mockPageData } from "@/mock";

// * --------------------------------------------------------------------------- type

interface ImageType {
  name: string;
  url: string;
  type: string;
  width: number;
  height: number;
  size?: number;
}

export interface CropType {
  x: number;
  y: number;
  width: number; // 初始值和 imageOriginWidth 一致
  height: number; // 初始值和 imageOriginHeight 一致
  flip: [number, number]; // [水平翻转, 垂直翻转]
}

// * ---------------------------

export interface ImgItemType extends ImageType {
  id: number;
  active?: boolean;
  crop: CropType;
  origin: ImageType;
}

export interface PageDataType {
  title: string;
  imgList: ImgItemType[];
}

// * --------------------------------------------------------------------------- store

export const pageData = store(mockPageData);

// * ---------------------------

export * from "./currentImage";
export * from "./imageList";
export * from "./pageData";
export * from "./pageTitle";
