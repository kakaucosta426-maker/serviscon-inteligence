"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="p-6">
      <section className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-900">
        <h2 className="text-2xl font-bold">Não foi possível carregar esta área.</h2>
        <p className="mt-2 text-sm">Tente novamente. Se o problema persistir, acione o administrador da plataforma.</p>
        <button className="mt-6 rounded-xl bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800" onClick={reset} type="button">
          Tentar novamente
        </button>
      </section>
    </main>
  );
}
