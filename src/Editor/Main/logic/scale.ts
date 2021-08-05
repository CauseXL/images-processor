import { store, useValue } from "@/core/utils";
import { findIndex, findLastIndex } from "ramda";

// * ---------------- data

const scale = store(1);

export const SCALE_LIST = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 5];
const [MIN, MAX] = [SCALE_LIST[0], SCALE_LIST[SCALE_LIST.length - 1]];

// * ---------------- crud

export const useScale = () => useValue(() => scale.get());

export const getFormatScale = (s: number) => `${(s * 100).toFixed(0)}%`;

export const canScaleUp = (s: number) => s < MAX;
export const canScaleDown = (s: number) => MIN < s;

export const scaleTo = (value: number) => scale.set(value);
export const scaleUp = () => scaleStepHelper("up");
export const scaleDown = () => scaleStepHelper("down");

export const scaleToContain = () => {
  // TODO
};
export const scaleToFill = () => {
  // TODO
};

// * ---------------- helper

const scaleStepHelper = (type: "up" | "down") => {
  const s = scale.get();

  const nextScaleIndex = type === "up" ? findIndex((e) => e > s, SCALE_LIST) : findLastIndex((e) => e < s, SCALE_LIST);
  const nextScale = SCALE_LIST[nextScaleIndex];

  if (!nextScale) return;

  scale.set(nextScale);
};
