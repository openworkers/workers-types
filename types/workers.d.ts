// OpenWorkers-specific types

interface ScheduledEvent {
  scheduledTime: number;
  cron?: string;
  waitUntil(promise: Promise<unknown>): void;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

interface ExportedHandler<Env = unknown> {
  fetch?(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Response | Promise<Response>;
  scheduled?(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): void | Promise<void>;
}

// addEventListener pattern

interface FetchEvent extends Event {
  readonly request: Request;
  respondWith(response: Response | Promise<Response>): void;
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

interface ScheduledEventListener {
  (event: ScheduledEvent & { waitUntil(promise: Promise<unknown>): void }): void;
}

declare function addEventListener(
  type: "fetch",
  listener: (event: FetchEvent) => void
): void;

declare function addEventListener(
  type: "scheduled",
  listener: ScheduledEventListener
): void;
