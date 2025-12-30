// OpenWorkers-specific types

/**
 * Event triggered for scheduled (cron) worker invocations.
 */
interface ScheduledEvent {
  /** The timestamp when this invocation was scheduled (Unix ms). */
  scheduledTime: number;

  /** The cron expression that triggered this event, if any. */
  cron?: string;

  /**
   * Extends the event lifetime until the promise resolves.
   * Use for background work that should complete after returning.
   */
  waitUntil(promise: Promise<unknown>): void;
}

/**
 * Execution context provided to worker handlers.
 * Allows extending request lifetime and handling exceptions.
 */
interface ExecutionContext {
  /**
   * Extends the request lifetime until the promise resolves.
   * Use for background work like logging, analytics, or cache updates.
   *
   * @example
   * ```ts
   * ctx.waitUntil(analytics.track(event));
   * return new Response('OK');
   * ```
   */
  waitUntil(promise: Promise<unknown>): void;

  /**
   * Allows the request to pass through to origin on uncaught exceptions.
   * Must be called before any response is sent.
   */
  passThroughOnException(): void;
}

/**
 * The module format for worker handlers.
 * Export a default object implementing this interface.
 *
 * @example
 * ```ts
 * export default {
 *   async fetch(request, env, ctx) {
 *     return new Response('Hello!');
 *   }
 * } satisfies ExportedHandler<Env>;
 * ```
 */
interface ExportedHandler<Env = unknown> {
  /**
   * Handles incoming HTTP requests.
   * @param request The incoming request.
   * @param env Environment bindings.
   * @param ctx Execution context.
   */
  fetch?(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Response | Promise<Response>;

  /**
   * Handles scheduled (cron) invocations.
   * @param event The scheduled event.
   * @param env Environment bindings.
   * @param ctx Execution context.
   */
  scheduled?(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): void | Promise<void>;
}

// addEventListener pattern

/**
 * Event for incoming HTTP requests (addEventListener pattern).
 *
 * @example
 * ```ts
 * addEventListener('fetch', (event) => {
 *   event.respondWith(handleRequest(event.request));
 * });
 * ```
 */
interface FetchEvent extends Event {
  /** The incoming HTTP request. */
  readonly request: Request;

  /**
   * Sets the response for this request.
   * Must be called exactly once.
   */
  respondWith(response: Response | Promise<Response>): void;

  /**
   * Extends the event lifetime until the promise resolves.
   */
  waitUntil(promise: Promise<unknown>): void;

  /**
   * Allows the request to pass through to origin on uncaught exceptions.
   */
  passThroughOnException(): void;
}

/**
 * Listener for scheduled events.
 */
interface ScheduledEventListener {
  (event: ScheduledEvent & { waitUntil(promise: Promise<unknown>): void }): void;
}

/**
 * Registers a fetch event listener (Service Worker pattern).
 */
declare function addEventListener(
  type: "fetch",
  listener: (event: FetchEvent) => void
): void;

/**
 * Registers a scheduled event listener (Service Worker pattern).
 */
declare function addEventListener(
  type: "scheduled",
  listener: ScheduledEventListener
): void;
