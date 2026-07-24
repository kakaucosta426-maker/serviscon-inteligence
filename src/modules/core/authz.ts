import { redirect } from "next/navigation";
import { getCurrentUser } from "@/modules/auth/current-user";
import { can, type Permission } from "@/modules/permissions/rbac";
import type { SessionUser } from "@/modules/auth/session";

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export async function requirePermission(permission: Permission): Promise<SessionUser> {
  const user = await requireUser();
  if (!can(user.role, permission)) redirect("/dashboard");
  return user;
}
