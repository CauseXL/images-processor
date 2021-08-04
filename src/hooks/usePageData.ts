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
      url: "https://picsum.photos/1400/800",
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
