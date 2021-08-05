import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import tw from "twin.macro";
import { Canvas } from "./Canvas/Canvas";
import { ZoomBar } from "./ZoomBar/ZoomBar";

// * --------------------------------------------------------------------------- comp

export const Main: FC = () => {
  return (
    <div css={[tw`relative flex flex-1 overflow-hidden`, mainStyle]}>
      <Canvas />
      <ZoomBar />
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const mainStyle = css`
  //background-color: ${theme.bgColors.dark};
`;
