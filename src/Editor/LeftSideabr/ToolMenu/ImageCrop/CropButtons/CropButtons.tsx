import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React, { ReactElement } from "react";
import { Button } from "tezign-ui";
import tw from "twin.macro";
import {
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCropIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from "../ImageCropIcons";

// * --------------------------------------------------------------------------- comp

export const CropButtons: React.FC = () => {
  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <CropButton icon={<FlipHorizontalIcon />} />
      <CropButton icon={<FlipVerticalIcon />} />
      <CropButton icon={<RotateLeftIcon />} />
      <CropButton icon={<RotateRightIcon />} />
      <CropButton icon={<RotateCropIcon />} />
    </div>
  );
};

const CropButton: React.FC<{ icon: string | ReactElement }> = ({ icon }) => (
  <Button
    icon={icon}
    type="neutral"
    css={[tw`flex justify-center items-center w-9 h-9 border-0 rounded`, cropButtonStyle]}
  />
);

// * --------------------------------------------------------------------------- style

const cropButtonStyle = css`
  &.tz-btn.type-neutral {
    color: ${theme.colors.default};
    background-color: ${theme.bgColors.light};
  }
`;
