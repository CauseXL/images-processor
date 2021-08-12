import type { FC } from "react";
// @ts-ignore;
import { tw } from "twind";
import { CropButton } from "./CropButton/CropButton";
import { CropDirection } from "./CropDirection/CropDirection";
import { CropHandler } from "./CropHandler/CropHandler";
import { CropInput } from "./CropInput/CropInput";
import { CropTemplate } from "./CropTemplate/CropTemplate";

export const ImageCrop: FC = () => (
  <div className={tw`flex flex-col`}>
    <CropTemplate />
    <CropInput />
    <CropHandler />
    <CropDirection />
    <CropButton />
  </div>
);
