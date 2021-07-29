import { useEffect, useState } from "react";

type Listener = () => void;
type Unsubscriber = () => void;

interface AnySubscribable {
  subscribe: (subscriber: Listener) => Unsubscriber;
}

export const useSubscribableValue = <T>(emitter: AnySubscribable, getter: () => T) => {
  const [value, setValue] = useState(getter());

  useEffect(() =>
    emitter.subscribe(() => {
      const nextValue = getter();
      if (nextValue !== value) setValue(nextValue);
    }),
  );

  return value;
};
