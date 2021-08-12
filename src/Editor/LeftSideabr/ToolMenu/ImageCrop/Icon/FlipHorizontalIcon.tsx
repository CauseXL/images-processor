import type { FC } from "react";

export const FlipHorizontalIcon: FC<{ color?: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6.00001L18 10L6 10L6 6.00001Z" fill={color ? color : "currentColor"} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9871 10.1602C18.9085 10.6443 18.4905 11 18 11L6 11C5.44771 11 5 10.5523 5 10L5 6.00001C5 5.67856 5.15452 5.37672 5.41529 5.18877C5.67606 5.00081 6.01128 4.94967 6.31623 5.05132L18.3162 9.05132C18.7815 9.20642 19.0656 9.67607 18.9871 10.1602ZM7 7.38743V9.00001L11.8377 9.00001L7 7.38743Z"
      fill={color ? color : "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9871 13.8398C18.9085 13.3557 18.4905 13 18 13L6 13C5.44772 13 5 13.4477 5 14L5 18C5 18.3215 5.15452 18.6233 5.41529 18.8112C5.67606 18.9992 6.01128 19.0503 6.31623 18.9487L18.3162 14.9487C18.7815 14.7936 19.0656 14.3239 18.9871 13.8398ZM7 16.6126L7 15H11.8377L7 16.6126Z"
      fill={color ? color : "currentColor"}
    />
  </svg>
);
