import { Snapshot } from "@/core/snapshot/Snapshot";

interface SnapFrame {
  a: number;
}

const mockStore: { current: SnapFrame } = { current: { a: 1 } };

const mockSnap = new Snapshot({
  createSaveFrame: () => mockStore.current,
  load: (frame) => {
    mockStore.current = frame;
  },
  debounceTime: 200,
});

// * ----------------

// * 同名 action 根据 debounceTime 判断自动合并，比如拖 slider 的时候
mockSnap.take("item move left");
mockSnap.take("item move left");
mockSnap.take("item move left");

// * ----------------

console.log("snap", mockSnap.stack, mockSnap.index);
console.log("current", mockStore.current, "\n");

// * ----------------

mockStore.current = { a: 2 };
mockSnap.take();
mockStore.current = { a: 3 };
mockSnap.take();
mockStore.current = { a: 4 };
mockSnap.take();

console.log("snap", mockSnap.stack, mockSnap.index);
console.log("current", mockStore.current, "\n");

// * ----------------

mockSnap.undo();
mockSnap.undo();
mockSnap.undo();
mockSnap.undo();
mockSnap.undo();
mockSnap.undo();

console.log("snap", mockSnap.stack, mockSnap.index);
console.log("current", mockStore.current, "\n");

// * ----------------

mockSnap.redo();

console.log("snap", mockSnap.stack, mockSnap.index);
console.log("current", mockStore.current, "\n");

// * ----------------

mockStore.current = { a: 66 };
mockSnap.take();

console.log("snap", mockSnap.stack, mockSnap.index);
console.log("current", mockStore.current, "\n");
