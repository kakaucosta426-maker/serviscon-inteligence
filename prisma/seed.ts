import { PrismaClient } from "@prisma/client";
import { buildDemoPasswordHash, demoOrganization, demoUsers } from "../src/modules/users/demo-users";
import { rolePermissions } from "../src/modules/permissions/rbac";

const prisma = new PrismaClient();

const defaultStages = [
  { name: "Novo lead", position: 1, kind: "OPEN" as const },
  { name: "Contato realizado", position: 2, kind: "OPEN" as const },
  { name: "Diagnóstico agendado", position: 3, kind: "OPEN" as const },
  { name: "Proposta enviada", position: 4, kind: "OPEN" as const },
  { name: "Negociação", position: 5, kind: "OPEN" as const },
  { name: "Ganho", position: 6, kind: "WON" as const },
  { name: "Perdido", position: 7, kind: "LOST" as const },
];

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: demoOrganization.slug },
    update: { name: demoOrganization.name },
    create: demoOrganization,
  });

  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        permissions: rolePermissions[user.role],
        organizationId: organization.id,
      },
      create: {
        organizationId: organization.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: rolePermissions[user.role],
        passwordHash: buildDemoPasswordHash(),
      },
    });
  }

  for (const stage of defaultStages) {
    await prisma.pipelineStage.upsert({
      where: { organizationId_position: { organizationId: organization.id, position: stage.position } },
      update: { name: stage.name, kind: stage.kind },
      create: { organizationId: organization.id, ...stage },
    });
  }
}

main()
  .catch((error: unknown) => {
    console.error("Falha ao executar seed de demonstração", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
