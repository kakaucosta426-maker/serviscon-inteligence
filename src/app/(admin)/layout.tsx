import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";
import { getCurrentUser } from "@/modules/auth/current-user";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const currentUser = user;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-slate-200 bg-white px-6 py-4">
          <p className="text-sm text-slate-500">Organização</p>
          <h1 className="text-xl font-semibold text-serviscon-navy">{currentUser.organizationName}</h1>
        </header>
        {children}
      </div>
    </div>
  );
}
