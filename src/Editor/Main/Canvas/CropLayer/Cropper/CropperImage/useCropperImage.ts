import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";

// * --------------------------------------------------------------------------- serv

export const useCropperImage = () => {
  const { url: src, origin } = useValue(getCurrentImage);
  const { width, height } = origin;

  const onLoad = () => {
    console.log("image load");
  };

  const imgStyle = {
    transformOrigin: "0 0",
  };

  const imgWrapperStyle = {
    width,
    height,
  };

  return { src, onLoad, imgStyle, imgWrapperStyle };
};
