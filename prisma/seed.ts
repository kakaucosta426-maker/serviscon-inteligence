import { PrismaClient } from "@prisma/client";
import { buildDemoPasswordHash, demoOrganization, demoUsers } from "../src/modules/users/demo-users";
import { rolePermissions } from "../src/modules/permissions/rbac";

const prisma = new PrismaClient();

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
}

main()
  .catch((error: unknown) => {
    console.error("Falha ao executar seed de demonstração", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
