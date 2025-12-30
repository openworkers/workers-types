// Console API types

export {};

declare global {
  /**
   * Provides logging functionality for debugging and diagnostics.
   *
   * @example
   * ```ts
   * console.log('Hello, World!');
   * console.error('Something went wrong:', error);
   * console.time('fetch');
   * await fetch(url);
   * console.timeEnd('fetch'); // "fetch: 123ms"
   * ```
   */
  interface Console {
    /** Outputs a message at the "log" level. */
    log(...args: unknown[]): void;

    /** Outputs a message at the "info" level. */
    info(...args: unknown[]): void;

    /** Outputs a message at the "warn" level. */
    warn(...args: unknown[]): void;

    /** Outputs a message at the "error" level. */
    error(...args: unknown[]): void;

    /** Outputs a message at the "debug" level. */
    debug(...args: unknown[]): void;

    /** Outputs a stack trace. */
    trace(...args: unknown[]): void;

    /**
     * Starts a timer with the given label.
     * @param label The timer label (default: "default").
     */
    time(label?: string): void;

    /**
     * Stops a timer and logs the elapsed time.
     * @param label The timer label (default: "default").
     */
    timeEnd(label?: string): void;

    /**
     * Logs the current elapsed time without stopping the timer.
     * @param label The timer label (default: "default").
     * @param args Additional values to log.
     */
    timeLog(label?: string, ...args: unknown[]): void;
  }

  /** Global console object for logging. */
  var console: Console;
}
