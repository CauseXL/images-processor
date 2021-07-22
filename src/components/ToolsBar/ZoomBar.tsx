import { css } from "@emotion/react";
import { findIndex, findLastIndex } from "ramda";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { Dropdown, Icon, Menu } from "tezign-ui";
import tw from "twin.macro";

const scaleList = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 5];

export const ZoomBar = () => {
  const originScale = 0.66;

  // TODO: get from pageData
  const [scale, setScale] = useState<number>(originScale);

  const updateScaleByButton = (current: number, type: "+" | "-") => {
    const nextScaleIndex =
      type === "+" ? findIndex((e) => e > current, scaleList) : findLastIndex((e) => e < current, scaleList);

    if (nextScaleIndex === -1) return;

    const nextScale = scaleList[nextScaleIndex];
    // TODO: change pageData
    setScale(nextScale);
  };

  return useMemo(() => {
    return (
      <div css={[tw`flex justify-between items-center`, zoomBarStyle]}>
        <div className="zoomIcon" onClick={() => updateScaleByButton(scale, "-")}>
          <Icon type="stop" css={tw`text-lg flex items-center`} />
        </div>
        <Dropdown
          overlay={<ZoomList originScale={originScale} setScale={setScale} />}
          trigger={["click"]}
          placement="topCenter"
        >
          <span>{(scale * 100).toFixed(0)}%</span>
        </Dropdown>
        <div className="zoomIcon" onClick={() => updateScaleByButton(scale, "+")}>
          <Icon type="add-plus" css={tw`text-lg flex items-center`} />
        </div>
      </div>
    );
  }, [originScale, scale]);
};

// * -------------------------------------------
// TODO: prop type
const ZoomList: FC<any> = (props) => {
  const { originScale, setScale } = props;
  return (
    <Menu>
      {[...scaleList].reverse().map((scale) => {
        return (
          <Menu.Item key={scale} onClick={() => setScale(scale)}>
            {(scale * 100).toFixed(0)}%
          </Menu.Item>
        );
      })}
      <Menu.Divider />
      <Menu.Item onClick={() => setScale(originScale)}>实际大小</Menu.Item>
      <Menu.Item onClick={() => {}}>适应屏幕</Menu.Item>
    </Menu>
  );
};

// * ------------------------------------------- style
const zoomBarStyle = css`
  height: 36px;
  padding: 0px 12px;
  background-color: #2f2f2f;
  border-radius: 40px;

  & > span {
    flex: 1;
    padding: 4px;
    margin: 0px 4px;
    cursor: pointer;
  }

  .zoomIcon {
    padding: 4px;
    cursor: pointer;
  }
`;
