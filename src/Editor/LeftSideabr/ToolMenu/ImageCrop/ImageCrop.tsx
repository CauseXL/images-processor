import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { CropButtons } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropButtons/CropButtons";
import { CropDirection } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropDirection/CropDirection";
import { CropInput } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropInput/CropInput";
import { CropList } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropList/CropList";
import type { FC } from "react";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp

export const ImageCrop: FC = () => {
  return (
    <div css={tw`flex flex-col`}>
      <CropList />
      <CropInput />
      <CropButtons />
      <CropDirection />
      <ButtonGroup />
    </div>
  );
};
