import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Grid3x3, List, Plus, Search, X } from "lucide-react";
import { PageHeader, Panel, KpiCard, StatusBadge, ProgressBar, Avatar } from "@/components/shared/Primitives";
import { useApp } from "@/context/AppContext";
import { fmtQAR, fmtDate, toCSV } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus, Discipline } from "@/types";

const STATUSES: ProjectStatus[] = ["Planning", "Mobilizing", "In progress", "At risk", "Delayed", "Handover", "Completed"];

function AddProjectModal({ onClose }: { onClose: () => void }) {
  const { addProject } = useApp();
  const [form, setForm] = useState({ name: "", code: "", client: "", location: "Doha", value: "5000000", manager: "Ahmed Al-Suwaidi", disciplines: "MEP", status: "Planning" as ProjectStatus, description: "" });
  const submit = () => {
    if (!form.name || !form.code) { toast.error("Name and code required"); return; }
    const p: Project = {
      id: `p${Date.now()}`, code: form.code, name: form.name, client: form.client || "Internal", location: form.location,
      disciplines: form.disciplines.split(",").map((s) => s.trim()) as Discipline[],
      progress: 0, budgetUsed: 0, contractValue: Number(form.value) || 0, startDate: new Date().toISOString().slice(0, 10), endDate: "2027-12-31",
      manager: form.manager, team: [], status: form.status, health: "On track",
      nextMilestone: { name: "Kickoff meeting", date: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10) },
      description: form.description, costToDate: 0, certified: 0, collected: 0, variations: 0, retention: 0,
    };
    addProject(p); toast.success("Project created"); onClose();
  };
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-popover shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display font-bold">New project</h3>
          <button onClick={onClose}><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 grid grid-cols-2 gap-3 text-sm">
          {[
            ["name", "Project name", ""],
            ["code", "Project code", "MAK-2500"],
            ["client", "Client", ""],
            ["location", "Location", ""],
            ["value", "Contract value (QAR)", ""],
            ["manager", "Project manager", ""],
            ["disciplines", "Disciplines (comma separated)", "MEP, HVAC"],
          ].map(([k, l, ph]) => (
            <label key={k} className="col-span-2 md:col-span-1 flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">{l}</span>
              <input value={(form as any)[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} placeholder={ph as string}
                className="h-9 rounded-lg border border-border bg-background px-3" />
            </label>
          ))}
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Initial status</span>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProjectStatus })} className="h-9 rounded-lg border border-border bg-background px-3">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label className="col-span-2 flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Description</span>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-lg border border-border bg-background px-3 py-2" />
          </label>
        </div>
        <div className="p-4 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="h-9 px-3 rounded-lg border border-border">Cancel</button>
          <button onClick={submit} className="h-9 px-3 rounded-lg bg-primary text-primary-foreground">Create project</button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const { projects } = useApp();
  const [q, setQ] = useState(""); const [status, setStatus] = useState<string>("All"); const [view, setView] = useState<"grid" | "table">("grid"); const [openNew, setOpenNew] = useState(false);

  const list = useMemo(() => projects.filter((p) => (status === "All" || p.status === status) && (p.name + p.client + p.code).toLowerCase().includes(q.toLowerCase())), [projects, q, status]);
  const kpis = {
    active: projects.filter((p) => p.status !== "Completed").length,
    value: projects.reduce((s, p) => s + p.contractValue, 0),
    atRisk: projects.filter((p) => p.health === "At risk" || p.health === "Delayed").length,
    completed: projects.filter((p) => p.status === "Completed").length,
  };

  return (
    <div>
      <PageHeader title="Projects" subtitle="Full portfolio of active and completed engagements across disciplines and clients."
        actions={<>
          <button onClick={() => toCSV(projects.map((p) => ({ code: p.code, name: p.name, client: p.client, value: p.contractValue, progress: p.progress, status: p.status })), "projects.csv")} className="h-9 inline-flex items-center gap-2 rounded-lg border border-border px-3 text-sm hover:bg-accent"><Download className="h-4 w-4" /> Export</button>
          <button onClick={() => setOpenNew(true)} className="h-9 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 text-sm"><Plus className="h-4 w-4" /> New project</button>
        </>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Active projects" value={String(kpis.active)} trend="+2 QoQ" trendDir="up" />
        <KpiCard label="Portfolio value" value={fmtQAR(kpis.value)} trend="+8.4%" trendDir="up" />
        <KpiCard label="At risk / delayed" value={String(kpis.atRisk)} trend="Monitor" trendDir="down" />
        <KpiCard label="Completed (12M)" value={String(kpis.completed)} trend="On plan" trendDir="up" />
      </div>

      <Panel className="p-3 mb-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, clients, codes…" className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-background text-sm" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-lg border border-border bg-background px-3 text-sm">
          <option>All</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <div className="flex rounded-lg border border-border p-0.5">
          <button onClick={() => setView("grid")} className={cn("p-1.5 rounded-md", view === "grid" && "bg-primary text-primary-foreground")}><Grid3x3 className="h-4 w-4" /></button>
          <button onClick={() => setView("table")} className={cn("p-1.5 rounded-md", view === "table" && "bg-primary text-primary-foreground")}><List className="h-4 w-4" /></button>
        </div>
      </Panel>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`}>
              <Panel className="p-5 h-full hover:border-primary/40 transition">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.code}</div>
                  <StatusBadge status={p.health} />
                </div>
                <div className="font-semibold text-base leading-tight line-clamp-2">{p.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.client} · {p.location}</div>
                <div className="flex flex-wrap gap-1 my-3">
                  {p.disciplines.slice(0, 3).map((d) => <span key={d} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{d}</span>)}
                </div>
                <div className="text-xs mb-1 flex justify-between"><span className="text-muted-foreground">Progress</span><span className="tabular font-medium">{p.progress}%</span></div>
                <ProgressBar value={p.progress} tone={p.health === "Delayed" ? "critical" : p.health === "At risk" ? "warning" : "primary"} />
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div><div className="text-muted-foreground">Contract</div><div className="font-semibold tabular">{fmtQAR(p.contractValue)}</div></div>
                  <div><div className="text-muted-foreground">Budget used</div><div className="font-semibold tabular">{p.budgetUsed}%</div></div>
                </div>
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name={p.manager} size={26} />
                    <div className="text-[11px]"><div className="font-medium">{p.manager}</div><div className="text-muted-foreground">Project Manager</div></div>
                  </div>
                  <div className="text-right text-[11px]"><div className="text-muted-foreground">Next</div><div className="font-medium">{fmtDate(p.nextMilestone.date)}</div></div>
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground bg-muted/40">
                <tr>{["Project", "Client", "Manager", "Contract", "Progress", "Status", "Next"].map((h) => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {list.map((p) => (
                  <tr key={p.id} className="border-t border-border/60 hover:bg-accent/30">
                    <td className="px-4 py-3"><Link to={`/projects/${p.id}`} className="font-medium hover:text-primary">{p.name}</Link><div className="text-[11px] text-muted-foreground">{p.code}</div></td>
                    <td className="px-4 py-3">{p.client}</td>
                    <td className="px-4 py-3">{p.manager}</td>
                    <td className="px-4 py-3 tabular">{fmtQAR(p.contractValue)}</td>
                    <td className="px-4 py-3 w-40"><div className="text-[11px] mb-1">{p.progress}%</div><ProgressBar value={p.progress} /></td>
                    <td className="px-4 py-3"><StatusBadge status={p.health} /></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{fmtDate(p.nextMilestone.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {openNew && <AddProjectModal onClose={() => setOpenNew(false)} />}
    </div>
  );
}
