import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";

// * --------------------------------------------------------------------------- comp

export const RightSidebar: React.FC = () => {
  return <div css={rightSidebarStyle}>rightSidebar</div>;
};

// * --------------------------------------------------------------------------- style

const rightSidebarStyle = css`
  min-width: 200px;
  background-color: ${theme.bgColors.medium};
`;
