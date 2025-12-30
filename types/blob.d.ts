// Blob & FormData API types

declare class Blob {
  constructor(
    blobParts?: (ArrayBuffer | Uint8Array | Blob | string)[],
    options?: { type?: string }
  );
  readonly size: number;
  readonly type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): Blob;
  stream(): ReadableStream<Uint8Array>;
  text(): Promise<string>;
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

declare class FormData {
  constructor();
  append(name: string, value: string | Blob, filename?: string): void;
  delete(name: string): void;
  get(name: string): string | File | null;
  getAll(name: string): (string | File)[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, filename?: string): void;
  forEach(
    callback: (value: string | File, key: string, parent: FormData) => void
  ): void;
  entries(): IterableIterator<[string, string | File]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string | File>;
  [Symbol.iterator](): IterableIterator<[string, string | File]>;
}
