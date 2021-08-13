import { useValue } from "@/core/utils";
import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { renameImage } from "@/logic/action/imageList";
import { getBathStatus } from "@/logic/get/batchStatus";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { FC, useCallback, useMemo, useState } from "react";
import { Checkbox, Divider, Input, InputNumber, message } from "tezign-ui";
import tw from "twin.macro";

const log = console.log.bind(console);
// * --------------------------------------------------------------------------- comp

export const BatchRename: FC = () => {
  const [name, setName] = useState<string>("");
  const [hasOrder, setHasOrder] = useState<boolean>(false);
  const [order, setOrder] = useState<number | undefined>();

  const batchStatus = useValue(() => getBathStatus());

  const cancel = () => {
    setName("");
    setHasOrder(false);
    setOrder(undefined);
  };

  const info = useMemo(() => {
    const renameByDefault = name && !hasOrder;
    const renameByOrder = name && hasOrder && order && order > 0;
    if (renameByDefault) {
      return {
        disabled: false,
        text: `${name}1、${name}2`,
      };
    } else if (renameByOrder) {
      return {
        disabled: false,
        text: `${name}${order}、${name}${order! + 1}`,
      };
    } else {
      return {
        disabled: true,
        text: "无",
      };
    }
  }, [name, hasOrder, order]);

  const rename = useCallback(() => {
    log("ok", name, hasOrder, order);
    renameImage({
      name,
      hasOrder,
      order,
      batchStatus: batchStatus,
    });
    message.success("批量命名成功！");
  }, [name, hasOrder, order, batchStatus]);

  return (
    <div css={tw`flex flex-col`}>
      <p css={tw`mt-2`}>替换全部文件前缀名称</p>

      <Input
        placeholder="例如：特赞图片"
        css={[tw`mt-4`, inputStyle]}
        size="small"
        value={name}
        onChange={(e: any) => setName(e.target.value)}
      />

      <div css={[tw`flex items-center mt-4`, orderStyle]}>
        <Checkbox css={[checkboxStyle]} checked={hasOrder} onChange={(e: any) => setHasOrder(e.target.checked)}>
          添加序号
        </Checkbox>
        {hasOrder && (
          <InputNumber
            size="small"
            css={inputNumberStyle}
            indicated={false}
            placeholder="请输入整数"
            value={order}
            onChange={(v) => {
              if (typeof v === "number") {
                let value: number = v;
                if (v === 0) {
                  value += 1;
                }
                setOrder(value);
              }
            }}
          />
        )}
      </div>

      {!hasOrder && (
        <div css={tw`flex items-center mt-2`}>
          <WarningIcon />
          <p css={tw`ml-2 text-xs`}>无添加序号，则默认序号从 1 开始</p>
        </div>
      )}

      <Divider css={dividerStyle} />

      <div css={tw`mb-2 overflow-hidden overflow-ellipsis`} style={{ width: 248 }}>
        示例：{info.text}
      </div>

      <ButtonGroup onOk={rename} disableOnOk={info.disabled} onCancel={() => cancel()} />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const inputStyle = css`
  &.ant-input {
    color: ${theme.colors.default};
    background-color: transparent;
  }
`;

const orderStyle = css`
  min-height: 30px;
`;
const checkboxStyle = css`
  min-width: 90px;
  color: ${theme.colors.default};
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #0cc5ae;
  }
  .ant-checkbox-inner {
    background-color: transparent;
  }
`;

const inputNumberStyle = css`
  margin-left: 20px;
  width: 100%;
  flex: 1;
  background-color: transparent;
  .ant-input-number-input {
    color: ${theme.colors.default};
  }
`;

const dividerStyle = css`
  margin-top: 16px;
  margin-bottom: 16px;
  background-color: ${theme.bgColors.medium};
`;

const WarningIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.78529 1.5189C9.12534 1.68892 9.40107 1.96465 9.57109 2.3047L14.4805 12.1234C14.9144 12.9914 14.5626 14.0468 13.6946 14.4808C13.4507 14.6028 13.1816 14.6663 12.9088 14.6663H3.09012C2.11969 14.6663 1.33301 13.8797 1.33301 12.9092C1.33301 12.6364 1.39652 12.3674 1.51851 12.1234L6.42787 2.3047C6.86186 1.43672 7.91731 1.08491 8.78529 1.5189ZM7.49117 2.9807L2.72636 12.5103C2.68689 12.5893 2.66634 12.6763 2.66634 12.7645C2.66634 13.0785 2.92085 13.333 3.2348 13.333H12.7644C12.8527 13.333 12.9397 13.3125 13.0186 13.273C13.2995 13.1326 13.4133 12.7911 13.2729 12.5103L8.50806 2.9807C8.45305 2.87069 8.36385 2.78149 8.25383 2.72648C7.97303 2.58608 7.63157 2.6999 7.49117 2.9807ZM7.99967 10.6663C8.36786 10.6663 8.66634 10.9648 8.66634 11.333C8.66634 11.7012 8.36786 11.9997 7.99967 11.9997C7.63148 11.9997 7.33301 11.7012 7.33301 11.333C7.33301 10.9648 7.63148 10.6663 7.99967 10.6663ZM7.99967 5.33301C8.36786 5.33301 8.66634 5.63148 8.66634 5.99967V8.66634C8.66634 9.03453 8.36786 9.33301 7.99967 9.33301C7.63148 9.33301 7.33301 9.03453 7.33301 8.66634V5.99967C7.33301 5.63148 7.63148 5.33301 7.99967 5.33301Z"
      fill="#FFA730"
    />
  </svg>
);
