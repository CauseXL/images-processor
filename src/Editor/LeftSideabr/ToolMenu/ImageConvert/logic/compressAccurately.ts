/* eslint-disable prefer-arrow/prefer-arrow-functions */
import {
  canvastoDataURL,
  checkImageType,
  dataURLtoImage,
  EImageType,
  Image2CanvasConfig,
  imagetoCanvas,
} from "@/utils/imageTransferFuns";

interface ICompressConfig extends Image2CanvasConfig {
  type?: EImageType;
  size: number;
  accuracy?: number;
}

/**
 * 经过测试发现，blob.size与dataURL.length的比值约等于0.75
 * 这个比值可以同过dataURLtoFile这个方法来测试验证
 * 这里为了提高性能，直接通过这个比值来计算出blob.size
 */
export const proportion = 0.75;

/**
 * 根据体积压缩File（Blob）对象
 *
 * @param {string} dataURL - 图片base64url
 * @param {string} size - 图片大小
 * @param {object} config - 详细的配置
 * 		@param {number} size - 指定压缩图片的体积,单位Kb
 * 		@param {number} accuracy - 相对于指定压缩体积的精确度，范围0.8-0.99，默认0.95；
 *        如果设置 图片体积1000Kb,精确度0.9，则压缩结果为900Kb-1100Kb的图片都算合格；
 * @example
 * 		compressAccurately(file,{
 * 			size: 100, //图片压缩体积，单位Kb
 * 			accuracy: 0.9, //图片压缩体积的精确度，默认0.95
 * 			type："image/png", //转换后的图片类型，选项有 "image/png", "image/jpeg"
 * 			width: 300, //生成图片的宽度
 * 			height: 200, //生成图片的高度
 * 			scale: 0.5, //相对于原始图片的缩放比率,设置config.scale后会覆盖config.width和config.height的设置；
 * 			orientation:2, //图片旋转方向
 * 		})
 *
 * @returns {String(dataURL)}
 */
export async function compressAccurately(dataURL: string, config: ICompressConfig): Promise<string> {
  const fileSize = dataURL.length * proportion;
  // 如果指定体积大于原文件体积，则不做处理；
  if (!config.size || config.size * 1024 > fileSize) {
    return dataURL;
  }
  if (!config.accuracy || config.accuracy < 0.8 || config.accuracy > 0.99) {
    config.accuracy = 0.95; // 默认精度0.95
  }

  // 二分法边界
  const resultSize = {
    max: config.size * (2 - config.accuracy) * 1024,
    accurate: config.size * 1024,
    min: config.size * config.accuracy * 1024,
  };

  // 原始图像图片类型
  let originalMime = dataURL.split(",")[0].match(/:(.*?);/)![1] as EImageType;
  let mime = EImageType.JPEG;
  if (config.type && checkImageType(config.type)) {
    mime = config.type;
    originalMime = config.type;
  }

  const image = await dataURLtoImage(dataURL);
  const canvas = await imagetoCanvas(image, { ...config });

  // 图片精度 0 - 1，取0.5作为二分法中间值
  let imageQuality = 0.5;
  let compressDataURL = "";
  const tempDataURLs: string[] = [];

  /**
   * HTMLCanvasElement.toBlob()以及HTMLCanvasElement.toDataURL()压缩参数
   * 的最小细粒度为0.01，而2的7次方为128，即二分法只要循环7次，则会覆盖所有可能性
   */
  for (let x = 1; x <= 7; x++) {
    compressDataURL = await canvastoDataURL(canvas, imageQuality, mime);
    const CalculationSize = compressDataURL.length * proportion;
    // 如果到循环第七次还没有达到精确度的值，那说明该图片不能达到到此精确度要求
    // 这时候最后一次循环出来的dataURL可能不是最精确的，需要取其周边两个dataURL三者比较来选出最精确的；
    if (x === 7) {
      if (resultSize.max < CalculationSize || resultSize.min > CalculationSize) {
        compressDataURL = [compressDataURL, ...tempDataURLs]
          .filter((i) => i) // 去除空
          .sort(
            (a, b) =>
              Math.abs(a.length * proportion - resultSize.accurate) -
              Math.abs(b.length * proportion - resultSize.accurate),
          )[0];
      }
      break;
    }
    if (resultSize.max < CalculationSize) {
      tempDataURLs[1] = compressDataURL;
      imageQuality -= 0.5 ** (x + 1);
    } else if (resultSize.min > CalculationSize) {
      tempDataURLs[0] = compressDataURL;
      imageQuality += 0.5 ** (x + 1);
    } else {
      break;
    }
  }

  /**
   * png图片压缩会有压缩后体积大于原图的情况
   * 如果压缩后体积大于原文件体积，则返回源文件；
   */
  const compressedSize = compressDataURL.length * proportion;
  if (compressedSize >= fileSize) {
    console.log(`压缩后体积${compressedSize}大于原文件体积${fileSize}`);
    return dataURL;
  }

  if (originalMime === EImageType.PNG) {
    compressDataURL = compressDataURL.replace("data:image/jpeg", "data:image/png");
  }

  // const compressFile = await dataURLtoFile(compressDataURL, originalMime);
  return compressDataURL;
}
