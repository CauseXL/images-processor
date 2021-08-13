import type { CSSProperties, FC } from "react";

export const RoundIcon: FC<{ color?: string; style?: CSSProperties }> = ({ color, style }) => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="4" cy="4" r="4" fill={color ? color : "currentColor"} />
  </svg>
);
