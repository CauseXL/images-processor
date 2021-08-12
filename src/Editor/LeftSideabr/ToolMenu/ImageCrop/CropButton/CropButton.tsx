import { pageData, Snap } from "@/core/data";
import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { cropImageToCanvas } from "@/utils/cropImageToCanvas";
import { urlToImage } from "@/utils/urlToImage";
import type { FC } from "react";
import React, { memo, useMemo } from "react";

// * --------------------------------------------------------------------------- serv

// TODO: canvas 裁切后图片模糊 // XuYuCheng 2021/08/12
const useSyncCrop = () => {
  const crop = useValue(getCropData);
  const currImg = useValue(getCurrentImage);

  const onOk = () => {
    const image = urlToImage(currImg.origin.url);
    const canvas = cropImageToCanvas(image, { ...crop });
    const resultUrl = canvas.toDataURL();
    const { width, height } = crop;

    rafBatch(() => {
      pageData.set((data) => {
        data.imgList.map((item) => {
          if (item.active) {
            item.url = resultUrl;
            item.width = width;
            item.height = height;
          }
          return item;
        });
      });
    }).then(() => {
      Snap.take();
    });
  };

  return { onOk };
};

// * ---------------------------

const useResetCrop = () => {
  const currImg = useValue(getCurrentImage);

  const onCancel = () => {
    const { width, height } = currImg.origin;
    rafBatch(() => {
      cropData.set((data) => {
        data.x = 0;
        data.y = 0;
        data.width = width;
        data.height = height;
      });
    }).then(() => {
      Snap.take();
    });
  };

  return { onCancel };
};

// * --------------------------------------------------------------------------- comp

export const CropButton: FC = memo(() => {
  const { onOk } = useSyncCrop();
  const { onCancel } = useResetCrop();

  return useMemo(() => <ButtonGroup onOk={onOk} onCancel={onCancel} />, [onOk, onCancel]);
});
