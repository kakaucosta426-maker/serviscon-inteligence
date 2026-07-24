import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/modules/core/authz";
import { formatCurrency, formatDate } from "@/modules/core/format";

export default async function DashboardPage() {
  const user = await requireUser();
  const organizationId = user.organizationId;
  const [contacts, companies, opportunities, pendingActivities, scheduledVisits, stages, lastContacts, lastOpportunities] = await Promise.all([
    prisma.contact.count({ where: { organizationId, deletedAt: null } }),
    prisma.company.count({ where: { organizationId, deletedAt: null } }),
    prisma.opportunity.count({ where: { organizationId, deletedAt: null } }),
    prisma.activity.count({ where: { organizationId, deletedAt: null, status: "OPEN" } }),
    prisma.technicalVisit.count({ where: { organizationId, deletedAt: null, status: { in: ["SCHEDULED", "CONFIRMED"] } } }),
    prisma.pipelineStage.findMany({ where: { organizationId, deletedAt: null }, include: { _count: { select: { opportunities: true } } }, orderBy: { position: "asc" } }),
    prisma.contact.findMany({ where: { organizationId, deletedAt: null }, include: { company: true }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.opportunity.findMany({ where: { organizationId, deletedAt: null }, include: { company: true, stage: true }, orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);
  const pipelineValue = await prisma.opportunity.aggregate({ where: { organizationId, deletedAt: null }, _sum: { estimatedValue: true } });

  const cards = [
    { label: "Contatos", value: contacts, href: "/contatos", action: "Cadastrar primeiro contato" },
    { label: "Empresas", value: companies, href: "/empresas", action: "Criar primeira empresa" },
    { label: "Oportunidades", value: opportunities, href: "/crm", action: "Adicionar oportunidade" },
    { label: "Atividades pendentes", value: pendingActivities, href: "/atividades", action: "Criar atividade" },
    { label: "Visitas agendadas", value: scheduledVisits, href: "/visitas", action: "Agendar visita" },
    { label: "Valor do pipeline", value: formatCurrency(pipelineValue._sum.estimatedValue), href: "/relatorios", action: "Ver relatórios" },
  ];

  return (
    <main className="space-y-6 p-6">
      <section className="rounded-3xl bg-gradient-to-r from-serviscon-navy to-serviscon-blue p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-serviscon-green">Painel inicial</p>
        <h2 className="mt-3 text-3xl font-bold">Olá, {user.name}</h2>
        <p className="mt-2 max-w-2xl text-slate-100">Acompanhe a operação comercial real da sua organização.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <strong className="mt-2 block text-3xl text-serviscon-navy">{card.value}</strong>
            {card.value === 0 ? <Link className="mt-4 inline-flex rounded-xl bg-serviscon-blue px-4 py-2 text-sm font-semibold text-white" href={card.href}>{card.action}</Link> : null}
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-serviscon-navy">Oportunidades por etapa</h3>
          <div className="mt-4 space-y-3">
            {stages.length === 0 ? <Link className="text-sm font-semibold text-serviscon-blue" href="/configuracoes">Criar etapas do pipeline</Link> : stages.map((stage) => (
              <div key={stage.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <span>{stage.name}</span>
                <strong>{stage._count.opportunities}</strong>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-serviscon-navy">Últimos contatos</h3>
          <div className="mt-4 space-y-3">
            {lastContacts.length === 0 ? <Link className="text-sm font-semibold text-serviscon-blue" href="/contatos">Cadastrar primeiro contato</Link> : lastContacts.map((contact) => (
              <Link key={contact.id} className="block rounded-xl bg-slate-50 px-4 py-3 text-sm" href={`/contatos/${contact.id}`}>
                <strong>{contact.name}</strong><br /><span className="text-slate-500">{contact.company?.tradeName ?? contact.company?.legalName ?? "Sem empresa"}</span>
              </Link>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-semibold text-serviscon-navy">Oportunidades recentes</h3>
          <div className="mt-4 space-y-3">
            {lastOpportunities.length === 0 ? <Link className="text-sm font-semibold text-serviscon-blue" href="/crm">Adicionar oportunidade</Link> : lastOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <strong>{opportunity.title}</strong><br /><span className="text-slate-500">{opportunity.stage.name} · {formatDate(opportunity.updatedAt)}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
