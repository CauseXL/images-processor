import React from "react";
import { Button, Icon, Dropdown, Menu } from "tezign-ui";

// * --------------------------------------------------------------------------- comp

export const DownloadButton: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item onClick={() => {console.log(123)}}>
        当前图片下载
      </Menu.Item>
      <Menu.Item onClick={() => {console.log(321)}}>
        全部批量下载
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomLeft">
      <Button>
        <Icon className="btn-left-icon" type="download" />
        下载
      </Button>
    </Dropdown>
  )
};

// * --------------------------------------------------------------------------- style
