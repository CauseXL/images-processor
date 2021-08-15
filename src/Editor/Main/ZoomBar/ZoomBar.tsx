import { useIsCropMod } from "@/Editor/LeftSideabr/ToolMenu/ToolMenu";
import { css } from "@emotion/react";
import type { FC } from "react";
import { memo } from "react";
import { Dropdown, Icon } from "tezign-ui";
import tw from "twin.macro";
import { getFormatScale, scaleDown, scaleUp, useScale } from "../logic/scale";
import { ZoomList } from "./ZoomList";

// * --------------------------------------------------------------------------- comp

export const ZoomBar: FC = memo(() => {
  const scaleValue = useScale();
  const isCrop = useIsCropMod();

  return (
    <div css={[tw`absolute bottom-10 left-1/2 z-50 flex justify-between`, zoomBarContainerStyle]}>
      {!isCrop && (
        <div css={[tw`h-9 px-3 flex items-center justify-between`, zoomBarStyle]}>
          <div css={[tw`p-1 flex items-center mr-2 cursor-pointer`, iconJustifyStyle]} onClick={scaleDown}>
            <Icon type="stop" className="fz-16" />
          </div>

          <Dropdown
            overlay={<ZoomList />}
            trigger={["click"]}
            placement="topCenter"
            css={tw`cursor-pointer h-full flex items-center select-none`}
          >
            <span>{getFormatScale(scaleValue)}</span>
          </Dropdown>

          <div css={tw`p-1 flex items-center ml-2 cursor-pointer`} onClick={scaleUp}>
            <Icon type="add-plus" className="fz-16" />
          </div>
        </div>
      )}
    </div>
  );
});

// * --------------------------------------------------------------------------- style

const zoomBarContainerStyle = css`
  transform: translate(-50%);
`;

const zoomBarStyle = css`
  border-radius: 40px;
  background-color: #2f2f2f;
`;

// 组件库的 +/- icon 有 1px 的误差，通过 padding 调整一下，保持水平居中
const iconJustifyStyle = css`
  padding-top: 5px;
  padding-bottom: 3px;
`;
