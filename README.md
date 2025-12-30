# @openworkers/workers-types

TypeScript types for the OpenWorkers runtime.

## Installation

```bash
bun add -d @openworkers/workers-types
```

## Usage

### Exclusive mode (recommended)

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@openworkers/workers-types"]
  }
}
```

This includes only OpenWorkers types and excludes conflicting types (like `@types/node` or `@types/bun`). Best for pure worker projects.

### Compatible mode

If you need to mix with Node.js or Bun types, just install the package without configuring `types`. The types will merge with existing globals:

```json
{
  "compilerOptions": {
    // no "types" array - all @types/* are included
  }
}
```

### Triple-slash directive

For per-file control:

```typescript
/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference types="@openworkers/workers-types" />
```

## Structure

- `types/globals.d.ts` - globalThis, self
- `types/fetch.d.ts` - Request, Response, Headers, fetch
- `types/url.d.ts` - URL, URLSearchParams
- `types/streams.d.ts` - ReadableStream, WritableStream
- `types/crypto.d.ts` - Web Crypto API
- `types/encoding.d.ts` - TextEncoder, TextDecoder, atob, btoa
- `types/console.d.ts` - Console API
- `types/timers.d.ts` - setTimeout, setInterval
- `types/events.d.ts` - Event, EventTarget
- `types/abort.d.ts` - AbortController, AbortSignal
- `types/blob.d.ts` - Blob, File, FormData
- `types/workers.d.ts` - ExecutionContext, ScheduledEvent, ExportedHandler
- `types/bindings.d.ts` - BindingAssets, BindingStorage, BindingKV, BindingDatabase, BindingWorker
