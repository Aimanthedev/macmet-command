import { useMemo, useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, ProgressBar, SectionTitle } from "@/components/shared/Primitives";
import { useApp } from "@/context/AppContext";
import { fmtDate, fmtQARFull } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TABS = ["My tasks", "Awaiting my approval", "Submitted by me", "Completed"] as const;

export default function ApprovalsPage() {
  const { tasks, updateTask, approvals, actOnApproval } = useApp();
  const [tab, setTab] = useState<typeof TABS[number]>("My tasks");
  const [comment, setComment] = useState("");
  const [target, setTarget] = useState<string | null>(null);

  const kpi = {
    dueToday: tasks.filter((t) => t.due <= "2026-07-08" && t.status !== "Completed").length,
    overdue: tasks.filter((t) => t.due < "2026-07-07" && t.status !== "Completed").length,
    pending: approvals.filter((a) => a.status === "Pending").length,
    done: tasks.filter((t) => t.status === "Completed").length + 8,
  };

  const filtered = useMemo(() => {
    if (tab === "Awaiting my approval") return { type: "approvals" as const, items: approvals.filter((a) => a.status === "Pending") };
    if (tab === "Submitted by me") return { type: "approvals" as const, items: approvals.filter((a) => a.status !== "Pending") };
    if (tab === "Completed") return { type: "tasks" as const, items: tasks.filter((t) => t.status === "Completed") };
    return { type: "tasks" as const, items: tasks.filter((t) => t.status !== "Completed") };
  }, [tab, tasks, approvals]);

  return (
    <div>
      <PageHeader title="Tasks & Approvals" subtitle="Personal work queue — tasks assigned to you and items awaiting your approval." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Due today" value={String(kpi.dueToday)} trend="Focus" trendDir="down" />
        <KpiCard label="Overdue" value={String(kpi.overdue)} trend="Escalate" trendDir="down" />
        <KpiCard label="Awaiting approval" value={String(kpi.pending)} trend="Action needed" trendDir="up" />
        <KpiCard label="Completed this week" value={String(kpi.done)} trend="On plan" trendDir="up" />
      </div>

      <div className="border-b border-border mb-4 flex gap-1 overflow-x-auto">
        {TABS.map((t) => <button key={t} onClick={() => setTab(t)} className={cn("px-3 py-2 text-sm border-b-2 -mb-px whitespace-nowrap", tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground")}>{t}</button>)}
      </div>

      {filtered.type === "tasks" ? (
        <div className="space-y-2">
          {filtered.items.map((t: any) => (
            <Panel key={t.id} className="p-4">
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2"><StatusBadge status={t.priority} /><span className="text-xs text-muted-foreground">{t.category} · {t.project}</span></div>
                  <div className="text-sm font-semibold mt-1">{t.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Assignee: {t.assignee} · Due {fmtDate(t.due)}</div>
                </div>
                <div className="w-40"><div className="text-[10px] text-muted-foreground mb-1">{t.progress}%</div><ProgressBar value={t.progress} /></div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={t.status} />
                  {t.status !== "Completed" && <button onClick={() => { updateTask(t.id, { status: "Completed", progress: 100 }); toast.success("Task completed"); }} className="text-xs px-2.5 py-1 rounded-md bg-primary text-primary-foreground">Complete</button>}
                </div>
              </div>
            </Panel>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.items.map((a: any) => (
            <Panel key={a.id} className="p-4">
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-center gap-2"><span className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.type}</span><StatusBadge status={a.priority} /></div>
                  <div className="text-sm font-semibold mt-1">{a.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.project} · Requested by {a.requestedBy}{a.amount ? ` · ${fmtQARFull(a.amount)}` : ""}</div>
                </div>
                <StatusBadge status={a.status} />
                {a.status === "Pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => { actOnApproval(a.id, "Approved"); toast.success("Approved"); }} className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400">Approve</button>
                    <button onClick={() => { actOnApproval(a.id, "Rejected"); toast.error("Rejected"); }} className="text-xs px-2.5 py-1 rounded-md bg-rose-500/15 text-rose-400">Reject</button>
                    <button onClick={() => setTarget(a.id)} className="text-xs px-2.5 py-1 rounded-md bg-muted hover:bg-accent">Comment</button>
                  </div>
                )}
              </div>
            </Panel>
          ))}
        </div>
      )}

      {target && (
        <div className="fixed inset-0 z-50 grid place-items-center px-4" onClick={() => setTarget(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-popover p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display font-bold mb-3">Request changes</h3>
            <textarea rows={4} value={comment} onChange={(e) => setComment(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" placeholder="Describe the changes needed…" />
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => setTarget(null)} className="h-9 px-3 rounded-lg border border-border text-sm">Cancel</button>
              <button onClick={() => { toast.info("Changes requested"); setTarget(null); setComment(""); }} className="h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
