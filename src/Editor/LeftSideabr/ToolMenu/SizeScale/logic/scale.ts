import { PageDataType } from "@/core/data";
import { updateAllImages } from "@/logic/action/imageList";
import { canvastoDataURL, dataURLtoImage, EImageType, imagetoCanvas } from "@/utils/imageTransferFuns";
import { message } from "antd";
import { clone } from "ramda";
import { proportion } from "../../ImageConvert/logic/compressAccurately";

export interface SizeScaleType {
  width?: number;
  height?: number;
  scale?: number;
  type?: "height" | "width" | "percent";
}

export const scaleImage = async (curOriginUrl: string, sizeState: SizeScaleType) => {
  const { width, height } = sizeState;
  const originalMime = curOriginUrl.split(",")[0].match(/:(.*?);/)![1] as EImageType;
  let image = await dataURLtoImage(curOriginUrl);
  let canvas = await imagetoCanvas(image, sizeState);
  let url = await canvastoDataURL(canvas, proportion, originalMime);
  let size = url.length * proportion;
  return { url, size, width, height };
};

export const batchScaleImage = async (pageData: PageDataType, sizeState: SizeScaleType) => {
  const imgList = clone(pageData.imgList);
  const { type, scale = 0 } = sizeState;
  const promiseQueue = imgList.map(async (item) => {
    const { width, height } = item;
    let scaleConfig: SizeScaleType = {};
    if (type === "width") {
      scaleConfig.width = scale;
      scaleConfig.height = Number((scale / (width / height)).toFixed(0));
    } else if (type === "height") {
      scaleConfig.width = Number((scale * (width / height)).toFixed(0));
      scaleConfig.height = scale;
    } else if (type === "percent") {
      scaleConfig.width = Number(((scale / 100) * width).toFixed(0));
      scaleConfig.height = Number(((scale / 100) * height).toFixed(0));
    }
    return await scaleImage(item.url, scaleConfig);
  });
  Promise.all(promiseQueue)
    .then((res) => {
      if (!res) return;
      const batchedList = imgList.map((item, index: number) => {
        return { ...item, crop: { ...item.crop, ...res[index] }, ...res[index] };
      });
      // @ts-ignore
      updateAllImages(batchedList);
      message.success("?????????????????????????????????");
    })
    .catch((e) => {
      message.error(`???????????????${e}`);
    });
};
