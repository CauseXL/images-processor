import { SizeScaleItem } from "@/Editor/LeftSideabr/ToolMenu/SizeScale/SizeScaleItem";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { FC, memo, useState } from "react";
import { Radio } from "tezign-ui";
import tw from "twin.macro";
import { ButtonGroup } from "../components/ButtonGroup";

// * --------------------------------------------------------------------------- inner state helper

type SCALE_OPTION_TYPE = "height" | "width" | "percent";

interface SCALE_OPTION {
  type: SCALE_OPTION_TYPE;
  value?: number;
}

const SCALE_OPTION_LIST = [
  ["height", "按照高度"],
  ["width", "按照宽度"],
  ["percent", "按照百分比"],
];

const DEFAULT_SCALE_OPTION: Record<SCALE_OPTION_TYPE, SCALE_OPTION> = {
  height: { type: "height" },
  width: { type: "width" },
  percent: { type: "percent", value: 100 },
};

// * --------------------------------------------------------------------------- comp

export const SizeScale: FC = memo(() => {
  const [opt, setOpt] = useState(DEFAULT_SCALE_OPTION.percent);
  const { type: curType, value } = opt;

  // * ---------------------------

  return (
    <div>
      <Radio.Group
        className="layout-rows"
        // @ts-ignore
        onChange={(e) => {
          // @ts-ignore
          const nextType: SCALE_OPTION_TYPE = e.target.value;
          setOpt(DEFAULT_SCALE_OPTION[nextType]);
        }}
        css={[tw`w-full mb-3`, radioGroupStyle]}
      >
        {SCALE_OPTION_LIST.map(([type, label]) => (
          <SizeScaleItem
            key={type}
            type={type}
            text={label}
            active={type === curType}
            value={value}
            radio={<Radio value={type} css={tw`mr-2`} />}
            // @ts-ignore
            onChange={(value: number) => {
              setOpt((s) => ({ ...s, value }));
            }}
          />
        ))}
      </Radio.Group>
      <ButtonGroup
        onOk={() => {
          console.log("TODO scale images", opt);
        }}
        onCancel={() => {
          // TODO cancel
        }}
        disableOnOk={
          // TODO
          false
        }
      />
    </div>
  );
});

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
