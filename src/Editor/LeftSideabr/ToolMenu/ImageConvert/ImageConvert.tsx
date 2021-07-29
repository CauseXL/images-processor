import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { theme } from "@/styles/theme";
import { EImageType, urltoBlob } from "@/utils/imageTransferFuns";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useState } from "react";
import { InputNumber, message, Radio } from "tezign-ui";
import tw from "twin.macro";
import { compressAccurately } from "./logic/compress";

const { Group } = Radio;

// * --------------------------------------------------------------------------- comp
interface CompressConfig {
  type: "origin" | "custom" | undefined;
  targetSize: number | null;
}

const defaultCompressConfig = {
  type: undefined,
  targetSize: null,
};

export const ImageConvert: FC = () => {
  const [compressConfig, setCompressConfig] = useState<CompressConfig>(defaultCompressConfig);

  const handleRadioChange = (e) => {
    setCompressConfig({
      ...compressConfig,
      type: e.target.value,
    });
  };

  const handleInputChange = (value) => {
    setCompressConfig({
      ...compressConfig,
      targetSize: value,
    });
  };

  const onSubmit = async () => {
    if (compressConfig.type === "custom" && !compressConfig.targetSize) {
      message.warn("请输入目标大小");
      return;
    }

    if (compressConfig.type === "origin") {
      // TODO: change to pageData.originStatus
      console.log("还原到原图");
    }

    if (compressConfig.type === "custom" && compressConfig.targetSize) {
      const jpgUrl = "https://tse4-mm.cn.bing.net/th/id/OIP-C.WtnU9WUh7x3E6z1MbalbnwHaE7?pid=ImgDet&rs=1";
      const pngUrl =
        "https://th.bing.com/th/id/R.db1afb84321cf6949b2974ab4e51cd21?rik=gIgYTwMAawc8uQ&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_37980.png&ehk=ou9vjUKB2HEl2g1qIElfRn9V0LwXVH%2fCUODeDuRs3fo%3d&risl=&pid=ImgRaw";
      const file = await urltoBlob(jpgUrl);
      compressAccurately(file, { size: compressConfig.targetSize, type: EImageType.JPEG }).then((res) => {
        console.log(res);
      });
      // TODO: 批量操作
    }
  };

  const onCancel = () => {
    setCompressConfig({
      ...defaultCompressConfig,
    });
  };

  return (
    <div>
      <Group
        name="radiogroup"
        className="layout-rows"
        onChange={handleRadioChange}
        css={radioGroupStyle}
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
      <ButtonGroup onOk={onSubmit} onCancel={onCancel} disabled={!compressConfig.type} />
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
