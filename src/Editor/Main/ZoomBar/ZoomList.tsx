import React from "react";
import { Menu } from "tezign-ui";
import { SCALE_LIST } from "./useScaleService";

// * --------------------------------------------------------------------------- service

const useZoomListService = () => {
  const handleUpdateScaleByList = (scale: number) => {
    console.log(scale, 88888888888);
  };

  const handleUpdateScaleToContain = () => {};

  const handleUpdateScaleToFill = () => {};

  return { handleUpdateScaleByList, handleUpdateScaleToContain, handleUpdateScaleToFill };
};

// * --------------------------------------------------------------------------- comp

export const ZoomList: React.FC = () => {
  const { handleUpdateScaleByList, handleUpdateScaleToContain, handleUpdateScaleToFill } = useZoomListService();

  return (
    <Menu>
      {[...SCALE_LIST].reverse().map((scale) => (
        <Menu.Item key={scale} onClick={() => handleUpdateScaleByList(scale)}>
          {(scale * 100).toFixed(0)}%
        </Menu.Item>
      ))}
      <Menu.Divider />
      <Menu.Item onClick={handleUpdateScaleToContain}>适应屏幕</Menu.Item>
      <Menu.Item onClick={handleUpdateScaleToFill}>填充屏幕</Menu.Item>
    </Menu>
  );
};

// * --------------------------------------------------------------------------- util
