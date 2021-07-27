import { SizeScaleItemType } from "@/Editor/LeftSideabr/ToolMenu/SizeScale/SizeScale";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { InputNumber } from "tezign-ui";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- inter

interface SizeScaleItemProps {
  text: string;
  radio: ReactNode;
  type: SizeScaleItemType["type"];
  active?: boolean;
  value?: number;
  onChange: (value: number) => void;
}

// * --------------------------------------------------------------------------- comp

const MIN_PERCENT = 1;
const MIN_SHAPE = 20;

export const SizeScaleItem: FC<SizeScaleItemProps> = ({
  text,
  radio,
  type = "number",
  active = false,
  value,
  onChange,
}) => {
  return (
    <div css={[tw`flex items-center w-full mt-4`, sizeScaleItemStyle]}>
      {radio}
      <div css={tw`flex-1 select-none`}>{text}</div>
      {active && (
        <InputNumber
          size="small"
          value={value}
          indicated={false}
          placeholder="请输入整数"
          min={type === "percent" ? MIN_PERCENT : MIN_SHAPE}
          suffix={type === "percent" && "%"}
          onChange={(value) => onChange(value as unknown as number)}
        />
      )}
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const sizeScaleItemStyle = css`
  .tui-input-number-wrap {
    width: 110px;
  }
  .ant-input-number,
  .ant-input-number.no-indicated {
    width: 110px;
    color: ${theme.colors.default};
    background-color: transparent;
  }
`;
