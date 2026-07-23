export type TenantScoped = { organizationId: string };

export class TenantAccessError extends Error {
  constructor() {
    super("Acesso negado: registro pertence a outra organização.");
    this.name = "TenantAccessError";
  }
}

export function assertSameOrganization<T extends TenantScoped>(record: T, organizationId: string): T {
  if (record.organizationId !== organizationId) {
    throw new TenantAccessError();
  }
  return record;
}

export function filterByOrganization<T extends TenantScoped>(records: T[], organizationId: string): T[] {
  return records.filter((record) => record.organizationId === organizationId);
}
