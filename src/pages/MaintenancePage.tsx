import { useMemo, useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, SectionTitle } from "@/components/shared/Primitives";
import { workOrders } from "@/data/mock";
import { toast } from "sonner";
import { X } from "lucide-react";
import type { WorkOrder } from "@/types";

const STATUSES: WorkOrder["status"][] = ["New", "Assigned", "In progress", "Awaiting parts", "Client review", "Completed"];

export default function MaintenancePage() {
  const [items, setItems] = useState<WorkOrder[]>(workOrders);
  const [detail, setDetail] = useState<WorkOrder | null>(null);
  const grouped = useMemo(() => STATUSES.map((s) => ({ s, items: items.filter((w) => w.status === s) })), [items]);
  const setStatus = (id: string, status: WorkOrder["status"]) => setItems((prev) => prev.map((w) => w.id === id ? { ...w, status } : w));

  return (
    <div>
      <PageHeader title="Maintenance & Work Orders" subtitle="Internal equipment maintenance and client service requests." />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Open work orders" value={String(items.filter((w) => w.status !== "Completed").length + 12)} trend="+3 today" trendDir="up" />
        <KpiCard label="Due today" value="5" trend="Urgent" trendDir="down" />
        <KpiCard label="Emergency" value="2" trend="Critical" trendDir="down" />
        <KpiCard label="SLA compliance" value="94%" trend="+2%" trendDir="up" />
        <KpiCard label="First-time fix" value="78%" trend="+3%" trendDir="up" />
        <KpiCard label="Completed 30d" value="47" trend="+8 MoM" trendDir="up" />
      </div>

      <div className="grid grid-flow-col auto-cols-[280px] gap-3 overflow-x-auto pb-4">
        {grouped.map((g) => (
          <div key={g.s} className="rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex items-center justify-between mb-2"><div className="text-xs font-semibold">{g.s}</div><span className="text-[11px] text-muted-foreground">{g.items.length}</span></div>
            <div className="space-y-2">
              {g.items.map((w) => (
                <button key={w.id} onClick={() => setDetail(w)} className="w-full text-left rounded-lg border border-border bg-background p-3 hover:border-primary/40 transition">
                  <div className="flex items-center justify-between mb-1"><div className="text-[11px] text-muted-foreground">{w.number}</div><StatusBadge status={w.priority} /></div>
                  <div className="text-sm font-medium line-clamp-2">{w.description}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{w.client} · {w.location}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">SLA {w.sla}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center px-0 sm:px-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-xl bg-popover border border-border rounded-t-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-border flex justify-between"><div><div className="text-xs text-muted-foreground">{detail.number}</div><div className="font-display font-bold">{detail.description}</div></div><button onClick={() => setDetail(null)}><X className="h-4 w-4" /></button></div>
            <div className="p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-xs text-muted-foreground">Client</div><div>{detail.client}</div></div>
                <div><div className="text-xs text-muted-foreground">Location</div><div>{detail.location}</div></div>
                <div><div className="text-xs text-muted-foreground">Category</div><div>{detail.category}</div></div>
                <div><div className="text-xs text-muted-foreground">Technician</div><div>{detail.technician}</div></div>
                <div><div className="text-xs text-muted-foreground">Priority</div><div>{detail.priority}</div></div>
                <div><div className="text-xs text-muted-foreground">SLA</div><div>{detail.sla}</div></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Update status</div>
                <div className="flex flex-wrap gap-1">{STATUSES.map((s) => (
                  <button key={s} onClick={() => { setStatus(detail.id, s); setDetail({ ...detail, status: s }); toast.success(`Status: ${s}`); }} className={`text-xs px-2 py-1 rounded-md ${detail.status === s ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}>{s}</button>
                ))}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => toast.info("Note added")} className="text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-accent">Add note</button>
                <button onClick={() => toast.info("Material added")} className="text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-accent">Add material</button>
                <button onClick={() => { setStatus(detail.id, "Completed"); setDetail(null); toast.success("Work order completed"); }} className="text-xs px-3 py-1.5 rounded-md bg-emerald-500/15 text-emerald-400">Complete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
