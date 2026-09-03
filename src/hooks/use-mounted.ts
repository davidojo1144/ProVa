import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Tracks client-side mount, useful to avoid hydration mismatches. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
