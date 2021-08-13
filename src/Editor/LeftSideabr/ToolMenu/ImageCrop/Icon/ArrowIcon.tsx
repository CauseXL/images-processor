import type { CSSProperties, FC } from "react";

export const ArrowIcon: FC<{ color?: string; style?: CSSProperties }> = ({ color, style }) => (
  <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 0C2.94772 0 2.5 0.447715 2.5 1V7C2.5 7.55228 2.94772 8 3.5 8C4.05228 8 4.5 7.55228 4.5 7V1C4.5 0.447715 4.05228 0 3.5 0Z"
      fill={color ? color : "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 0C3.20322 0 2.92175 0.131823 2.73175 0.359816L0.231753 3.35982C-0.121811 3.78409 -0.0644865 4.41466 0.35979 4.76822C0.784067 5.12179 1.41463 5.06446 1.7682 4.64018L3.49997 2.56205L5.23175 4.64018C5.58532 5.06446 6.21588 5.12179 6.64016 4.76822C7.06444 4.41466 7.12176 3.78409 6.7682 3.35982L4.2682 0.359816C4.0782 0.131823 3.79678 0 3.5 0Z"
      fill={color ? color : "currentColor"}
    />
  </svg>
);
