import { batch, store, useValue } from "@/core/state-util";

const batchStatus = store(true);

/** 获取当前是否为批量应用 */
export const useBatchStatus = () => useValue(() => batchStatus.get());

/** 修改批量应用状态 */
export const toggleBatchStatus = () => {
  batch(() => batchStatus.set(!batchStatus.get()));
};
