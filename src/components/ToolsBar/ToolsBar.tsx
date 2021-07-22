import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useMemo } from "react";
import tw from "twin.macro";
import { ZoomBar } from "./ZoomBar";

export const ToolsBar: FC = () => {
  return useMemo(
    () => (
      <div css={[tw`flex justify-between absolute left-2/4 transform -translate-x-1/2`, toolsBarStyle]}>
        <ZoomBar />
      </div>
    ),
    [],
  );
};

// * ------------------------------------------- style

const toolsBarStyle = css`
  bottom: 16px;
  z-index: 1000;
  transition: 0.3s;
  opacity: 1;

  &.hidden {
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  .buttons {
    cursor: pointer;
    line-height: 30px;
    font-size: 12px;
    border-radius: ${theme["primary-border-radius"]};
    float: left;
    text-align: center;
    &:hover {
      background-color: #f5f5f5;
    }
  }
  .sizeButton {
    width: 50px;
  }
  .layerButton {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
`;
