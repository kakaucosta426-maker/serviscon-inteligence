const navigation = ["Início", "CRM", "Contatos", "Empresas", "Atividades", "Visitas", "Relatórios", "Configurações"];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-serviscon-navy via-slate-900 to-serviscon-blue p-6 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-serviscon-green">MVP foundation</p>
          <h1 className="mt-4 text-4xl font-bold">Serviscon Intelligence</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-100">
            Base técnica para a central de marketing, atendimento, CRM, visitas técnicas e inteligência comercial da Serviscon.
          </p>
        </div>
        <nav aria-label="Navegação principal" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {navigation.map((item) => (
            <span key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium">
              {item}
            </span>
          ))}
        </nav>
      </section>
    </main>
  );
}
