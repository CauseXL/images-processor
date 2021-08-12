import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- inter

interface CropSizeSelectorProps {
  title: string;
  desc?: string;
  value?: any;
  type?: "origin" | "custom" | "template";
  onClick: () => void;
  active: boolean;
}

// * --------------------------------------------------------------------------- comp

export const CropTemplateItem: FC<CropSizeSelectorProps> = memo((props) => {
  const { title, desc, type, value, onClick, active } = props;

  const handleClick = () => {
    console.log(type, value);
    console.log("click");
    onClick();
  };

  const activeStyle = {
    backgroundColor: active ? theme.bgColors.medium : "transparent",
  };

  return useMemo(
    () => (
      <div className={tw`ml-2 mr-0.5 p-2 rounded cursor-pointer`} style={activeStyle} onClick={handleClick}>
        <div>{title}</div>
        {desc && <div className={cx(tw`pt-2 text-xs`, font)}>{desc}</div>}
      </div>
    ),
    [title, activeStyle, handleClick, desc],
  );
});

// * --------------------------------------------------------------------------- style

const font = css`
  color: rgba(255, 255, 255, 0.45);
`;
