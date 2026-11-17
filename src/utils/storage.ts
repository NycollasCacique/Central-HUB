import { useState } from "react";
export function usePersisted<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? (JSON.parse(v) as T) : initial;
    } catch {
      return initial;
    }
  });
  function update(next: T | ((v: T) => T)) {
    setValue((previous) => {
      const result =
        typeof next === "function" ? (next as (v: T) => T)(previous) : next;
      try {
        localStorage.setItem(key, JSON.stringify(result));
      } catch {
        /* Preferências continuam disponíveis durante a sessão. */
      }
      return result;
    });
  }
  return [value, update] as const;
}
