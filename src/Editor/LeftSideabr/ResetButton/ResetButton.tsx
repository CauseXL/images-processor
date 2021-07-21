import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React from "react";
import { Button } from "tezign-ui";
import tw from "twin.macro";

export const ResetButton: React.FC = () => {
  return (
    <div css={[resetBtnStyle, tw`flex justify-center`]}>
      <Button type="danger" ghost="text">
        一键还原
      </Button>
    </div>
  );
};

const resetBtnStyle = css`
  padding-top: 14px;
  padding-bottom: 14px;
  border-top: 1px solid ${theme.bgColors.dark};
`;
