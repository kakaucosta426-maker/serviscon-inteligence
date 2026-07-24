const durationPattern = /^(?<amount>\d+)(?<unit>ms|s|m|h|d)$/;

export function parseDurationToMs(value: string | undefined, fallback: string): number {
  const duration = value ?? fallback;
  const match = durationPattern.exec(duration);
  if (!match?.groups) {
    throw new Error(`Duração inválida: ${duration}`);
  }

  const amount = Number(match.groups.amount);
  const unit = match.groups.unit;
  const multipliers: Record<string, number> = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
}

export function getSessionTtlMs(): number {
  return parseDurationToMs(process.env.SESSION_TTL, "8h");
}

export function getLoginRateLimitMax(): number {
  const value = Number(process.env.LOGIN_RATE_LIMIT_MAX ?? "5");
  if (!Number.isInteger(value) || value < 1) {
    throw new Error("LOGIN_RATE_LIMIT_MAX deve ser um inteiro positivo.");
  }
  return value;
}

export function getLoginRateLimitWindowMs(): number {
  return parseDurationToMs(process.env.LOGIN_RATE_LIMIT_WINDOW, "15m");
}
