import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { getTransformStyle } from "@/utils/getTransformStyle";

// * --------------------------------------------------------------------------- serv

export const useCropperImage = () => {
  const { url } = useValue(getCurrentImage);
  const {
    width,
    height,
    originWidth,
    originHeight,
    flip: [scaleX, scaleY],
  } = useValue(getCropData);

  const onLoad = () => {
    console.log("image load");
  };

  const imgStyle = {
    transformOrigin: "0 0",
    transform: getTransformStyle({ width: originWidth, height: originHeight, scaleX, scaleY }),
  };

  const imgWrapperStyle = {
    width: originWidth,
    height: originHeight,
  };

  return { url, onLoad, imgStyle, imgWrapperStyle };
};
