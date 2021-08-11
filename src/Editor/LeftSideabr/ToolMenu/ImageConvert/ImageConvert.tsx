import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { updateCurrentImage } from "@/logic/action/currentImage";
import { resetImageList } from "@/logic/action/imageList";
import { getBathStatus } from "@/logic/get/batchStatus";
import { getCurrentImage } from "@/logic/get/currentImage";
import { theme } from "@/styles/theme";
import { debouncePromise } from "@/utils/debouncePromise";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useState } from "react";
import { InputNumber, message, ModalV2 as Modal, Radio } from "tezign-ui";
import tw from "twin.macro";
import { batchCompress, compress, ICompressConfig } from "./logic/compress";

const { Group } = Radio;
const defaultCompressConfig: ICompressConfig = {
  type: undefined,
  targetSize: null,
};

// * --------------------------------------------------------------------------- comp
export const ImageConvert: FC = () => {
  const currentImage = useValue(getCurrentImage);
  const batchStatus = useValue(() => getBathStatus());
  const [compressConfig, setCompressConfig] = useState<ICompressConfig>(defaultCompressConfig);

  const handleRadioChange = (e: any) => {
    setCompressConfig({ ...compressConfig, type: e.target.value });
  };

  const handleInputChange = (value: any) => {
    setCompressConfig({ ...compressConfig, targetSize: value });
  };

  const onCancel = () => {
    setCompressConfig({ ...defaultCompressConfig });
  };

  const batchCompressAction = () => {
    const modal = Modal.alert({
      type: "danger",
      width: 300,
      footer: null,
      closable: false,
      maskClosable: false,
      content: "正在批量压缩，请稍后...",
    });
    debouncePromise(200)
      .then(() => batchCompress(pageData.get(), compressConfig))
      .then(() => modal.destroy());
  };

  const onSubmit = async () => {
    if (compressConfig.type === "custom" && !compressConfig.targetSize) {
      message.warn("请输入目标大小");
      return;
    }

    if (compressConfig.type === "origin") {
      if (batchStatus) {
        resetImageList();
        message.success("批量还原成功！");
      } else {
        const { url: oUrl, size: oSize } = currentImage.origin;
        updateCurrentImage({ url: oUrl, size: oSize });
        message.success("还原成功！");
      }
    }

    if (compressConfig.type === "custom" && compressConfig.targetSize) {
      if (batchStatus) {
        await batchCompressAction();
      } else {
        if ((currentImage.size || 0) / 1024 <= compressConfig.targetSize) {
          message.warning(
            `指定体积 ${compressConfig.targetSize}KB 大于原文件体积 ${((currentImage.size || 0) / 1024).toFixed(0)}KB`,
          );
          return;
        }
        await compress(currentImage, compressConfig);
      }
    }
  };

  return (
    <div>
      <Group
        name="radiogroup"
        className="layout-rows"
        css={radioGroupStyle}
        onChange={handleRadioChange}
        value={compressConfig.type}
      >
        <RadioItem text="原图品质" radio={<Radio value="origin" css={tw`mr-2`} />} />
        <RadioItem text="自定义品质" radio={<Radio value="custom" css={tw`mr-2`} />} />
      </Group>
      {compressConfig.type === "custom" && (
        <div css={tw`flex justify-between`}>
          <p>目标大小</p>
          <InputNumber
            placeholder="请输入整数"
            css={inputStyle}
            size="small"
            indicated={false}
            suffix="KB"
            min={1}
            precision={0}
            onChange={handleInputChange}
          />
        </div>
      )}
      <ButtonGroup onOk={onSubmit} onCancel={onCancel} disableOnOk={!compressConfig.type} />
    </div>
  );
};

// * ---------------------------
const RadioItem: FC<{ text: string; radio: any }> = ({ text, radio }) => {
  return (
    <div css={radioItemStyle}>
      {radio}
      <div css={tw`flex-1`}>{text}</div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style
const radioGroupStyle = css`
  width: 100%;
  margin-bottom: 12px;
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

const radioItemStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const inputStyle = css`
  max-width: 150px;
  .ant-input-number {
    color: ${theme.colors.default};
    background-color: transparent;
  }
`;
