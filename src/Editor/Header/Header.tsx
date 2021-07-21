import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React, { useEffect } from "react";

// * --------------------------------------------------------------------------- comp

export const Header: React.FC = () => {
  useEffect(() => {
    console.log("load header");
  }, []);

  return <div css={headerStyle}>header</div>;
};

// * --------------------------------------------------------------------------- style

const headerStyle = css`
  width: 100%;
  min-height: 54px;
  background-color: ${theme.bgColors.light};
  border-bottom: 1px solid ${theme.bgColors.dark};
`;
