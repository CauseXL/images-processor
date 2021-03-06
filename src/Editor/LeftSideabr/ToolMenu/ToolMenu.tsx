import { store, useValue } from "@/core/utils";
import { BatchRename } from "@/Editor/LeftSideabr/ToolMenu/BatchRename/BatchRename";
import { ImageConvert } from "@/Editor/LeftSideabr/ToolMenu/ImageConvert/ImageConvert";
import { ToolMenuItem } from "@/Editor/LeftSideabr/ToolMenu/ToolMenuItem";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import tw from "twin.macro";
import { ImageCrop } from "./ImageCrop/ImageCrop";
import { SizeScale } from "./SizeScale/SizeScale";

// * --------------------------------------------------------------------------- state

export const activeToolMenuState = store<null | ToolCategoryType>(null);
export const useIsCropMod = () => useValue(() => activeToolMenuState.get()) === "crop";
export const useIsToolActive = () => useValue(() => activeToolMenuState.get()) !== null;

// * --------------------------------------------------------------------------- type

type ToolCategoryType = "convert" | "crop" | "rename" | "scale";

interface MenuItemType {
  title: string;
  content: ReactNode;
  category: ToolCategoryType;
}

type KeyType = number | string | undefined;

// * --------------------------------------------------------------------------- serv

const useToolMenu = () => {
  const [activeKey, setActiveKey] = useState<KeyType>(undefined);

  const handleMenuSelect = (key: number, category: ToolCategoryType) => {
    const isActive = activeKey === key;
    const resultKey = !isActive ? key : undefined;
    const resultMenu = !isActive ? category : null;

    setActiveKey(resultKey);
    activeToolMenuState.set(() => resultMenu);
  };

  return { activeKey, handleMenuSelect };
};

// * --------------------------------------------------------------------------- comp

export const ToolMenu: FC = () => {
  const { activeKey, handleMenuSelect } = useToolMenu();

  return (
    <div css={tw`flex-1`}>
      {menuList.map(({ title, content, category }, index) => (
        <ToolMenuItem
          key={index}
          title={title}
          content={content}
          active={activeKey === index}
          onClick={() => handleMenuSelect(index, category)}
        />
      ))}
    </div>
  );
};

const menuList: MenuItemType[] = [
  { title: "????????????", content: <SizeScale />, category: "scale" },
  { title: "????????????", content: <ImageCrop />, category: "crop" },
  { title: "????????????", content: <ImageConvert />, category: "convert" },
  { title: "????????????", content: <BatchRename />, category: "rename" },
];
