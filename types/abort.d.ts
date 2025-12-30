// AbortController API types

export {};

declare global {
  /**
   * A signal object that allows you to communicate with an async operation
   * and abort it if required via an AbortController.
   */
  interface AbortSignal extends EventTarget {
    /** Returns true if the signal has been aborted. */
    readonly aborted: boolean;

    /** The reason for aborting, if any. */
    readonly reason: unknown;

    /** Throws the abort reason if the signal has been aborted. */
    throwIfAborted(): void;
  }

  /**
   * A controller object that allows you to abort one or more async operations.
   *
   * @example
   * ```ts
   * const controller = new AbortController();
   * fetch(url, { signal: controller.signal });
   * controller.abort(); // Cancels the fetch
   * ```
   */
  class AbortController {
    /** The AbortSignal associated with this controller. */
    readonly signal: AbortSignal;

    /** Aborts the associated signal with an optional reason. */
    abort(reason?: unknown): void;
  }
}
