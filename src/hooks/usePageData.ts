import { Snapshot } from "@/core/snapshot/Snapshot";
import { useSubscribableValue } from "@/core/snapshot/useSubscribableValue";
import { batch, rafBatch, store, useValue } from "@/core/state-util";

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
