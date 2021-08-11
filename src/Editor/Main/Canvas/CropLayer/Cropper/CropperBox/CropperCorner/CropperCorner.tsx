import type { FC } from "react";
import React from "react";
import { CornerButton } from "./CornerButton";
import { IconNe, IconNw, IconSe, IconSw } from "./CornerIcons";

// * --------------------------------------------------------------------------- type

export type CornerDirectionType = "nw" | "ne" | "se" | "sw";

// * --------------------------------------------------------------------------- comp

export const CropperCorner: FC = () => (
  <>
    <CornerButton className="cropper-point point-nw" axis={[-1, -1]} direction="nw">
      <IconNw />
    </CornerButton>

    <CornerButton className="cropper-point point-ne" axis={[1, -1]} direction="ne">
      <IconNe />
    </CornerButton>

    <CornerButton className="cropper-point point-se" axis={[1, 1]} direction="se">
      <IconSe />
    </CornerButton>

    <CornerButton className="cropper-point point-sw" axis={[-1, 1]} direction="sw">
      <IconSw />
    </CornerButton>
  </>
);
