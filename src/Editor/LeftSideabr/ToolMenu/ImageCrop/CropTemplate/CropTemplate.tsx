import { cropTemplateList } from "@/constant";
import { store, useValue } from "@/core/utils";
import { useCropRatioLocked } from "@/logic/get/cropData";
import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useEffect } from "react";
import { ScrollContainer } from "tezign-ui";
// @ts-ignore
import { tw } from "twind";
import { CropTemplateItem } from "./CropTemplateItem";

// * --------------------------------------------------------------------------- type

export interface CropTemplateType {
  title: string;
  desc?: string;
  ratio: [number, number];
  type?: "origin" | "custom" | "template";
}

// * --------------------------------------------------------------------------- state

export const activeTemplateKey = store(0);

export const useSelectCustomTemplate = () => () => activeTemplateKey.set(1);

// * --------------------------------------------------------------------------- comp

export const CropTemplate: FC = memo(() => {
  const activeKey = useValue(() => activeTemplateKey.get());
  const handleChangeTemplate = (index: number) => activeTemplateKey.set(index);
  const [, setIsLocked] = useCropRatioLocked();

  useEffect(() => {
    activeKey === 1 && setIsLocked(false);
  }, [activeKey]);

  return (
    <div className={list}>
      <ScrollContainer className={cx(tw`rounded mt-0`, scroll)} indicated={true} maxHeight={128} gap={-10}>
        {cropTemplateList.map((item, index) => (
          <CropTemplateItem
            key={index}
            {...item}
            onClick={() => handleChangeTemplate(index)}
            active={activeKey === index}
          />
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
