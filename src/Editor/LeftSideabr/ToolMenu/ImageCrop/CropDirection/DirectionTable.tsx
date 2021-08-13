import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { CSSProperties, FC } from "react";
import React, { memo, useEffect, useMemo, useState } from "react";
// @ts-ignore
import { tw } from "twind";
import { ArrowIcon, RoundIcon } from "../Icon";
import { DEFAULT_DIR_LIST, DIRECTION_LIST, DIRECTION_MAP, ROTATION_MAP } from "./constants";
import { DirectionLine } from "./DirectionLine";

// * --------------------------------------------------------------------------- type

/** 九宫格方向 */
export type DirectionType = "tl" | "t" | "tr" | "l" | "c" | "r" | "bl" | "b" | "br";

/** 箭头图标旋转角度 */
export type DirectionRotateType = 0 | -45 | 45 | -90 | 90 | -135 | 135 | 180;

// * --------------------------------------------------------------------------- comp

// TODO: display curr direction based on crop position // XuYuCheng 2021/08/13
export const DirectionTable: FC = memo(() => {
  const [activeDir, setActiveDir] = useState<DirectionType | undefined>();
  const [dirList, setDirList] = useState<(DirectionType | "")[]>(DEFAULT_DIR_LIST);

  const handleClick = (dir: DirectionType | "") => dir !== "" && setActiveDir(dir);

  useEffect(() => {
    activeDir ? setDirList(DIRECTION_MAP[activeDir]) : setDirList(DEFAULT_DIR_LIST);
  }, [activeDir]);

  return useMemo(
    () => (
      <div className={cx(tw`relative flex flex-wrap border border-2 rounded`, table)}>
        <DirectionLine />
        {dirList.map((dir, index) => (
          <DirectionItemContainer key={index} dir={dir} onClick={() => handleClick(DIRECTION_LIST[index])} />
        ))}
      </div>
    ),
    [dirList, handleClick],
  );
});

// * ---------------------------

const DirectionItemContainer: FC<{ dir: DirectionType | ""; onClick: () => void }> = memo(({ dir, onClick }) => {
  if (dir === "") return <DirectionItem onClick={onClick} />;

  if (dir === "c")
    return (
      <DirectionItem onClick={onClick}>
        <RoundIcon />
      </DirectionItem>
    );

  const rotate = ROTATION_MAP[dir];
  const rotateStyle: CSSProperties = {
    transform: `rotate(${rotate}deg)`,
  };

  return (
    <DirectionItem onClick={onClick}>
      <ArrowIcon style={rotateStyle} />
    </DirectionItem>
  );
});

// * ---------------------------

const DirectionItem: FC<{ onClick: () => void }> = memo(({ children, onClick }) => (
  <div
    onClick={onClick}
    className={cx(tw`w-4/12 h-2/6 flex flex-shrink-0 items-center justify-center cursor-pointer`, item)}
  >
    {children}
  </div>
));

// * --------------------------------------------------------------------------- style

const table = css`
  width: 80px;
  height: 80px;
  color: #ffffff;
  background-color: #303030;
  border-color: ${theme.bgColors.light};
`;

const item = css`
  border-color: ${theme.bgColors.light};
`;
