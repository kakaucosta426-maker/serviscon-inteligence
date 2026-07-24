import test from "node:test";
import assert from "node:assert/strict";
import { createSessionToken, hashSessionToken, isSessionExpired } from "../src/modules/auth/session-token.ts";

test("createSessionToken gera tokens aleatórios e hash não reversível armazenável", () => {
  const first = createSessionToken();
  const second = createSessionToken();

  assert.notEqual(first, second);
  assert.equal(first.length > 32, true);
  assert.notEqual(hashSessionToken(first), first);
  assert.equal(hashSessionToken(first), hashSessionToken(first));
});

test("isSessionExpired rejeita sessão expirada e aceita sessão vigente", () => {
  const now = new Date("2026-07-23T12:00:00.000Z");

  assert.equal(isSessionExpired(new Date("2026-07-23T11:59:59.000Z"), now), true);
  assert.equal(isSessionExpired(new Date("2026-07-23T12:00:01.000Z"), now), false);
});
