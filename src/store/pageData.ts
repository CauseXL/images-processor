import { rafBatch, useValue } from "@/core/state-util";
import { mockPageData } from "@/hooks/usePageData";
import { pageData } from "@/store/index";
import { Snap } from "@/store/snap";

/** 获取当前页面所有数据 */
export const usePageData = () => {
  return useValue(() => pageData.get());
};

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
