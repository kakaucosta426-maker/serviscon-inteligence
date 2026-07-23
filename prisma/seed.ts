import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const organization = await prisma.organization.upsert({
    where: { slug: "serviscon" },
    update: {},
    create: { name: "Serviscon", slug: "serviscon" },
  });

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { organizationId: organization.id, name: "Administrador Demo", email: "admin@example.com", role: UserRole.ADMIN },
  });
}

main().finally(async () => prisma.$disconnect());
