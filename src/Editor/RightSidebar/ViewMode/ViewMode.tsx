import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { Icon } from "antd";
import type { FC } from "react";
import { CSSProperties, useCallback, useState } from "react";
import tw from "twin.macro";

export enum EViewMode {
  CARD = "CARD",
  LIST = "LIST",
}
interface IToggleProps {
  onChange: (v: EViewMode) => void;
  viewMode: EViewMode;
  style?: CSSProperties;
}

export const ViewMode: FC<IToggleProps> = ({ onChange, viewMode, style }) => {
  const [mode, setMode] = useState<EViewMode>(viewMode);
  const getActivatedStyle = useCallback((currentMode) => (mode === currentMode ? activeStyle : ""), [mode]);
  const action = (mode: EViewMode) => {
    setMode(mode);
    onChange(mode);
  };
  return (
    <div css={tw`flex rounded`} style={{ width: 40, background: "#414141", ...style }}>
      <div
        css={[tw`flex justify-center items-center rounded`, optionStyle, getActivatedStyle(EViewMode.CARD)]}
        onClick={() => action(EViewMode.CARD)}
      >
        <Icon type="pic-center" />
      </div>
      <div
        css={[tw`flex justify-center items-center rounded`, optionStyle, getActivatedStyle(EViewMode.LIST)]}
        onClick={() => action(EViewMode.LIST)}
      >
        <Icon type="pic-left" />
      </div>
    </div>
  );
};

const optionStyle = css`
  background: #414141;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    color: ${theme.colors.active};
    background: ${theme.bgColors.active};
  }
`;

const activeStyle = css`
  color: ${theme.colors.active};
  background: ${theme.bgColors.active};
`;
