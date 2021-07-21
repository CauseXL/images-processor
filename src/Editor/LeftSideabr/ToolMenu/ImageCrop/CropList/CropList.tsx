import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

export const CropList = () => {
  return <div css={[tw`rounded mt-2`, cropListStyle]} />;
};

// * --------------------------------------------------------------------------- style

const cropListStyle = css`
  height: 128px;
  background-color: ${theme.bgColors.light};
`;