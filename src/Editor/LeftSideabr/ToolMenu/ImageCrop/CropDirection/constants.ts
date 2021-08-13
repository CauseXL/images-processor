import { DirectionRotateType, DirectionType } from "./DirectionTable";

export const DIRECTION_LIST: DirectionType[] = ["tl", "t", "tr", "l", "c", "r", "bl", "b", "br"];

export const DEFAULT_DIR_LIST = Array(9).fill("");

export const ROTATION_MAP: Record<Exclude<DirectionType, "c">, DirectionRotateType> = {
  tl: -45,
  t: 0,
  tr: 45,
  l: -90,
  r: 90,
  bl: -135,
  b: 180,
  br: 135,
};

export const DIRECTION_MAP: Record<DirectionType, (DirectionType | "")[]> = {
  tl: ["c", "r", "", "b", "br", "", "", "", ""],
  t: ["l", "c", "r", "bl", "b", "br", "", "", ""],
  tr: ["", "l", "c", "", "bl", "b", "", "", ""],
  l: ["t", "tr", "", "c", "r", "", "b", "br", ""],
  c: ["tl", "t", "tr", "l", "c", "r", "bl", "b", "br"],
  r: ["", "tl", "t", "", "l", "c", "", "bl", "b"],
  bl: ["", "", "", "t", "tr", "", "c", "r", ""],
  b: ["", "", "", "tl", "t", "tr", "l", "c", "r"],
  br: ["", "", "", "", "tl", "t", "", "l", "c"],
};
