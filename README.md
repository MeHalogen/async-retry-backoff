# async-retry-backoff

> **Why use async-retry-backoff?**
> When calling external APIs or databases, transient network hiccups cause requests to fail. Simple retry loops flood target servers (causing a stampeding herd problem) if they don't use backoff and jitter algorithms.

A type-safe async retry utility implementing exponential backoff with full jitter to spread retry spikes, plus built-in AbortController integration.

---

## ⚡ Features
* **Exponential backoff with custom multipliers**
* **Full Jitter algorithm to prevent thundering herd spikes**
* **Built-in AbortSignal integration to cancel in-flight retries**
* **Type-safe return signatures matching target function**

---

## 📦 Installation
```bash
npm i async-retry-backoff
```

---

## 🚀 Usage
```javascript
import { retry } from 'async-retry-backoff';

const fetchUser = async () => {
  const res = await fetch('https://api.example.com/user');
  if (!res.ok) throw new Error('API Error');
  return res.json();
};

const user = await retry(fetchUser, {
  retries: 5,
  factor: 2,
  minTimeout: 100,
  maxTimeout: 2000
});
```

---

## ⚙️ API Reference
### retry(fn, options?)
* `fn`: `() => Promise<T>` - Async task to retry.
* `options`: `{ retries?: number, factor?: number, minTimeout?: number, maxTimeout?: number, signal?: AbortSignal }`
* Returns `Promise<T>` matching target function return type.

---

## 📺 Demonstration
![Terminal Demo](./demo.gif)

---

## 📄 License
MIT License.
