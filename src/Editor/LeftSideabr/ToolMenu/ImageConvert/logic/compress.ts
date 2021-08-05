import { PageDataType } from "@/core/data";
import { updateCurrentImage } from "@/logic/action/currentImage";
import { updateAllImages } from "@/logic/action/imageList";
import { clone } from "ramda";
import { message } from "tezign-ui";
import { compressAccurately, proportion } from "./compressAccurately";

export interface ICompressConfig {
  type: "origin" | "custom" | undefined;
  targetSize: number | null;
}

/** 批量压缩 */
export const batchCompress = async (pageData: PageDataType, compressConfig: ICompressConfig) => {
  const imgList = clone(pageData.imgList);
  const promiseQueue = imgList.map(async (item) => {
    return await compressAccurately(item.url, { size: compressConfig.targetSize as number });
  });
  Promise.all(promiseQueue)
    .then((res) => {
      if (!res) return;
      const compressedList = imgList.map((item, index: number) => {
        item.url = res[index];
        item.size = (res[index] as string).length * 0.75;
        return item;
      });
      updateAllImages(compressedList);
      message.success("批量品质压缩操作成功！");
    })
    .catch((e) => {
      message.error(`批量品质压缩操作失败！${e}`);
    });
};

/** 单张压缩 */
export const compress = (currentImage: any, compressConfig: ICompressConfig) => {
  compressAccurately(currentImage.url, { size: compressConfig.targetSize as number })
    .then((res) => {
      updateCurrentImage({ url: res, size: res.length * proportion });
      message.success("品质压缩操作成功！");
      console.log(res);
    })
    .catch((e) => {
      message.error(`品质压缩操作失败！${e}`);
    });
};
