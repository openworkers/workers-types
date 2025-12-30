// Timer API types

declare function setTimeout(
  callback: (...args: unknown[]) => void,
  ms?: number,
  ...args: unknown[]
): number;

declare function clearTimeout(id: number): void;

declare function setInterval(
  callback: (...args: unknown[]) => void,
  ms?: number,
  ...args: unknown[]
): number;

declare function clearInterval(id: number): void;
