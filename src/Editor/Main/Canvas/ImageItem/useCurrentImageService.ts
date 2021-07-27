import { atom, useRecoilState } from "recoil";

// * --------------------------------------------------------------------------- type

interface ImageType {
  name: string;
  url: string;
  type: string;
  width: number;
  height: number;
}

interface currentImageType extends ImageType {
  origin: ImageType;
}

// * --------------------------------------------------------------------------- atom

const mockImg = {
  origin: {
    name: "test5",
    url: "https://picsum.photos/1200/600",
    type: "jpg",
    width: 1200,
    height: 600,
  },
  name: "特赞",
  url: "https://picsum.photos/1200/600",
  type: "png",
  width: 400,
  height: 600,
};

export const currentImageService = atom<currentImageType | undefined>({
  key: "currentImageService",
  default: mockImg,
});

export const useCurrentImageService = () => {
  const [imageState] = useRecoilState(currentImageService);
  return !imageState ? undefined : { ...imageState };
};
