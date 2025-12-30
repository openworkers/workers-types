// Fetch API types

export {};

/**
 * Valid types for a request or response body.
 */
type BodyInit =
  | ReadableStream
  | Blob
  | ArrayBuffer
  | Uint8Array
  | FormData
  | URLSearchParams
  | string;

/**
 * Valid types for initializing Headers.
 */
type HeadersInit = Headers | Record<string, string> | [string, string][];

declare global {
  /**
   * HTTP headers for requests and responses.
   * Provides case-insensitive header name lookup.
   *
   * @example
   * ```ts
   * const headers = new Headers({ 'Content-Type': 'application/json' });
   * headers.set('Authorization', 'Bearer token');
   * headers.get('content-type') // "application/json" (case-insensitive)
   * ```
   */
  class Headers {
    /**
     * Creates a new Headers object.
     * @param init Optional initial headers.
     */
    constructor(init?: HeadersInit);

    /** Appends a value to an existing header, or adds a new header. */
    append(name: string, value: string): void;

    /** Deletes a header. */
    delete(name: string): void;

    /** Returns the value of a header, or null if not found. */
    get(name: string): string | null;

    /** Returns whether a header exists. */
    has(name: string): boolean;

    /** Sets a header value, replacing any existing value. */
    set(name: string, value: string): void;

    /** Executes a callback for each header. */
    forEach(callback: (value: string, key: string, parent: Headers) => void): void;

    /** Returns an iterator of all header name/value pairs. */
    entries(): IterableIterator<[string, string]>;

    /** Returns an iterator of all header names. */
    keys(): IterableIterator<string>;

    /** Returns an iterator of all header values. */
    values(): IterableIterator<string>;

    [Symbol.iterator](): IterableIterator<[string, string]>;
  }

  /**
   * Options for creating a Request.
   */
  interface RequestInit {
    /** HTTP method (GET, POST, etc.). Defaults to "GET". */
    method?: string;

    /** Request headers. */
    headers?: HeadersInit;

    /** Request body. */
    body?: BodyInit | null;

    /** How to handle redirects: "follow", "error", or "manual". */
    redirect?: "follow" | "error" | "manual";

    /** An AbortSignal to cancel the request. */
    signal?: AbortSignal;
  }

  /**
   * An HTTP request that can be passed to fetch() or a worker handler.
   *
   * @example
   * ```ts
   * const request = new Request('https://api.example.com/data', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ key: 'value' })
   * });
   * ```
   */
  class Request {
    /**
     * Creates a new Request.
     * @param input The URL or an existing Request to clone.
     * @param init Optional request options.
     */
    constructor(input: Request | string | URL, init?: RequestInit);

    /** The HTTP method. */
    readonly method: string;

    /** The request URL. */
    readonly url: string;

    /** The request headers. */
    readonly headers: Headers;

    /** The request body as a stream, or null. */
    readonly body: ReadableStream<Uint8Array> | null;

    /** Whether the body has already been consumed. */
    readonly bodyUsed: boolean;

    /** Creates a copy of this request. */
    clone(): Request;

    /** Reads the body as an ArrayBuffer. */
    arrayBuffer(): Promise<ArrayBuffer>;

    /** Reads the body as a Blob. */
    blob(): Promise<Blob>;

    /** Reads the body as FormData. */
    formData(): Promise<FormData>;

    /** Reads the body as JSON. */
    json(): Promise<unknown>;

    /** Reads the body as text. */
    text(): Promise<string>;
  }

  /**
   * Options for creating a Response.
   */
  interface ResponseInit {
    /** HTTP status code. Defaults to 200. */
    status?: number;

    /** HTTP status text. */
    statusText?: string;

    /** Response headers. */
    headers?: HeadersInit;
  }

  /**
   * An HTTP response from fetch() or to return from a worker handler.
   *
   * @example
   * ```ts
   * // Return JSON
   * return Response.json({ success: true });
   *
   * // Return with custom status
   * return new Response('Not Found', { status: 404 });
   *
   * // Redirect
   * return Response.redirect('https://example.com', 302);
   * ```
   */
  class Response {
    /**
     * Creates a new Response.
     * @param body Optional response body.
     * @param init Optional response options.
     */
    constructor(body?: BodyInit | null, init?: ResponseInit);

    /**
     * Creates a JSON response with appropriate Content-Type header.
     * @param data The data to serialize as JSON.
     * @param init Optional response options.
     */
    static json(data: unknown, init?: ResponseInit): Response;

    /**
     * Creates a redirect response.
     * @param url The URL to redirect to.
     * @param status The redirect status code (301, 302, 303, 307, 308). Defaults to 302.
     */
    static redirect(url: string | URL, status?: number): Response;

    /** Creates an error response (opaque, for network errors). */
    static error(): Response;

    /** Whether the status code is in the 200-299 range. */
    readonly ok: boolean;

    /** The HTTP status code. */
    readonly status: number;

    /** The HTTP status text. */
    readonly statusText: string;

    /** The response headers. */
    readonly headers: Headers;

    /** The response body as a stream, or null. */
    readonly body: ReadableStream<Uint8Array> | null;

    /** Whether the body has already been consumed. */
    readonly bodyUsed: boolean;

    /** Creates a copy of this response. */
    clone(): Response;

    /** Reads the body as an ArrayBuffer. */
    arrayBuffer(): Promise<ArrayBuffer>;

    /** Reads the body as a Blob. */
    blob(): Promise<Blob>;

    /** Reads the body as FormData. */
    formData(): Promise<FormData>;

    /** Reads the body as JSON. */
    json(): Promise<unknown>;

    /** Reads the body as text. */
    text(): Promise<string>;
  }

  /**
   * Fetches a resource from the network.
   *
   * @param input The URL or Request to fetch.
   * @param init Optional request options.
   * @returns A Promise that resolves to the Response.
   *
   * @example
   * ```ts
   * const response = await fetch('https://api.example.com/data');
   * const data = await response.json();
   * ```
   */
  function fetch(
    input: Request | string | URL,
    init?: RequestInit
  ): Promise<Response>;
}
