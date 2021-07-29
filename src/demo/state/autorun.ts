import { autorun, batch, store } from "@/core/state-util";

// * ------------------------------------------------ autorun

{
  const o1 = store({ s: 1000 }, "o1");
  const o2 = store({ s: 1 });
  const use1 = store({ v: true }, "flag");

  console.log("lcdebug static run", use1.get().v ? o1.get().s : o2.get().s);

  const ub = autorun(() => {
    console.log("lcdebug autorun", use1.get().v ? o1.get().s : o2.get().s);
  });

  o1.set((d) => {
    d.s += 1000;
  });

  batch(() => {
    batch(() => {
      // o1.set((d) => {
      //   d.s += 1000;
      // });
      // o2.set((d) => {
      //   d.s += 1;
      // });
    });

    //     // * ----------------

    //     use1.set((d) => {
    //       d.v = false;
    //     });

    //     o1.set((d) => {
    //       d.s += 1000;
    //     });

    //     o2.set((d) => {
    //       d.s += 1;
    //     });

    //     // * ----------------

    //     use1.set((d) => {
    //       d.v = true;
    //     });

    //     o1.set((d) => {
    //       d.s += 1000;
    //     });

    //     o2.set((d) => {
    //       d.s += 1;
    //     });

    //     // * ----------------

    //     // ub();

    //     // * ----------------

    //     use1.set((d) => {
    //       d.v = true;
    //     });

    //     o1.set((d) => {
    //       d.s += 1000;
    //     });

    //     o2.set((d) => {
    //       d.s += 1;
    //     });
  });
}
