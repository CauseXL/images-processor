import { cropData } from "@/core/data/cropData";
import { theme } from "@/styles/theme";
import { getCropPosByDir } from "@/utils/getCropPosByDir";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import React, { memo, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { tw } from "twind";
import { DEFAULT_DIR_LIST, DIRECTION_LIST, DIRECTION_MAP } from "./constants";
import { DirectionItem } from "./DirectionItem";
import { DirectionLine } from "./DirectionLine";

// * --------------------------------------------------------------------------- type

/** 九宫格方向 */
export type DirectionType = "tl" | "t" | "tr" | "l" | "c" | "r" | "bl" | "b" | "br";

/** 箭头图标旋转角度 */
export type DirectionRotateType = 0 | -45 | 45 | -90 | 90 | -135 | 135 | 180;

// * --------------------------------------------------------------------------- comp

// TODO: 位置状态的反显 // XuYuCheng 2021/08/13
export const DirectionTable: FC<{ visible: boolean }> = memo(({ visible }) => {
  const [activeDir, setActiveDir] = useState<DirectionType | undefined>();
  const [dirList, setDirList] = useState<(DirectionType | "")[]>(DEFAULT_DIR_LIST);

  const handleClick = (dir: DirectionType | "") => dir !== "" && setActiveDir(dir);

  useEffect(() => {
    if (activeDir) {
      cropData.set((data) => {
        const { x, y } = getCropPosByDir(data, activeDir);
        data.x = x;
        data.y = y;
      });
    }
    activeDir ? setDirList(DIRECTION_MAP[activeDir]) : setDirList(DEFAULT_DIR_LIST);
  }, [activeDir]);

  useEffect(() => {
    !visible && setDirList(DEFAULT_DIR_LIST);
  }, [visible]);

  return useMemo(
    () => (
      <div className={cx(tw`relative flex flex-wrap border border-2 rounded`, table)}>
        <DirectionLine />
        {dirList.map((dir, index) => (
          <DirectionItem key={index} dir={dir} onClick={() => handleClick(DIRECTION_LIST[index])} />
        ))}
      </div>
    ),
    [dirList, handleClick],
  );
});

// * --------------------------------------------------------------------------- style

const table = css`
  width: 80px;
  height: 80px;
  color: #ffffff;
  background-color: #303030;
  border-color: ${theme.bgColors.light};
`;
