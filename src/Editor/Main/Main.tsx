/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React from "react";

// * --------------------------------------------------------------------------- comp

export const Main: React.FC = () => {
  return <div css={mainStyle}>main</div>;
};

// * --------------------------------------------------------------------------- style

const mainStyle = css`
  flex: 1;
  background-color: #eee;
  text-align: center;
`;
