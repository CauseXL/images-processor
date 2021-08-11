import { CropType } from "@/core/data";
import { cropData } from "@/core/data/cropData";
import { rafBatch } from "@/core/utils";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC, ReactElement } from "react";
import { memo, useState } from "react";
import { Button, Tooltip } from "tezign-ui";
import tw from "twin.macro";
import {
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCropIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from "../ImageCropIcons";

// notice arr sort
const rotateArr: CropType["rotate"][] = [0, 90, 180, -90];

type RotateIndexType = 0 | 1 | 2 | 3;

// * --------------------------------------------------------------------------- comp

export const CropButtons: FC = memo(() => {
  const [rotateIndex, setRotateIndex] = useState<RotateIndexType>(0);

  // * ---------------------------

  const handleScale = (axis: "x" | "y") => {
    rafBatch(() => {
      cropData.set((data) => {
        const [scaleX, scaleY] = data.flip;
        const [resultX, resultY] = axis === "x" ? [-scaleX as 1 | -1, scaleY] : [scaleX, -scaleY as 1 | -1];
        data.flip = [resultX, resultY];
      });
    }).then();
  };

  // * ---------------------------

  const handleRotate = (direction: "left" | "right") => {
    const offset = direction === "left" ? -1 : +1;
    const newIndex = ((rotateIndex + rotateArr.length + offset) % 4) as RotateIndexType;
    setRotateIndex(newIndex);
    rafBatch(() => {
      cropData.set((data) => {
        data.rotate = rotateArr[newIndex];
      });
    }).then();
  };

  // * ---------------------------

  const handleRotateCrop = () => {
    rafBatch(() => {
      cropData.set((data) => {
        const { width, height, x, y } = data;
        data.width = height;
        data.height = width;
        data.x = y;
        data.y = x;
      });
    }).then();
  };

  // * ---------------------------

  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <CropButton icon={<FlipHorizontalIcon />} alt="垂直翻转" onClick={() => handleScale("y")} />
      <CropButton icon={<FlipVerticalIcon />} alt="水平翻转" onClick={() => handleScale("x")} />
      <CropButton icon={<RotateLeftIcon />} alt="旋转 -90 度" onClick={() => handleRotate("left")} />
      <CropButton icon={<RotateRightIcon />} alt="旋转 90 度" onClick={() => handleRotate("right")} />
      <CropButton icon={<RotateCropIcon />} alt="裁剪框旋转" onClick={handleRotateCrop} />
    </div>
  );
});

// * ---------------------------

const CropButton: FC<{ icon: string | ReactElement; alt: string; onClick?: () => void }> = memo(
  ({ icon, alt, onClick }) => (
    <Tooltip placement="bottom" title={alt}>
      <Button
        onClick={onClick}
        icon={icon}
        type="neutral"
        css={[tw`flex justify-center items-center w-9 h-9 border-0 rounded`, cropButtonStyle]}
      />
    </Tooltip>
  ),
);

// * --------------------------------------------------------------------------- style

const cropButtonStyle = css`
  &.tz-btn.type-neutral {
    color: ${theme.colors.default};
    background-color: ${theme.bgColors.light};
  }
`;
