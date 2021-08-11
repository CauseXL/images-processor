import { cropData } from "@/core/data/cropData";
import { rafBatch } from "@/core/utils";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC, ReactElement } from "react";
import { memo } from "react";
import { Button, Tooltip } from "tezign-ui";
import tw from "twin.macro";
import {
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCropIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from "../ImageCropIcons";

// * --------------------------------------------------------------------------- comp

export const CropButtons: FC = memo(() => {
  const handleScaleX = () => {
    rafBatch(() => {
      cropData.set((data) => {
        const [scaleX, scaleY] = data.flip;
        data.flip = [-scaleX as 1 | -1, scaleY];
      });
    }).then();
  };

  const handleScaleY = () => {
    rafBatch(() => {
      cropData.set((data) => {
        const [scaleX, scaleY] = data.flip;
        data.flip = [scaleX, -scaleY as 1 | -1];
      });
    }).then();
  };

  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <CropButton icon={<FlipHorizontalIcon />} alt="垂直翻转" onClick={handleScaleY} />
      <CropButton icon={<FlipVerticalIcon />} alt="水平翻转" onClick={handleScaleX} />
      <CropButton icon={<RotateLeftIcon />} alt="旋转 -90 度" />
      <CropButton icon={<RotateRightIcon />} alt="旋转 90 度" />
      <CropButton icon={<RotateCropIcon />} alt="裁剪框旋转" />
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
