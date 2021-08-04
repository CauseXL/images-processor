import { Snapshot } from "@/core/snapshot/Snapshot";
import { useSubscribableValue } from "@/core/snapshot/useSubscribableValue";
import { batch } from "@/core/state-util";
import { pageData } from "@/store/index";

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
