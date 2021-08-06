// * --------------------------------------------------------------------------- store
import { PageDataType } from "@/core/data/types";
import { store } from "../utils";

export const initActive = (pageData: PageDataType) => {
  pageData.imgList.map((img, i) => {
    img.active = i === 0 ? true : false;
    return img;
  });
  return pageData;
};

const initialData: PageDataType = {
  title: "",
  imgList: [
    {
      id: 0,
      active: true,
      name: "",
      url: "",
      type: "",
      width: 0,
      height: 0,
      size: 0,
      crop: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        flip: [1, 1],
      },
      origin: {
        name: "",
        url: "",
        type: "",
        width: 0,
        height: 0,
        size: 0,
      },
    },
  ],
};
export const pageData = store(initialData);
