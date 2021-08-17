import { pageData } from "@/core/data";
import { cropData } from "@/core/data/cropData";
import { rafBatch, useValue } from "@/core/utils";
import { ButtonGroup } from "@/Editor/LeftSideabr/ToolMenu/components/ButtonGroup";
import { updateCurrentImage } from "@/logic/action/currentImage";
import { getBathStatus } from "@/logic/get/batchStatus";
import { getCropData } from "@/logic/get/cropData";
import { getCurrentImage } from "@/logic/get/currentImage";
import { debouncePromise } from "@/utils/debouncePromise";
import * as R from "ramda";
import type { FC } from "react";
import React, { memo, useMemo } from "react";
import { ModalV2 as Modal } from "tezign-ui";
import { batchCrop, cropImage } from "./logic/batchCrop";

// * --------------------------------------------------------------------------- serv

const useSyncCrop = () => {
  const crop = useValue(getCropData);
  const currImg = useValue(() => getCurrentImage());
  const data = useValue(() => pageData.get());
  const batchStatus = useValue(() => getBathStatus());

  const onOk = async () => {
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
      // const ratioCrop = {
      //   rX: x / iWidth,
      //   rY: y / iHeight,
      //   rW: width / iWidth,
      //   rH: height / iHeight,
      // };
      debouncePromise(200)
        .then(() => batchCrop(data, crop))
        .then(() => modal.destroy());
    } else {
      const cropData = await cropImage(currImg, crop);
      const { width, height } = crop;
      const flip = [1, 1] as [1 | -1, 1 | -1];
      const rotate = 0 as 0 | 90 | -90 | 180;
      const newData = {
        ...currImg,
        ...cropData,
        crop: { ...currImg.crop, x: 0, y: 0, width, height, flip, rotate },
      };
      updateCurrentImage(newData);
    }
  };

  return { onOk };
};

// * ---------------------------

const useResetCrop = () => {
  const currImg = useValue(getCurrentImage);
  const onCancel = () => {
    const { origin, crop } = currImg;
    const { width, height } = origin;
    const defaultCrop = {
      ...crop,
      rotate: crop.rotate ?? 0,
      originWidth: width,
      originHeight: height,
      aspectRatio: width / height,
    };
    rafBatch(() => cropData.set({ ...defaultCrop })).then();
  };

  return { onCancel };
};

// * --------------------------------------------------------------------------- comp

export const CropButton: FC = memo(() => {
  const { onOk } = useSyncCrop();
  const { onCancel } = useResetCrop();

  const { x, y, width, height, flip, rotate } = useValue(getCropData);
  const { crop } = useValue(getCurrentImage);
  const hasChanged = !R.equals({ ...crop, rotate: crop.rotate ?? 0 }, { x, y, width, height, flip, rotate });

  return useMemo(
    () => <ButtonGroup onOk={onOk} onCancel={onCancel} disableOnOk={!hasChanged} />,
    [onOk, onCancel, hasChanged],
  );
});
