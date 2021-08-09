import { pageData, Snap } from "@/core/data";
import { rafBatch } from "@/core/utils";

/** 一键还原当前页面所有数据 */
export const resetPageData = () => {
  rafBatch(() => {
    pageData.set((data) => {
      const dataFromEntry = Snap.stack[1];
      data.title = dataFromEntry.title;
      data.imgList = [...dataFromEntry.imgList];
    });
  }).then(() => {
    Snap.take();
  });
};
