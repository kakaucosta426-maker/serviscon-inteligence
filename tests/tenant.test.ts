import { expect, test } from "vitest";
import { assertSameOrganization, filterByOrganization, TenantAccessError } from "../src/modules/organizations/tenant";

const records = [
  { id: "1", organizationId: "org-serviscon", name: "Registro Serviscon" },
  { id: "2", organizationId: "org-outra", name: "Registro de outro tenant" },
];

test("filterByOrganization retorna somente registros do tenant informado", () => {
  expect(filterByOrganization(records, "org-serviscon")).toEqual([records[0]]);
});

test("assertSameOrganization permite acesso ao próprio tenant", () => {
  expect(assertSameOrganization(records[0], "org-serviscon")).toBe(records[0]);
});

test("assertSameOrganization bloqueia acesso a outro tenant", () => {
  expect(() => assertSameOrganization(records[1], "org-serviscon")).toThrow(TenantAccessError);
});
