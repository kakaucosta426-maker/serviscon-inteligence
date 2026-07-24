import test from "node:test";
import assert from "node:assert/strict";
import { assertSameOrganization, filterByOrganization, TenantAccessError } from "../src/modules/organizations/tenant.ts";

const records = [
  { id: "1", organizationId: "org-serviscon", name: "Registro Serviscon" },
  { id: "2", organizationId: "org-outra", name: "Registro de outro tenant" },
  { id: "3", organizationId: "org-serviscon", name: "Outro registro Serviscon" },
];

test("filterByOrganization retorna somente registros do tenant informado", () => {
  assert.deepEqual(filterByOrganization(records, "org-serviscon"), [records[0], records[2]]);
});

test("assertSameOrganization permite acesso ao próprio tenant", () => {
  assert.equal(assertSameOrganization(records[0], "org-serviscon"), records[0]);
});

test("assertSameOrganization bloqueia tentativa de acesso cruzado por organizationId", () => {
  assert.throws(() => assertSameOrganization(records[1], "org-serviscon"), TenantAccessError);
});
