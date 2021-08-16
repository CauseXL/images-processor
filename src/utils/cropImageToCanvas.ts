// TODO: 和 imageTransferFunc 的逻辑合并掉 // XuYuCheng 2021/08/12
import { EImageType } from "./imageTransferFuns";

export interface CropDataType {
  x: number;
  y: number;
  width: number;
  height: number;
  flip: [1 | -1, 1 | -1]; // [水平翻转, 垂直翻转]
  rotate: 0 | -90 | 90 | 180; // 旋转角度，目前不支持灵活角度
}

/**
 * convert image to canvas based on crop data
 */
export const cropImageToCanvas = (image: HTMLImageElement, cropData: CropDataType): HTMLCanvasElement => {
  const { x, y, width, height } = cropData;
  const { width: iWidth, height: iHeight } = image;

  const cvs = document.createElement("canvas");
  let ctx = cvs.getContext("2d");
  if (!ctx) return null as unknown as HTMLCanvasElement;
  let cropParams;
  let canvasParams;

  [cvs.width, cvs.height] = [width, height];
  cropParams = [x, y, width, height];
  canvasParams = [0, 0, width, height];

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = "transparent";
  // @ts-ignore
  ctx.drawImage(image, ...cropParams, ...canvasParams);

  return cvs;
};

export const proportion = 0.75;

export const orientateUrl = (image: HTMLImageElement, type: EImageType, flip: number[], rotate: number) => {
  const cvs = document.createElement("canvas");
  let ctx = cvs.getContext("2d");
  const { width: iWidth, height: iHeight } = image;
  [cvs.width, cvs.height] = [iWidth, iHeight];
  const [a, b] = flip;
  switch (!!flip) {
    /** 水平翻转 +  垂直翻转 === 旋转 180° */
    case a === -1 && b === -1:
      ctx!.rotate((180 * Math.PI) / 180);
      console.log("flip [-1, -1]");
      ctx!.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    /** 水平翻转 */
    case a === -1 && b === 1:
      console.log("flip [-1, 1]");
      ctx!.translate(cvs.width, 0);
      ctx!.scale(-1, 1);
      ctx!.drawImage(image, 0, 0, cvs.width, cvs.height);
      break;
    /** 垂直翻转 */
    case a === 1 && b === -1:
      console.log("flip [1, -1]");
      ctx!.translate(cvs.width, 0);
      ctx!.scale(-1, 1);
      ctx!.rotate((180 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    default:
      ctx!.drawImage(image, 0, 0, cvs.width, cvs.height);
      break;
  }
  switch (rotate) {
    case 90:
      [cvs.width, cvs.height] = [cvs.height, cvs.width];
      console.log("rotate", 90);
      ctx!.rotate((90 * Math.PI) / 180);
      ctx!.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
      break;
    case 180:
      console.log("rotate", 180);
      ctx!.rotate((180 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    case -90:
      console.log("rotate", -90);
      [cvs.width, cvs.height] = [cvs.height, cvs.width];
      ctx!.rotate((270 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
      break;
    default:
      ctx!.drawImage(image, 0, 0, cvs.width, cvs.height);
      break;
  }
  return cvs.toDataURL(type, proportion);
};
