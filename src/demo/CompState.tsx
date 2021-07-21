/* eslint-disable max-nested-callbacks */

import { batch, store, useValue } from "@/core/state-util";
import React, { FC, memo, useState } from "react";

const d1 = store({ s: { a: 10 } });
const d2 = store({ s: { a: 100 } });

const rnd = () => Math.random().toString(36).slice(-6);
const gen = () => [rnd(), rnd(), "Hello"];

export const App: FC = () => {
  const [v, setV] = useState(gen());
  return (
    <>
      <button
        onClick={() => {
          setV(gen());
        }}
      >
        refresh
      </button>
      {v.map((e, i) => (
        <CompA key={i} v={e} />
      ))}
    </>
  );
};

const CompA: FC<{ v: string }> = memo(({ v = "" }) => {
  console.log("render A", v);

  const d = useValue(() => {
    return d2.get().s.a + d1.get().s.a + v;
  });
  const dd = useValue(() => {
    return d2.get().s.a + d1.get().s.a + v;
  });

  return (
    <div
      onClick={() => {
        setTimeout(() => {
          batch(() => {
            d1.set((d) => {
              d.s.a += 10;
            });

            d2.set((d) => {
              d.s.a += 100;
            });
          });
        }, 500);
      }}
    >
      Hello {JSON.stringify({ d, dd })} {v}
    </div>
  );
});
