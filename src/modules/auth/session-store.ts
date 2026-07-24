import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { SessionUser } from "@/modules/auth/session";

const sessionCookieName = "serviscon_session";
const sessionDurationMs = 1000 * 60 * 60 * 8;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(user: SessionUser): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + sessionDurationMs);

  await prisma.session.create({
    data: {
      userId: user.id,
      organizationId: user.organizationId,
      tokenHash: hashToken(token),
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
    where: { tokenHash: hashToken(token) },
    include: { user: { include: { organization: true } } },
  });

  if (!session || session.expiresAt <= new Date() || !session.user.isActive || session.user.deletedAt) {
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
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }

  cookies().delete(sessionCookieName);
}
