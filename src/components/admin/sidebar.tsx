const items = [
  { label: "Início", href: "/dashboard" },
  { label: "CRM", href: "/crm" },
  { label: "Contatos", href: "/contatos" },
  { label: "Empresas", href: "/empresas" },
  { label: "Atividades", href: "/atividades" },
  { label: "Visitas", href: "/visitas" },
  { label: "Relatórios", href: "/relatorios" },
  { label: "Configurações", href: "/configuracoes" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
      <div className="rounded-3xl bg-gradient-to-br from-serviscon-navy to-serviscon-blue p-5 text-white shadow-lg">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-serviscon-green">Serviscon</span>
        <strong className="mt-2 block text-xl leading-tight">Intelligence</strong>
        <p className="mt-3 text-xs leading-5 text-slate-100">Gestão comercial para facilities, terceirização e serviços operacionais.</p>
      </div>
      <nav aria-label="Menu principal" className="mt-8 flex flex-col gap-2">
        {items.map((item) => (
          <a key={item.href} href={item.href} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-serviscon-sand hover:text-serviscon-blue">
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
