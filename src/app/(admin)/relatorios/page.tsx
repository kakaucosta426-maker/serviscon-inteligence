import { prisma } from "@/lib/prisma";
import { requireUser } from "@/modules/core/authz";
import { formatCurrency } from "@/modules/core/format";

export default async function ReportsPage() {
  const user = await requireUser();
  const organizationId = user.organizationId;
  const [stages, pipelineValue, won, lost, pendingActivities, doneVisits, contacts] = await Promise.all([
    prisma.pipelineStage.findMany({ where: { organizationId, deletedAt: null }, include: { _count: { select: { opportunities: true } } }, orderBy: { position: "asc" } }),
    prisma.opportunity.aggregate({ where: { organizationId, deletedAt: null }, _sum: { estimatedValue: true } }),
    prisma.opportunity.count({ where: { organizationId, deletedAt: null, stage: { kind: "WON" } } }),
    prisma.opportunity.count({ where: { organizationId, deletedAt: null, stage: { kind: "LOST" } } }),
    prisma.activity.count({ where: { organizationId, deletedAt: null, status: "OPEN" } }),
    prisma.technicalVisit.count({ where: { organizationId, deletedAt: null, status: "DONE" } }),
    prisma.contact.count({ where: { organizationId, deletedAt: null } }),
  ]);
  const indicators = [
    { label: "Valor total do pipeline", value: formatCurrency(pipelineValue._sum.estimatedValue) },
    { label: "Oportunidades ganhas", value: won },
    { label: "Oportunidades perdidas", value: lost },
    { label: "Atividades pendentes", value: pendingActivities },
    { label: "Visitas realizadas", value: doneVisits },
    { label: "Contatos cadastrados", value: contacts },
  ];
  return <main className="space-y-6 p-6"><header><h2 className="text-3xl font-bold text-serviscon-navy">Relatórios</h2><p className="text-slate-600">Indicadores reais da operação comercial.</p></header><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{indicators.map((indicator) => <article key={indicator.label} className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{indicator.label}</p><strong className="mt-2 block text-3xl text-serviscon-navy">{indicator.value}</strong></article>)}</section><section className="rounded-2xl border bg-white p-5 shadow-sm"><h3 className="font-semibold text-serviscon-navy">Oportunidades por etapa</h3><div className="mt-4 space-y-3">{stages.length === 0 ? <p className="text-sm text-slate-600">Nenhuma etapa configurada.</p> : stages.map((stage) => <div key={stage.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"><span>{stage.name}</span><strong>{stage._count.opportunities}</strong></div>)}</div></section></main>;
}
