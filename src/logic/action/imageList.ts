import { ImgItemType, pageData, Snap } from "@/core/data";
import { rafBatch } from "@/core/utils";
import { message } from "antd";
import { clone } from "ramda";

/** 全量更新图片列表 */
export const updateAllImages = (imgList: ImgItemType[]) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = [...imgList];
    });
  }).then(() => {
    Snap.take();
  });
};

/** 删除某一项图片 */
export const deleteImage = (id: number) => {
  rafBatch(() => {
    pageData.set((data) => {
      if (data.imgList.length === 1) {
        message.error("图片不可小于1张");
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
  });
};

/** 批量还原图片数据 */
export const resetImageListWithoutName = () => {
  const currentList = clone(pageData.get().imgList);
  const originList = currentList.map((item) => {
    const { origin, crop, name } = item;
    return { ...item, ...origin, crop: { ...crop, ...origin }, name };
  });
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = [...originList];
    });
  }).then(() => {
    Snap.take();
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
  });
};
