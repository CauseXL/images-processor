import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import tw from "twin.macro";
import React from "react";
import { ToolsBar } from "@/components/ToolsBar/ToolsBar";

// * --------------------------------------------------------------------------- comp

export const Main: React.FC = () => {
  return (
    <div css={[tw`relative`, mainStyle]}>
      main
      <ToolsBar />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const mainStyle = css`
  flex: 1;
  background-color: ${theme.bgColors.dark};
  text-align: center;
`;
