import type { FC } from "react";

export const RotateCropIcon: FC<{ color?: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 7C3 5.34315 4.34315 4 6 4H11C12.6569 4 14 5.34315 14 7V17C14 18.6569 12.6569 20 11 20H6C4.34315 20 3 18.6569 3 17V7ZM6 6C5.44772 6 5 6.44772 5 7V17C5 17.5523 5.44772 18 6 18H11C11.5523 18 12 17.5523 12 17V7C12 6.44772 11.5523 6 11 6H6Z"
      fill={color ? color : "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 11C4.55228 11 5 11.4477 5 12V17C5 17.5523 5.44772 18 6 18H18C18.5523 18 19 17.5523 19 17V14C19 13.4477 18.5523 13 18 13H13C12.4477 13 12 12.5523 12 12C12 11.4477 12.4477 11 13 11H18C19.6569 11 21 12.3431 21 14V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17V12C3 11.4477 3.44772 11 4 11Z"
      fill={color ? color : "currentColor"}
    />
  </svg>
);
