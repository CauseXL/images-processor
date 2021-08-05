import { pageData } from "@/core/data";

/** get 选中图片 */
export const getCurrentImage = () => pageData.get().imgList.filter((item) => item.active)[0];
