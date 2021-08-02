import { Snap } from "@/hooks/usePageData";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { Button } from "tezign-ui";
import tw from "twin.macro";

export const ResetButton: FC = () => {
  return (
    <div css={[resetBtnStyle, tw`flex justify-center`]}>
      <Button
        type="danger"
        ghost="text"
        onClick={() => {
          Snap.reset();
        }}
      >
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
