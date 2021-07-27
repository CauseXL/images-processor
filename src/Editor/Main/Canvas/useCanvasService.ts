import { useCurrentImageService } from "@/Editor/Main/Canvas/ImageItem/useCurrentImageService";
import { atom } from "recoil";

// * --------------------------------------------------------------------------- type

interface canvasType {
  width: number;
  height: number;
}

// * --------------------------------------------------------------------------- atom

const canvasService = atom<canvasType>({
  key: "canvasService",
  default: {
    width: 600,
    height: 400,
  },
});

console.log(canvasService);

// * --------------------------------------------------------------------------- service

export const useCanvasService = () => {
  const imageState = useCurrentImageService();

  if (!imageState) return { width: 600, height: 400 };

  const { width, height } = imageState;
  return { width, height };
};
