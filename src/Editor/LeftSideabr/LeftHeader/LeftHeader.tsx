import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { Switch } from "tezign-ui";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

export const LeftHeader: FC = () => {
  return (
    <div css={[leftHeaderStyle, tw`flex justify-between`]}>
      <div>批量应用（共处理 555 张图片）</div>
      <Switch onChange={() => console.log("switch")} />
    </div>
  );
};

// * --------------------------------------------------------------------------- comp

const leftHeaderStyle = css`
  padding: 16px;
  border-bottom: 1px solid ${theme.bgColors.dark};
`;
