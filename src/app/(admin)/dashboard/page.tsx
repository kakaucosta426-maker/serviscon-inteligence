import { getCurrentUser } from "@/modules/auth/current-user";
import { brandHighlights, operationalMetrics, servedSegments, serviceLines } from "@/modules/brand/serviscon";

const foundationCards = [
  { label: "Usuários ativos", value: "5", description: "Perfis demo configurados" },
  { label: "Organizações", value: "1", description: "Tenant Serviscon" },
  { label: "Permissões", value: "4", description: "RBAC inicial" },
  { label: "Módulos liberados", value: "8", description: "Rotas protegidas no menu" },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <main className="space-y-6 p-6">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-serviscon-navy via-slate-900 to-serviscon-blue text-white shadow-lg">
        <div className="grid gap-8 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-serviscon-green">Painel inicial</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black leading-tight">
              Olá, {user?.name}. Transforme oportunidades de facilities em operação comercial organizada.
            </h2>
            <p className="mt-4 max-w-2xl text-slate-100">
              A plataforma nasce alinhada à atuação da Serviscon em terceirização premium, gestão completa de equipes, qualidade operacional e atendimento consultivo.
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-emerald-100">Diferenciais da operação</p>
            <div className="mt-4 space-y-3">
              {brandHighlights.map((highlight) => (
                <div key={highlight} className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Indicadores de fundação" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {foundationCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <strong className="mt-2 block text-3xl text-serviscon-navy">{card.value}</strong>
            <span className="mt-1 block text-sm text-slate-600">{card.description}</span>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Serviços</p>
              <h3 className="mt-2 text-2xl font-bold text-serviscon-navy">Portfólio prioritário para captação</h3>
            </div>
            <span className="rounded-full bg-serviscon-sand px-4 py-2 text-sm font-medium text-slate-700">MVP comercial</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {serviceLines.map((service) => (
              <div key={service} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {service}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Metas de relacionamento</p>
          <h3 className="mt-2 text-2xl font-bold text-serviscon-navy">Experiência esperada</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {operationalMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-slate-50 p-4">
                <strong className="block text-3xl font-black text-serviscon-blue">{metric.value}</strong>
                <span className="text-sm text-slate-600">{metric.label}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Segmentos atendidos</p>
        <h3 className="mt-2 text-2xl font-bold text-serviscon-navy">Base para segmentação futura de leads</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          {servedSegments.map((segment) => (
            <span key={segment} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              {segment}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
