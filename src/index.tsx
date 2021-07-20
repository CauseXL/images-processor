/** @jsx jsx */
import { theme } from "@/styles/theme";
import { jsx, ThemeProvider } from "@emotion/react";
import React from "react";
import { LocaleProvider } from "tezign-ui";
import zh_CN from "tezign-ui/lib/locale-provider/zh_CN";
import { GlobalStyles } from "twin.macro";
import { PCLayout } from "./Editor/PCLayout";

// * --------------------------------------------------------------------------- comp

export const ImagesProcessorEditor: React.FC = () => {
  return (
    <LocaleProvider locale={zh_CN}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <PCLayout />
      </ThemeProvider>
    </LocaleProvider>
  );
};

// * --------------------------------------------------------------------------- export

// eslint-disable-next-line import/no-default-export
export default ImagesProcessorEditor;
