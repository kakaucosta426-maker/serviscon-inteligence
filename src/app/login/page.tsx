import { loginAction } from "@/modules/auth/actions";
import { brandHighlights, operationalMetrics, serviceLines } from "@/modules/brand/serviscon";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-serviscon-navy p-4 text-white sm:p-6 lg:p-10">
      <section className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative bg-gradient-to-br from-serviscon-navy via-slate-900 to-serviscon-blue p-8 sm:p-10 lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(31,169,113,0.28),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.18),transparent_25%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100">
                Terceirização Premium de Mão de Obra
              </p>
              <h1 className="mt-8 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                Serviscon Intelligence para uma gestão comercial completa.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
                Uma central interna para transformar leads de facilities em atendimento organizado, acompanhamento comercial e decisões com dados.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {brandHighlights.map((highlight) => (
                <div key={highlight} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <span className="text-sm font-semibold text-white">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {operationalMetrics.map((metric) => (
                <div key={metric.label}>
                  <strong className="block text-3xl font-black text-serviscon-green">{metric.value}</strong>
                  <span className="text-sm text-slate-200">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-50 p-6 text-slate-950 sm:p-10">
          <form action={loginAction.bind(null, { status: "idle" })} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Acesso interno</p>
            <h2 className="mt-3 text-3xl font-bold text-serviscon-navy">Entrar no painel</h2>
            <p className="mt-2 text-sm text-slate-600">
              Acompanhe leads, usuários, permissões e módulos internos da operação Serviscon.
            </p>
            <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="email">
              E-mail
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-serviscon-blue/20 focus:border-serviscon-blue focus:ring-4" />
            <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">
              Senha
            </label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none ring-serviscon-blue/20 focus:border-serviscon-blue focus:ring-4" />
            <button className="mt-6 w-full rounded-xl bg-serviscon-blue px-4 py-3 font-semibold text-white shadow-lg shadow-blue-900/20 hover:bg-blue-700" type="submit">
              Entrar com segurança
            </button>
            <p className="mt-4 text-xs text-slate-500">As credenciais de demonstração são definidas exclusivamente por variáveis de ambiente locais.</p>
            <div className="mt-6 rounded-2xl bg-serviscon-sand p-4 text-xs text-slate-700">
              Serviços priorizados: {serviceLines.slice(0, 3).join(", ")} e mais.
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
