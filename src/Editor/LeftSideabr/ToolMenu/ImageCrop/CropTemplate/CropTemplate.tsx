import { cropTemplateList } from "@/constant";
import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useState } from "react";
import { ScrollContainer } from "tezign-ui";
// @ts-ignore
import { tw } from "twind";
import { CropTemplateItem } from "./CropTemplateItem";

// * --------------------------------------------------------------------------- type

export interface CropTemplateType {
  title: string;
  desc?: string;
  value?: any;
  type?: "origin" | "custom" | "template";
}

// * --------------------------------------------------------------------------- comp

export const CropTemplate: FC = memo(() => {
  const [activeKey, setActiveKey] = useState(1);

  return (
    <div className={list}>
      <ScrollContainer className={cx(tw`rounded mt-0`, scroll)} indicated={true} maxHeight={128} gap={-10}>
        {cropTemplateList.map((item, index) => (
          <CropTemplateItem key={index} {...item} onClick={() => setActiveKey(index)} active={activeKey === index} />
        ))}
      </ScrollContainer>
    </div>
  );
});

// * --------------------------------------------------------------------------- style

const list = css`
  background-color: ${theme.bgColors.dark};
  & ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const scroll = css`
  .tz-scroll-body {
    padding-bottom: 8px;
    padding-top: 8px;
  }
`;
