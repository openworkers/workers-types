// AbortController API types

interface AbortSignal extends EventTarget {
  readonly aborted: boolean;
  readonly reason: unknown;
  throwIfAborted(): void;
}

declare class AbortController {
  readonly signal: AbortSignal;
  abort(reason?: unknown): void;
}
