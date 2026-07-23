import { prisma } from "@/lib/prisma";
import type { AuthUserRecord } from "@/modules/auth/session";

export async function findAuthUserByEmail(email: string): Promise<AuthUserRecord | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { organization: true },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    organizationId: user.organizationId,
    organizationName: user.organization.name,
    name: user.name,
    email: user.email,
    role: user.role,
    passwordHash: user.passwordHash,
    isActive: user.isActive && user.deletedAt === null,
  };
}
