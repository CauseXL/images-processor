import { cropData } from "@/core/data/cropData";
import { useValue } from "@/core/utils";

export const getCropData = () => cropData.get();

export const useCropRatioLocked = (): [boolean, (locked?: boolean) => void] => {
  const cropInfo = useValue(getCropData);

  // * ---------------------------

  const toggleLock = (locked?: boolean) => {
    const { aspectRatio, width, height } = cropInfo;
    const isLocked = locked === undefined ? aspectRatio === null : locked;

    cropData.set((data) => {
      data.aspectRatio = isLocked ? width / height : null;
    });
  };

  // * ---------------------------

  return [cropInfo.aspectRatio !== null, toggleLock];
};
