"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword } from "@/modules/auth/password";
import { findAuthUserByEmail } from "@/modules/auth/repository";
import { authenticateUser, AuthenticationError } from "@/modules/auth/session";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAction(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const sessionUser = await authenticateUser({ email, password }, findAuthUserByEmail, verifyPassword);
    cookies().set("serviscon_session", JSON.stringify(sessionUser), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return { status: "error", message: error.message };
    }
    console.error("Erro inesperado ao autenticar usuário", error);
    return { status: "error", message: "Não foi possível autenticar agora. Tente novamente." };
  }

  redirect("/dashboard");
  return { status: "idle" };
}
