import { atom, useRecoilState } from "recoil";

export const SCALE_LIST = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 5];

// * --------------------------------------------------------------------------- atom

const scaleService = atom<number>({
  key: "scaleService",
  default: 1,
});

// * --------------------------------------------------------------------------- service

export const useScaleService = () => {
  const [scale, setScale] = useRecoilState(scaleService);
  return { scale, setScale };
};
