import { MIN_CROP_LENGTH } from "@/constant";
import { cropData } from "@/core/data/cropData";
import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { theme } from "@/styles/theme";
import { css } from "@emotion/css";
import { useDebounceFn } from "ahooks";
import type { FC } from "react";
import { InputNumber } from "tezign-ui";
// @ts-ignore
import { tw } from "twind";
import { CropLockIcon } from "../Icon";

// * --------------------------------------------------------------------------- comp

export const CropInput: FC = () => {
  const { width, height } = useValue(getCropData);

  // TODO: number limit // XuYuCheng 2021/08/12
  const handleCropSizeChange = (val: number | null | undefined, type: "width" | "height") => {
    if (val === null || val === undefined) return;
    cropData.set((data) => {
      data[type] = val;
    });
  };

  const { run } = useDebounceFn(handleCropSizeChange, { wait: 500 });

  // TODO: 组件库这里的类型有问题 // XuYuCheng 2021/08/12
  const updateCropWidth = (val: any) => run(val, "width");
  const updateCropHeight = (val: any) => run(val, "height");

  return (
    <div className={tw`flex justify-between items-center mt-4`}>
      <InputItem placeholder="宽度" value={width} onChange={updateCropWidth} />
      <CropLockIcon />
      <InputItem placeholder="高度" value={height} onChange={updateCropHeight} />
    </div>
  );
};

// * ---------------------------

const InputItem: FC<{ placeholder: string; value: number; onChange: (val: any) => void }> = ({
  placeholder,
  value,
  onChange,
}) => (
  <InputNumber
    className={input}
    placeholder={placeholder}
    size="small"
    precision={0}
    indicated={false}
    min={MIN_CROP_LENGTH}
    value={round(value)}
    onChange={onChange}
  />
);

// * --------------------------------------------------------------------------- style

const input = css`
  max-width: 150px;
  &.ant-input-number {
    color: ${theme.colors.default};
    background-color: transparent;
  }
`;

// * --------------------------------------------------------------------------- util

const round = (val: number | null) => (val ? Number(val.toFixed(0)) : null);
