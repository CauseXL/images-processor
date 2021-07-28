/* eslint-disable no-promise-executor-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
export enum EImageType {
  "PNG" = "image/png",
  "JPEG" = "image/jpeg",
}

export const checkImageType = (type: EImageType) => {
  return ["image/png", "image/jpeg"].some((i) => i === type);
};

/**
 * 将一个Canvas对象转变为一个dataURL字符串
 * 该方法可以做压缩处理
 *
 * @param {canvas} canvas
 * @param {number=} quality - 传入范围 0-1，表示图片压缩质量，默认0.95
 * @param {string=} type - 确定转换后的图片类型，选项有 "image/png", "image/jpeg", 默认"image/jpeg"
 * @returns {Promise(string)} Promise含有一个dataURL字符串参数
 */
export async function canvastoDataURL(
  canvas: HTMLCanvasElement,
  quality = 0.95,
  type: EImageType = EImageType.JPEG,
): Promise<string> {
  if (!checkImageType(type)) {
    type = EImageType.JPEG;
  }
  return canvas.toDataURL(type, quality);
}

/**
 * 将一个canvas对象转变为一个File（Blob）对象
 * 该方法可以做压缩处理
 *
 * @param {canvas} canvas
 * @param {number=} quality - 传入范围 0-1，表示图片压缩质量，默认0.95
 * @param {string=} type - 确定转换后的图片类型，选项有 "image/png", "image/jpeg", 默认"image/jpeg"
 * @returns {Promise(Blob)}
 */
export const canvastoFile = (
  canvas: HTMLCanvasElement,
  quality = 0.95,
  type: EImageType = EImageType.JPEG,
): Promise<Blob> => {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob!), type, quality));
};

/**
 * 将一个dataURL字符串转变为一个File（Blob）对象
 * 转变时可以确定File对象的类型
 *
 * @param {string} dataURL
 * @param {string=} type - 确定转换后的图片类型，选项有 "image/png", "image/jpeg"
 * @returns {Promise(Blob)}
 */
export async function dataURLtoFile(dataURL: string, type: EImageType): Promise<Blob> {
  const arr = dataURL.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (checkImageType(type)) {
    mime = type;
  }
  return new Blob([u8arr], {
    type: mime,
  });
}

/**
 * 将File（Blob）对象转变为一个dataURL字符串
 *
 * @param {Blob} file
 * @returns {Promise(string)} Promise含有一个dataURL字符串参数
 */
export const filetoDataURL = (file: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => resolve(e.target?.result as string);
    reader.readAsDataURL(file);
  });
};

/**
 * 将dataURL字符串转变为image对象
 *
 * @param {string} dataURL - dataURL字符串
 * @returns {Promise(Image)}
 */
export const dataURLtoImage = (dataURL: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("dataURLtoImage(): dataURL is illegal"));
    img.src = dataURL;
  });
};

/**
 * 通过一个图片的url加载所需要的File（Blob）对象
 *
 * @param {string} url - 图片URL
 * @returns {Promise(Blob)}
 *
 */
export const urltoBlob = (url: string): Promise<Blob> => {
  return fetch(url).then((response) => response.blob());
};

/**
 * 通过一个图片的url加载所需要的image对象
 *
 * @param {string} url - 图片URL
 * @returns {Promise(Image)}
 */
export const urltoImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("urltoImage(): Image failed to load, please check the image URL"));
    img.src = url;
  });
};
