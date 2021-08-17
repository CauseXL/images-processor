import { ImgItemType, PageDataType } from "@/core/data";
import { updateAllImages } from "@/logic/action/imageList";
import {
  CropDataType,
  cropImageToCanvas,
  flipImageToUrl,
  proportion,
  rotateImageToUrl,
} from "@/utils/cropImageToCanvas";
import { dataURLtoImage, EImageType } from "@/utils/imageTransferFuns";
import { clone } from "ramda";
import { message } from "tezign-ui";

export interface ICompressConfig {
  type: "origin" | "custom" | undefined;
  targetSize: number | null;
}

export const cropImage = async (currentImage: ImgItemType, crop: CropDataType) => {
  const oriDataUrl = currentImage.url;
  const originalMime = oriDataUrl.split(",")[0].match(/:(.*?);/)![1] as EImageType;
  const image = await dataURLtoImage(oriDataUrl);
  /** 做翻转 */
  const flipUrl = flipImageToUrl(image, originalMime, crop.flip);
  const flipImage = await dataURLtoImage(flipUrl);
  /** 做旋转 */
  const rotateUrl = rotateImageToUrl(flipImage, originalMime, crop.rotate);
  const rotateImage = await dataURLtoImage(rotateUrl);
  /** 做裁切 */
  const canvas = cropImageToCanvas(rotateImage, { ...crop });
  const url = canvas.toDataURL(originalMime, proportion);

  const size = url.length * proportion;
  const { width, height } = crop;
  return { url, width: ~~width, height: ~~height, size };
};

/** 批量裁剪 */
// TODO: 精度处理 // XuYuCheng 2021/08/17
export const batchCrop = async (pageData: PageDataType, crop: any) => {
  const imgList = clone(pageData.imgList);
  const promiseQueue = imgList.map(async (item) => {
    return await cropImage(item, crop);
  });
  Promise.all(promiseQueue)
    .then((res) => {
      if (!res) return;
      const batchedList = imgList.map((item, index: number) => {
        const { width, height, flip, rotate } = crop;
        return { ...item, ...res[index], crop: { ...item.crop, x: 0, y: 0, width, height, flip, rotate } };
      });
      // @ts-ignore
      updateAllImages(batchedList);
      message.success("批量图片裁剪操作成功！");
    })
    .catch((e) => {
      message.error(`操作失败！${e}`);
    });
};
