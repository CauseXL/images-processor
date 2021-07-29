import { useCallback } from "react";
import { useRafState } from "./useRafState";

interface ISize {
  width: number;
  height: number;
}

// interface IPosition {
//   sizes: [number, number];
//   pos: [number, number]
// }

interface IWaterfallProps<T> {
  list: T[];
  containerWidth: number;
  width: number;
  gap: number;
  subNodeHeight: number;
}
export const useWaterFall = <T extends ISize>({
  list,
  containerWidth,
  width,
  gap,
  subNodeHeight,
}: IWaterfallProps<T>) => {
  // const [positionList, setList] = useState<any>([])
  const [positionList, setList] = useRafState<any>([]);
  const calc = useCallback(() => {
    const column = Math.floor((containerWidth - width) / (width + gap)) + 1;

    if (column < 1) {
      return;
    }

    const laneList = Array.from({ length: column }, (_, i) => [i === 0 ? 0 : i * width + i * gap, 0]);

    const pList = list.map((item) => {
      const factor = width / item.width;
      const sw = width;
      const sh = item.height * factor;

      const sizes = [sw, sh];

      let pos: [number, number] = [0, 0];
      if (column === 1) {
        const lane = laneList[0];
        const t = lane[0];
        const l = lane[1];
        pos = [t, l];
        lane[0] += sh + gap + subNodeHeight;
      } else {
        laneList.sort(([, h1], [, h2]) => h1 - h2);
        const minLeftLane = laneList[0];
        const t = minLeftLane[1];
        let l = minLeftLane[0];
        pos = [t, l];
        minLeftLane[1] += sh + gap + subNodeHeight;
      }
      return { ...item, sizes, pos };
    });
    setList(pList);
  }, [list, containerWidth, width, gap, subNodeHeight]);

  return { positionList, calc };
};
