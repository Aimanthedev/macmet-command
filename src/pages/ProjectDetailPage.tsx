import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit3, MoreHorizontal } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { PageHeader, Panel, StatusBadge, ProgressBar, Avatar, SectionTitle } from "@/components/shared/Primitives";
import { useApp } from "@/context/AppContext";
import { fmtDate, fmtQARFull } from "@/lib/format";
import { docs, employees, observations, purchaseOrders } from "@/data/mock";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TABS = ["Overview", "Schedule", "Financials", "Team", "Procurement", "Documents", "HSE & Quality", "Activity"] as const;

const PHASES = [
  { name: "Design & approvals", start: 0, dur: 15, done: 100 },
  { name: "Procurement", start: 8, dur: 25, done: 80 },
  { name: "Civil works", start: 15, dur: 30, done: 60 },
  { name: "MEP first fix", start: 30, dur: 25, done: 45 },
  { name: "MEP second fix", start: 45, dur: 20, done: 15 },
  { name: "Testing & commissioning", start: 60, dur: 15, done: 0 },
  { name: "Handover", start: 75, dur: 10, done: 0 },
];

const weekly = Array.from({ length: 12 }, (_, i) => ({ w: `W${i + 1}`, plan: 4 + i * 0.5, actual: 3.5 + i * 0.55 + (i % 3 === 0 ? 0.5 : 0) }));

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { projects } = useApp();
  const nav = useNavigate();
  const p = projects.find((x) => x.id === projectId);
  const [tab, setTab] = useState<typeof TABS[number]>("Overview");

  if (!p) return (
    <div className="text-center py-20"><p className="text-muted-foreground">Project not found.</p>
      <Link to="/projects" className="text-primary hover:underline mt-2 inline-block">Back to projects</Link></div>
  );

  const projDocs = docs.filter((d) => d.project.includes(p.code));
  const projPOs = purchaseOrders.filter((po) => po.project === p.code);
  const projObs = observations.filter((o) => o.project === p.code);
  const team = employees.filter((e) => e.project === p.code);

  return (
    <div>
      <button onClick={() => nav(-1)} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-3"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
      <PageHeader title={p.name} subtitle={`${p.code} · ${p.client} · ${p.location}`}
        actions={<>
          <button onClick={() => toast.info("Edit project (demo)")} className="h-9 inline-flex items-center gap-2 rounded-lg border border-border px-3 text-sm"><Edit3 className="h-4 w-4" /> Edit</button>
          <button className="h-9 grid place-items-center rounded-lg border border-border px-3"><MoreHorizontal className="h-4 w-4" /></button>
        </>} />

      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3 mb-4">
        <Panel className="p-4"><div className="text-[10px] uppercase text-muted-foreground">Status</div><div className="mt-2"><StatusBadge status={p.health} /></div></Panel>
        <Panel className="p-4"><div className="text-[10px] uppercase text-muted-foreground">Progress</div><div className="font-display text-2xl font-bold tabular mt-1">{p.progress}%</div><ProgressBar value={p.progress} /></Panel>
        <Panel className="p-4"><div className="text-[10px] uppercase text-muted-foreground">Contract</div><div className="font-display text-xl font-bold tabular mt-1">{fmtQARFull(p.contractValue)}</div></Panel>
        <Panel className="p-4"><div className="text-[10px] uppercase text-muted-foreground">Cost to date</div><div className="font-display text-xl font-bold tabular mt-1">{fmtQARFull(p.costToDate)}</div></Panel>
        <Panel className="p-4"><div className="text-[10px] uppercase text-muted-foreground">PM</div><div className="mt-1 flex items-center gap-2"><Avatar name={p.manager} size={24} /><span className="text-sm font-medium truncate">{p.manager}</span></div></Panel>
        <Panel className="p-4"><div className="text-[10px] uppercase text-muted-foreground">Next milestone</div><div className="text-sm font-medium mt-1">{p.nextMilestone.name}</div><div className="text-xs text-muted-foreground">{fmtDate(p.nextMilestone.date)}</div></Panel>
      </div>

      <div className="border-b border-border mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-3 py-2 text-sm border-b-2 -mb-px whitespace-nowrap transition", tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>{t}</button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="grid grid-cols-12 gap-4">
          <Panel className="col-span-12 xl:col-span-8 p-5">
            <SectionTitle title="Weekly progress trend" />
            <div className="h-56">
              <ResponsiveContainer>
                <AreaChart data={weekly}>
                  <defs><linearGradient id="wp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2F80FF" stopOpacity={0.4} /><stop offset="100%" stopColor="#2F80FF" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="w" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                  <Area dataKey="plan" stroke="#675CFF" fill="none" />
                  <Area dataKey="actual" stroke="#2F80FF" fill="url(#wp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <Panel className="col-span-12 xl:col-span-4 p-5">
            <SectionTitle title="Scope summary" />
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1">{p.disciplines.map((d) => <span key={d} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{d}</span>)}</div>
          </Panel>
          <Panel className="col-span-12 md:col-span-6 p-5">
            <SectionTitle title="Progress by discipline" />
            <div className="space-y-3">
              {p.disciplines.map((d, i) => {
                const v = Math.min(100, Math.max(10, p.progress + (i * 7 - 12)));
                return <div key={d}><div className="flex justify-between text-xs mb-1"><span>{d}</span><span className="tabular">{v}%</span></div><ProgressBar value={v} /></div>;
              })}
            </div>
          </Panel>
          <Panel className="col-span-12 md:col-span-6 p-5">
            <SectionTitle title="Risks & approvals" />
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />Material delivery risk on cable trays — mitigation in progress.</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary" />VO-004 awaiting client approval (QAR 210K).</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />IPC-06 approved, released for payment.</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-rose-500" />Hot work permit lapsed — corrective action open.</li>
            </ul>
          </Panel>
        </div>
      )}

      {tab === "Schedule" && (
        <Panel className="p-5">
          <SectionTitle title="Project schedule" />
          <div className="space-y-2">
            {PHASES.map((ph) => (
              <div key={ph.name} className="grid grid-cols-12 items-center gap-3">
                <div className="col-span-4 text-sm truncate">{ph.name}</div>
                <div className="col-span-8 relative h-6 rounded-md bg-muted/60">
                  <div className="absolute top-0 h-full rounded-md bg-primary/25 border border-primary/40" style={{ left: `${ph.start}%`, width: `${ph.dur}%` }}>
                    <div className="h-full rounded-md bg-primary" style={{ width: `${ph.done}%` }} />
                    <span className="absolute inset-0 grid place-items-center text-[10px] font-medium text-foreground">{ph.done}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {tab === "Financials" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ["Contract value", fmtQARFull(p.contractValue)],
            ["Variations", fmtQARFull(p.variations)],
            ["Revised", fmtQARFull(p.contractValue + p.variations)],
            ["Certified", fmtQARFull(p.certified)],
            ["Collected", fmtQARFull(p.collected)],
            ["Cost to date", fmtQARFull(p.costToDate)],
            ["Retention", fmtQARFull(p.retention)],
            ["Forecast margin", "12.4%"],
          ].map(([l, v]) => (
            <Panel key={l} className="p-4"><div className="text-[10px] uppercase text-muted-foreground">{l}</div><div className="font-display text-lg font-bold tabular mt-1">{v}</div></Panel>
          ))}
        </div>
      )}

      {tab === "Team" && (
        <Panel className="p-5">
          <SectionTitle title="Team" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {[p.manager, ...team.map((t) => t.name), ...p.team].filter((v, i, a) => a.indexOf(v) === i).map((n) => (
              <div key={n} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <Avatar name={n} />
                <div><div className="text-sm font-medium">{n}</div><div className="text-xs text-muted-foreground">Assigned</div></div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {tab === "Procurement" && (
        <Panel className="p-5">
          <SectionTitle title="Purchase orders" />
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground"><tr>{["PO", "Supplier", "Value", "Delivery", "Status"].map((h) => <th key={h} className="text-left py-2">{h}</th>)}</tr></thead>
            <tbody>{projPOs.map((po) => (
              <tr key={po.id} className="border-t border-border/60"><td className="py-2 font-medium">{po.number}</td><td>{po.supplier}</td><td className="tabular">{fmtQARFull(po.value)}</td><td className="w-36"><ProgressBar value={po.deliveryProgress} /></td><td><StatusBadge status={po.status} /></td></tr>
            ))}{projPOs.length === 0 && <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">No POs for this project yet.</td></tr>}</tbody>
          </table>
        </Panel>
      )}

      {tab === "Documents" && (
        <Panel className="p-5">
          <SectionTitle title="Documents" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projDocs.map((d) => (
              <div key={d.id} className="rounded-lg border border-border p-3">
                <div className="flex items-start justify-between gap-2"><div><div className="text-sm font-medium">{d.name}</div><div className="text-xs text-muted-foreground">{d.number} · Rev {d.revision}</div></div><StatusBadge status={d.status} /></div>
              </div>
            ))}
            {projDocs.length === 0 && <div className="text-sm text-muted-foreground">No documents yet.</div>}
          </div>
        </Panel>
      )}

      {tab === "HSE & Quality" && (
        <Panel className="p-5">
          <SectionTitle title="Observations" />
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground"><tr>{["Category", "Severity", "Owner", "Due", "Status"].map((h) => <th key={h} className="text-left py-2">{h}</th>)}</tr></thead>
            <tbody>{projObs.map((o) => <tr key={o.id} className="border-t border-border/60"><td className="py-2">{o.category}</td><td><StatusBadge status={o.severity} /></td><td>{o.owner}</td><td>{fmtDate(o.due)}</td><td><StatusBadge status={o.status} /></td></tr>)}
            {projObs.length === 0 && <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">Clean site — no open observations.</td></tr>}</tbody>
          </table>
        </Panel>
      )}

      {tab === "Activity" && (
        <Panel className="p-5">
          <SectionTitle title="Activity" />
          <ol className="relative border-l border-border pl-4 space-y-4">
            {[
              { u: p.manager, a: "updated weekly progress report", t: "2 h ago" },
              { u: "Rania Fahed", a: "issued IPC-06", t: "yesterday" },
              { u: "Sami Rachid", a: "submitted RFI-045", t: "2 d ago" },
              { u: "Youssef Rahim", a: "raised HSE observation", t: "3 d ago" },
              { u: "Ahmed Al-Suwaidi", a: "approved variation VO-003", t: "1 w ago" },
            ].map((x, i) => (
              <li key={i} className="relative"><span className="absolute -left-[19px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20" /><div className="text-sm"><span className="font-medium">{x.u}</span> <span className="text-muted-foreground">{x.a}</span></div><div className="text-[11px] text-muted-foreground">{x.t}</div></li>
            ))}
          </ol>
        </Panel>
      )}
    </div>
  );
}
