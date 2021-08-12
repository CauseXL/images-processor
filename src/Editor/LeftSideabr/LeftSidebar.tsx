import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo } from "react";
// @ts-ignore
import { tw } from "twind";
import { LeftHeader } from "./LeftHeader/LeftHeader";
import { ResetButton } from "./ResetButton/ResetButton";
import { ToolMenu } from "./ToolMenu/ToolMenu";

// * --------------------------------------------------------------------------- comp

export const LeftSidebar: FC = memo(() => {
  return (
    <div className={cx(tw`flex flex-col justify-start overflow-auto`, left)}>
      <LeftHeader />
      <ToolMenu />
      <ResetButton />
    </div>
  );
});

// * --------------------------------------------------------------------------- style

const left = css`
  width: 280px;
  min-width: 280px;
  background-color: ${theme.bgColors.medium};
`;
