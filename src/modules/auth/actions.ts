"use server";

import { redirect } from "next/navigation";
import { verifyPassword } from "@/modules/auth/password";
import { findAuthUserByEmail } from "@/modules/auth/repository";
import { assertLoginAllowed, clearLoginAttempts } from "@/modules/auth/rate-limit";
import { createSession, destroyCurrentSession } from "@/modules/auth/session-store";
import { authenticateUser } from "@/modules/auth/session";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  assertLoginAllowed(email);
  const sessionUser = await authenticateUser({ email, password }, findAuthUserByEmail, verifyPassword);
  await createSession(sessionUser);
  clearLoginAttempts(email);

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  await destroyCurrentSession();
  redirect("/login");
}
