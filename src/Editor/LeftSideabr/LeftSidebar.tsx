/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";

// * --------------------------------------------------------------------------- comp

export const LeftSidebar: React.FC = () => {
  return <div css={leftSidebarStyle}>LeftSidebar</div>;
};

// * --------------------------------------------------------------------------- style

const leftSidebarStyle = css`
  min-width: 200px;
  border-right: 1px solid blue;
`;
