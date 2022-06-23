import { CropType } from "@/core/data";
import { cropData } from "@/core/data/cropData";
import { rafBatch } from "@/core/utils";
import { useSelectCustomTemplate } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropTemplate/CropTemplate";
import { theme } from "@/styles/theme";
import { getTureCropSize } from "@/utils/getTureCropSize";
import { css } from "@emotion/react";
import { Button, Tooltip } from "antd";
import type { FC } from "react";
import { memo, useState } from "react";
import tw from "twin.macro";

// notice arr sort
const rotateArr: CropType["rotate"][] = [0, 90, 180, -90];

type RotateIndexType = 0 | 1 | 2 | 3;

// * --------------------------------------------------------------------------- comp

export const CropHandler: FC = memo(() => {
  const [rotateIndex, setRotateIndex] = useState<RotateIndexType>(0);
  const selectCustomTemplate = useSelectCustomTemplate();

  // * ---------------------------

  const handleScale = (axis: "x" | "y") => {
    rafBatch(() => {
      cropData.set((data) => {
        const [scaleX, scaleY] = data.flip;
        const [resultX, resultY] = axis === "x" ? [-scaleX as 1 | -1, scaleY] : [scaleX, -scaleY as 1 | -1];
        data.flip = [resultX, resultY];
      });
    }).then();
  };

  // * ---------------------------

  // TODO: 旋转图片时，一同旋转 cropBox（引入向量计算系统） // XuYuCheng 2021/08/11
  const handleRotate = (direction: "left" | "right") => {
    const offset = direction === "left" ? -1 : +1;
    const newIndex = ((rotateIndex + rotateArr.length + offset) % 4) as RotateIndexType;
    setRotateIndex(newIndex);
    rafBatch(() => {
      cropData.set((data) => {
        data.rotate = rotateArr[newIndex];
      });
    }).then(() => {
      // TODO: 这里的逻辑抽离成纯函数 // XuYuCheng 2021/08/11
      cropData.set((data) => {
        const { x, y, width, height } = data;
        const { width: oWidth, height: oHeight } = getTureCropSize(data);

        if (width + x > oWidth) {
          data.width = oWidth < width ? oWidth : width;
          data.x = oWidth < width ? 0 : oWidth - width;
        }

        if (height + y > oHeight) {
          data.height = oHeight < height ? oHeight : height;
          data.y = oHeight < height ? 0 : oHeight - height;
        }
      });
    });
    // TODO: 目前旋转做的不够好，旋转将开启锁 // XuYuCheng 2021/08/17
    selectCustomTemplate();
  };

  // * ---------------------------

  // TODO: 旋转逻辑待优化 // XuYuCheng 2021/08/17
  const handleRotateCrop = () => {
    rafBatch(() => {
      cropData.set((data) => {
        const { width, height, x, y, originWidth, originHeight } = data;
        const maxWidth = originWidth - x;
        const maxHeight = originHeight - y;

        // TODO: limit 函数 // XuYuCheng 2021/08/17
        data.width = height > maxWidth ? maxWidth : height;
        data.height = width > maxHeight ? maxHeight : width;
      });
    }).then();
    selectCustomTemplate();
  };

  // * ---------------------------
  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <CropBtn icon="border-verticle" alt="垂直翻转" onClick={() => handleScale("y")} />
      <CropBtn icon="border-horizontal" alt="水平翻转" onClick={() => handleScale("x")} />
      <CropBtn icon="border-left" alt="旋转 -90 度" onClick={() => handleRotate("left")} />
      <CropBtn icon="border-right" alt="旋转 90 度" onClick={() => handleRotate("right")} />
      <CropBtn icon="border-inner" alt="裁剪框旋转" onClick={handleRotateCrop} />
    </div>
  );
});

// * ---------------------------

const CropBtn: FC<{ icon: string; alt: string; onClick?: () => void }> = memo(({ icon, alt, onClick }) => (
  <Tooltip placement="bottom" title={alt}>
    <Button
      onClick={onClick}
      icon={icon}
      ghost
      css={[tw`flex justify-center items-center w-9 h-9 border-0 rounded`, cropButtonStyle]}
    />
  </Tooltip>
));

// * --------------------------------------------------------------------------- style

const cropButtonStyle = css`
  &.tz-btn {
    color: ${theme.colors.default};
    background-color: ${theme.bgColors.light};
  }
  &:hover,
  &:active {
    color: white;
  }
`;
