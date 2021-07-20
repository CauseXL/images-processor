import { useEffect } from "react";

// TODO: 全局的帮助 hook，待完善 // XuYuCheng 2021/07/19
export const useEaster = (keySequence: (string | number)[], cb: Function) => {
  const codes = keySequence;

  useEffect(() => {
    let pointer = 0;

    const fn = (e: KeyboardEvent) => {
      if (codes.length === 0) return;

      const c = codes[pointer];
      const match = typeof c === "number" ? e.keyCode === c : e.key === c;
      pointer = match ? pointer + 1 : 0;

      if (pointer === codes.length) {
        cb();
        pointer = 0;
      }
    };

    window.addEventListener("keyup", fn);
    return () => {
      window.removeEventListener("keyup", fn);
    };
  }, []);
};

export const useWordEaster = (word: string, cb: Function) => useEaster(word.split(""), cb);
