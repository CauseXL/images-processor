import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React from "react";
import { Popover } from "tezign-ui";
// @ts-ignore
import { tw } from "twind";
import { DirectionIcon } from "../Icon";
import { DirectionTable } from "./DirectionTable";

// * --------------------------------------------------------------------------- comp

export const CropDirection: FC = () => {
  return (
    <Popover
      placement="topRight"
      trigger="click"
      style={{ padding: "0" }}
      className={popover}
      content={<DirectionTable />}
    >
      <div className={cx(tw`flex justify-between items-center mt-4 mb-2 p-2 cursor-pointer rounded`, btn)}>
        <p css={tw`select-none`}>选择方位裁切</p>
        <DirectionIcon />
      </div>
    </Popover>
  );
};

// * --------------------------------------------------------------------------- style

const btn = css`
  background-color: ${theme.bgColors.light};
`;

const popover = css`
  .ant-popover-inner-content {
    padding: 0;
    background-color: #303030;
  }
`;
