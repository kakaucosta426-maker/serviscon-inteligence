type AttemptBucket = { count: number; resetAt: number };

const attempts = new Map<string, AttemptBucket>();
const maxAttempts = 5;
const windowMs = 15 * 60 * 1000;

export class LoginRateLimitError extends Error {
  constructor() {
    super("Muitas tentativas de login. Aguarde alguns minutos e tente novamente.");
    this.name = "LoginRateLimitError";
  }
}

export function assertLoginAllowed(identifier: string, now = Date.now()): void {
  const key = identifier.trim().toLowerCase();
  const bucket = attempts.get(key);

  if (!bucket || bucket.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= maxAttempts) {
    throw new LoginRateLimitError();
  }

  bucket.count += 1;
}

export function clearLoginAttempts(identifier: string): void {
  attempts.delete(identifier.trim().toLowerCase());
}

export function resetLoginRateLimitForTests(): void {
  attempts.clear();
}
