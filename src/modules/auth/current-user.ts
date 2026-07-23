import { getCurrentSessionUser } from "@/modules/auth/session-store";
import type { SessionUser } from "@/modules/auth/session";

export async function getCurrentUser(): Promise<SessionUser | null> {
  return getCurrentSessionUser();
}
