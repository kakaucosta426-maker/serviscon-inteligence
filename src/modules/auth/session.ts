import type { UserRole } from "@/modules/permissions/rbac";

export type SessionUser = {
  id: string;
  organizationId: string;
  organizationName: string;
  name: string;
  email: string;
  role: UserRole;
};

export class AuthenticationError extends Error {
  constructor(message = "Credenciais inválidas ou usuário inativo.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export type AuthUserRecord = SessionUser & {
  passwordHash: string;
  isActive: boolean;
};

export async function authenticateUser(
  input: { email: string; password: string },
  findUserByEmail: (email: string) => Promise<AuthUserRecord | null>,
  verifyPassword: (password: string, hash: string) => boolean,
): Promise<SessionUser> {
  const user = await findUserByEmail(input.email.trim().toLowerCase());
  if (!user || !user.isActive || !verifyPassword(input.password, user.passwordHash)) {
    throw new AuthenticationError();
  }

  const { passwordHash: _passwordHash, isActive: _isActive, ...sessionUser } = user;
  return sessionUser;
}
