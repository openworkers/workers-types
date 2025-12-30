// Timer API types

export {};

declare global {
  /**
   * Schedules a function to be called after a delay.
   *
   * @param callback The function to call.
   * @param ms The delay in milliseconds (default: 0).
   * @param args Additional arguments to pass to the callback.
   * @returns A timer ID that can be passed to clearTimeout().
   *
   * @example
   * ```ts
   * const id = setTimeout(() => console.log('Hello'), 1000);
   * clearTimeout(id); // Cancel before it runs
   * ```
   */
  function setTimeout(
    callback: (...args: unknown[]) => void,
    ms?: number,
    ...args: unknown[]
  ): number;

  /**
   * Cancels a timeout previously scheduled with setTimeout().
   * @param id The timer ID returned by setTimeout().
   */
  function clearTimeout(id: number): void;

  /**
   * Schedules a function to be called repeatedly at a given interval.
   *
   * @param callback The function to call.
   * @param ms The interval in milliseconds.
   * @param args Additional arguments to pass to the callback.
   * @returns A timer ID that can be passed to clearInterval().
   *
   * @example
   * ```ts
   * let count = 0;
   * const id = setInterval(() => {
   *   console.log(++count);
   *   if (count >= 5) clearInterval(id);
   * }, 1000);
   * ```
   */
  function setInterval(
    callback: (...args: unknown[]) => void,
    ms?: number,
    ...args: unknown[]
  ): number;

  /**
   * Cancels an interval previously scheduled with setInterval().
   * @param id The timer ID returned by setInterval().
   */
  function clearInterval(id: number): void;
}
