import { batchStatus } from "@/core/data";
import { batch } from "@/core/utils";

/** 修改批量应用状态 */
export const toggleBatchStatus = () => {
  batch(() => batchStatus.set(!batchStatus.get()));
};
