import { ImgItemType, PageDataType } from "@/core/data";
import { updateAllImages } from "@/logic/action/imageList";
import { CropDataType, cropImageToCanvas, orientateUrl, proportion } from "@/utils/cropImageToCanvas";
import { dataURLtoImage, EImageType } from "@/utils/imageTransferFuns";
import { clone } from "ramda";
import { message } from "tezign-ui";

export interface ICompressConfig {
  type: "origin" | "custom" | undefined;
  targetSize: number | null;
}

export const cropImage = async (currentImage: ImgItemType, crop: CropDataType) => {
  const oriDataUrl = currentImage.origin.url;
  const originalMime = oriDataUrl.split(",")[0].match(/:(.*?);/)![1] as EImageType;
  const image = await dataURLtoImage(oriDataUrl);
  /** 做旋转 */
  const dataUrl = orientateUrl(image, originalMime, crop.flip, crop.rotate);
  const oriImage = await dataURLtoImage(dataUrl);
  /** 做裁切 */
  const canvas = cropImageToCanvas(oriImage, { ...crop });
  const url = canvas.toDataURL(originalMime, proportion);

  const size = url.length * proportion;
  const { width, height } = crop;
  return { url, width: ~~width, height: ~~height, size };
};

/** 批量裁剪 */
export const batchCrop = async (pageData: PageDataType, crop: any) => {
  const imgList = clone(pageData.imgList);
  const promiseQueue = imgList.map(async (item) => {
    return await cropImage(item, crop);
  });
  Promise.all(promiseQueue)
    .then((res) => {
      if (!res) return;
      const batchedList = imgList.map((item, index: number) => {
        return { ...item, ...res[index], crop: { ...item.crop, ...crop } };
      });
      // @ts-ignore
      updateAllImages(batchedList);
      message.success("批量尺寸缩放操作成功！");
    })
    .catch((e) => {
      message.error(`操作失败！${e}`);
    });
};
