import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";

// * --------------------------------------------------------------------------- comp

export const RightSidebar: FC = () => {
  return <div css={rightSidebarStyle}>rightSidebar</div>;
};

// * --------------------------------------------------------------------------- style

const rightSidebarStyle = css`
  min-width: 200px;
  background-color: ${theme.bgColors.medium};
`;
