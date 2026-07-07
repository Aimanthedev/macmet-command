import { useMemo, useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, Avatar, SectionTitle } from "@/components/shared/Primitives";
import { clients, opportunities } from "@/data/mock";
import { fmtQAR, fmtDate } from "@/lib/format";
import { Plus, Search, X } from "lucide-react";
import { toast } from "sonner";
import type { Opportunity } from "@/types";

const STAGES: Opportunity["stage"][] = ["New enquiry", "Qualified", "Site visit", "Estimating", "Quotation submitted", "Negotiation", "Won", "Lost"];

export default function SalesPage() {
  const [q, setQ] = useState("");
  const [detail, setDetail] = useState<Opportunity | null>(null);
  const [items, setItems] = useState<Opportunity[]>(opportunities);

  const grouped = useMemo(() => STAGES.map((s) => ({ stage: s, items: items.filter((o) => o.stage === s && (o.title + o.client).toLowerCase().includes(q.toLowerCase())) })), [items, q]);
  const pipeline = items.filter((o) => o.stage !== "Won" && o.stage !== "Lost").reduce((s, o) => s + o.value, 0);
  const won = items.filter((o) => o.stage === "Won").length; const closed = items.filter((o) => o.stage === "Won" || o.stage === "Lost").length;
  const winRate = closed ? Math.round((won / closed) * 100) : 0;

  const advance = (o: Opportunity, next: Opportunity["stage"]) => setItems((p) => p.map((x) => x.id === o.id ? { ...x, stage: next } : x));

  return (
    <div>
      <PageHeader title="Sales & CRM" subtitle="Pipeline, opportunities and client relationships."
        actions={<button onClick={() => toast.success("Opportunity draft created")} className="h-9 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 text-sm"><Plus className="h-4 w-4" /> Add opportunity</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <KpiCard label="Open opportunities" value={String(items.filter((o) => o.stage !== "Won" && o.stage !== "Lost").length)} trend="+3 this month" trendDir="up" />
        <KpiCard label="Pipeline value" value={fmtQAR(pipeline)} trend="+11.2%" trendDir="up" />
        <KpiCard label="Submitted quotations" value={String(items.filter((o) => o.stage === "Quotation submitted").length + 12)} trend="+2 WoW" trendDir="up" />
        <KpiCard label="Win rate" value={`${winRate}%`} trend="Rolling 12M: 38%" trendDir="up" />
        <KpiCard label="Expected Q3" value="QAR 8.9M" trend="Forecast" trendDir="up" />
      </div>

      <Panel className="p-3 mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search opportunities…" className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm" />
        </div>
      </Panel>

      <div className="grid grid-flow-col auto-cols-[280px] gap-3 overflow-x-auto pb-4">
        {grouped.map((g) => (
          <div key={g.stage} className="rounded-xl border border-border bg-muted/30 p-3">
            <div className="flex items-center justify-between mb-2 sticky top-0"><div className="text-xs font-semibold">{g.stage}</div><span className="text-[11px] text-muted-foreground">{g.items.length}</span></div>
            <div className="space-y-2">
              {g.items.map((o) => (
                <button key={o.id} onClick={() => setDetail(o)} className="w-full text-left rounded-lg border border-border bg-background p-3 hover:border-primary/40 transition">
                  <div className="text-sm font-medium line-clamp-2">{o.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{o.client}</div>
                  <div className="flex items-center justify-between mt-2 text-[11px]"><span className="tabular font-semibold">{fmtQAR(o.value)}</span><span className="text-muted-foreground">{o.probability}%</span></div>
                  <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground"><span>{o.owner.split(" ")[0]}</span><span>Close {fmtDate(o.closeDate)}</span></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Panel className="mt-6 p-5">
        <SectionTitle title="Client directory" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {clients.map((c) => (
            <div key={c.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <Avatar name={c.name} size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><div className="font-semibold truncate">{c.name}</div><StatusBadge status={c.status} /></div>
                <div className="text-xs text-muted-foreground">{c.sector} · {c.projects} projects · {fmtQAR(c.totalValue)}</div>
                <div className="text-[11px] mt-1">{c.contact} · {c.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center px-0 sm:px-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-xl bg-popover border border-border rounded-t-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border"><h3 className="font-display font-bold">{detail.title}</h3><button onClick={() => setDetail(null)}><X className="h-4 w-4" /></button></div>
            <div className="p-5 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div><div className="text-xs text-muted-foreground">Client</div><div className="font-medium">{detail.client}</div></div>
                <div><div className="text-xs text-muted-foreground">Owner</div><div className="font-medium">{detail.owner}</div></div>
                <div><div className="text-xs text-muted-foreground">Value</div><div className="font-medium tabular">{fmtQAR(detail.value)}</div></div>
                <div><div className="text-xs text-muted-foreground">Probability</div><div className="font-medium">{detail.probability}%</div></div>
                <div><div className="text-xs text-muted-foreground">Service</div><div className="font-medium">{detail.service}</div></div>
                <div><div className="text-xs text-muted-foreground">Close</div><div className="font-medium">{fmtDate(detail.closeDate)}</div></div>
              </div>
              <div><div className="text-xs text-muted-foreground mb-2">Advance stage</div>
                <div className="flex flex-wrap gap-1">{STAGES.map((s) => (
                  <button key={s} onClick={() => { advance(detail, s); setDetail({ ...detail, stage: s }); toast.success(`Moved to ${s}`); }} className={`text-xs px-2 py-1 rounded-md ${detail.stage === s ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent"}`}>{s}</button>
                ))}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
