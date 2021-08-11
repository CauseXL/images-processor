import { css, cx } from "@emotion/css";
import type { FC } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- comp

export const CropperCenter: FC = () => (
  <span className={cx("cropper-center", tw`block absolute h-0 w-0 left-2/4 top-2/4 opacity-75`, center)} />
);

// * --------------------------------------------------------------------------- style

const center = css`
  &::before {
    height: 1px;
    left: -3px;
    top: 0;
    width: 7px;
  }
  &::after {
    height: 7px;
    left: 0;
    top: -3px;
    width: 1px;
  }
  &::before,
  &::after {
    background-color: #eee;
    content: " ";
    display: block;
    position: absolute;
  }
`;
