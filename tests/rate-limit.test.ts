import { expect, test } from "vitest";
import {
  LoginRateLimitError,
  assertLoginAllowed,
  clearLoginAttempts,
  resetLoginRateLimitForTests,
} from "../src/modules/auth/rate-limit";

test("assertLoginAllowed bloqueia excesso de tentativas no mesmo identificador", () => {
  resetLoginRateLimitForTests();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    expect(() => assertLoginAllowed("ADMIN.DEMO@SERVISCON.EXAMPLE")).not.toThrow();
  }

  expect(() => assertLoginAllowed("admin.demo@serviscon.example")).toThrow(LoginRateLimitError);
});

test("clearLoginAttempts libera o identificador após login válido", () => {
  resetLoginRateLimitForTests();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assertLoginAllowed("comercial.demo@serviscon.example");
  }

  clearLoginAttempts("comercial.demo@serviscon.example");
  expect(() => assertLoginAllowed("comercial.demo@serviscon.example")).not.toThrow();
});
