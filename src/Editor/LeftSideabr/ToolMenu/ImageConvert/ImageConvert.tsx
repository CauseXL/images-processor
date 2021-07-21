import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";
import { InputNumber, Radio } from "tezign-ui";
import tw from "twin.macro";
const { Group } = Radio;

// * --------------------------------------------------------------------------- comp

export const ImageConvert: React.FC = () => {
  const handleRadioChange = () => console.log(1111111);

  return (
    <div>
      <Group className="layout-rows" onChange={handleRadioChange} css={radioGroupStyle}>
        <RadioItem text="原图品质" radio={<Radio value={1} css={tw`mr-2`} />} />
        <RadioItem text="自定义品质" radio={<Radio value={2} css={tw`mr-2`} />} />
      </Group>
      <div css={tw`flex justify-between`}>
        <p>目标大小</p>
        <InputNumber placeholder="请输入整数" css={inputStyle} size="small" indicated={false} suffix="KB" />
      </div>
      <ButtonGroup />
    </div>
  );
};

// * ---------------------------

const RadioItem: React.FC<{ text: string; radio: any }> = ({ text, radio }) => {
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
