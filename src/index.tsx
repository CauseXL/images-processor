import { globalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import type { FC } from "react";
import { LocaleProvider } from "tezign-ui";
import zh_CN from "tezign-ui/lib/locale-provider/zh_CN";
import { PCLayout } from "./Editor/PCLayout";

// * --------------------------------------------------------------------------- comp

export const ImagesProcessorEditor: FC = () => {
  return (
    <LocaleProvider locale={zh_CN}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <PCLayout />
      </ThemeProvider>
    </LocaleProvider>
  );
};

// * --------------------------------------------------------------------------- export

// eslint-disable-next-line import/no-default-export
export default ImagesProcessorEditor;
