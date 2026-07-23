import { serviceLines } from "@/modules/brand/serviscon";

type ModulePlaceholderProps = {
  title: string;
  description: string;
};

export function ModulePlaceholder({ title, description }: ModulePlaceholderProps) {
  return (
    <main className="p-6">
      <section className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Em desenvolvimento</p>
        <h2 className="mt-3 text-3xl font-black text-serviscon-navy">{title}</h2>
        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            Este módulo já possui rota protegida e navegação funcional, mas as regras de negócio serão entregues em uma próxima etapa para evitar mistura com a fundação de autenticação e multitenancy.
          </div>
          <div className="rounded-2xl bg-serviscon-sand p-5">
            <p className="text-sm font-semibold text-serviscon-navy">Serviços de referência</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceLines.slice(0, 4).map((service) => (
                <span key={service} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
