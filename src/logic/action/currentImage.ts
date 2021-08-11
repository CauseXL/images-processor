import { pageData, Snap } from "@/core/data";
import { ImgItemType } from "@/core/data/types";
import { rafBatch } from "@/core/utils";

/** set 选中图片 */
export const updateCurrentImage = (currentImage: any) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = data.imgList.map((img) => {
        if (img.active) {
          // eslint-disable-next-line no-param-reassign
          img = { ...img, ...currentImage };
        }
        return img;
      });
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.index);
  });
};

/** 切换选中的图片 */
export const changeCurrentImage = (id: number) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = data.imgList.map((img) => {
        img.active = img.id === id;
        return img;
      });
    });
  }).then(() => console.log("update current image success"));
};

/** set 图片裁切信息 */
export const updateCurrentImageCropInfo = (cropInfo: ImgItemType["crop"]) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = data.imgList.map((image) => {
        if (image.active) {
          return { ...image, crop: cropInfo };
        }
        return image;
      });
    });
  }).then(() => {
    Snap.take();
  });
};
