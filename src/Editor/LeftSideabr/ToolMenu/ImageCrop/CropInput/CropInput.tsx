import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { InputNumber } from "tezign-ui";
import tw from "twin.macro";
import { CropLockIcon } from "../ImageCropIcons";

// * --------------------------------------------------------------------------- comp

export const CropInput: FC = () => {
  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <InputNumber placeholder="宽度" size="small" indicated={false} css={cropInputStyle} />
      <CropLockIcon />
      <InputNumber placeholder="高度" size="small" indicated={false} css={cropInputStyle} />
    </div>
  );
};

// * --------------------------------------------------------------------------- style
const cropInputStyle = css`
  max-width: 150px;
  &.ant-input-number {
    color: ${theme.colors.default};
    background-color: transparent;
  }
`;
