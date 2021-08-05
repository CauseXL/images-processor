import { pageData, Snap } from "@/core/data";
import { rafBatch } from "@/core/utils";

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
