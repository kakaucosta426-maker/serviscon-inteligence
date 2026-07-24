"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requirePermission, requireUser } from "@/modules/core/authz";
import { activitySchema, companySchema, contactSchema, opportunitySchema, technicalVisitSchema } from "@/modules/core/schemas";

export type ActionState = { status: "idle" | "success" | "error"; message?: string };

function value(formData: FormData, key: string): string | undefined {
  const entry = formData.get(key);
  return typeof entry === "string" ? entry : undefined;
}

function formObject(formData: FormData, keys: string[]): Record<string, string | undefined> {
  return Object.fromEntries(keys.map((key) => [key, value(formData, key)]));
}

export async function createCompanyAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = companySchema.safeParse(formObject(formData, ["legalName", "tradeName", "document", "segment", "phone", "email", "website", "address", "city", "state", "ownerId", "notes"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  await prisma.company.create({ data: { ...parsed.data, organizationId: user.organizationId } });
  revalidatePath("/empresas");
  revalidatePath("/dashboard");
  return { status: "success", message: "Empresa cadastrada." };
}

export async function updateCompanyAction(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = companySchema.safeParse(formObject(formData, ["legalName", "tradeName", "document", "segment", "phone", "email", "website", "address", "city", "state", "ownerId", "notes"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  await prisma.company.updateMany({ where: { id, organizationId: user.organizationId, deletedAt: null }, data: parsed.data });
  revalidatePath("/empresas");
  return { status: "success", message: "Empresa atualizada." };
}

export async function deleteCompanyAction(id: string): Promise<void> {
  const user = await requireUser();
  await prisma.company.updateMany({ where: { id, organizationId: user.organizationId }, data: { deletedAt: new Date() } });
  revalidatePath("/empresas");
  revalidatePath("/dashboard");
}

export async function createContactAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = contactSchema.safeParse(formObject(formData, ["name", "email", "phone", "whatsapp", "position", "companyId", "source", "ownerId", "notes"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  await prisma.contact.create({ data: { ...parsed.data, organizationId: user.organizationId } });
  revalidatePath("/contatos");
  revalidatePath("/dashboard");
  return { status: "success", message: "Contato cadastrado." };
}

export async function updateContactAction(id: string, _state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = contactSchema.safeParse(formObject(formData, ["name", "email", "phone", "whatsapp", "position", "companyId", "source", "ownerId", "notes"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  await prisma.contact.updateMany({ where: { id, organizationId: user.organizationId, deletedAt: null }, data: parsed.data });
  revalidatePath("/contatos");
  return { status: "success", message: "Contato atualizado." };
}

export async function deleteContactAction(id: string): Promise<void> {
  const user = await requireUser();
  await prisma.contact.updateMany({ where: { id, organizationId: user.organizationId }, data: { deletedAt: new Date() } });
  revalidatePath("/contatos");
  revalidatePath("/dashboard");
}

export async function createOpportunityAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = opportunitySchema.safeParse(formObject(formData, ["title", "companyId", "contactId", "stageId", "ownerId", "estimatedValue", "probability", "source", "expectedCloseDate", "notes"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  const opportunity = await prisma.opportunity.create({ data: { ...parsed.data, organizationId: user.organizationId } });
  await prisma.opportunityHistory.create({ data: { organizationId: user.organizationId, opportunityId: opportunity.id, toStageId: parsed.data.stageId, changedById: user.id, note: "Oportunidade criada." } });
  revalidatePath("/crm");
  revalidatePath("/dashboard");
  return { status: "success", message: "Oportunidade criada." };
}

export async function updateOpportunityStageAction(id: string, stageId: string): Promise<void> {
  const user = await requireUser();
  const current = await prisma.opportunity.findFirst({ where: { id, organizationId: user.organizationId, deletedAt: null } });
  if (!current || current.stageId === stageId) return;
  const stage = await prisma.pipelineStage.findFirst({ where: { id: stageId, organizationId: user.organizationId, deletedAt: null } });
  if (!stage) return;
  await prisma.opportunity.update({ where: { id }, data: { stageId } });
  await prisma.opportunityHistory.create({ data: { organizationId: user.organizationId, opportunityId: id, fromStageId: current.stageId, toStageId: stageId, changedById: user.id, note: "Etapa alterada." } });
  revalidatePath("/crm");
  revalidatePath("/dashboard");
}

export async function deleteOpportunityAction(id: string): Promise<void> {
  const user = await requireUser();
  await prisma.opportunity.updateMany({ where: { id, organizationId: user.organizationId }, data: { deletedAt: new Date() } });
  revalidatePath("/crm");
  revalidatePath("/dashboard");
}

export async function createActivityAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = activitySchema.safeParse(formObject(formData, ["kind", "title", "dueAt", "priority", "status", "assigneeId", "contactId", "companyId", "opportunityId", "notes"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  await prisma.activity.create({ data: { ...parsed.data, organizationId: user.organizationId } });
  revalidatePath("/atividades");
  revalidatePath("/dashboard");
  return { status: "success", message: "Atividade criada." };
}

export async function setActivityStatusAction(id: string, status: "OPEN" | "DONE" | "CANCELED"): Promise<void> {
  const user = await requireUser();
  await prisma.activity.updateMany({ where: { id, organizationId: user.organizationId, deletedAt: null }, data: { status } });
  revalidatePath("/atividades");
  revalidatePath("/dashboard");
}

export async function deleteActivityAction(id: string): Promise<void> {
  const user = await requireUser();
  await prisma.activity.updateMany({ where: { id, organizationId: user.organizationId }, data: { deletedAt: new Date() } });
  revalidatePath("/atividades");
  revalidatePath("/dashboard");
}

export async function createTechnicalVisitAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requireUser();
  const parsed = technicalVisitSchema.safeParse(formObject(formData, ["companyId", "contactId", "opportunityId", "assigneeId", "address", "scheduledAt", "status", "objective", "notes", "preliminaryDiagnosis"]));
  if (!parsed.success) return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  await prisma.technicalVisit.create({ data: { ...parsed.data, organizationId: user.organizationId } });
  revalidatePath("/visitas");
  revalidatePath("/dashboard");
  return { status: "success", message: "Visita criada." };
}

export async function deleteTechnicalVisitAction(id: string): Promise<void> {
  const user = await requireUser();
  await prisma.technicalVisit.updateMany({ where: { id, organizationId: user.organizationId }, data: { deletedAt: new Date() } });
  revalidatePath("/visitas");
  revalidatePath("/dashboard");
}

export async function updateOrganizationAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const user = await requirePermission("SETTINGS_MANAGE");
  const name = value(formData, "name")?.trim();
  if (!name) return { status: "error", message: "Informe o nome da organização." };
  await prisma.organization.update({ where: { id: user.organizationId }, data: { name } });
  revalidatePath("/configuracoes");
  return { status: "success", message: "Organização atualizada." };
}

export async function ensureDefaultPipelineStagesAction(): Promise<void> {
  const user = await requirePermission("SETTINGS_MANAGE");
  const stages = [
    ["Novo lead", "OPEN"],
    ["Contato realizado", "OPEN"],
    ["Diagnóstico agendado", "OPEN"],
    ["Proposta enviada", "OPEN"],
    ["Negociação", "OPEN"],
    ["Ganho", "WON"],
    ["Perdido", "LOST"],
  ] as const;
  for (const [index, [name, kind]] of stages.entries()) {
    await prisma.pipelineStage.upsert({ where: { organizationId_position: { organizationId: user.organizationId, position: index + 1 } }, update: { name, kind }, create: { organizationId: user.organizationId, name, kind, position: index + 1 } });
  }
  revalidatePath("/configuracoes");
  revalidatePath("/crm");
}

export async function goTo(path: string): Promise<void> {
  redirect(path);
}
