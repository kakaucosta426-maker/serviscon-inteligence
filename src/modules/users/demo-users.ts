import { hashPassword } from "@/modules/auth/password";
import type { UserRole } from "@/modules/permissions/rbac";

export const demoOrganization = { name: "Serviscon", slug: "serviscon" };

export const demoUsers: Array<{ name: string; email: string; role: UserRole }> = [
  { name: "Administrador Demo", email: "admin.demo@serviscon.example", role: "ADMIN" },
  { name: "Marketing Demo", email: "marketing.demo@serviscon.example", role: "MARKETING" },
  { name: "Comercial Demo", email: "comercial.demo@serviscon.example", role: "COMMERCIAL" },
  { name: "Operacional Demo", email: "operacional.demo@serviscon.example", role: "OPERATIONS" },
  { name: "Gestor Demo", email: "gestor.demo@serviscon.example", role: "MANAGER" },
];

export function getDemoPassword(): string {
  return process.env.SEED_DEMO_PASSWORD ?? "change-this-demo-password";
}

export function buildDemoPasswordHash(): string {
  return hashPassword(getDemoPassword());
}
