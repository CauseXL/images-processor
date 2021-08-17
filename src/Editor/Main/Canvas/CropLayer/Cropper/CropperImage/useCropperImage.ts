import { useValue } from "@/core/utils";
import { useScale } from "@/Editor/Main/logic/scale";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { getTransformStyle } from "@/utils/getTransformStyle";
import { getTureCropSize } from "@/utils/getTureCropSize";

// * --------------------------------------------------------------------------- serv

export const useCropperImage = () => {
  const { url } = useValue(getCurrentImage).origin;
  const cropInfo = useValue(getCropData);
  const { width, height } = getTureCropSize(cropInfo);
  const { rotate, flip, originWidth, originHeight } = cropInfo;
  const [scaleX, scaleY] = flip;
  const scale = useScale();

  const onLoad = () => {};

  const imgStyle = {
    width: originWidth * scale,
    height: originHeight * scale,
    transformOrigin: "0 0",
    transform: getTransformStyle({
      width: width * scale,
      height: height * scale,
      rotate,
      scaleX,
      scaleY,
      zoom: scale,
    }),
  };

  const imgWrapperStyle = {
    width: width * scale,
    height: height * scale,
  };

  return { url, onLoad, imgStyle, imgWrapperStyle };
};
