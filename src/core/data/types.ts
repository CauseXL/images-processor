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
  flip: [1 | -1, 1 | -1]; // [水平翻转, 垂直翻转]
  rotate: 0 | -90 | 90 | 180; // 旋转角度，目前不支持灵活角度
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
