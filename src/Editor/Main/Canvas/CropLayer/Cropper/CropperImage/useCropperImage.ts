import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { getTransformStyle } from "@/utils/getTransformStyle";

// * --------------------------------------------------------------------------- serv

export const useCropperImage = () => {
  const { url } = useValue(getCurrentImage);
  const { rotate, originWidth, originHeight, flip } = useValue(getCropData);
  const [scaleX, scaleY] = flip;
  const isVertical = rotate === 90 || rotate === -90;

  const onLoad = () => {
    console.log("image load");
  };

  const imgStyle = {
    transformOrigin: "0 0",
    transform: getTransformStyle({
      width: isVertical ? originHeight : originWidth,
      height: isVertical ? originWidth : originHeight,
      rotate,
      scaleX,
      scaleY,
    }),
  };

  const imgWrapperStyle = {
    width: isVertical ? originHeight : originWidth,
    height: isVertical ? originWidth : originHeight,
  };

  return { url, onLoad, imgStyle, imgWrapperStyle };
};
