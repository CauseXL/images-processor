import type { FC } from "react";

export const FlipVerticalIcon: FC<{ color?: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.00001 18.0001L10 6.00009V18.0001H6.00001Z" fill={color ? color : "currentColor"} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1602 5.013C10.6443 5.09157 11 5.50963 11 6.00009V18.0001C11 18.5524 10.5523 19.0001 10 19.0001H6.00001C5.67856 19.0001 5.37672 18.8456 5.18877 18.5848C5.00081 18.324 4.94967 17.9888 5.05132 17.6839L9.05132 5.68386C9.20642 5.21858 9.67607 4.93444 10.1602 5.013ZM7.38743 17.0001H9.00001V12.1624L7.38743 17.0001Z"
      fill={color ? color : "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.8398 5.013C13.3557 5.09157 13 5.50963 13 6.00009V18.0001C13 18.5524 13.4477 19.0001 14 19.0001H18C18.3215 19.0001 18.6233 18.8456 18.8112 18.5848C18.9992 18.324 19.0503 17.9888 18.9487 17.6839L14.9487 5.68386C14.7936 5.21858 14.3239 4.93444 13.8398 5.013ZM16.6126 17.0001H15V12.1624L16.6126 17.0001Z"
      fill={color ? color : "currentColor"}
    />
  </svg>
);
