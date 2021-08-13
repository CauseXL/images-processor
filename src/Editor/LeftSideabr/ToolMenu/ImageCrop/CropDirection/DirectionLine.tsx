import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React, { memo } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- comp

export const DirectionLine: FC = memo(() => (
  <>
    <div className={cx(common, tw`left-0 top-1/3 border-t-2 border-b-2 h-2/6 w-full`, line)} />
    <div className={cx(common, tw`top-0 left-1/3 border-l-2 border-r-2 w-4/12 h-full`, line)} />
  </>
));

// * --------------------------------------------------------------------------- style

const line = css`
  border-color: ${theme.bgColors.light};
`;

const common = tw`block absolute pointer-events-none`;
