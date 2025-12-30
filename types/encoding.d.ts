// Encoding API types

declare class TextEncoder {
  readonly encoding: string;
  encode(input?: string): Uint8Array;
  encodeInto(
    source: string,
    destination: Uint8Array
  ): { read: number; written: number };
}

declare class TextDecoder {
  constructor(label?: string, options?: { fatal?: boolean; ignoreBOM?: boolean });
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;
  decode(input?: ArrayBuffer | Uint8Array, options?: { stream?: boolean }): string;
}

declare function atob(data: string): string;
declare function btoa(data: string): string;
