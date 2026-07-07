import { useState } from "react";
import { PageHeader, Panel, SectionTitle } from "@/components/shared/Primitives";
import { reportTemplates, projects, invoices } from "@/data/mock";
import { Download, FileText, Printer } from "lucide-react";
import { toCSV, fmtDate } from "@/lib/format";
import { toast } from "sonner";

export default function ReportsPage() {
  const [form, setForm] = useState({ type: "Executive monthly summary", from: "2026-06-01", to: "2026-07-07", grouping: "Project", includeCharts: true, includeDetails: true });
  const [preview, setPreview] = useState(false);

  const exportCSV = (tpl: string) => {
    const rows = tpl.includes("Financial") || tpl.includes("Receivables") ? invoices : projects.map((p) => ({ code: p.code, name: p.name, client: p.client, value: p.contractValue, progress: p.progress, status: p.status }));
    toCSV(rows as any, `${tpl.replace(/\s+/g, "_").toLowerCase()}.csv`);
  };

  return (
    <div>
      <PageHeader title="Reports" subtitle="Executive reporting center — templates and custom builder."
        actions={<button onClick={() => window.print()} className="h-9 inline-flex items-center gap-2 rounded-lg border border-border px-3 text-sm"><Printer className="h-4 w-4" /> Print current</button>} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
        {reportTemplates.map((r) => (
          <Panel key={r.id} className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><FileText className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                <div className="text-[11px] text-muted-foreground mt-2">{r.freq} · Owner {r.owner} · Last {fmtDate(r.lastGen)}</div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => { setPreview(true); setForm({ ...form, type: r.name }); }} className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-accent">Preview</button>
                  <button onClick={() => window.print()} className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-accent">Export PDF</button>
                  <button onClick={() => exportCSV(r.name)} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary">Export CSV</button>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="p-5">
        <SectionTitle title="Report builder" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <label className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Report type</span>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="h-9 rounded-lg border border-border bg-background px-3">{reportTemplates.map((r) => <option key={r.id}>{r.name}</option>)}</select>
          </label>
          <label className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">From</span><input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} className="h-9 rounded-lg border border-border bg-background px-3" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">To</span><input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} className="h-9 rounded-lg border border-border bg-background px-3" /></label>
          <label className="flex flex-col gap-1"><span className="text-xs text-muted-foreground">Grouping</span>
            <select value={form.grouping} onChange={(e) => setForm({ ...form, grouping: e.target.value })} className="h-9 rounded-lg border border-border bg-background px-3">{["Project", "Client", "Department", "Discipline"].map((x) => <option key={x}>{x}</option>)}</select>
          </label>
          <label className="flex items-center gap-2 col-span-2"><input type="checkbox" checked={form.includeCharts} onChange={(e) => setForm({ ...form, includeCharts: e.target.checked })} /><span className="text-xs">Include charts</span></label>
          <label className="flex items-center gap-2 col-span-2"><input type="checkbox" checked={form.includeDetails} onChange={(e) => setForm({ ...form, includeDetails: e.target.checked })} /><span className="text-xs">Include line-item details</span></label>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => exportCSV(form.type)} className="h-9 rounded-lg border border-border px-3 text-sm inline-flex items-center gap-2"><Download className="h-4 w-4" /> Export CSV</button>
          <button onClick={() => setPreview(true)} className="h-9 rounded-lg bg-primary text-primary-foreground px-3 text-sm">Generate preview</button>
        </div>

        {preview && (
          <div className="mt-6 p-6 rounded-xl border border-border bg-muted/20 print:bg-white print:text-black">
            <div className="border-b border-border pb-4 mb-4"><div className="text-xs text-muted-foreground">MACMET AL-KHALEEJ · Report preview</div><div className="font-display text-xl font-bold">{form.type}</div><div className="text-xs">{form.from} → {form.to} · Grouped by {form.grouping}</div></div>
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground"><tr><th className="text-left py-2">Project</th><th className="text-left">Client</th><th className="text-right">Value</th><th className="text-right">Progress</th></tr></thead>
              <tbody>{projects.slice(0, 6).map((p) => (
                <tr key={p.id} className="border-t border-border/60"><td className="py-2">{p.name}</td><td>{p.client}</td><td className="text-right tabular">QAR {(p.contractValue / 1_000_000).toFixed(2)}M</td><td className="text-right tabular">{p.progress}%</td></tr>
              ))}</tbody>
            </table>
            <div className="mt-4 text-[10px] text-muted-foreground">Demo environment · Fictional operational data</div>
          </div>
        )}
      </Panel>
    </div>
  );
}
