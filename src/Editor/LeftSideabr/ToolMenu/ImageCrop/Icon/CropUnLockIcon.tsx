import type { FC } from "react";

export const CropUnLockIcon: FC<{ color?: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10C17 10.5523 16.5523 11 16 11C15.4477 11 15 10.5523 15 10V8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8V10C9 10.5523 8.55229 11 8 11C7.44772 11 7 10.5523 7 10V8Z"
      fill={color ? color : "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16L7 14C7 13.4477 7.44772 13 8 13C8.55228 13 9 13.4477 9 14L9 16C9 17.6569 10.3431 19 12 19C13.6569 19 15 17.6569 15 16V14C15 13.4477 15.4477 13 16 13C16.5523 13 17 13.4477 17 14V16Z"
      fill={color ? color : "currentColor"}
    />
  </svg>
);
