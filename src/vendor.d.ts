declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module 'gifenc' {
  export function GIFEncoder(opts?: { auto?: boolean; initialCapacity?: number }): {
    setRepeat(n: number): void
    setDelay(ms: number): void
    setDispose(n: number): void
    writeFrame(
      pixels: Uint8Array,
      width: number,
      height: number,
      opts?: {
        palette?: Uint8Array
        delay?: number
        repeat?: number
        transparent?: boolean | number
        colorDepth?: number
      }
    ): void
    finish(): void
    bytes(): Uint8Array
  }
  export function quantize(
    pixels: Uint8ClampedArray,
    maxColors: number,
    opts?: { format?: string; oneBitAlpha?: boolean; clearAlpha?: boolean }
  ): Uint8Array
  export function applyPalette(
    pixels: Uint8ClampedArray,
    palette: Uint8Array,
    format?: string
  ): Uint8Array
}

declare module 'lamejs' {
  export class Mp3Encoder {
    constructor(channels: number, sampleRate: number, kbps: number)
    encodeBuffer(left: Int16Array, right?: Int16Array): Int8Array
    flush(): Int8Array
  }
}
