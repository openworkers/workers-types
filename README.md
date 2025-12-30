# @openworkers/workers-types

TypeScript types for the OpenWorkers runtime.

## Installation

```bash
bun add -d @openworkers/workers-types
```

## Usage

Add to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@openworkers/workers-types"]
  }
}
```

Or use a triple-slash directive:

```typescript
/// <reference types="@openworkers/workers-types" />
```

## Structure

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
