import { expect, test } from "vitest";
import { hashPassword, verifyPassword } from "../src/modules/auth/password";
import { authenticateUser, AuthenticationError, type AuthUserRecord } from "../src/modules/auth/session";

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
  expect(activeUser.passwordHash).not.toBe("valid-demo-password");
  expect(verifyPassword("valid-demo-password", activeUser.passwordHash)).toBe(true);
  expect(verifyPassword("senha-incorreta", activeUser.passwordHash)).toBe(false);
});

test("authenticateUser normaliza e-mail e retorna sessão sem passwordHash", async () => {
  const session = await authenticateUser(
    { email: " ADMIN.DEMO@SERVISCON.EXAMPLE ", password: "valid-demo-password" },
    async (email) => (email === activeUser.email ? activeUser : null),
    verifyPassword,
  );

  expect(session.organizationId).toBe("org-serviscon");
  expect("passwordHash" in session).toBe(false);
});

test("authenticateUser rejeita credenciais inválidas", async () => {
  await expect(
    authenticateUser(
      { email: activeUser.email, password: "senha-incorreta" },
      async () => activeUser,
      verifyPassword,
    ),
  ).rejects.toThrow(AuthenticationError);
});

test("authenticateUser rejeita usuário inativo", async () => {
  await expect(
    authenticateUser(
      { email: activeUser.email, password: "valid-demo-password" },
      async () => ({ ...activeUser, isActive: false }),
      verifyPassword,
    ),
  ).rejects.toThrow(AuthenticationError);
});
