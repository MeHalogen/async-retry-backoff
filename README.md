# async-retry-backoff

Type-safe retry wrapper with exponential backoff and jitter.

## Usage

```ts
import { retry } from 'async-retry-backoff';

const data = await retry(async () => fetch('https://api.com'), {
  maxRetries: 5,
  baseDelayMs: 200
});
```
