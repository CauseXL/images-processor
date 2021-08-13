import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React, { memo, useMemo, useState } from "react";
import { Popover } from "tezign-ui";
// @ts-ignore
import { tw } from "twind";
import { DirectionIcon } from "../Icon";
import { DirectionTable } from "./DirectionTable";

// * --------------------------------------------------------------------------- comp

export const CropDirection: FC = memo(() => {
  const [visible, setVisible] = useState(true);

  return useMemo(
    () => (
      <Popover
        placement="topRight"
        trigger="click"
        style={{ padding: "0" }}
        className={popover}
        content={<DirectionTable visible={visible} />}
        onVisibleChange={(visible) => setVisible(visible)}
      >
        <div className={cx(tw`flex justify-between items-center mt-4 mb-2 p-2 cursor-pointer rounded`, btn)}>
          <p css={tw`select-none`}>选择方位裁切</p>
          <DirectionIcon />
        </div>
      </Popover>
    ),
    [visible],
  );
});

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
