import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React, { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";
import { useLineMove } from "./useLineMove";

// * --------------------------------------------------------------------------- type

export type CropperLineType = "left" | "top" | "right" | "bottom";

// * --------------------------------------------------------------------------- comp

export const CropperSides: FC = memo(() => (
  <>
    <CropperLine className="line-w" type="left" />
    <CropperLine className="line-n" type="top" />
    <CropperLine className="line-e" type="right" />
    <CropperLine className="line-s" type="bottom" />
  </>
));

// * ---------------------------

const CropperLine: FC<{ className: string; type: CropperLineType }> = memo(({ className, type }) => {
  const { moveProps } = useLineMove(type);
  return useMemo(() => <span className={cx(className, cropperSides, line)} {...moveProps} />, [moveProps]);
});

// * --------------------------------------------------------------------------- style

const cropperSides = tw`block absolute h-full w-full opacity-10`;

const line = css`
  background-color: #54dec5;

  &.line-e {
    width: 5px;

    cursor: ew-resize;
    top: 0;
    right: -3px;
  }

  &.line-n {
    height: 5px;

    cursor: ns-resize;
    top: -3px;
    left: 0;
  }

  &.line-w {
    width: 5px;

    cursor: ew-resize;
    top: 0;
    left: -3px;
  }

  &.line-s {
    height: 5px;

    cursor: ns-resize;
    bottom: -3px;
    left: 0;
  }
`;
