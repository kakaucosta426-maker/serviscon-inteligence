import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";
import { logoutAction } from "@/modules/auth/actions";
import { getCurrentUser } from "@/modules/auth/current-user";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="text-sm text-slate-500">Organização</p>
            <h1 className="text-xl font-semibold text-serviscon-navy">{user.organizationName}</h1>
          </div>
          <form action={logoutAction}>
            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100" type="submit">
              Sair
            </button>
          </form>
        </header>
        {children}
      </div>
    </div>
  );
}
