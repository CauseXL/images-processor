// TODO: 和 imageTransferFunc 的逻辑合并掉 // XuYuCheng 2021/08/12

export interface CropDataType {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * convert image to canvas based on crop data
 */
export const cropImageToCanvas = (image: HTMLImageElement, cropData: CropDataType): HTMLCanvasElement => {
  const { x, y, width, height } = cropData;

  const cvs = document.createElement("canvas");
  const ctx = cvs.getContext("2d");

  [cvs.width, cvs.height] = [image.width, image.height];

  if (!ctx) return null as unknown as HTMLCanvasElement;

  const cropParams = [x, y, width, height];
  const canvasParams = [0, 0, image.width, image.height];

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  ctx.fillStyle = "transparent";
  // @ts-ignore
  ctx.drawImage(image, ...cropParams, ...canvasParams);

  return cvs;
};
