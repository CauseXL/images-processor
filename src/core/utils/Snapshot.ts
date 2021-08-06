// * ================================================================================

type Listener = () => void;
type Unsubscriber = () => void;

class SimpleEmitter {
  private listeners = new Set<Listener>();

  public emit() {
    new Set(this.listeners).forEach((fn) => fn());
  }

  public subscribe(listener: Listener): Unsubscriber {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

// * ================================================================================

const ranged = (value: number, [min, max]: [number, number]): number =>
  value <= min ? min : value >= max ? max : value;

// * ----------------------------------------------------------------

interface SnapshotConfig<T> {
  createSaveFrame: () => T;
  load: (frame: T) => void;
  debounceTime?: number;
}

// * ----------------------------------------------------------------

export class Snapshot<T> extends SimpleEmitter {
  public stack: T[] = [];
  public index = -1;

  private readonly config: SnapshotConfig<T>;

  private lastAction = "";
  private lastTime = -Infinity;

  // * ----------------------------------------------------------------

  public constructor(config: SnapshotConfig<T>) {
    super();
    this.config = config;
    this.take();
  }
  public destroy() {
    this.stack = [];
  }

  // * ---------------------------------------------------------------- take

  public take(actionName = "") {
    const frame = this.config.createSaveFrame();

    const currentTime = Date.now();

    const isTooClose = currentTime - this.lastTime < (this.config.debounceTime ?? 0);
    const isSameAction = actionName !== "" && actionName === this.lastAction;
    const shouldDebounceMerge = isTooClose && isSameAction;

    if (!shouldDebounceMerge) {
      this.index += 1;
    }

    this.lastTime = currentTime;
    this.lastAction = actionName;
    this.stack[this.index] = frame;
    this.stack.length = this.index + 1;
    this.emit();
  }

  // * ---------------------------------------------------------------- undo redo go

  public undo() {
    this.go(-1);
  }

  public redo() {
    this.go(+1);
  }

  public reset() {
    this.jumpTo(0);
  }

  public go(delta: number) {
    this.jumpTo(this.index + delta);
  }

  public jumpTo(index: number) {
    const safeIndex = ranged(index, [0, this.stack.length - 1]);
    if (safeIndex === this.index) return;

    const frame = this.stack[safeIndex]!;

    this.index = safeIndex;
    this.config.load(frame);

    this.lastTime = -Infinity;
    this.lastAction = "";

    this.emit();
  }
}
