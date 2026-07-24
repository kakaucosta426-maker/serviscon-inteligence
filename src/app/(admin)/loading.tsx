export default function Loading() {
  return (
    <main className="p-6">
      <div className="animate-pulse rounded-3xl bg-white p-8 shadow-sm">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-4 h-8 w-72 rounded bg-slate-200" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-28 rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    </main>
  );
}
