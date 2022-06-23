import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { toggleBatchStatus } from "@/logic/action/toggleBathStatus";
import { getBathStatus } from "@/logic/get/batchStatus";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { Switch } from "antd";
import type { FC } from "react";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

export const LeftHeader: FC = () => {
  const length = useValue(() => pageData.get().imgList.length);
  const status = useValue(() => getBathStatus());

  return (
    <div css={[leftHeaderStyle, tw`flex justify-between`]}>
      <div>批量应用（共处理 {length} 张图片）</div>
      <Switch checked={status} onChange={() => toggleBatchStatus()} />
    </div>
  );
};

// * --------------------------------------------------------------------------- comp

const leftHeaderStyle = css`
  padding: 16px;
  border-bottom: 1px solid ${theme.bgColors.dark};
`;
