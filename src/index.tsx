import { pageData, PageDataType, Snap } from "@/core/data";
import { globalStyle } from "@/styles/global";
import { theme } from "@/styles/theme";
import { Global, ThemeProvider } from "@emotion/react";
import "antd/dist/antd.css";
import type { FC } from "react";
import { useEffect } from "react";
import { PCLayout } from "./Editor/PCLayout";

// * --------------------------------------------------------------------------- comp

export interface IEditor {
  data: PageDataType;
  onCancel: () => void;
}
export const ImagesProcessorEditor: FC<IEditor> = (props) => {
  const { data, onCancel } = props;
  useEffect(() => {
    pageData.set(data);
    Snap.take();
    console.log("mount");
    return () => {
      pageData.reset();
      Snap.reset();
      console.log("unmount");
    };
  }, [data]);
  return (
    // <LocaleProvider locale={zh_CN}>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <PCLayout onCancel={onCancel} />
    </ThemeProvider>
    // </LocaleProvider>
  );
};

// * --------------------------------------------------------------------------- export

// eslint-disable-next-line import/no-default-export
export default ImagesProcessorEditor;
