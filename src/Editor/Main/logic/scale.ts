import { WRAPPER_PADDING } from "@/constant";
import { pageData } from "@/core/data";
import { store, useValue } from "@/core/utils";
import { findIndex, findLastIndex } from "ramda";

// * ---------------- data

const scale = store(1);

export const SCALE_LIST = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 5];
const [MIN, MAX] = [SCALE_LIST[0], SCALE_LIST[SCALE_LIST.length - 1]];
const getCenterContainer = () => document.querySelector(".CENTER_CONTAINER") as HTMLElement;

// * ---------------- crud

export const useScale = () => useValue(() => scale.get());

export const getFormatScale = (s: number) => `${(s * 100).toFixed(0)}%`;

export const canScaleUp = (s: number) => s < MAX;
export const canScaleDown = (s: number) => MIN < s;

export const scaleTo = (value: number) => scale.set(value);
export const scaleUp = () => scaleStepHelper("up");
export const scaleDown = () => scaleStepHelper("down");

const getCurrentImage = () => pageData.get().imgList.filter((item) => item.active)[0];

/** 适应屏幕 */
export const scaleToContain = () => {
  const [containerSize, pageSize] = getSizeForCalc();
  const scaleSize = getContainPose(containerSize, pageSize).size;
  const imageScale = scaleSize[0] / pageSize[0];
  const safeScale = Math.min(5, imageScale);
  scale.set(safeScale);
};

/** 实际大小 */
export const scaleToFill = () => {
  scale.set(1);
};

// * ---------------- helper

const scaleStepHelper = (type: "up" | "down") => {
  const s = scale.get();

  const nextScaleIndex = type === "up" ? findIndex((e) => e > s, SCALE_LIST) : findLastIndex((e) => e < s, SCALE_LIST);
  const nextScale = SCALE_LIST[nextScaleIndex];

  if (!nextScale) return;

  scale.set(nextScale);
};

const getSizeForCalc = (): [number[], number[]] => {
  const { offsetWidth: cw, offsetHeight: ch } = getCenterContainer();
  const { width, height } = getCurrentImage();

  const pageSize = [width, height];
  const g = WRAPPER_PADDING;

  return [[cw - g * 2, ch - g * 2], pageSize];
};

const getObjectFit =
  (mode: "cover" | "contain") =>
  (containerSize: number[], imageSize: number[]): { pos: number[]; size: number[] } => {
    const [cw, ch] = containerSize;
    const r = cw / ch;
    const [iw, ih] = imageSize;
    const ri = iw / ih;

    const s1 = [(iw / ih) * ch, ch];
    const s2 = [cw, (ih / iw) * cw];
    let [width, height] = (mode === "cover" && ri > r) || (mode === "contain" && ri < r) ? s1 : s2;

    // * math fix
    if (mode === "contain" && containerSize.includes(0)) {
      [width, height] = [0, 0];
    }

    const [left, top] = [(cw - width) / 2, (ch - height) / 2];
    return { pos: [left, top], size: [width, height] };
  };

const getContainPose = getObjectFit("contain");
