export const fmtQAR = (n: number) => {
  if (n >= 1_000_000) return `QAR ${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `QAR ${(n / 1_000).toFixed(1)}K`;
  return `QAR ${n.toLocaleString()}`;
};
export const fmtQARFull = (n: number) => `QAR ${n.toLocaleString("en-US")}`;
export const fmtNumber = (n: number) => n.toLocaleString("en-US");
export const fmtDate = (s: string) => new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
export const fmtDay = (s: string) => new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

export const toCSV = (rows: Record<string, unknown>[], filename: string) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};
