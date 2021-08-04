import { rafBatch, useValue } from "@/core/state-util";
import { ImgItemType, pageData } from "@/store/index";
import { Snap } from "@/store/snap";

/** get 选中图片 */
export const useCurrentImage = () => {
  const data = useValue(() => pageData.get().imgList.filter((item) => item.active), [pageData]);
  return data[0];
};

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

/** get 图片裁切信息 */
export const useCurrentImageCropInfo = () => {
  const currentImage = useCurrentImage();
  return currentImage.crop;
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
