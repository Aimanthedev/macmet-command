import { useMemo, useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, SectionTitle } from "@/components/shared/Primitives";
import { docs } from "@/data/mock";
import { fmtDate, toCSV } from "@/lib/format";
import { Download, Plus, Search, X } from "lucide-react";
import { toast } from "sonner";
import type { Doc } from "@/types";

export default function DocumentsPage() {
  const [items, setItems] = useState<Doc[]>(docs);
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All"); const [detail, setDetail] = useState<Doc | null>(null); const [upload, setUpload] = useState(false);
  const cats = ["All", ...Array.from(new Set(docs.map((d) => d.category)))];
  const list = useMemo(() => items.filter((d) => (cat === "All" || d.category === cat) && (d.name + d.number).toLowerCase().includes(q.toLowerCase())), [items, q, cat]);
  const expiring = items.filter((d) => d.expiry && d.expiry < "2026-10-01").length;

  return (
    <div>
      <PageHeader title="Documents" subtitle="Contracts, drawings, submittals, certificates and approvals."
        actions={<>
          <button onClick={() => toCSV(items as any, "documents.csv")} className="h-9 inline-flex items-center gap-2 rounded-lg border border-border px-3 text-sm"><Download className="h-4 w-4" /> Export</button>
          <button onClick={() => setUpload(true)} className="h-9 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 text-sm"><Plus className="h-4 w-4" /> Upload</button>
        </>} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <KpiCard label="Total documents" value="1,428" trend="+42 WoW" trendDir="up" />
        <KpiCard label="Awaiting approval" value="26" trend="Pending" trendDir="down" />
        <KpiCard label="Expiring soon" value={String(expiring + 4)} trend="Next 90 d" trendDir="down" />
        <KpiCard label="Revised this week" value="34" trend="+8" trendDir="up" />
        <KpiCard label="Archived" value="612" trend="Stable" trendDir="flat" />
      </div>

      <Panel className="p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents…" className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm">{cats.map((c) => <option key={c}>{c}</option>)}</select>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground bg-muted/40"><tr>{["Document", "Category", "Project", "Rev", "Owner", "Updated", "Status", "Expiry"].map((h) => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>{list.map((d) => (
              <tr key={d.id} onClick={() => setDetail(d)} className="border-t border-border/60 cursor-pointer hover:bg-accent/30">
                <td className="px-4 py-3"><div className="font-medium">{d.name}</div><div className="text-[11px] text-muted-foreground">{d.number}</div></td>
                <td>{d.category}</td><td>{d.project}</td><td className="tabular">{d.revision}</td><td>{d.owner}</td><td>{fmtDate(d.updated)}</td>
                <td><StatusBadge status={d.status} /></td><td className="text-xs text-muted-foreground">{d.expiry ? fmtDate(d.expiry) : "—"}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Panel>

      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center px-0 sm:px-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-2xl bg-popover border border-border rounded-t-2xl sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-border flex justify-between"><div><div className="text-xs text-muted-foreground">{detail.number} · Rev {detail.revision}</div><div className="font-display font-bold">{detail.name}</div></div><button onClick={() => setDetail(null)}><X className="h-4 w-4" /></button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
              <div className="rounded-xl grid-bg border border-border h-64 grid place-items-center text-muted-foreground text-sm">Preview unavailable in demo</div>
              <div className="space-y-3 text-sm">
                <div><div className="text-xs text-muted-foreground">Category</div><div>{detail.category}</div></div>
                <div><div className="text-xs text-muted-foreground">Project</div><div>{detail.project}</div></div>
                <div><div className="text-xs text-muted-foreground">Owner</div><div>{detail.owner}</div></div>
                <div><div className="text-xs text-muted-foreground">Status</div><div><StatusBadge status={detail.status} /></div></div>
                <div className="pt-2 flex gap-2 flex-wrap">
                  <button onClick={() => toast.success("Download started (demo)")} className="text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-accent">Download</button>
                  <button onClick={() => toast.info("Share link copied")} className="text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-accent">Share</button>
                  <button onClick={() => toast.success("Submitted for approval")} className="text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground">Submit for approval</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {upload && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4" onClick={() => setUpload(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-popover p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-bold mb-3">Upload document (demo)</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center text-sm text-muted-foreground">Drag & drop file here<br />or click to select</div>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => setUpload(false)} className="h-9 px-3 rounded-lg border border-border text-sm">Cancel</button>
              <button onClick={() => {
                const d: Doc = { id: `d${Date.now()}`, number: `DOC-${Math.floor(Math.random() * 9000 + 1000)}`, name: "New uploaded document", category: "Drawings", project: "MAK-2411", revision: "A", owner: "You", updated: new Date().toISOString().slice(0, 10), status: "Draft" };
                setItems([d, ...items]); toast.success("Document uploaded"); setUpload(false);
              }} className="h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm">Upload</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
