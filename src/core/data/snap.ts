import { batch, Snapshot, useSubscribableValue } from "../utils";
import { pageData } from "./pageData";

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
