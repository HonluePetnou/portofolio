type Bucket = {
  tokens: number;
  lastRefill: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function rateLimit(key: string): boolean {
  const now = Date.now();
  const existing = buckets.get(key) ?? { tokens: MAX_REQUESTS, lastRefill: now };

  if (now - existing.lastRefill >= WINDOW_MS) {
    existing.tokens = MAX_REQUESTS;
    existing.lastRefill = now;
  }

  if (existing.tokens <= 0) {
    buckets.set(key, existing);
    return false;
  }

  existing.tokens -= 1;
  buckets.set(key, existing);
  return true;
}

