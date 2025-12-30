// Global scope types

export {};

declare global {
  /**
   * The global object. Standard way to access globals in any environment.
   * Equivalent to `window` in browsers, `global` in Node.js, `self` in workers.
   */
  var globalThis: typeof globalThis;

  /**
   * Reference to the global scope in worker environments.
   * Equivalent to `globalThis`.
   */
  var self: typeof globalThis;
}
