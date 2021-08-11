import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { getTransformStyle } from "@/utils/getTransformStyle";
import { getTureCropSize } from "@/utils/getTureCropSize";

// * --------------------------------------------------------------------------- serv

export const useCropperImage = () => {
  const { url } = useValue(getCurrentImage);
  const cropInfo = useValue(getCropData);
  const { width, height } = getTureCropSize(cropInfo);
  const { rotate, flip } = cropInfo;
  const [scaleX, scaleY] = flip;

  const onLoad = () => {
    console.log("image load");
  };

  const imgStyle = {
    transformOrigin: "0 0",
    transform: getTransformStyle({
      width,
      height,
      rotate,
      scaleX,
      scaleY,
    }),
  };

  const imgWrapperStyle = {
    width,
    height,
  };

  return { url, onLoad, imgStyle, imgWrapperStyle };
};
