import { cropData } from "@/core/data/cropData";
import { useValue } from "@/core/utils";
import { getCropData } from "@/logic/get/cropData";
import { theme } from "@/styles/theme";
import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { memo, useMemo } from "react";
// @ts-ignore
import { tw } from "twind";

// * --------------------------------------------------------------------------- inter

interface CropSizeSelectorProps {
  title: string;
  ratio: [number, number];
  desc?: string;
  type?: "origin" | "custom" | "template";
  onClick: () => void;
  active: boolean;
}

// * --------------------------------------------------------------------------- comp

export const CropTemplateItem: FC<CropSizeSelectorProps> = memo((props) => {
  const { title, desc, type, ratio, onClick, active } = props;
  const { originWidth, originHeight, width, height, x, y } = useValue(getCropData);

  const handleClick = () => {
    // TODO: 用函数抽出去 // XuYuCheng 2021/08/16
    // TODO: 精度处理 // XuYuCheng 2021/08/17
    cropData.set((data) => {
      if (type === "custom") {
        data.aspectRatio = null;
      } else {
        const originRatio = originWidth / originHeight;
        const resultRatio = type === "origin" ? originWidth / originHeight : ratio[0] / ratio[1];

        if (originRatio >= resultRatio) {
          const newWidth = originHeight * resultRatio;
          data.y = round(0);
          data.x = round((originWidth - newWidth) / 2);
          data.width = round(newWidth);
          data.height = round(originHeight);
        }
        if (originRatio < resultRatio) {
          const newHeight = originWidth / resultRatio;
          data.y = round((originHeight - newHeight) / 2);
          data.x = round(0);
          data.width = round(originWidth);
          data.height = round(newHeight);
        }
        data.aspectRatio = resultRatio;
      }
    });

    onClick();
  };

  const activeStyle = {
    backgroundColor: active ? theme.bgColors.medium : "transparent",
  };

  return useMemo(
    () => (
      <div className={tw`ml-2 mr-0.5 p-2 rounded cursor-pointer`} style={activeStyle} onClick={handleClick}>
        <div>{title}</div>
        {desc && <div className={cx(tw`pt-2 text-xs`, font)}>{desc}</div>}
      </div>
    ),
    [title, activeStyle, handleClick, desc],
  );
});

// * --------------------------------------------------------------------------- style

const font = css`
  color: rgba(255, 255, 255, 0.45);
`;

const round = (val: number) => Number(val.toFixed(2));
