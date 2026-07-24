export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export function formatCurrency(value: unknown): string {
  if (value === null || value === undefined) return "R$ 0,00";
  const numericValue = typeof value === "number" ? value : Number(value.toString());
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number.isNaN(numericValue) ? 0 : numericValue);
}
