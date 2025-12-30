// URL API types

export {};

declare global {
  /**
   * The URL interface represents a parsed URL.
   * Provides access to URL components and handles encoding automatically.
   *
   * @example
   * ```ts
   * const url = new URL('https://example.com:8080/path?q=1#hash');
   * url.hostname // "example.com"
   * url.port     // "8080"
   * url.pathname // "/path"
   * url.search   // "?q=1"
   * url.hash     // "#hash"
   * ```
   */
  class URL {
    /**
     * Creates a new URL.
     * @param url The URL string or URL object.
     * @param base Optional base URL to resolve relative URLs against.
     */
    constructor(url: string | URL, base?: string | URL);

    /** The fragment identifier including the `#`. */
    hash: string;

    /** The host (hostname and port). */
    host: string;

    /** The domain name. */
    hostname: string;

    /** The full URL as a string. */
    href: string;

    /** The origin (protocol + host). Read-only. */
    readonly origin: string;

    /** The password (rarely used). */
    password: string;

    /** The path portion of the URL. */
    pathname: string;

    /** The port number as a string, or empty if default for protocol. */
    port: string;

    /** The protocol including the trailing `:`. */
    protocol: string;

    /** The query string including the `?`. */
    search: string;

    /** The query string as URLSearchParams. Read-only. */
    readonly searchParams: URLSearchParams;

    /** The username (rarely used). */
    username: string;

    /** Returns the URL as a string. */
    toString(): string;

    /** Returns the URL as a string (for JSON serialization). */
    toJSON(): string;
  }

  /**
   * Utility for working with URL query strings.
   * Handles encoding/decoding and provides iterator methods.
   *
   * @example
   * ```ts
   * const params = new URLSearchParams('a=1&b=2');
   * params.get('a')     // "1"
   * params.append('c', '3');
   * params.toString()   // "a=1&b=2&c=3"
   * ```
   */
  class URLSearchParams {
    /**
     * Creates a new URLSearchParams.
     * @param init Initial parameters as string, object, or array of pairs.
     */
    constructor(
      init?: string | URLSearchParams | Record<string, string> | [string, string][]
    );

    /** Appends a new key/value pair. */
    append(name: string, value: string): void;

    /** Deletes all values for a given key. */
    delete(name: string): void;

    /** Returns the first value for a given key, or null. */
    get(name: string): string | null;

    /** Returns all values for a given key. */
    getAll(name: string): string[];

    /** Returns whether a given key exists. */
    has(name: string): boolean;

    /** Sets a value for a key, replacing any existing values. */
    set(name: string, value: string): void;

    /** Sorts all key/value pairs by key name. */
    sort(): void;

    /** Returns the query string (without leading `?`). */
    toString(): string;

    /** Executes a callback for each key/value pair. */
    forEach(
      callback: (value: string, key: string, parent: URLSearchParams) => void
    ): void;

    /** Returns an iterator of all key/value pairs. */
    entries(): IterableIterator<[string, string]>;

    /** Returns an iterator of all keys. */
    keys(): IterableIterator<string>;

    /** Returns an iterator of all values. */
    values(): IterableIterator<string>;

    [Symbol.iterator](): IterableIterator<[string, string]>;
  }
}
