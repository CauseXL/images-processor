import { rafBatch } from "@/core/state-util";
import { Snap } from "@/store/snap";
import { pageData } from "./pageData";
import { ImgItemType } from "./types";

// * ------------------------------------------------

/** get 选中图片 */
export const getCurrentImage = () => pageData.get().imgList.filter((item) => item.active)[0];

// * ------------------------------------------------

/** set 选中图片 */
export const updateCurrentImage = (currentImage) => {
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
