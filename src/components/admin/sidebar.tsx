"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white p-6 lg:flex">
      <strong className="text-xl text-serviscon-navy">Serviscon Intelligence</strong>
      <nav aria-label="Menu principal" className="mt-8 flex flex-col gap-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link key={item.href} href={item.href} className={`rounded-xl px-4 py-3 text-sm font-medium ${active ? "bg-serviscon-blue text-white" : "text-slate-700 hover:bg-slate-100 hover:text-serviscon-blue"}`}>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Menu mobile" className="grid grid-cols-2 gap-2 border-t border-slate-200 bg-white p-3 sm:grid-cols-4 lg:hidden">
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link key={item.href} href={item.href} className={`rounded-xl px-3 py-2 text-center text-xs font-medium ${active ? "bg-serviscon-blue text-white" : "bg-slate-50 text-slate-700"}`}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
