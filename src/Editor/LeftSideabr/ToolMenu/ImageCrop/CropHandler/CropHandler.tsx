import { CropType } from "@/core/data";
import { cropData } from "@/core/data/cropData";
import { rafBatch } from "@/core/utils";
import { theme } from "@/styles/theme";
import { getTureCropSize } from "@/utils/getTureCropSize";
import { css } from "@emotion/react";
import type { FC, ReactElement } from "react";
import { memo, useState } from "react";
import { Button, Tooltip } from "tezign-ui";
import tw from "twin.macro";
import {
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCropIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from "../ImageCropIcons";

// notice arr sort
const rotateArr: CropType["rotate"][] = [0, 90, 180, -90];

type RotateIndexType = 0 | 1 | 2 | 3;

// * --------------------------------------------------------------------------- comp

export const CropHandler: FC = memo(() => {
  const [rotateIndex, setRotateIndex] = useState<RotateIndexType>(0);

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
  };

  // * ---------------------------

  // TODO: 限制大小 // XuYuCheng 2021/08/11
  const handleRotateCrop = () => {
    rafBatch(() => {
      cropData.set((data) => {
        const { width, height, x, y } = data;
        data.width = height;
        data.height = width;
        data.x = y;
        data.y = x;
      });
    }).then(() => {
      // TODO: 这里的逻辑抽离成纯函数 // XuYuCheng 2021/08/11
      // cropData.set((data) => {
      //   const { x, y, width, height } = data;
      //   const { width: oWidth, height: oHeight } = getTureCropSize(data);
      //
      //   if (width + x > oWidth) {
      //     data.width = oWidth < width ? oWidth : width;
      //     data.x = oWidth < width ? 0 : oWidth - width;
      //   }
      //
      //   if (height + y > oHeight) {
      //     data.height = oHeight < height ? oHeight : height;
      //     data.y = oHeight < height ? 0 : oHeight - height;
      //   }
      // });
    });
  };

  // * ---------------------------

  return (
    <div css={tw`flex justify-between items-center mt-4`}>
      <CropBtn icon={<FlipHorizontalIcon />} alt="垂直翻转" onClick={() => handleScale("y")} />
      <CropBtn icon={<FlipVerticalIcon />} alt="水平翻转" onClick={() => handleScale("x")} />
      <CropBtn icon={<RotateLeftIcon />} alt="旋转 -90 度" onClick={() => handleRotate("left")} />
      <CropBtn icon={<RotateRightIcon />} alt="旋转 90 度" onClick={() => handleRotate("right")} />
      <CropBtn icon={<RotateCropIcon />} alt="裁剪框旋转" onClick={handleRotateCrop} />
    </div>
  );
});

// * ---------------------------

const CropBtn: FC<{ icon: string | ReactElement; alt: string; onClick?: () => void }> = memo(
  ({ icon, alt, onClick }) => (
    <Tooltip placement="bottom" title={alt}>
      <Button
        onClick={onClick}
        icon={icon}
        type="neutral"
        css={[tw`flex justify-center items-center w-9 h-9 border-0 rounded`, cropButtonStyle]}
      />
    </Tooltip>
  ),
);

// * --------------------------------------------------------------------------- style

const cropButtonStyle = css`
  &.tz-btn.type-neutral {
    color: ${theme.colors.default};
    background-color: ${theme.bgColors.light};
  }
`;
