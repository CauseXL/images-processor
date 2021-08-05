import { rafBatch } from "@/core/state-util";
import { pageData } from "@/store/pageData";
import { Snap } from "@/store/snap";

/** 更新项目标题 */
export const updatePageTitle = (name: string) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.title = name;
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.stack);
  });
};
