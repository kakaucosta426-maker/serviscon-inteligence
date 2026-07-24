export type TenantScoped = { organizationId: string };

export function assertSameOrganization<T extends TenantScoped>(record: T, organizationId: string): T {
  if (record.organizationId !== organizationId) {
    throw new Error("Acesso negado: registro pertence a outra organização.");
  }
  return record;
}
