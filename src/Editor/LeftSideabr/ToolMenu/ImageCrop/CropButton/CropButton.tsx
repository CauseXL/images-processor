import { pageData, Snap } from "@/core/data";
import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { updateCurrentImage } from "@/logic/action/currentImage";
import { getBathStatus } from "@/logic/get/batchStatus";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { debouncePromise } from "@/utils/debouncePromise";
import type { FC } from "react";
import React, { memo, useMemo } from "react";
import { ModalV2 as Modal } from "tezign-ui";
import { batchCrop, cropImage } from "./logic/batchCrop";

// * --------------------------------------------------------------------------- serv

// TODO: canvas 裁切后图片模糊 // XuYuCheng 2021/08/12
const useSyncCrop = () => {
  const crop = useValue(getCropData);
  const currImg = useValue(() => getCurrentImage());
  const data = useValue(() => pageData.get());
  const batchStatus = useValue(() => getBathStatus());

  const onOk = async () => {
    console.log("crop", crop);
    if (batchStatus) {
      const modal = Modal.alert({
        type: "danger",
        width: 300,
        footer: null,
        closable: false,
        maskClosable: false,
        content: "正在处理批量裁剪，请稍后...",
      });
      // TODO: 批量裁剪其他图片时要通过出计算裁切比例来做裁切，现在逻辑不太对，先放着
      // const { x, y, width, height } = crop;
      // const { width: iWidth, height: iHeight } = currImg;
      // const ratioMap = {
      //   rX: x / iWidth,
      //   rY: y / iHeight,
      //   rW: width / iWidth,
      //   rH: height / iHeight,
      // };
      debouncePromise(200)
        .then(() => batchCrop(data, crop, {}))
        .then(() => modal.destroy());
    } else {
      const cropData = await cropImage(currImg, crop, {});
      console.log(cropData);
      const newData = { ...currImg, ...cropData, crop: { ...currImg.crop, ...crop } };
      updateCurrentImage(newData);
    }
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
