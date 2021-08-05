import { pageData, Snap } from "@/core/data";
import { rafBatch } from "@/core/utils";
import { mockPageData } from "@/mock";
import { message } from "tezign-ui";

/** 全量更新图片列表 */
export const updateAllImages = (imgList) => {
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

/** 批量替换图片名称 */
export const renameImage = ({
  name,
  hasOrder,
  order,
  batchStatus,
}: {
  name: string;
  hasOrder: boolean;
  order?: number;
  batchStatus: boolean;
}) => {
  rafBatch(() => {
    pageData.set((data) => {
      if (batchStatus) {
        // 默认从 1 添加序号
        const start = hasOrder ? order! : 1;
        data.imgList = data.imgList.map((img, i) => {
          img.name = name + (i + start);
          return img;
        });
      } else {
        const current = data.imgList.filter((item) => item.active)[0];
        current.name = hasOrder ? name + order : name;
      }
    });
  }).then(() => {
    Snap.take();
    console.log("批量命名图片数据 snap", Snap.stack);
  });
};
