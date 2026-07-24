import test from "node:test";
import assert from "node:assert/strict";
import { can, rolePermissions } from "../src/modules/permissions/rbac.ts";

test("ADMIN possui permissões administrativas completas da fundação", () => {
  assert.equal(can("ADMIN", "DASHBOARD_READ"), true);
  assert.equal(can("ADMIN", "USERS_MANAGE"), true);
  assert.equal(can("ADMIN", "SETTINGS_MANAGE"), true);
  assert.equal(can("ADMIN", "REPORTS_READ"), true);
});

test("papéis não administrativos não gerenciam usuários", () => {
  for (const role of ["MARKETING", "COMMERCIAL", "OPERATIONS", "MANAGER"] as const) {
    assert.equal(can(role, "USERS_MANAGE"), false);
  }
});

test("matriz de permissões mantém todos os papéis exigidos", () => {
  assert.deepEqual(Object.keys(rolePermissions).sort(), [
    "ADMIN",
    "COMMERCIAL",
    "MANAGER",
    "MARKETING",
    "OPERATIONS",
  ]);
});
