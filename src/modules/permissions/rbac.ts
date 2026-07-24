export const userRoles = ["ADMIN", "MARKETING", "COMMERCIAL", "OPERATIONS", "MANAGER"] as const;
export type UserRole = (typeof userRoles)[number];

export const permissions = [
  "DASHBOARD_READ",
  "USERS_MANAGE",
  "SETTINGS_MANAGE",
  "REPORTS_READ",
] as const;
export type Permission = (typeof permissions)[number];

export const rolePermissions: Record<UserRole, Permission[]> = {
  ADMIN: ["DASHBOARD_READ", "USERS_MANAGE", "SETTINGS_MANAGE", "REPORTS_READ"],
  MARKETING: ["DASHBOARD_READ", "REPORTS_READ"],
  COMMERCIAL: ["DASHBOARD_READ"],
  OPERATIONS: ["DASHBOARD_READ"],
  MANAGER: ["DASHBOARD_READ", "REPORTS_READ"],
};

export function can(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}
