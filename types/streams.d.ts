// Streams API types

interface ReadableStreamDefaultReader<R = unknown> {
  readonly closed: Promise<undefined>;
  cancel(reason?: unknown): Promise<void>;
  read(): Promise<{ done: false; value: R } | { done: true; value?: undefined }>;
  releaseLock(): void;
}

interface ReadableStream<R = unknown> {
  readonly locked: boolean;
  cancel(reason?: unknown): Promise<void>;
  getReader(): ReadableStreamDefaultReader<R>;
  pipeThrough<T>(transform: {
    writable: WritableStream<R>;
    readable: ReadableStream<T>;
  }): ReadableStream<T>;
  pipeTo(dest: WritableStream<R>): Promise<void>;
  tee(): [ReadableStream<R>, ReadableStream<R>];
}

interface ReadableStreamDefaultController<R = unknown> {
  readonly desiredSize: number | null;
  close(): void;
  enqueue(chunk: R): void;
  error(e?: unknown): void;
}

declare var ReadableStream: {
  prototype: ReadableStream;
  new <R = unknown>(source?: {
    start?(controller: ReadableStreamDefaultController<R>): void | Promise<void>;
    pull?(controller: ReadableStreamDefaultController<R>): void | Promise<void>;
    cancel?(reason?: unknown): void | Promise<void>;
  }): ReadableStream<R>;
};

interface WritableStreamDefaultWriter<W = unknown> {
  readonly closed: Promise<undefined>;
  readonly desiredSize: number | null;
  readonly ready: Promise<undefined>;
  abort(reason?: unknown): Promise<void>;
  close(): Promise<void>;
  releaseLock(): void;
  write(chunk: W): Promise<void>;
}

interface WritableStream<W = unknown> {
  readonly locked: boolean;
  abort(reason?: unknown): Promise<void>;
  close(): Promise<void>;
  getWriter(): WritableStreamDefaultWriter<W>;
}

interface WritableStreamDefaultController {
  error(e?: unknown): void;
}

declare var WritableStream: {
  prototype: WritableStream;
  new <W = unknown>(sink?: {
    start?(controller: WritableStreamDefaultController): void | Promise<void>;
    write?(chunk: W, controller: WritableStreamDefaultController): void | Promise<void>;
    close?(controller: WritableStreamDefaultController): void | Promise<void>;
    abort?(reason?: unknown): void | Promise<void>;
  }): WritableStream<W>;
};
