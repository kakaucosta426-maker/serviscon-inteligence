import { z } from "zod";

const optionalText = z.string().trim().optional().transform((value) => (value ? value : null));
const optionalDate = z.string().trim().optional().transform((value) => (value ? new Date(value) : null));

export const companySchema = z.object({
  legalName: z.string().trim().min(2, "Informe a razão social."),
  tradeName: optionalText,
  document: optionalText,
  segment: optionalText,
  phone: optionalText,
  email: optionalText,
  website: optionalText,
  address: optionalText,
  city: optionalText,
  state: optionalText,
  ownerId: optionalText,
  notes: optionalText,
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome."),
  email: optionalText,
  phone: optionalText,
  whatsapp: optionalText,
  position: optionalText,
  companyId: optionalText,
  source: optionalText,
  ownerId: optionalText,
  notes: optionalText,
});

export const opportunitySchema = z.object({
  title: z.string().trim().min(2, "Informe o título."),
  companyId: z.string().trim().min(1, "Selecione uma empresa."),
  contactId: optionalText,
  stageId: z.string().trim().min(1, "Selecione uma etapa."),
  ownerId: optionalText,
  estimatedValue: z.string().trim().optional().transform((value) => (value ? value : null)),
  probability: z.coerce.number().int().min(0).max(100),
  source: optionalText,
  expectedCloseDate: optionalDate,
  notes: optionalText,
});

export const activitySchema = z.object({
  kind: z.enum(["TASK", "CALL", "MEETING", "WHATSAPP", "EMAIL", "FOLLOW_UP"]),
  title: z.string().trim().min(2, "Informe o título."),
  dueAt: optionalDate,
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["OPEN", "DONE", "CANCELED"]),
  assigneeId: optionalText,
  contactId: optionalText,
  companyId: optionalText,
  opportunityId: optionalText,
  notes: optionalText,
});

export const technicalVisitSchema = z.object({
  companyId: z.string().trim().min(1, "Selecione uma empresa."),
  contactId: optionalText,
  opportunityId: optionalText,
  assigneeId: optionalText,
  address: z.string().trim().min(3, "Informe o endereço."),
  scheduledAt: z.string().trim().min(1, "Informe data e horário.").transform((value) => new Date(value)),
  status: z.enum(["SCHEDULED", "CONFIRMED", "DONE", "CANCELED"]),
  objective: optionalText,
  notes: optionalText,
  preliminaryDiagnosis: optionalText,
});
