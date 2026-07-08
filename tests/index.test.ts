import { describe, it, expect, vi } from 'vitest';
import { retry } from '../src/index.js';

describe('async-retry-backoff', () => {
  it('should retry on failure and eventually resolve', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      if (calls < 3) throw new Error('fail');
      return 'success';
    };

    const res = await retry(fn, { maxRetries: 3, baseDelayMs: 10, jitter: false });
    expect(res).toBe('success');
    expect(calls).toBe(3);
  });
});
