type ModulePlaceholderProps = {
  title: string;
  description: string;
};

export function ModulePlaceholder({ title, description }: ModulePlaceholderProps) {
  return (
    <main className="p-6">
      <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Em desenvolvimento</p>
        <h2 className="mt-3 text-3xl font-bold text-serviscon-navy">{title}</h2>
        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
          Este módulo já possui rota protegida e navegação funcional, mas as regras de negócio serão entregues em uma próxima etapa para evitar mistura com a fundação de autenticação e multitenancy.
        </div>
      </section>
    </main>
  );
}
