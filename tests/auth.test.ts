import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../src/modules/auth/password.ts";
import { authenticateUser, AuthenticationError, type AuthUserRecord } from "../src/modules/auth/session.ts";

const activeUser: AuthUserRecord = {
  id: "user-1",
  organizationId: "org-serviscon",
  organizationName: "Serviscon",
  name: "Administrador Demo",
  email: "admin.demo@serviscon.example",
  role: "ADMIN",
  passwordHash: hashPassword("valid-demo-password"),
  isActive: true,
};

test("hashPassword gera hash verificável sem expor a senha em texto puro", () => {
  assert.notEqual(activeUser.passwordHash, "valid-demo-password");
  assert.equal(verifyPassword("valid-demo-password", activeUser.passwordHash), true);
  assert.equal(verifyPassword("senha-incorreta", activeUser.passwordHash), false);
});

test("authenticateUser normaliza e-mail e retorna sessão sem passwordHash", async () => {
  const session = await authenticateUser(
    { email: " ADMIN.DEMO@SERVISCON.EXAMPLE ", password: "valid-demo-password" },
    async (email) => (email === activeUser.email ? activeUser : null),
    verifyPassword,
  );

  assert.equal(session.organizationId, "org-serviscon");
  assert.equal("passwordHash" in session, false);
});

test("authenticateUser rejeita credenciais inválidas", async () => {
  await assert.rejects(
    authenticateUser(
      { email: activeUser.email, password: "senha-incorreta" },
      async () => activeUser,
      verifyPassword,
    ),
    AuthenticationError,
  );
});

test("authenticateUser rejeita usuário inativo", async () => {
  await assert.rejects(
    authenticateUser(
      { email: activeUser.email, password: "valid-demo-password" },
      async () => ({ ...activeUser, isActive: false }),
      verifyPassword,
    ),
    AuthenticationError,
  );
});
