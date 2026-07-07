import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AlertTriangle, Briefcase, ChevronRight, DollarSign, Download, HardHat, Plus, ShieldCheck, TrendingUp, Users, X } from "lucide-react";
import { PageHeader, Panel, KpiCard, StatusBadge, ProgressBar, SectionTitle, Avatar } from "@/components/shared/Primitives";
import { cashSnapshot, kpiSpark, projectDistribution, projectHealth, revenueSeries, workforceByDept } from "@/data/mock";
import { fmtQAR, fmtQARFull } from "@/lib/format";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const chartColors = ["#2F80FF", "#675CFF", "#23C9D6", "#1FC79A", "#FFB547", "#FF5C70", "#9A6CFF", "#8fb7ff"];

function QuickModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-display font-bold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-accent"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4">{children}</div>
      </motion.div>
    </div>
  );
}

export default function DashboardPage() {
  const { projects, approvals, actOnApproval, notifications } = useApp();
  const [quick, setQuick] = useState<null | string>(null);
  const [range, setRange] = useState<"6M" | "12M" | "YTD">("12M");

  const chartData = useMemo(() => (range === "6M" ? revenueSeries.slice(0, 6) : range === "YTD" ? revenueSeries.slice(0, 7) : revenueSeries), [range]);

  const kpis = [
    { label: "Active projects", value: "18", trend: "+2 this quarter", trendDir: "up" as const, icon: <Briefcase className="h-5 w-5" />, spark: kpiSpark(14) },
    { label: "Contract value", value: "QAR 146.8M", trend: "+8.4%", trendDir: "up" as const, icon: <TrendingUp className="h-5 w-5" />, spark: kpiSpark(130) },
    { label: "Monthly revenue", value: "QAR 6.42M", trend: "+12.6%", trendDir: "up" as const, icon: <DollarSign className="h-5 w-5" />, spark: kpiSpark(5.8) },
    { label: "Outstanding receivables", value: "QAR 12.6M", trend: "4 overdue invoices", trendDir: "down" as const, icon: <AlertTriangle className="h-5 w-5" />, spark: kpiSpark(11, 12) },
    { label: "Active workforce", value: "184", trend: "91% allocated", trendDir: "up" as const, icon: <Users className="h-5 w-5" />, spark: kpiSpark(170) },
    { label: "Safety performance", value: "0 LTI", trend: "214 safe days", trendDir: "flat" as const, icon: <ShieldCheck className="h-5 w-5" />, spark: kpiSpark(200) },
  ];

  const activeProjects = projects.filter((p) => p.status !== "Completed").slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Good morning, Mohammed"
        subtitle="Here is today’s operating position across Macmet. Demo environment · Fictional operational data."
        actions={
          <>
            <select className="h-9 rounded-lg border border-border bg-background px-3 text-xs">
              <option>This week</option><option>This month</option><option>This quarter</option><option>YTD</option>
            </select>
            <button onClick={() => toast.success("Briefing exported (demo)") } className="h-9 inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm hover:bg-accent">
              <Download className="h-4 w-4" /> Export briefing
            </button>
            <div className="relative">
              <button onClick={() => setQuick("New project")} className="h-9 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 text-sm hover:opacity-90">
                <Plus className="h-4 w-4" /> Add new
              </button>
            </div>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
        {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Panel gradient className="col-span-12 xl:col-span-8 p-5">
          <div className="flex items-center justify-between">
            <div>
              <SectionTitle title="Portfolio performance" />
              <p className="text-xs text-muted-foreground -mt-2">Planned vs actual revenue and project cost (QAR M)</p>
            </div>
            <div className="flex rounded-lg border border-border p-0.5 text-[11px]">
              {(["6M", "12M", "YTD"] as const).map((r) => (
                <button key={r} onClick={() => setRange(r)} className={cn("px-2.5 py-1 rounded-md", range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>{r}</button>
              ))}
            </div>
          </div>
          <div className="h-72 mt-3">
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F80FF" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#2F80FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pln" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#675CFF" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#675CFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="planned" stroke="#675CFF" strokeWidth={2} fill="url(#pln)" name="Planned" />
                <Area type="monotone" dataKey="actual" stroke="#2F80FF" strokeWidth={2.5} fill="url(#rev)" name="Actual" />
                <Line type="monotone" dataKey="cost" stroke="#FFB547" strokeWidth={2} dot={false} name="Cost" />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Project health" />
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={projectHealth} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={3} stroke="none">
                  {projectHealth.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 mt-2">
            {projectHealth.map((h) => (
              <div key={h.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: h.color }} />{h.name}</div>
                <span className="tabular font-medium">{h.value}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-8 p-5">
          <div className="flex items-center justify-between mb-2">
            <SectionTitle title="Active projects" />
            <Link to="/projects" className="text-xs text-primary hover:underline inline-flex items-center gap-1">View all <ChevronRight className="h-3 w-3" /></Link>
          </div>
          <div className="space-y-2">
            {activeProjects.map((p) => (
              <Link key={p.id} to={`/projects/${p.id}`} className="grid grid-cols-12 items-center gap-3 rounded-xl border border-border/60 p-3 hover:bg-accent/40 transition">
                <div className="col-span-12 sm:col-span-5 min-w-0">
                  <div className="text-sm font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.code} · {p.client} · {p.location}</div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div className="text-[10px] text-muted-foreground mb-1">Progress · {p.progress}%</div>
                  <ProgressBar value={p.progress} tone={p.health === "Delayed" ? "critical" : p.health === "At risk" ? "warning" : "primary"} />
                </div>
                <div className="col-span-3 sm:col-span-2 text-xs tabular"><span className="text-muted-foreground">Budget </span>{p.budgetUsed}%</div>
                <div className="col-span-3 sm:col-span-2 flex justify-end"><StatusBadge status={p.health} /></div>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Cash flow snapshot" />
          <div className="space-y-3 mt-2">
            {cashSnapshot.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{c.label}</span><span className="tabular font-medium">QAR {c.value.toFixed(1)}M</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500" style={{ width: `${(c.value / 45) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Workforce allocation" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={workforceByDept} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="dept" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={100} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="capacity" fill="var(--color-muted)" radius={[0, 6, 6, 0]} />
                <Bar dataKey="allocated" fill="#2F80FF" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Priority approvals" action={<Link to="/approvals" className="text-xs text-primary hover:underline">Open queue</Link>} />
          <div className="space-y-2">
            {approvals.slice(0, 4).map((a) => (
              <div key={a.id} className="rounded-xl border border-border/60 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{a.type}</div>
                    <div className="text-sm font-semibold truncate">{a.title}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{a.project} · {a.requestedBy}{a.amount ? ` · ${fmtQARFull(a.amount)}` : ""}</div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
                {a.status === "Pending" && (
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => { actOnApproval(a.id, "Approved"); toast.success(`${a.type} approved`); }} className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25">Approve</button>
                    <button onClick={() => { actOnApproval(a.id, "Rejected"); toast.error(`${a.type} rejected`); }} className="text-xs px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400 hover:bg-rose-500/25">Reject</button>
                    <button onClick={() => toast.info("Opened for review")} className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-accent">Review</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-6 xl:col-span-4 p-5">
          <SectionTitle title="Upcoming milestones" />
          <ol className="relative border-l border-border pl-4 space-y-4">
            {[
              { d: "18 Jul", t: "HVAC first fix inspection", p: "MAK-2411" },
              { d: "22 Jul", t: "MV switchgear delivery", p: "MAK-2409" },
              { d: "25 Jul", t: "Cable tray routing sign-off", p: "MAK-2402" },
              { d: "28 Jul", t: "Transformer pad handover", p: "MAK-2419" },
              { d: "30 Jul", t: "Foundation pour Block C", p: "MAK-2420" },
            ].map((m, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[19px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.d}</div>
                <div className="text-sm font-medium">{m.t}</div>
                <div className="text-xs text-muted-foreground">{m.p}</div>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel className="col-span-12 lg:col-span-6 xl:col-span-4 p-5">
          <SectionTitle title="Alerts & risks" />
          <div className="space-y-2">
            {notifications.filter((n) => n.severity !== "success" && n.severity !== "info").slice(0, 5).map((n) => (
              <div key={n.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-accent/40 cursor-pointer">
                <span className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0", n.severity === "critical" ? "bg-rose-500" : "bg-amber-500")} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground truncate">{n.detail}</div>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Project locations" />
          <div className="relative h-56 rounded-xl grid-bg border border-border overflow-hidden">
            <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full">
              <path d="M60 60 C 100 40, 160 40, 200 80 C 240 120, 300 120, 340 80 L 360 140 C 320 180, 240 200, 160 180 C 100 170, 60 130, 40 100 Z" fill="url(#qm)" stroke="var(--color-border)" />
              <defs>
                <linearGradient id="qm" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#2F80FF" stopOpacity="0.08" /><stop offset="1" stopColor="#675CFF" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              {projectDistribution.map((p, i) => {
                const x = [140, 180, 110, 240, 300][i] ?? 200;
                const y = [110, 90, 130, 150, 60][i] ?? 100;
                const r = 6 + p.count * 1.5;
                return (
                  <g key={p.city}>
                    <circle cx={x} cy={y} r={r} fill="#2F80FF" fillOpacity="0.25" />
                    <circle cx={x} cy={y} r="3" fill="#2F80FF" />
                    <text x={x + r + 4} y={y + 4} fontSize="10" fill="currentColor" className="text-foreground">{p.city} · {p.count}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Recent activity" />
          <div className="space-y-3">
            {[
              { u: "Ahmed Al-Suwaidi", a: "approved IPC 05 for Lycee Bonaparte", t: "20 min ago" },
              { u: "Sami Rachid", a: "submitted RFI-045 for QDC Electrical", t: "1 h ago" },
              { u: "Rania Fahed", a: "issued INV-2026-052 to Korean Embassy", t: "3 h ago" },
              { u: "Youssef Rahim", a: "raised HSE observation on Lusail site", t: "5 h ago" },
              { u: "Layla Kassem", a: "won opportunity Villa Compound — MEP", t: "yesterday" },
            ].map((x, i) => (
              <div key={i} className="flex items-start gap-3">
                <Avatar name={x.u} />
                <div className="min-w-0 flex-1">
                  <div className="text-sm"><span className="font-medium">{x.u}</span> <span className="text-muted-foreground">{x.a}</span></div>
                  <div className="text-[11px] text-muted-foreground">{x.t}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {quick && (
        <QuickModal title={quick} onClose={() => setQuick(null)}>
          <div className="grid grid-cols-2 gap-3">
            {["New project", "New lead", "New employee", "New purchase request", "New work order", "Upload document"].map((x) => (
              <button key={x} onClick={() => { toast.success(`${x} created (demo)`); setQuick(null); }} className="rounded-lg border border-border p-3 text-sm hover:bg-accent text-left">
                <div className="flex items-center gap-2"><HardHat className="h-4 w-4 text-primary" />{x}</div>
                <div className="text-[11px] text-muted-foreground mt-1">Creates a mock record in this session.</div>
              </button>
            ))}
          </div>
        </QuickModal>
      )}
    </div>
  );
}
