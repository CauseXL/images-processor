/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";

// * --------------------------------------------------------------------------- comp

export const RightSidebar: React.FC = () => {
  return <div css={rightSidebarStyle}>rightSidebar</div>;
};

// * --------------------------------------------------------------------------- style

const rightSidebarStyle = css`
  min-width: 200px;
  border-left: 1px solid blue;
`;
