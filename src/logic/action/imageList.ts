import { pageData, Snap } from "@/core/data";
import { rafBatch } from "@/core/utils";
import { mockPageData } from "@/mock";
import { message } from "tezign-ui";

/** 全量更新图片列表 */
export const updateAllImages = (imgList: any) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = [...imgList];
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.index);
  });
};

/** 删除某一项图片 */
export const deleteImage = (id: number) => {
  rafBatch(() => {
    pageData.set((data) => {
      if (data.imgList.length === 1) {
        message.error("您确定您是在批量吗？");
        return;
      }

      // get deleted index for reset active
      let index = data.imgList.findIndex((img) => img.id === id);

      data.imgList = data.imgList.filter((img) => img.id !== id);

      // reset
      if (index === data.imgList.length) {
        index -= 1;
      }
      data.imgList[index].active = true;
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.stack);
  });
};

/** 批量还原图片数据 */
export const resetImageList = () => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = [...mockPageData.imgList];
    });
  }).then(() => {
    Snap.take();
    console.log("批量还原图片数据 snap", Snap.index);
  });
};
