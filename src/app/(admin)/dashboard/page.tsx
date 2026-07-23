import { getCurrentUser } from "@/modules/auth/current-user";

const cards = [
  { label: "Usuários ativos", value: "5", description: "Perfis demo configurados" },
  { label: "Organizações", value: "1", description: "Tenant Serviscon" },
  { label: "Permissões", value: "4", description: "RBAC inicial" },
  { label: "Módulos liberados", value: "3", description: "Auth, usuários e painel" },
];

export default function DashboardPage() {
  const user = getCurrentUser();

  return (
    <main className="p-6">
      <section className="rounded-3xl bg-gradient-to-r from-serviscon-navy to-serviscon-blue p-8 text-white shadow-lg">
        <p className="text-sm uppercase tracking-[0.25em] text-serviscon-green">Painel inicial</p>
        <h2 className="mt-3 text-3xl font-bold">Olá, {user?.name}</h2>
        <p className="mt-2 max-w-2xl text-slate-100">Primeira entrega funcional com autenticação, isolamento por organização, usuários, perfis e layout administrativo.</p>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <strong className="mt-2 block text-3xl text-serviscon-navy">{card.value}</strong>
            <span className="mt-1 block text-sm text-slate-600">{card.description}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
