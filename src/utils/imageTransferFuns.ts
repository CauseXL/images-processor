/* eslint-disable no-promise-executor-return, no-param-reassign, prefer-arrow/prefer-arrow-functions, max-lines */
export enum EImageType {
  "PNG" = "image/png",
  "JPEG" = "image/jpeg",
}
export interface Image2CanvasConfig {
  width?: number;
  height?: number;
  scale?: number;
  orientation?: number;
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
export async function dataURLtoFile(dataURL: string, type?: EImageType): Promise<Blob> {
  const arr = dataURL.split(",");
  let mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  if (type && checkImageType(type)) {
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

/**
 * 将一个image对象转变为一个canvas对象
 *
 * @param {image} image
 *
 * @typedef {Object=} config - 转变为canvas时的一些参数配置
 * 		@param {number} width - canvas图像的宽度，默认为image的宽度
 * 		@param {number} height - canvas图像的高度，默认为image的高度
 * 		@param {number} scale - 相对于image的缩放比例，范围0-10，默认不缩放；
 * 			设置config.scale后会覆盖config.width和config.height的设置；
 * 		@param {number} orientation - 图片旋转参数，默认不旋转，参考如下：
 * 			参数	 旋转方向
 * 			1		0°
 * 			2		水平翻转
 * 			3		180°
 * 			4		垂直翻转
 * 			5		顺时针90°+水平翻转
 * 			6		顺时针90°
 * 			7		顺时针90°+垂直翻转
 * 			8		逆时针90°
 * @type {config}
 *
 * @returns {Promise(canvas)}
 */
export async function imagetoCanvas(
  image: HTMLImageElement,
  config: Image2CanvasConfig = {},
): Promise<HTMLCanvasElement> {
  const myConfig = { ...config };
  const cvs = document.createElement("canvas");
  const ctx = cvs.getContext("2d");
  let height;
  let width;
  for (const i in myConfig) {
    if (Object.prototype.hasOwnProperty.call(myConfig, i)) {
      // @ts-ignore
      myConfig[i] = Number(myConfig[i]);
    }
  }
  // 设置宽高
  if (!myConfig.scale) {
    width = myConfig.width || ((myConfig.height || 0) * image.width) / image.height || image.width;
    height = myConfig.height || ((myConfig.width || 0) * image.height) / image.width || image.height;
  } else {
    // 缩放比例0-10，不在此范围则保持原来图像大小
    const scale = myConfig.scale > 0 && myConfig.scale < 10 ? myConfig.scale : 1;
    width = image.width * scale;
    height = image.height * scale;
  }
  // 当顺时针或者逆时针旋转90时，需要交换canvas的宽高
  if ([5, 6, 7, 8].some((i) => i === myConfig.orientation)) {
    cvs.height = width;
    cvs.width = height;
  } else {
    cvs.height = height;
    cvs.width = width;
  }

  // fix: 透明png压缩后有时会产生黑色背景
  ctx!.fillStyle = "transparent";

  // 设置方向
  switch (myConfig.orientation) {
    case 3:
      ctx!.rotate((180 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    case 6:
      ctx!.rotate((90 * Math.PI) / 180);
      ctx!.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
      break;
    case 8:
      ctx!.rotate((270 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
      break;
    case 2:
      ctx!.translate(cvs.width, 0);
      ctx!.scale(-1, 1);
      ctx!.drawImage(image, 0, 0, cvs.width, cvs.height);
      break;
    case 4:
      ctx!.translate(cvs.width, 0);
      ctx!.scale(-1, 1);
      ctx!.rotate((180 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.width, -cvs.height, cvs.width, cvs.height);
      break;
    case 5:
      ctx!.translate(cvs.width, 0);
      ctx!.scale(-1, 1);
      ctx!.rotate((90 * Math.PI) / 180);
      ctx!.drawImage(image, 0, -cvs.width, cvs.height, cvs.width);
      break;
    case 7:
      ctx!.translate(cvs.width, 0);
      ctx!.scale(-1, 1);
      ctx!.rotate((270 * Math.PI) / 180);
      ctx!.drawImage(image, -cvs.height, 0, cvs.height, cvs.width);
      break;
    default:
      ctx!.drawImage(image, 0, 0, cvs.width, cvs.height);
  }
  return cvs;
}
