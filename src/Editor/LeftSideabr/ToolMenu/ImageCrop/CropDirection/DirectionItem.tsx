import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import React, { CSSProperties, FC, memo } from "react";
// @ts-ignore
import { tw } from "twind";
import { ArrowIcon, RoundIcon } from "../Icon";
import { ROTATION_MAP } from "./constants";
import { DirectionType } from "./DirectionTable";

// * --------------------------------------------------------------------------- comp

export const DirectionItem: FC<{ dir: DirectionType | ""; onClick: () => void }> = memo(({ dir, onClick }) => {
  if (dir === "") {
    return <DirectionCommon onClick={onClick} />;
  }

  if (dir === "c") {
    return (
      <DirectionCommon onClick={onClick}>
        <RoundIcon />
      </DirectionCommon>
    );
  }

  const rotate = ROTATION_MAP[dir];
  const rotateStyle: CSSProperties = {
    transform: `rotate(${rotate}deg)`,
  };

  return (
    <DirectionCommon onClick={onClick}>
      <ArrowIcon style={rotateStyle} />
    </DirectionCommon>
  );
});

// * ---------------------------

const DirectionCommon: FC<{ onClick: () => void }> = memo(({ children, onClick }) => (
  <div
    onClick={onClick}
    className={cx(tw`w-4/12 h-2/6 flex flex-shrink-0 items-center justify-center cursor-pointer`, item)}
  >
    {children}
  </div>
));

// * --------------------------------------------------------------------------- style

const item = css`
  border-color: ${theme.bgColors.light};
`;
