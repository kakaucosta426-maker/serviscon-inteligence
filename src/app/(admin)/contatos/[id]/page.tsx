import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateContactAction } from "@/modules/core/actions";
import { requireUser } from "@/modules/core/authz";

export default async function ContactDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const [contact, companies, users] = await Promise.all([
    prisma.contact.findFirst({ where: { id: params.id, organizationId: user.organizationId, deletedAt: null }, include: { company: true, owner: true } }),
    prisma.company.findMany({ where: { organizationId: user.organizationId, deletedAt: null }, orderBy: { legalName: "asc" } }),
    prisma.user.findMany({ where: { organizationId: user.organizationId, deletedAt: null, isActive: true }, orderBy: { name: "asc" } }),
  ]);
  if (!contact) notFound();
  return <main className="p-6"><form action={updateContactAction.bind(null, contact.id, { status: "idle" })} className="mx-auto max-w-2xl space-y-3 rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-bold text-serviscon-navy">Editar contato</h2><input name="name" defaultValue={contact.name} required className="w-full rounded-xl border px-4 py-3" /><input name="email" defaultValue={contact.email ?? ""} className="w-full rounded-xl border px-4 py-3" /><input name="phone" defaultValue={contact.phone ?? ""} className="w-full rounded-xl border px-4 py-3" /><input name="whatsapp" defaultValue={contact.whatsapp ?? ""} className="w-full rounded-xl border px-4 py-3" /><input name="position" defaultValue={contact.position ?? ""} className="w-full rounded-xl border px-4 py-3" /><select name="companyId" defaultValue={contact.companyId ?? ""} className="w-full rounded-xl border px-4 py-3"><option value="">Empresa</option>{companies.map((company) => <option key={company.id} value={company.id}>{company.tradeName ?? company.legalName}</option>)}</select><input name="source" defaultValue={contact.source ?? ""} className="w-full rounded-xl border px-4 py-3" /><select name="ownerId" defaultValue={contact.ownerId ?? ""} className="w-full rounded-xl border px-4 py-3"><option value="">Responsável</option>{users.map((owner) => <option key={owner.id} value={owner.id}>{owner.name}</option>)}</select><textarea name="notes" defaultValue={contact.notes ?? ""} className="w-full rounded-xl border px-4 py-3" /><button className="rounded-xl bg-serviscon-blue px-4 py-3 font-semibold text-white" type="submit">Salvar</button></form></main>;
}
