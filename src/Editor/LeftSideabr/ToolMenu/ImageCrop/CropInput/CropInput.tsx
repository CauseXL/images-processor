import { MIN_CROP_LENGTH } from "@/constant";
import { cropData } from "@/core/data/cropData";
import { useValue } from "@/core/utils";
import { useSelectCustomTemplate } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropTemplate/CropTemplate";
import { getCropData, useCropRatioLocked } from "@/logic/get/cropData";
import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import { useDebounceFn } from "ahooks";
import type { FC } from "react";
import { memo, useMemo } from "react";
import { InputNumber, Tooltip } from "tezign-ui";
import { InputNumberProps } from "tezign-ui/lib/input-number";
// @ts-ignore
import { tw } from "twind";
import { CropLockIcon, CropUnLockIcon } from "../Icon";

// * --------------------------------------------------------------------------- comp

export const CropInput: FC = memo(() => {
  const [isLocked, setIsLocked] = useCropRatioLocked();
  const cropInfo = useValue(getCropData);
  const { x, y, width, height, originWidth, originHeight, aspectRatio } = cropInfo;

  // * ---------------------------

  const [minWidth, minHeight] =
    aspectRatio === null
      ? [MIN_CROP_LENGTH, MIN_CROP_LENGTH]
      : aspectRatio > 1
      ? [aspectRatio * MIN_CROP_LENGTH, MIN_CROP_LENGTH]
      : [MIN_CROP_LENGTH, MIN_CROP_LENGTH / aspectRatio];

  const originRatio = originWidth / originWidth;
  const [maxWidth, maxHeight] =
    aspectRatio === null
      ? [originWidth, originHeight]
      : aspectRatio > originRatio
      ? [originWidth, originWidth / aspectRatio]
      : [originHeight * aspectRatio, originHeight];

  // * ---------------------------

  // TODO: 还不如直接拆成 width height 呢，多了点重复代码而已 // XuYuCheng 2021/08/16
  // TODO: 代码写得有点屎，之后用 ramda 优化 // XuYuCheng 2021/08/16
  const handleCropSizeChange = (val: number | null | undefined, type: "width" | "height") => {
    if (val === null || val === undefined) return;

    if (isLocked) {
      const [resultWidth, resultHeight] = [
        limitInput(type === "width" ? val : (val / height) * width, minWidth, maxWidth),
        limitInput(type === "width" ? (val / width) * height : val, minHeight, maxHeight),
      ];
      return cropData.set((data) => {
        data.width = resultWidth;
        data.height = resultHeight;
        if (x + resultWidth > originWidth) data.x = originWidth - resultWidth;
        if (y + resultHeight > originHeight) data.y = originHeight - resultHeight;
      });
    }

    return cropData.set((data) => {
      if (type === "width") {
        data.width = limitInput(val, MIN_CROP_LENGTH, originWidth);
        if (x + val > originWidth) data.x = originWidth - val;
      } else {
        data.height = limitInput(val, MIN_CROP_LENGTH, originHeight);
        if (y + val > originHeight) data.y = originHeight - val;
      }
    });
  };
  const { run } = useDebounceFn(handleCropSizeChange, { wait: 500 });

  const selectCustomTemplate = useSelectCustomTemplate();
  const handleToggleRatioLock = () => {
    setIsLocked(!isLocked);
    isLocked && selectCustomTemplate();
  };

  // * ---------------------------

  return useMemo(
    () => (
      <div className={tw`flex justify-between items-center mt-4`}>
        <InputItem
          placeholder="宽度"
          min={minWidth}
          max={maxWidth}
          value={width}
          onChange={(val: any) => run(val, "width")}
        />

        <Tooltip placement="bottom" title="比例锁定">
          <div
            className={cx(tw`flex items-center justify-center cursor-pointer`, lock)}
            onClick={handleToggleRatioLock}
          >
            {isLocked ? <CropLockIcon /> : <CropUnLockIcon />}
          </div>
        </Tooltip>

        <InputItem
          placeholder="高度"
          min={minHeight}
          max={maxHeight}
          value={height}
          onChange={(val: any) => run(val, "height")}
        />
      </div>
    ),
    [width, height, run, maxWidth, maxHeight, minWidth, minHeight, isLocked, handleToggleRatioLock],
  );
});

// * ---------------------------

interface InputItemProps extends InputNumberProps {
  value: number;
}

const InputItem: FC<InputItemProps> = memo(({ placeholder, value, onChange, min, max }) => (
  <InputNumber
    className={input}
    placeholder={placeholder}
    size="small"
    precision={0}
    indicated={false}
    min={min}
    max={max}
    value={round(value)}
    // @ts-ignore
    onChange={onChange}
  />
));

// * --------------------------------------------------------------------------- style

const input = css`
  width: 104px;
  max-width: 150px;
  &.ant-input-number {
    color: ${theme.colors.default};
    background-color: transparent;
  }
`;

const lock = css`
  background-color: ${theme.bgColors.light};
`;

// * --------------------------------------------------------------------------- util

const round = (val: number | null) => (val ? Number(val.toFixed(0)) : null);

const limitInput = (val: number, min: number, max: number) => (val < min ? min : val > max ? max : val);
