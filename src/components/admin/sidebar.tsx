const items = ["Início", "CRM", "Contatos", "Empresas", "Atividades", "Visitas", "Relatórios", "Configurações"];

export function Sidebar() {
  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
      <strong className="text-xl text-serviscon-navy">Serviscon Intelligence</strong>
      <nav aria-label="Menu principal" className="mt-8 flex flex-col gap-2">
        {items.map((item) => (
          <a key={item} href={item === "Início" ? "/dashboard" : "#"} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-serviscon-blue">
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}
