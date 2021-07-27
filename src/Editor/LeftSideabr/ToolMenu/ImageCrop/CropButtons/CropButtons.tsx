import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC, ReactElement } from "react";
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

export const CropButtons: FC = () => {
  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <CropButton icon={<FlipHorizontalIcon />} alt="垂直翻转" />
      <CropButton icon={<FlipVerticalIcon />} alt="水平翻转" />
      <CropButton icon={<RotateLeftIcon />} alt="旋转 -90 度" />
      <CropButton icon={<RotateRightIcon />} alt="旋转 90 度" />
      <CropButton icon={<RotateCropIcon />} alt="裁剪框旋转" />
    </div>
  );
};

const CropButton: FC<{ icon: string | ReactElement; alt: string }> = ({ icon, alt }) => (
  <Tooltip placement="bottom" title={alt}>
    <Button
      icon={icon}
      type="neutral"
      css={[tw`flex justify-center items-center w-9 h-9 border-0 rounded`, cropButtonStyle]}
    />
  </Tooltip>
);

// * --------------------------------------------------------------------------- style

const cropButtonStyle = css`
  &.tz-btn.type-neutral {
    color: ${theme.colors.default};
    background-color: ${theme.bgColors.light};
  }
`;
