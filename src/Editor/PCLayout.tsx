import { css, useTheme } from "@emotion/react";
import type { FC } from "react";
import { Header } from "./Header/Header";
import { LeftSidebar } from "./LeftSideabr/LeftSidebar";
import { Main } from "./Main/Main";
import { RightSidebar } from "./RightSidebar/RightSidebar";

// * --------------------------------------------------------------------------- comp

export const PCLayout: FC = () => {
  const theme = useTheme();

  return (
    <div css={layoutStyle} style={{ color: theme.colors.default }}>
      <Header />
      <div css={containerStyle}>
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

export const layoutStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const containerStyle = css`
  display: flex;
  flex: 1;
`;
