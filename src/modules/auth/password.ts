import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

const algorithm = "pbkdf2-sha512";
const iterations = 210_000;
const keyLength = 64;
const digest = "sha512";

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")): string {
  if (password.length < 12) {
    throw new Error("A senha deve ter pelo menos 12 caracteres.");
  }

  const derivedKey = pbkdf2Sync(password, salt, iterations, keyLength, digest).toString("hex");
  return `${algorithm}$${iterations}$${salt}$${derivedKey}`;
}

export function verifyPassword(password: string, passwordHash: string): boolean {
  const [storedAlgorithm, storedIterations, salt, storedKey] = passwordHash.split("$");
  if (storedAlgorithm !== algorithm || !storedIterations || !salt || !storedKey) {
    return false;
  }

  const attemptedKey = pbkdf2Sync(
    password,
    salt,
    Number(storedIterations),
    Buffer.from(storedKey, "hex").length,
    digest,
  );
  const storedKeyBuffer = Buffer.from(storedKey, "hex");

  return attemptedKey.length === storedKeyBuffer.length && timingSafeEqual(attemptedKey, storedKeyBuffer);
}
