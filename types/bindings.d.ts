// OpenWorkers Bindings types

/**
 * Static asset binding for serving files from the worker bundle.
 *
 * @example
 * ```ts
 * export default {
 *   async fetch(request, env) {
 *     return env.ASSETS.fetch('/index.html');
 *   }
 * }
 * ```
 */
interface BindingAssets {
  /**
   * Fetches a static asset from the bundle.
   * @param path The asset path (e.g., "/index.html").
   * @param options Optional request options.
   */
  fetch(path: string, options?: RequestInit): Promise<Response>;
}

/**
 * Result of a storage head operation.
 */
interface StorageHeadResult {
  /** The size of the object in bytes. */
  size: number;

  /** The ETag of the object, if available. */
  etag?: string;
}

/**
 * Options for listing storage objects.
 */
interface StorageListOptions {
  /** Only return keys starting with this prefix. */
  prefix?: string;

  /** Maximum number of keys to return. */
  limit?: number;
}

/**
 * Result of a storage list operation.
 */
interface StorageListResult {
  /** The matching keys. */
  keys: string[];

  /** Whether there are more keys beyond the limit. */
  truncated: boolean;
}

/**
 * Object storage binding for storing binary data.
 * Suitable for files, images, and large data.
 *
 * @example
 * ```ts
 * // Store data
 * await env.STORAGE.put('file.txt', 'Hello, World!');
 *
 * // Retrieve data
 * const data = await env.STORAGE.get('file.txt');
 * ```
 */
interface BindingStorage {
  /**
   * Retrieves a value by key.
   * @returns The value as a string, or null if not found.
   */
  get(key: string): Promise<string | null>;

  /**
   * Stores a value.
   * @param key The storage key.
   * @param value The value to store.
   */
  put(key: string, value: string | Uint8Array): Promise<void>;

  /**
   * Gets metadata about an object without retrieving its contents.
   */
  head(key: string): Promise<StorageHeadResult>;

  /**
   * Lists keys in storage.
   */
  list(options?: StorageListOptions): Promise<StorageListResult>;

  /**
   * Deletes a key.
   */
  delete(key: string): Promise<void>;
}

/**
 * Options for KV put operations.
 */
interface KVPutOptions {
  /** Time-to-live in seconds. After this time, the key expires. */
  expiresIn?: number;
}

/**
 * Options for KV list operations.
 */
interface KVListOptions {
  /** Only return keys starting with this prefix. */
  prefix?: string;

  /** Maximum number of keys to return. */
  limit?: number;
}

/**
 * Key-Value storage binding for fast, low-latency data access.
 * Ideal for configuration, sessions, and small data.
 *
 * @example
 * ```ts
 * // Store with expiration
 * await env.KV.put('session:abc', userData, { expiresIn: 3600 });
 *
 * // Retrieve
 * const session = await env.KV.get('session:abc');
 * ```
 */
interface BindingKV {
  /**
   * Retrieves a value by key.
   * @returns The value as a string, or null if not found.
   */
  get(key: string): Promise<string | null>;

  /**
   * Stores a value with optional expiration.
   * @param key The storage key.
   * @param value The value to store.
   * @param options Optional settings like TTL.
   */
  put(key: string, value: string, options?: KVPutOptions): Promise<void>;

  /**
   * Deletes a key.
   */
  delete(key: string): Promise<void>;

  /**
   * Lists keys with optional filtering.
   */
  list(options?: KVListOptions): Promise<string[]>;
}

/**
 * SQL database binding for relational data.
 *
 * @example
 * ```ts
 * const users = await env.DB.query<User>(
 *   'SELECT * FROM users WHERE active = ?',
 *   [true]
 * );
 * ```
 */
interface BindingDatabase {
  /**
   * Executes a SQL query.
   * @param sql The SQL query with ? placeholders.
   * @param params Parameter values to bind.
   * @returns An array of result rows.
   */
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
}

/**
 * Service binding for calling other workers.
 *
 * @example
 * ```ts
 * const response = await env.AUTH_SERVICE.fetch(
 *   new Request('https://internal/validate', {
 *     method: 'POST',
 *     body: JSON.stringify({ token })
 *   })
 * );
 * ```
 */
interface BindingWorker {
  /**
   * Calls another worker with a request.
   * @param request The request to send.
   * @param init Optional request options (when using string URL).
   */
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}
