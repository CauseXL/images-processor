import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { SizeScaleItem } from "@/Editor/LeftSideabr/ToolMenu/SizeScale/SizeScaleItem";
import { updateCurrentImage } from "@/logic/action/currentImage";
import { getBathStatus } from "@/logic/get/batchStatus";
import { getCurrentImage } from "@/logic/get/currentImage";
import { theme } from "@/styles/theme";
import { debouncePromise } from "@/utils/debouncePromise";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { message, ModalV2 as Modal, Radio } from "tezign-ui";
import tw from "twin.macro";
import { batchScaleImage, scaleImage, SizeScaleType } from "./logic/scale";

// * --------------------------------------------------------------------------- type

export interface SizeScaleItemType {
  text: string;
  type: "height" | "width" | "percent";
  value?: number;
}

// * --------------------------------------------------------------------------- comp

export const SizeScale: FC = () => {
  const [activeKey, setActiveKey] = useState<number | null>();
  const data = useValue(() => pageData.get());
  const currentImage = useValue(() => getCurrentImage());
  const batchStatus = useValue(() => getBathStatus());
  const [sizeState, setSizeState] = useState<SizeScaleType>({});

  useEffect(() => {
    setSizeState({
      ...sizeState,
      width: currentImage.width,
      height: currentImage.height,
    });
  }, [currentImage]);

  const handleInputChange = (type: SizeScaleItemType["type"], value: number) => {
    let result = { [type]: value };
    const { width, height } = currentImage;

    if (!Object.keys(sizeState).length) {
      setSizeState({ ...sizeState, width, height });
      return;
    }
    if (type === "width") result.height = Number((value / (width / height)).toFixed(0));
    if (type === "height") result.width = Number((value * (width / height)).toFixed(0));
    if (type === "percent") {
      result.width = Number(((value / 100) * width).toFixed(0));
      result.height = Number(((value / 100) * height).toFixed(0));
    }
    setSizeState({ ...sizeState, ...result, type, scale: value });
  };

  const handleOk = async () => {
    if (!sizeState.width || !sizeState.height) {
      message.warning("请输入大小！");
      return;
    }
    if (batchStatus) {
      const modal = Modal.alert({
        type: "danger",
        width: 300,
        footer: null,
        closable: false,
        maskClosable: false,
        content: "正在处理批量尺寸缩放，请稍后...",
      });
      debouncePromise(200)
        .then(() => batchScaleImage(data, sizeState))
        .then(() => modal.destroy());
    } else {
      const { url: curOriginUrl } = currentImage;
      const imgData = await scaleImage(curOriginUrl, sizeState);
      const newData = { ...currentImage, ...imgData, crop: { ...currentImage.crop, ...imgData } };
      // @ts-ignore
      updateCurrentImage(newData);
    }
  };

  const handleCancel = () => {
    if (typeof activeKey === "number") {
      const { width, height } = currentImage;
      const { value } = sizeScaleItemList[activeKey];
      setSizeState({ ...sizeState, width, height, scale: value });
    }
  };

  const handleRadioChange = (e: any) => {
    const { type, value } = sizeScaleItemList[e.target.value];
    setActiveKey(e.target.value);
    setSizeState({ ...sizeState, type, scale: value });
  };

  const sizeScaleItemList: SizeScaleItemType[] = [
    { text: "按照高度", type: "height", value: sizeState?.height },
    { text: "按照宽度", type: "width", value: sizeState?.width },
    { text: "按照百分比", type: "percent", value: 100 },
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
            onChange={(value: any) => handleInputChange(type, value)}
          />
        ))}
      </Radio.Group>
      <ButtonGroup onOk={handleOk} onCancel={handleCancel} disableOnOk={!(typeof activeKey === "number")} />
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
