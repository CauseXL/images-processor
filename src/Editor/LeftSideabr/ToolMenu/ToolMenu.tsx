import { BatchRename } from "@/Editor/LeftSideabr/ToolMenu/BatchRename/BatchRename";
import { ImageConvert } from "@/Editor/LeftSideabr/ToolMenu/ImageConvert/ImageConvert";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Icon } from "tezign-ui";
import tw from "twin.macro";
import { ImageCrop } from "./ImageCrop/ImageCrop";
import { SizeScale } from "./SizeScale/SizeScale";

// * --------------------------------------------------------------------------- type

type KeyType = number | string | undefined;

interface SubMenuProps {
  key: number;
  active?: boolean;
  onClick?: () => void;
  title: any;
  content: ReactNode;
}

// * --------------------------------------------------------------------------- comp

export const ToolMenu: FC = () => {
  const [activeKey, setActiveKey] = useState<KeyType>(undefined);

  const menuList = [
    { title: "尺寸缩放", content: <SizeScale /> },
    { title: "图片裁剪", content: <ImageCrop /> },
    { title: "品质压缩", content: <ImageConvert /> },
    { title: "批量命名", content: <BatchRename /> },
  ];

  const handleMenuSelect = (key: number) => (activeKey === key ? setActiveKey(undefined) : setActiveKey(key));

  return (
    <div css={tw`flex-1`}>
      {menuList.map(({ title, content }, index) => (
        <MenuItem
          key={index}
          title={title}
          content={content}
          active={activeKey === index}
          onClick={() => handleMenuSelect(index)}
        />
      ))}
    </div>
  );
};

// * ---------------------------

const MenuItem: FC<SubMenuProps> = (props) => {
  const { title, content, active = false, onClick } = props;

  return (
    <div css={[menuItemStyle, tw`flex flex-col`]}>
      <MenuTitle active={active} onClick={onClick}>
        {title}
      </MenuTitle>
      {active && <div css={menuContentStyle}>{content}</div>}
    </div>
  );
};

// * ---------------------------

const MenuTitle: FC<{ active: boolean; onClick?: () => void }> = ({ children, active, onClick }) => {
  return (
    <div css={[menuTitleStyle, tw`select-none cursor-pointer flex justify-start`]} onClick={onClick}>
      <Icon type={active ? "expand" : "right"} css={tw`pr-4 flex items-center text-center`} />
      {children}
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const menuItemStyle = css`
  border-bottom: 1px solid ${theme.bgColors.dark};
`;

const menuContentStyle = css`
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${theme.bgColors.dark};
`;

const menuTitleStyle = css`
  padding: 16px;
`;
