// * --------------------------------------------------------------------------- store
import { PageDataType } from "@/core/data/types";
import { store } from "../utils";

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
        rotate: 0,
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
