/** @jsx jsx */
// import "@/styles/main.css";
import { css, jsx, useTheme } from "@emotion/react";
import React from "react";
import tw from "twin.macro";
import { Header } from "./Header/Header";
import { LeftSidebar } from "./LeftSideabr/LeftSidebar";
import { Main } from "./Main/Main";
import { RightSidebar } from "./RightSidebar/RightSidebar";

// * --------------------------------------------------------------------------- comp

export const PCLayout: React.FC = () => {
  const theme = useTheme();
  return (
    <div css={layoutStyle} style={{ color: theme.colors.primary }}>
      <Header />
      <div css={containerStyle}>
        <LeftSidebar />
        <Main />
        <RightSidebar />
      </div>
      <div css={tw`flex text-center px-4`}>hahaha</div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

export const layoutStyle = css`
  display: flex;
  flex-direction: column;
  border: 5px dashed blue;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const containerStyle = css`
  display: flex;
  border: 5px dashed red;
  flex: 1;
`;
