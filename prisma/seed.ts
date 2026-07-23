import { Permission, PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: "serviscon" },
    update: {},
    create: {
      name: "Serviscon",
      slug: "serviscon",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      organizationId: organization.id,
      name: "Administrador Demo",
      email: "admin@example.com",
      passwordHash: "demo-password-hash",
      role: UserRole.ADMIN,
      permissions: [Permission.DASHBOARD_READ, Permission.USERS_MANAGE],
      isActive: true,
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
