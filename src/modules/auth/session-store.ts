import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionTtlMs } from "@/modules/auth/config";
import type { SessionUser } from "@/modules/auth/session";
import { createSessionToken, hashSessionToken, isSessionExpired } from "@/modules/auth/session-token";

const sessionCookieName = "serviscon_session";

export async function createSession(user: SessionUser): Promise<void> {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + getSessionTtlMs());

  await prisma.session.create({
    data: {
      userId: user.id,
      organizationId: user.organizationId,
      tokenHash: hashSessionToken(token),
      expiresAt,
    },
  });

  cookies().set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentSessionUser(): Promise<SessionUser | null> {
  const token = cookies().get(sessionCookieName)?.value;
  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: { user: { include: { organization: true } } },
  });

  if (!session || isSessionExpired(session.expiresAt) || !session.user.isActive || session.user.deletedAt) {
    return null;
  }

  return {
    id: session.user.id,
    organizationId: session.user.organizationId,
    organizationName: session.user.organization.name,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export async function destroyCurrentSession(): Promise<void> {
  const token = cookies().get(sessionCookieName)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashSessionToken(token) } });
  }

  cookies().delete(sessionCookieName);
}
