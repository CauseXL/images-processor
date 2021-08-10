import type { CSSProperties, FC } from "react";
// @ts-ignore
import { tw } from "twind";
import { Cropper } from "./Cropper/Cropper";

// * --------------------------------------------------------------------------- comp

export const CropLayer: FC<{ style?: CSSProperties }> = ({ style }) => {
  return (
    <div className={tw`m-auto my-24`} style={{ ...style }}>
      <Cropper />
    </div>
  );
};
