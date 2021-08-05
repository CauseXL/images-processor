import { useValue } from "@/core/state-util";
import { pageData } from "./pageData";

// TODO 重构完成后删除该文件 // Seognil LC 2021/08/05

/** @deprecated */
export const usePageData = () => useValue(() => pageData.get());
