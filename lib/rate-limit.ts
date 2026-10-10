const requests = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(ip: string | null, maxRequests = 5, windowMs = 60_000) {
  const key = ip ?? "anonymous";
  const now = Date.now();
  const existing = requests.get(key);

  if (!existing || existing.resetAt <= now) {
    requests.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (existing.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: maxRequests - existing.count };
}
