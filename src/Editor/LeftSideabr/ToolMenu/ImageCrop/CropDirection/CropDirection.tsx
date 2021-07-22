import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import tw from "twin.macro";
import { DirectionIcon } from "../ImageCropIcons";

// * --------------------------------------------------------------------------- comp

export const CropDirection: FC = () => {
  return (
    <div css={[tw`flex justify-between items-center mt-4 mb-2 p-2 cursor-pointer rounded`, cropDirectionStyle]}>
      <p css={tw`select-none`}>选择方位裁切</p>
      <DirectionIcon />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const cropDirectionStyle = css`
  background-color: ${theme.bgColors.light};
`;
