// Blob & FormData API types

export {};

declare global {
  /**
   * A file-like object of immutable, raw data.
   * Can be read as text, ArrayBuffer, or streamed.
   *
   * @example
   * ```ts
   * const blob = new Blob(['Hello, World!'], { type: 'text/plain' });
   * const text = await blob.text(); // "Hello, World!"
   * ```
   */
  class Blob {
    /**
     * Creates a new Blob.
     * @param blobParts Array of data to include in the blob.
     * @param options Optional settings like MIME type.
     */
    constructor(
      blobParts?: (ArrayBuffer | Uint8Array | Blob | string)[],
      options?: { type?: string }
    );

    /** The size of the blob in bytes. */
    readonly size: number;

    /** The MIME type of the blob. */
    readonly type: string;

    /** Returns a promise that resolves with an ArrayBuffer containing the blob's data. */
    arrayBuffer(): Promise<ArrayBuffer>;

    /**
     * Returns a new Blob containing a subset of this blob's data.
     * @param start Starting byte index (inclusive).
     * @param end Ending byte index (exclusive).
     * @param contentType MIME type for the new blob.
     */
    slice(start?: number, end?: number, contentType?: string): Blob;

    /** Returns a ReadableStream for reading the blob's contents. */
    stream(): ReadableStream<Uint8Array>;

    /** Returns a promise that resolves with the blob's contents as a string. */
    text(): Promise<string>;
  }

  /**
   * A File is a Blob with a name and last modified timestamp.
   * Typically obtained from FormData or file uploads.
   */
  interface File extends Blob {
    /** The last modified timestamp in milliseconds since Unix epoch. */
    readonly lastModified: number;

    /** The name of the file. */
    readonly name: string;
  }

  /**
   * A set of key/value pairs representing form fields and their values.
   * Used for building multipart/form-data requests.
   *
   * @example
   * ```ts
   * const form = new FormData();
   * form.append('name', 'John');
   * form.append('file', new Blob(['content']), 'file.txt');
   * await fetch('/upload', { method: 'POST', body: form });
   * ```
   */
  class FormData {
    constructor();

    /**
     * Appends a new value to an existing key, or adds the key if it doesn't exist.
     * @param name The field name.
     * @param value The field value.
     * @param filename Optional filename for Blob values.
     */
    append(name: string, value: string | Blob, filename?: string): void;

    /** Deletes all values associated with a given key. */
    delete(name: string): void;

    /** Returns the first value associated with a given key. */
    get(name: string): string | File | null;

    /** Returns all values associated with a given key. */
    getAll(name: string): (string | File)[];

    /** Returns whether a given key exists. */
    has(name: string): boolean;

    /**
     * Sets a value for a key, replacing any existing values.
     * @param name The field name.
     * @param value The field value.
     * @param filename Optional filename for Blob values.
     */
    set(name: string, value: string | Blob, filename?: string): void;

    /** Executes a callback for each key/value pair. */
    forEach(
      callback: (value: string | File, key: string, parent: FormData) => void
    ): void;

    /** Returns an iterator of all key/value pairs. */
    entries(): IterableIterator<[string, string | File]>;

    /** Returns an iterator of all keys. */
    keys(): IterableIterator<string>;

    /** Returns an iterator of all values. */
    values(): IterableIterator<string | File>;

    [Symbol.iterator](): IterableIterator<[string, string | File]>;
  }
}
