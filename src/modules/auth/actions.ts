"use server";

import { redirect } from "next/navigation";
import { verifyPassword } from "@/modules/auth/password";
import { findAuthUserByEmail } from "@/modules/auth/repository";
import { LoginRateLimitError, assertLoginAllowed, clearLoginAttempts } from "@/modules/auth/rate-limit";
import { createSession, destroyCurrentSession } from "@/modules/auth/session-store";
import { authenticateUser, AuthenticationError } from "@/modules/auth/session";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    assertLoginAllowed(email);
    const sessionUser = await authenticateUser({ email, password }, findAuthUserByEmail, verifyPassword);
    await createSession(sessionUser);
    clearLoginAttempts(email);
  } catch (error) {
    if (error instanceof AuthenticationError || error instanceof LoginRateLimitError) {
      return { status: "error", message: error.message };
    }
    console.error("Erro inesperado ao autenticar usuário", error);
    return { status: "error", message: "Não foi possível autenticar agora. Tente novamente." };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroyCurrentSession();
  redirect("/login");
}
