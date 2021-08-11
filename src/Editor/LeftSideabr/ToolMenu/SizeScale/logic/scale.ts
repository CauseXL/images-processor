import { PageDataType } from "@/core/data";
import { updateAllImages } from "@/logic/action/imageList";
import { canvastoDataURL, dataURLtoImage, imagetoCanvas } from "@/utils/imageTransferFuns";
import { clone } from "ramda";
import { message } from "tezign-ui";
import { proportion } from "../../ImageConvert/logic/compressAccurately";

export interface SizeScaleType {
  width?: number;
  height?: number;
}

export const scaleImage = async (curOriginUrl: string, sizeState: SizeScaleType) => {
  const { width, height } = sizeState;
  let image = await dataURLtoImage(curOriginUrl);
  let canvas = await imagetoCanvas(image, sizeState);
  let url = await canvastoDataURL(canvas, proportion);
  let size = url.length * proportion;
  return { url, size, width, height };
};

export const batchScaleImage = async (pageData: PageDataType, sizeState: SizeScaleType) => {
  const imgList = clone(pageData.imgList);
  const promiseQueue = imgList.map(async (item) => {
    return await scaleImage(item.origin.url, sizeState);
  });
  Promise.all(promiseQueue)
    .then((res) => {
      if (!res) return;
      const batchedList = imgList.map((item, index: number) => {
        return { ...item, crop: { ...item.crop, ...res[index] }, ...res[index] };
      });
      updateAllImages(batchedList);
      message.success("批量尺寸缩放操作成功！");
    })
    .catch((e) => {
      message.error(`操作失败！${e}`);
    });
};
