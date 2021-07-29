import { theme } from "@/styles/theme";
import { css, useTheme } from "@emotion/react";
import type { FC } from "react";
import React from "react";
import tw from "twin.macro";
import { Header } from "./Header/Header";
import { LeftSidebar } from "./LeftSideabr/LeftSidebar";
import { Main } from "./Main/Main";
import { RightSidebar } from "./RightSidebar/RightSidebar";

// * --------------------------------------------------------------------------- comp

export const PCLayout: FC = () => {
  const theme = useTheme();
  return (
    <div css={[tw`flex flex-col h-screen w-screen`, layoutStyle]} style={{ color: theme.colors.default }}>
      <Header />
      <div css={[tw`flex flex-1 h-full`, containerStyle]}>
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const layoutStyle = css`
  //&::-webkit-scrollbar,
  //& ::-webkit-scrollbar {
  //  display: none;
  //}
`;

const containerStyle = css`
  height: calc(100% - 55px);
  background-color: ${theme.bgColors.dark};
`;
