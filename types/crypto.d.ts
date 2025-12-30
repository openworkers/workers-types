// Web Crypto API types

interface SubtleCrypto {
  digest(
    algorithm: string | { name: string },
    data: BufferSource
  ): Promise<ArrayBuffer>;
  encrypt(
    algorithm: unknown,
    key: CryptoKey,
    data: BufferSource
  ): Promise<ArrayBuffer>;
  decrypt(
    algorithm: unknown,
    key: CryptoKey,
    data: BufferSource
  ): Promise<ArrayBuffer>;
  sign(
    algorithm: unknown,
    key: CryptoKey,
    data: BufferSource
  ): Promise<ArrayBuffer>;
  verify(
    algorithm: unknown,
    key: CryptoKey,
    signature: BufferSource,
    data: BufferSource
  ): Promise<boolean>;
  generateKey(
    algorithm: unknown,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey | CryptoKeyPair>;
  importKey(
    format: string,
    keyData: unknown,
    algorithm: unknown,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;
  exportKey(format: string, key: CryptoKey): Promise<ArrayBuffer | JsonWebKey>;
  deriveBits(
    algorithm: unknown,
    baseKey: CryptoKey,
    length: number
  ): Promise<ArrayBuffer>;
  deriveKey(
    algorithm: unknown,
    baseKey: CryptoKey,
    derivedKeyType: unknown,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;
}

interface CryptoKey {
  readonly algorithm: unknown;
  readonly extractable: boolean;
  readonly type: string;
  readonly usages: string[];
}

interface CryptoKeyPair {
  readonly privateKey: CryptoKey;
  readonly publicKey: CryptoKey;
}

interface JsonWebKey {
  [key: string]: unknown;
}

interface Crypto {
  readonly subtle: SubtleCrypto;
  getRandomValues<T extends ArrayBufferView>(array: T): T;
  randomUUID(): string;
}

declare var crypto: Crypto;
