import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { Icon } from "antd";
import { FC, ReactNode } from "react";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- inter

interface SubMenuProps {
  key: number;
  active?: boolean;
  onClick?: () => void;
  title: any;
  content: ReactNode;
}

// * --------------------------------------------------------------------------- comp

export const ToolMenuItem: FC<SubMenuProps> = ({ title, content, active = false, onClick }) => (
  <div css={[menuItemStyle, tw`flex flex-col`]}>
    <ToolMenuTitle active={active} onClick={onClick}>
      {title}
    </ToolMenuTitle>
    {active && <div css={[tw`px-4`, menuContentStyle]}>{content}</div>}
  </div>
);

// * ---------------------------
const ToolMenuTitle: FC<{ active: boolean; onClick?: () => void }> = ({ children, active, onClick }) => (
  <div css={tw`select-none cursor-pointer flex justify-start p-4`} onClick={onClick}>
    <Icon type={active ? "caret-down" : "caret-right"} css={tw`pr-4 flex items-center text-center`} />
    {children}
  </div>
);

// * --------------------------------------------------------------------------- style

const menuItemStyle = css`
  border-bottom: 1px solid ${theme.bgColors.dark};
`;

const menuContentStyle = css`
  background-color: ${theme.bgColors.medium};
`;
