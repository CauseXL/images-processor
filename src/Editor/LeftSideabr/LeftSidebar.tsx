import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import tw from "twin.macro";
import { LeftHeader } from "./LeftHeader/LeftHeader";
import { ResetButton } from "./ResetButton/ResetButton";
import { ToolMenu } from "./ToolMenu/ToolMenu";

// * --------------------------------------------------------------------------- comp

export const LeftSidebar: FC = () => {
  return (
    <div css={[leftSidebarStyle, tw`flex flex-col justify-start`]}>
      <LeftHeader />
      <ToolMenu />
      <ResetButton />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const leftSidebarStyle = css`
  min-width: 280px;
  background-color: ${theme.bgColors.medium};
`;
