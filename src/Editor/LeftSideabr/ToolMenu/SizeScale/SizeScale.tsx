import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { SizeScaleItem } from "@/Editor/LeftSideabr/ToolMenu/SizeScale/SizeScaleItem";
import { currentImageService } from "@/Editor/Main/Canvas/ImageItem/useCurrentImageService";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { selector, useRecoilState } from "recoil";
import { Radio } from "tezign-ui";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- type

export interface SizeScaleItemType {
  text: string;
  type: "height" | "width" | "percent";
  value?: number;
}

// * --------------------------------------------------------------------------- service

export const sizeScaleService = selector<
  | {
      width: number;
      height: number;
      percent: number;
    }
  | undefined
>({
  key: "sizeScaleService",
  get: ({ get }) => {
    const curImgState = get(currentImageService);

    if (!curImgState) return undefined;

    const { height, width } = curImgState;
    // TODO: 这里注入裁切数据，百分比功能未完成 // XuYuCheng 2021/07/28
    const percent = Number(((width / width) * 100).toFixed(0));
    return { height, width, percent };
  },
  set: ({ set }, newValue) => {
    set(currentImageService, (old) => {
      if (old) {
        return { ...old, ...newValue };
      }
      return;
    });
  },
});

// * --------------------------------------------------------------------------- comp

export const SizeScale: FC = () => {
  const [activeKey, setActiveKey] = useState<number | null>();
  const [sizeState, setSizeState] = useRecoilState(sizeScaleService);
  const [sizeSnapShot, setSizeSnapShot] = useState(sizeState);

  const handleInputChange = (type: SizeScaleItemType["type"], value: number) => {
    if (!sizeState || !sizeSnapShot) {
      return;
    }

    let result = { [type]: value };
    const { width, height } = sizeState;

    if (type === "width") result.height = Number((value / (width / height)).toFixed(0));
    if (type === "height") result.width = Number((value * (width / height)).toFixed(0));

    // TODO: 这里的 width height 数据应该是 cropService 注入进来的 // XuYuCheng 2021/07/28
    if (type === "percent") {
      result.width = Number(((value / 100) * width).toFixed(0));
      result.height = Number(((value / 100) * height).toFixed(0));
      console.log(result, 11111111111);
    }

    setSizeSnapShot((size) => (size ? { ...size, ...result } : undefined));
  };

  const resetSnapShot = () => setSizeSnapShot(sizeState);

  const handleOk = () => setSizeState(sizeSnapShot);

  const handleCancel = () => resetSnapShot();

  const handleRadioChange = (e: any) => {
    setActiveKey(e.target.value);
    resetSnapShot();
  };

  useEffect(() => {
    setSizeSnapShot(sizeState);
  }, [sizeState]);

  // * ---------------------------

  const sizeScaleItemList: SizeScaleItemType[] = [
    { text: "按照高度", type: "height", value: sizeSnapShot?.height },
    { text: "按照宽度", type: "width", value: sizeSnapShot?.width },
    { text: "按照百分比", type: "percent", value: sizeSnapShot?.percent },
  ];

  return (
    <div>
      <Radio.Group className="layout-rows" onChange={handleRadioChange} css={[tw`w-full mb-3`, radioGroupStyle]}>
        {sizeScaleItemList.map(({ text, type, value }, index) => (
          <SizeScaleItem
            key={index}
            text={text}
            type={type}
            value={value}
            active={activeKey === index}
            radio={<Radio value={index} css={tw`mr-2`} />}
            // @ts-ignore
            onChange={(value) => handleInputChange(type, value)}
          />
        ))}
      </Radio.Group>
      <ButtonGroup onOk={handleOk} onCancel={handleCancel} disableOnOk={!sizeSnapShot?.width} />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const radioGroupStyle = css`
  &.ant-radio-group {
    color: ${theme.colors.default};
    .ant-radio-wrapper {
      margin-right: 8px;
    }
  }
  .ant-radio-wrapper {
    color: ${theme.colors.default};
    outline: none;
    display: flex;
    justify-content: space-between;
  }
  .ant-radio-inner {
    border-width: 2px;
    background-color: transparent;
  }
  .ant-radio-inner::after {
    top: 2px;
    left: 2px;
  }
`;
