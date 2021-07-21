import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";

// * --------------------------------------------------------------------------- comp

export const Main: React.FC = () => {
  return <div css={mainStyle}>main</div>;
};

// * --------------------------------------------------------------------------- style

const mainStyle = css`
  flex: 1;
  background-color: ${theme.bgColors.dark};
  text-align: center;
`;
