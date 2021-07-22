import { ToolsBar } from "@/components/ToolsBar/ToolsBar";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

export const Main: FC = () => {
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
