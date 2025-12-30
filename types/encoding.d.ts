// Encoding API types

export {};

declare global {
  /**
   * A view into an ArrayBuffer, representing raw binary data.
   * Includes Uint8Array, Int32Array, DataView, etc.
   */
  type BufferSource = ArrayBuffer | ArrayBufferView;

  /**
   * Encodes strings to UTF-8 bytes.
   *
   * @example
   * ```ts
   * const encoder = new TextEncoder();
   * const bytes = encoder.encode('Hello');
   * // Uint8Array [72, 101, 108, 108, 111]
   * ```
   */
  class TextEncoder {
    /** Always "utf-8". */
    readonly encoding: string;

    /**
     * Encodes a string to UTF-8 bytes.
     * @param input The string to encode.
     * @returns A Uint8Array containing the encoded bytes.
     */
    encode(input?: string): Uint8Array;

    /**
     * Encodes a string into an existing Uint8Array.
     * @param source The string to encode.
     * @param destination The buffer to write into.
     * @returns An object with `read` (chars read) and `written` (bytes written).
     */
    encodeInto(
      source: string,
      destination: Uint8Array
    ): { read: number; written: number };
  }

  /**
   * Decodes bytes to strings.
   * Supports multiple encodings (default: UTF-8).
   *
   * @example
   * ```ts
   * const decoder = new TextDecoder();
   * const text = decoder.decode(new Uint8Array([72, 101, 108, 108, 111]));
   * // "Hello"
   * ```
   */
  class TextDecoder {
    /**
     * Creates a new TextDecoder.
     * @param label The encoding to use (default: "utf-8").
     * @param options Decoding options.
     */
    constructor(label?: string, options?: { fatal?: boolean; ignoreBOM?: boolean });

    /** The encoding used by this decoder. */
    readonly encoding: string;

    /** Whether decoding errors throw exceptions. */
    readonly fatal: boolean;

    /** Whether the BOM (Byte Order Mark) is ignored. */
    readonly ignoreBOM: boolean;

    /**
     * Decodes bytes to a string.
     * @param input The bytes to decode.
     * @param options Decoding options.
     * @returns The decoded string.
     */
    decode(input?: ArrayBuffer | Uint8Array, options?: { stream?: boolean }): string;
  }

  /**
   * Decodes a Base64-encoded string to binary.
   * @param data The Base64 string to decode.
   * @returns A binary string (each char is a byte).
   *
   * @example
   * ```ts
   * atob('SGVsbG8=') // "Hello"
   * ```
   */
  function atob(data: string): string;

  /**
   * Encodes a binary string to Base64.
   * @param data The binary string to encode.
   * @returns The Base64-encoded string.
   *
   * @example
   * ```ts
   * btoa('Hello') // "SGVsbG8="
   * ```
   */
  function btoa(data: string): string;
}
