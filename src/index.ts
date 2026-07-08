export interface RetryOptions {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
  jitter?: boolean;
  signal?: AbortSignal;
  shouldRetry?: (error: any) => boolean;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 100;
  const maxDelayMs = options.maxDelayMs ?? 3000;
  const factor = options.factor ?? 2;
  const jitter = options.jitter ?? true;

  let attempt = 0;

  while (true) {
    if (options.signal?.aborted) {
      throw new Error('Operation aborted');
    }

    try {
      return await fn();
    } catch (err: any) {
      attempt++;
      if (attempt > maxRetries || (options.shouldRetry && !options.shouldRetry(err))) {
        throw err;
      }

      let delay = Math.min(maxDelayMs, baseDelayMs * Math.pow(factor, attempt - 1));
      if (jitter) {
        delay = Math.random() * delay;
      }

      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          options.signal?.removeEventListener('abort', onAbort);
          resolve();
        }, delay);

        function onAbort() {
          clearTimeout(timeout);
          reject(new Error('Operation aborted'));
        }

        options.signal?.addEventListener('abort', onAbort);
      });
    }
  }
}
