import { useMemo, useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, Avatar, SectionTitle } from "@/components/shared/Primitives";
import { employees } from "@/data/mock";
import { fmtDate } from "@/lib/format";
import { Plus, Search, X } from "lucide-react";
import { toast } from "sonner";
import type { Employee } from "@/types";

export default function EmployeesPage() {
  const [q, setQ] = useState(""); const [dept, setDept] = useState("All"); const [detail, setDetail] = useState<Employee | null>(null);
  const list = useMemo(() => employees.filter((e) => (dept === "All" || e.department === dept) && (e.name + e.role).toLowerCase().includes(q.toLowerCase())), [q, dept]);
  const depts = ["All", ...Array.from(new Set(employees.map((e) => e.department)))];
  const expiring = employees.filter((e) => e.qidExpiry < "2026-10-01").length;

  return (
    <div>
      <PageHeader title="Employees" subtitle="Directory, allocation, leave and compliance for Macmet workforce."
        actions={<button onClick={() => toast.success("Employee record created")} className="h-9 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 text-sm"><Plus className="h-4 w-4" /> Add employee</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Total employees" value="184" trend="+6 QoQ" trendDir="up" />
        <KpiCard label="On site today" value="142" trend="77% deployed" trendDir="up" />
        <KpiCard label="On leave" value="9" trend="Normal" trendDir="flat" />
        <KpiCard label="New hires (30d)" value="4" trend="Onboarding" trendDir="up" />
        <KpiCard label="Visa renewals" value={String(expiring)} trend="Next 90 days" trendDir="down" />
        <KpiCard label="Training compliance" value="96%" trend="+2%" trendDir="up" />
      </div>

      <Panel className="p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search employees…" className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm" />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm">{depts.map((d) => <option key={d}>{d}</option>)}</select>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {list.map((e) => (
          <button key={e.id} onClick={() => setDetail(e)} className="text-left rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition">
            <div className="flex items-start gap-3">
              <Avatar name={e.name} size={44} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 min-w-0"><div className="font-semibold truncate">{e.name}</div></div>
                <div className="text-xs text-muted-foreground truncate">{e.role} · {e.department}</div>
                <div className="text-[11px] mt-1">{e.project ?? "Unassigned"}</div>
              </div>
              <StatusBadge status={e.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1">{e.skills.slice(0, 3).map((s) => <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>)}</div>
          </button>
        ))}
      </div>

      <Panel className="mt-6 p-5">
        <SectionTitle title="Expiry alerts (next 90 days)" />
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground"><tr>{["Employee", "Document", "Expires"].map((h) => <th key={h} className="text-left py-2">{h}</th>)}</tr></thead>
          <tbody>{employees.filter((e) => e.qidExpiry < "2026-10-01").map((e) => (
            <tr key={e.id} className="border-t border-border/60"><td className="py-2 font-medium">{e.name}</td><td>QID / Visa</td><td>{fmtDate(e.qidExpiry)}</td></tr>
          ))}</tbody>
        </table>
      </Panel>

      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center px-0 sm:px-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-lg bg-popover border border-border rounded-t-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3"><Avatar name={detail.name} size={48} /><div><div className="font-display font-bold">{detail.name}</div><div className="text-xs text-muted-foreground">{detail.role} · {detail.department}</div></div></div>
              <button onClick={() => setDetail(null)}><X className="h-4 w-4" /></button>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-xs text-muted-foreground">Employee ID</div><div>{detail.id.toUpperCase()}</div></div>
                <div><div className="text-xs text-muted-foreground">Nationality</div><div>{detail.nationality}</div></div>
                <div><div className="text-xs text-muted-foreground">Phone</div><div className="tabular">{detail.phone}</div></div>
                <div><div className="text-xs text-muted-foreground">Joined</div><div>{fmtDate(detail.joined)}</div></div>
                <div><div className="text-xs text-muted-foreground">Manager</div><div>{detail.manager}</div></div>
                <div><div className="text-xs text-muted-foreground">Project</div><div>{detail.project ?? "—"}</div></div>
                <div><div className="text-xs text-muted-foreground">QID expiry</div><div>{fmtDate(detail.qidExpiry)}</div></div>
                <div><div className="text-xs text-muted-foreground">Visa expiry</div><div>{fmtDate(detail.visaExpiry)}</div></div>
              </div>
              <div><div className="text-xs text-muted-foreground mb-1">Skills</div><div className="flex flex-wrap gap-1">{detail.skills.map((s) => <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-muted">{s}</span>)}</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
