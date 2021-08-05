import { resetPageData } from "@/logic/action/resetPageData";
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
          /* 不用 Snap.rest 因为···一键还原···也需要支持撤销 */
          resetPageData();
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
