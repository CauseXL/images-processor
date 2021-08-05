import { useValue } from "@/core/state-util";
import { toggleBatchStatus, useBatchStatus } from "@/hooks/useBathStatus";
import { pageData } from "@/store/pageData";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { Switch } from "tezign-ui";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

export const LeftHeader: FC = () => {
  const length = useValue(() => pageData.get().imgList.length);
  const batchStatus = useBatchStatus();
  return (
    <div css={[leftHeaderStyle, tw`flex justify-between`]}>
      <div>批量应用（共处理 {length} 张图片）</div>
      <Switch checked={batchStatus} onChange={() => toggleBatchStatus()} />
    </div>
  );
};

// * --------------------------------------------------------------------------- comp

const leftHeaderStyle = css`
  padding: 16px;
  border-bottom: 1px solid ${theme.bgColors.dark};
`;
