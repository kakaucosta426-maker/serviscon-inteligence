import { prisma } from "@/lib/prisma";
import { createContactAction, deleteContactAction } from "@/modules/core/actions";
import { requireUser } from "@/modules/core/authz";
import { formatDate } from "@/modules/core/format";

export default async function ContactsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const user = await requireUser();
  const q = searchParams?.q?.trim();
  const [contacts, companies, users] = await Promise.all([
    prisma.contact.findMany({
      where: { organizationId: user.organizationId, deletedAt: null, ...(q ? { OR: [{ name: { contains: q, mode: "insensitive" } }, { email: { contains: q, mode: "insensitive" } }, { phone: { contains: q, mode: "insensitive" } }] } : {}) },
      include: { company: true, owner: true }, orderBy: { createdAt: "desc" }, take: 25,
    }),
    prisma.company.findMany({ where: { organizationId: user.organizationId, deletedAt: null }, orderBy: { legalName: "asc" } }),
    prisma.user.findMany({ where: { organizationId: user.organizationId, deletedAt: null, isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="space-y-6 p-6">
      <header><h2 className="text-3xl font-bold text-serviscon-navy">Contatos</h2><p className="text-slate-600">Cadastre e acompanhe pessoas vinculadas a empresas e oportunidades.</p></header>
      <form className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><input name="q" defaultValue={q} placeholder="Pesquisar por nome, e-mail ou telefone" className="w-full rounded-xl border border-slate-300 px-4 py-3" /></form>
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <form action={createContactAction.bind(null, { status: "idle" })} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-serviscon-navy">Novo contato</h3>
          <input name="name" required placeholder="Nome" className="w-full rounded-xl border px-4 py-3" />
          <input name="email" type="email" placeholder="E-mail" className="w-full rounded-xl border px-4 py-3" />
          <input name="phone" placeholder="Telefone" className="w-full rounded-xl border px-4 py-3" />
          <input name="whatsapp" placeholder="WhatsApp" className="w-full rounded-xl border px-4 py-3" />
          <input name="position" placeholder="Cargo" className="w-full rounded-xl border px-4 py-3" />
          <select name="companyId" className="w-full rounded-xl border px-4 py-3"><option value="">Empresa relacionada</option>{companies.map((company) => <option key={company.id} value={company.id}>{company.tradeName ?? company.legalName}</option>)}</select>
          <input name="source" placeholder="Origem do contato" className="w-full rounded-xl border px-4 py-3" />
          <select name="ownerId" className="w-full rounded-xl border px-4 py-3"><option value="">Responsável</option>{users.map((owner) => <option key={owner.id} value={owner.id}>{owner.name}</option>)}</select>
          <textarea name="notes" placeholder="Observações" className="w-full rounded-xl border px-4 py-3" />
          <button className="rounded-xl bg-serviscon-blue px-4 py-3 font-semibold text-white" type="submit">Cadastrar contato</button>
        </form>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {contacts.length === 0 ? <div className="p-8 text-center text-slate-600">Nenhum contato encontrado. Cadastre o primeiro contato no formulário ao lado.</div> : <table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr><th className="p-4">Nome</th><th>Empresa</th><th>Responsável</th><th>Criado em</th><th>Ações</th></tr></thead><tbody>{contacts.map((contact) => <tr key={contact.id} className="border-t"><td className="p-4"><a className="font-semibold text-serviscon-blue" href={`/contatos/${contact.id}`}>{contact.name}</a><br /><span className="text-slate-500">{contact.email ?? contact.phone ?? "Sem contato"}</span></td><td>{contact.company?.tradeName ?? contact.company?.legalName ?? "—"}</td><td>{contact.owner?.name ?? "—"}</td><td>{formatDate(contact.createdAt)}</td><td><form action={deleteContactAction.bind(null, contact.id)}><button className="text-red-700" type="submit">Excluir</button></form></td></tr>)}</tbody></table>}
        </div>
      </section>
    </main>
  );
}
