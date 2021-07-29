// * ================================================================================

import { Snapshot } from "./Snapshot";
import { useSubscribableValue } from "./useSubscribableValue";

export const snap = new Snapshot({
  createSaveFrame: () => {
    // TODO 保存数据
    // return pageData + editorStatus + misc;
  },
  load: (frame) => {
    // TODO 加载数据
    // const { pageData, editorStatus, misc } = frame;
    // batch(() => {
    //   pageData.set(pageData);
    //   editorStatus.set(editorStatus);
    //   misc.set(misc);
    // });
  },
  debounceTime: 200,
});

export const useUndoable = () => useSubscribableValue(snap, () => 0 < snap.index);
export const useRedoable = () => useSubscribableValue(snap, () => snap.index < snap.stack.length - 1);
