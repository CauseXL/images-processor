import type { FC } from "react";
import { memo } from "react";
import { CropperBox } from "./CropperBox/CropperBox";
import { CropperContainer } from "./CropperContainer/CropperContainer";
import { CropperImage } from "./CropperImage/CropperImage";

export const Cropper: FC = memo(() => (
  <CropperContainer>
    <CropperImage />
    <CropperBox />
  </CropperContainer>
));
