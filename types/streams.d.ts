// Streams API types

export {};

declare global {
  /**
   * A reader for a ReadableStream that reads chunks one at a time.
   * Obtained by calling `stream.getReader()`.
   */
  interface ReadableStreamDefaultReader<R = unknown> {
    /** A promise that resolves when the stream is closed. */
    readonly closed: Promise<undefined>;

    /** Cancels the stream, signaling a loss of interest by the consumer. */
    cancel(reason?: unknown): Promise<void>;

    /**
     * Reads the next chunk from the stream.
     * @returns A promise that resolves to `{done: false, value: chunk}` or `{done: true}` when the stream ends.
     */
    read(): Promise<{ done: false; value: R } | { done: true; value?: undefined }>;

    /** Releases the reader's lock on the stream, allowing other readers to acquire it. */
    releaseLock(): void;
  }

  /**
   * A readable stream of data that can be consumed chunk by chunk.
   * Part of the WHATWG Streams Standard.
   *
   * @example
   * ```ts
   * const stream = new ReadableStream({
   *   start(controller) {
   *     controller.enqueue('Hello');
   *     controller.enqueue('World');
   *     controller.close();
   *   }
   * });
   * ```
   */
  interface ReadableStream<R = unknown> {
    /** Whether the stream is locked to a reader. */
    readonly locked: boolean;

    /** Cancels the stream, signaling a loss of interest by the consumer. */
    cancel(reason?: unknown): Promise<void>;

    /** Creates a reader and locks the stream to it. */
    getReader(): ReadableStreamDefaultReader<R>;

    /**
     * Pipes this stream through a transform stream, returning the readable side.
     * @param transform An object with `writable` and `readable` properties.
     */
    pipeThrough<T>(transform: {
      writable: WritableStream<R>;
      readable: ReadableStream<T>;
    }): ReadableStream<T>;

    /** Pipes this stream to a writable stream. */
    pipeTo(dest: WritableStream<R>): Promise<void>;

    /** Creates two branches of this stream that can be read independently. */
    tee(): [ReadableStream<R>, ReadableStream<R>];
  }

  /**
   * Controller for a ReadableStream that allows enqueueing chunks.
   * Passed to the `start` and `pull` callbacks.
   */
  interface ReadableStreamDefaultController<R = unknown> {
    /** The amount of data the consumer wants, or null if the stream is closed. */
    readonly desiredSize: number | null;

    /** Closes the stream. No more chunks can be enqueued after this. */
    close(): void;

    /** Enqueues a chunk of data to be read. */
    enqueue(chunk: R): void;

    /** Errors the stream, causing all future operations to fail. */
    error(e?: unknown): void;
  }

  var ReadableStream: {
    prototype: ReadableStream;

    /**
     * Creates a new ReadableStream.
     * @param source An object defining the stream's behavior.
     */
    new <R = unknown>(source?: {
      /** Called when the stream is created. Use to set up the data source. */
      start?(controller: ReadableStreamDefaultController<R>): void | Promise<void>;
      /** Called when the consumer wants more data. */
      pull?(controller: ReadableStreamDefaultController<R>): void | Promise<void>;
      /** Called when the consumer cancels the stream. */
      cancel?(reason?: unknown): void | Promise<void>;
    }): ReadableStream<R>;
  };

  /**
   * A writer for a WritableStream that writes chunks one at a time.
   * Obtained by calling `stream.getWriter()`.
   */
  interface WritableStreamDefaultWriter<W = unknown> {
    /** A promise that resolves when the stream is closed. */
    readonly closed: Promise<undefined>;

    /** The amount of data the stream can accept, or null if closed. */
    readonly desiredSize: number | null;

    /** A promise that resolves when the stream is ready to accept more data. */
    readonly ready: Promise<undefined>;

    /** Aborts the stream, signaling an error condition. */
    abort(reason?: unknown): Promise<void>;

    /** Closes the stream. No more chunks can be written after this. */
    close(): Promise<void>;

    /** Releases the writer's lock on the stream. */
    releaseLock(): void;

    /** Writes a chunk of data to the stream. */
    write(chunk: W): Promise<void>;
  }

  /**
   * A writable stream that accepts chunks of data.
   * Part of the WHATWG Streams Standard.
   *
   * @example
   * ```ts
   * const stream = new WritableStream({
   *   write(chunk) {
   *     console.log('Received:', chunk);
   *   }
   * });
   * ```
   */
  interface WritableStream<W = unknown> {
    /** Whether the stream is locked to a writer. */
    readonly locked: boolean;

    /** Aborts the stream, signaling an error condition. */
    abort(reason?: unknown): Promise<void>;

    /** Closes the stream. */
    close(): Promise<void>;

    /** Creates a writer and locks the stream to it. */
    getWriter(): WritableStreamDefaultWriter<W>;
  }

  /**
   * Controller for a WritableStream.
   * Passed to the `start`, `write`, `close`, and `abort` callbacks.
   */
  interface WritableStreamDefaultController {
    /** Errors the stream, causing all future operations to fail. */
    error(e?: unknown): void;
  }

  var WritableStream: {
    prototype: WritableStream;

    /**
     * Creates a new WritableStream.
     * @param sink An object defining the stream's behavior.
     */
    new <W = unknown>(sink?: {
      /** Called when the stream is created. */
      start?(controller: WritableStreamDefaultController): void | Promise<void>;
      /** Called for each chunk written to the stream. */
      write?(chunk: W, controller: WritableStreamDefaultController): void | Promise<void>;
      /** Called when the stream is closed. */
      close?(controller: WritableStreamDefaultController): void | Promise<void>;
      /** Called when the stream is aborted. */
      abort?(reason?: unknown): void | Promise<void>;
    }): WritableStream<W>;
  };
}
