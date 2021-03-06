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
import { message, Modal, Radio } from "antd";
import type { FC } from "react";
import { useEffect, useState } from "react";
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
    if (type === "width") {
      result.height = Number((value / (width / height)).toFixed(0));
    } else if (type === "height") {
      result.width = Number((value * (width / height)).toFixed(0));
    } else if (type === "percent") {
      result.width = Number(((value / 100) * width).toFixed(0));
      result.height = Number(((value / 100) * height).toFixed(0));
    }
    setSizeState({ ...sizeState, ...result, type, scale: value });
  };

  const handleOk = async () => {
    if (!sizeState.width || !sizeState.height) {
      message.warning("??????????????????");
      return;
    }
    if (batchStatus) {
      const modal = Modal.info({
        type: "danger",
        width: 300,
        maskClosable: false,
        content: "??????????????????????????????????????????...",
        okButtonProps: { disabled: true },
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
      setSizeState({ ...sizeState, width, height, scale: undefined });
    }
  };

  const handleRadioChange = (e: any) => {
    const { type, value } = sizeScaleItemList[e.target.value];
    setActiveKey(e.target.value);
    if (type === "percent") {
      setSizeState({ ...sizeState, type, scale: value });
    } else {
      setSizeState({ ...sizeState, type });
    }
  };

  const sizeScaleItemList: SizeScaleItemType[] = [
    { text: "????????????", type: "height", value: sizeState?.height },
    { text: "????????????", type: "width", value: sizeState?.width },
    { text: "???????????????", type: "percent", value: sizeState?.scale },
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
