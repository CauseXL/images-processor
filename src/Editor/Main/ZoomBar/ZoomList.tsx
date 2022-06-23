import { Menu } from "antd";
import type { FC } from "react";
import { memo } from "react";
import { getFormatScale, scaleTo, scaleToContain, scaleToFill, SCALE_LIST } from "../logic/scale";

// * --------------------------------------------------------------------------- comp

export const ZoomList: FC = memo(() => {
  return (
    <Menu>
      {[...SCALE_LIST].reverse().map((scale) => (
        <Menu.Item key={scale} onClick={() => scaleTo(scale)}>
          {getFormatScale(scale)}
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item onClick={scaleToFill}>实际大小</Menu.Item>
      <Menu.Item onClick={scaleToContain}>适应屏幕</Menu.Item>
    </Menu>
  );
});
