/* eslint-disable max-lines */
import { Snapshot } from "@/core/snapshot/Snapshot";
import { useSubscribableValue } from "@/core/snapshot/useSubscribableValue";
import { batch, rafBatch, store, useValue } from "@/core/state-util";
import { message } from "tezign-ui";

// TODO: remove
const mockPageData = {
  title: "test image processor",
  imgList: [
    {
      id: 1,
      name: "特赞1",
      url: "data:image/jpeg;base64,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",
      type: "jpg",
      width: 1400,
      height: 800,
      origin: {
        name: "test1",
        url: "https://picsum.photos/1200/600",
        type: "jpg",
        width: 1200,
        height: 600,
      },
    },
    {
      id: 2,
      name: "特赞2",
      url: "https://picsum.photos/400/600",
      type: "jpg",
      width: 400,
      height: 600,
      active: true,
      origin: {
        name: "test2",
        url: "https://picsum.photos/1200/600",
        type: "jpg",
        width: 1200,
        height: 600,
      },
    },
    {
      id: 3,
      name: "特赞3",
      url: "https://picsum.photos/seed/a/1400/800",
      type: "jpg",
      width: 1400,
      height: 800,
      origin: {
        name: "test1",
        url: "https://picsum.photos/seed/picsum/1400/800",
        type: "jpg",
        width: 1200,
        height: 600,
      },
    },
    {
      id: 4,
      name: "特赞4",
      url: "https://picsum.photos/seed/b/1400/800",
      type: "jpg",
      width: 1400,
      height: 800,
      origin: {
        name: "test1",
        url: "https://picsum.photos/seed/picsum/1400/800",
        type: "jpg",
        width: 1200,
        height: 600,
      },
    },
    {
      id: 5,
      name: "特赞5",
      url: "https://picsum.photos/seed/c/1400/800",
      type: "jpg",
      width: 1400,
      height: 800,
      origin: {
        name: "test1",
        url: "https://picsum.photos/seed/picsum/1400/800",
        type: "jpg",
        width: 1200,
        height: 600,
      },
    },
  ],
};

const pageData = store(mockPageData);

export const Snap = new Snapshot({
  createSaveFrame: () => pageData.get(),
  load: (frame) => {
    batch(() => {
      pageData.set(frame);
    });
  },
  debounceTime: 200,
});

export const useUndoable = () => useSubscribableValue(Snap, () => 0 < Snap.index);
export const useRedoable = () => useSubscribableValue(Snap, () => Snap.index < Snap.stack.length - 1);

/**
 * 获取当前页面所有数据
 */
export const usePageData = () => {
  const data = useValue(() => pageData.get());
  return data;
};

/**
 * 获取选中的图片数据
 */
export const useCurrentImage = () => {
  const data = useValue(() => pageData.get().imgList.filter((item) => item.active), [pageData]);
  return data[0];
};

/**
 * 批量更新当前页面所有数据
 */
export const updateAllImages = (imgList) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = [...imgList];
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.index);
  });
};

/**
 * 一键还原当前页面所有数据
 */
export const resetPageData = () => {
  rafBatch(() => {
    pageData.set((data) => {
      data.title = mockPageData.title;
      data.imgList = [...mockPageData.imgList];
    });
  }).then(() => {
    Snap.take();
    console.log("一键还原 snap", Snap.index);
  });
};

/**
 * 更新选中的图片数据
 */
export const updateCurrentImage = (currentImage) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = data.imgList.map((img) => {
        if (img.active) {
          // eslint-disable-next-line no-param-reassign
          img = { ...img, ...currentImage };
        }
        return img;
      });
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.index);
  });
};

/**
 * 更新选中的图片
 */
export const changeCurrentImage = (id: number) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.imgList = data.imgList.map((img) => {
        if (img.id === id) {
          img.active = true;
        } else {
          img.active = false;
        }
        return img;
      });
    });
  }).then(() => console.log("update current image success"));
};

/**
 * 更新项目标题
 */
export const updatePageTitle = (name: string) => {
  rafBatch(() => {
    pageData.set((data) => {
      data.title = name;
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.stack);
  });
};

/**
 * 删除
 */
export const deleteImage = (id: number) => {
  rafBatch(() => {
    pageData.set((data) => {
      if (data.imgList.length === 1) {
        message.error("您确定您是在批量吗？");
        return;
      }

      // get deleted index for reset active
      let index = data.imgList.findIndex((img) => img.id === id);

      data.imgList = data.imgList.filter((img) => img.id !== id);

      // reset
      if (index === data.imgList.length) {
        index -= 1;
      }
      data.imgList[index].active = true;
    });
  }).then(() => {
    Snap.take();
    console.log("snap", Snap.stack);
  });
};
