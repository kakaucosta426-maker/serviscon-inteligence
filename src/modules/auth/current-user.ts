import { cookies } from "next/headers";
import type { SessionUser } from "@/modules/auth/session";

export function getCurrentUser(): SessionUser | null {
  const value = cookies().get("serviscon_session")?.value;
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as SessionUser;
  } catch {
    return null;
  }
}
