// OpenWorkers Bindings types

interface BindingAssets {
  fetch(path: string, options?: RequestInit): Promise<Response>;
}

interface StorageHeadResult {
  size: number;
  etag?: string;
}

interface StorageListOptions {
  prefix?: string;
  limit?: number;
}

interface StorageListResult {
  keys: string[];
  truncated: boolean;
}

interface BindingStorage {
  get(key: string): Promise<string | null>;
  put(key: string, value: string | Uint8Array): Promise<void>;
  head(key: string): Promise<StorageHeadResult>;
  list(options?: StorageListOptions): Promise<StorageListResult>;
  delete(key: string): Promise<void>;
}

interface KVPutOptions {
  expiresIn?: number;
}

interface KVListOptions {
  prefix?: string;
  limit?: number;
}

interface BindingKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: KVPutOptions): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: KVListOptions): Promise<string[]>;
}

interface BindingDatabase {
  query<T = Record<string, unknown>>(sql: string, params?: unknown[]): Promise<T[]>;
}

interface BindingWorker {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}
