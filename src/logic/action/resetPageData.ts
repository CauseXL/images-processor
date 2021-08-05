import { pageData, Snap } from "@/core/data";
import { rafBatch } from "@/core/utils";
import { mockPageData } from "@/mock";

/** 一键还原当前页面所有数据 */
export const resetPageData = () => {
  rafBatch(() => {
    pageData.set((data) => {
      data.title = mockPageData.title;
      data.imgList = [...mockPageData.imgList];
    });
  }).then(() => {
    Snap.take();
    console.log("一键还原 snap", Snap.index);
  });
};
