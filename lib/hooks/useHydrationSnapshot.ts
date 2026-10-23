"use client";

// useSyncExternalStore sigue leyendo el valor real tras la hidratación.
// Las lecturas de sessionStorage/localStorage se hacen sin efectos de React.
export const subscribeNoop = () => () => {};
