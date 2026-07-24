import test from "node:test";
import assert from "node:assert/strict";
import {
  LoginRateLimitError,
  assertLoginAllowed,
  clearLoginAttempts,
  resetLoginRateLimitForTests,
} from "../src/modules/auth/rate-limit.ts";

test("assertLoginAllowed bloqueia excesso de tentativas no mesmo identificador", () => {
  resetLoginRateLimitForTests();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.doesNotThrow(() => assertLoginAllowed("ADMIN.DEMO@SERVISCON.EXAMPLE"));
  }

  assert.throws(() => assertLoginAllowed("admin.demo@serviscon.example"), LoginRateLimitError);
});

test("clearLoginAttempts libera o identificador após login válido", () => {
  resetLoginRateLimitForTests();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assertLoginAllowed("comercial.demo@serviscon.example");
  }

  clearLoginAttempts("comercial.demo@serviscon.example");
  assert.doesNotThrow(() => assertLoginAllowed("comercial.demo@serviscon.example"));
});
