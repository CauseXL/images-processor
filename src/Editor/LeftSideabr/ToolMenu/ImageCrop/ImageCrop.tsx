import type { FC } from "react";
import { memo } from "react";
import tw from "twin.macro";
import { CropButton } from "./CropButton/CropButton";
import { CropDirection } from "./CropDirection/CropDirection";
import { CropHandler } from "./CropHandler/CropHandler";
import { CropInput } from "./CropInput/CropInput";
import { CropList } from "./CropList/CropList";

export const ImageCrop: FC = memo(() => (
  <div css={tw`flex flex-col`}>
    <CropList />
    <CropInput />
    <CropHandler />
    <CropDirection />
    <CropButton />
  </div>
));
