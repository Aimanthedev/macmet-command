import { useMemo, useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, ProgressBar, SectionTitle } from "@/components/shared/Primitives";
import { assets } from "@/data/mock";
import { fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { Asset } from "@/types";

const TABS: Asset["type"][] = ["Equipment", "Vehicle", "Tool", "IT"];

export default function AssetsPage() {
  const [tab, setTab] = useState<Asset["type"]>("Equipment");
  const [detail, setDetail] = useState<Asset | null>(null);
  const list = useMemo(() => assets.filter((a) => a.type === tab), [tab]);
  const util = Math.round(assets.reduce((s, a) => s + a.utilization, 0) / assets.length);

  return (
    <div>
      <PageHeader title="Assets & Fleet" subtitle="Equipment, vehicles, tools and IT assets across sites and yards." />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Total assets" value={String(assets.length + 32)} trend="+3 MoM" trendDir="up" />
        <KpiCard label="In use" value={String(assets.filter((a) => a.status === "In use").length + 20)} trend="Deployed" trendDir="up" />
        <KpiCard label="Available" value={String(assets.filter((a) => a.status === "Available").length + 5)} trend="Ready" trendDir="up" />
        <KpiCard label="Under maintenance" value={String(assets.filter((a) => a.status === "Under maintenance").length + 2)} trend="Service" trendDir="down" />
        <KpiCard label="Service due" value="6" trend="Next 30 d" trendDir="down" />
        <KpiCard label="Utilization" value={`${util}%`} trend="+4%" trendDir="up" />
      </div>

      <div className="border-b border-border mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => <button key={t} onClick={() => setTab(t)} className={cn("px-3 py-2 text-sm border-b-2 -mb-px whitespace-nowrap", tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground")}>{t}</button>)}
      </div>

      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground bg-muted/40"><tr>{["Code", "Asset", "Project", "Assigned", "Condition", "Utilization", "Next service", "Status"].map((h) => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>{list.map((a) => (
              <tr key={a.id} onClick={() => setDetail(a)} className="border-t border-border/60 hover:bg-accent/30 cursor-pointer">
                <td className="px-4 py-3 font-medium">{a.code}</td>
                <td>{a.name}</td><td>{a.project ?? "—"}</td><td>{a.assignedTo ?? "—"}</td>
                <td><StatusBadge status={a.condition} /></td>
                <td className="w-32"><div className="text-[11px] mb-1 tabular">{a.utilization}%</div><ProgressBar value={a.utilization} tone={a.utilization > 85 ? "warning" : "primary"} /></td>
                <td>{fmtDate(a.nextService)}</td><td><StatusBadge status={a.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Panel>

      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center px-0 sm:px-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-lg bg-popover border border-border rounded-t-2xl sm:rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-3"><div><div className="text-xs text-muted-foreground">{detail.code}</div><div className="font-display font-bold">{detail.name}</div></div><button onClick={() => setDetail(null)}><X className="h-4 w-4" /></button></div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Type</div><div>{detail.type}</div></div>
              <div><div className="text-xs text-muted-foreground">Condition</div><div>{detail.condition}</div></div>
              <div><div className="text-xs text-muted-foreground">Assigned</div><div>{detail.assignedTo ?? "—"}</div></div>
              <div><div className="text-xs text-muted-foreground">Project</div><div>{detail.project ?? "—"}</div></div>
              <div><div className="text-xs text-muted-foreground">Last service</div><div>{fmtDate(detail.lastService)}</div></div>
              <div><div className="text-xs text-muted-foreground">Next service</div><div>{fmtDate(detail.nextService)}</div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
