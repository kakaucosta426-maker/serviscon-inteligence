import { loginAction } from "@/modules/auth/actions";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <form action={loginAction.bind(null, { status: "idle" })} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-serviscon-green">Acesso interno</p>
        <h1 className="mt-3 text-3xl font-bold text-serviscon-navy">Serviscon Intelligence</h1>
        <p className="mt-2 text-sm text-slate-600">Entre com sua conta corporativa para acessar o painel administrativo.</p>
        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">Senha</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3" />
        <button className="mt-6 w-full rounded-xl bg-serviscon-blue px-4 py-3 font-semibold text-white hover:bg-blue-700" type="submit">Entrar</button>
        <p className="mt-4 text-xs text-slate-500">As credenciais de demonstração são definidas exclusivamente por variáveis de ambiente locais.</p>
      </form>
    </main>
  );
}
