import { CSSProperties } from "react";

export const waterfallSize = {
  width: 184,
  gap: 16,
  nameHeightWithMargin: 28,
  imageMinHeight: 72,
};

export const getPositionStyle = (item: any) => {
  return { top: item.pos[0] || 0, left: item.pos[1] || 0 };
};

export const getImgSizeStyle = (item: any): CSSProperties => {
  return {
    width: item.sizes[0] || 0,
    height: item.sizes[1] || 0,
  };
};
