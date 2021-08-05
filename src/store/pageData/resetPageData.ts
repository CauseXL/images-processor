import { rafBatch } from "@/core/state-util";
import { mockPageData } from "@/mock";
import { Snap } from "@/store/snap";
import { pageData } from "./pageData";

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
