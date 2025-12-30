// Web Crypto API types

/**
 * Low-level cryptographic operations.
 * Access via `crypto.subtle`.
 */
interface SubtleCrypto {
  /**
   * Computes a digest (hash) of data.
   * @param algorithm The hash algorithm (e.g., "SHA-256", "SHA-384", "SHA-512").
   * @param data The data to hash.
   *
   * @example
   * ```ts
   * const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('hello'));
   * ```
   */
  digest(
    algorithm: string | { name: string },
    data: BufferSource
  ): Promise<ArrayBuffer>;

  /**
   * Encrypts data using a key.
   * @param algorithm The encryption algorithm and parameters.
   * @param key The encryption key.
   * @param data The data to encrypt.
   */
  encrypt(
    algorithm: unknown,
    key: CryptoKey,
    data: BufferSource
  ): Promise<ArrayBuffer>;

  /**
   * Decrypts data using a key.
   * @param algorithm The encryption algorithm and parameters.
   * @param key The decryption key.
   * @param data The data to decrypt.
   */
  decrypt(
    algorithm: unknown,
    key: CryptoKey,
    data: BufferSource
  ): Promise<ArrayBuffer>;

  /**
   * Signs data using a private key.
   * @param algorithm The signing algorithm and parameters.
   * @param key The private key.
   * @param data The data to sign.
   */
  sign(
    algorithm: unknown,
    key: CryptoKey,
    data: BufferSource
  ): Promise<ArrayBuffer>;

  /**
   * Verifies a signature using a public key.
   * @param algorithm The signing algorithm and parameters.
   * @param key The public key.
   * @param signature The signature to verify.
   * @param data The original data.
   * @returns True if the signature is valid.
   */
  verify(
    algorithm: unknown,
    key: CryptoKey,
    signature: BufferSource,
    data: BufferSource
  ): Promise<boolean>;

  /**
   * Generates a new cryptographic key or key pair.
   * @param algorithm The algorithm and parameters.
   * @param extractable Whether the key can be exported.
   * @param keyUsages The allowed operations for this key.
   */
  generateKey(
    algorithm: unknown,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey | CryptoKeyPair>;

  /**
   * Imports a key from external format.
   * @param format The key format ("raw", "pkcs8", "spki", "jwk").
   * @param keyData The key data.
   * @param algorithm The algorithm and parameters.
   * @param extractable Whether the key can be exported.
   * @param keyUsages The allowed operations for this key.
   */
  importKey(
    format: string,
    keyData: unknown,
    algorithm: unknown,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;

  /**
   * Exports a key to external format.
   * @param format The key format ("raw", "pkcs8", "spki", "jwk").
   * @param key The key to export.
   */
  exportKey(format: string, key: CryptoKey): Promise<ArrayBuffer | JsonWebKey>;

  /**
   * Derives bits from a base key.
   * @param algorithm The derivation algorithm and parameters.
   * @param baseKey The base key.
   * @param length The number of bits to derive.
   */
  deriveBits(
    algorithm: unknown,
    baseKey: CryptoKey,
    length: number
  ): Promise<ArrayBuffer>;

  /**
   * Derives a new key from a base key.
   * @param algorithm The derivation algorithm and parameters.
   * @param baseKey The base key.
   * @param derivedKeyType The algorithm for the derived key.
   * @param extractable Whether the derived key can be exported.
   * @param keyUsages The allowed operations for the derived key.
   */
  deriveKey(
    algorithm: unknown,
    baseKey: CryptoKey,
    derivedKeyType: unknown,
    extractable: boolean,
    keyUsages: string[]
  ): Promise<CryptoKey>;
}

/**
 * A cryptographic key for use with SubtleCrypto.
 */
interface CryptoKey {
  /** The algorithm used by this key. */
  readonly algorithm: unknown;

  /** Whether the key can be exported. */
  readonly extractable: boolean;

  /** The key type ("public", "private", or "secret"). */
  readonly type: string;

  /** The allowed operations for this key. */
  readonly usages: string[];
}

/**
 * A key pair containing both public and private keys.
 */
interface CryptoKeyPair {
  /** The private key. */
  readonly privateKey: CryptoKey;

  /** The public key. */
  readonly publicKey: CryptoKey;
}

/**
 * A key in JSON Web Key format.
 */
interface JsonWebKey {
  [key: string]: unknown;
}

/**
 * Web Crypto API providing cryptographic functionality.
 */
interface Crypto {
  /** Low-level cryptographic operations. */
  readonly subtle: SubtleCrypto;

  /**
   * Fills an array with cryptographically random values.
   * @param array The array to fill.
   * @returns The same array, now filled with random values.
   *
   * @example
   * ```ts
   * const bytes = new Uint8Array(16);
   * crypto.getRandomValues(bytes);
   * ```
   */
  getRandomValues<T extends ArrayBufferView>(array: T): T;

  /**
   * Generates a random UUID (v4).
   * @returns A random UUID string.
   *
   * @example
   * ```ts
   * const id = crypto.randomUUID();
   * // "550e8400-e29b-41d4-a716-446655440000"
   * ```
   */
  randomUUID(): string;
}

/** Global crypto object providing Web Crypto API. */
declare var crypto: Crypto;
