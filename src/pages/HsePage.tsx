import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Panel, KpiCard, StatusBadge, SectionTitle } from "@/components/shared/Primitives";
import { observations, safetyTrend, projects } from "@/data/mock";
import { fmtDate } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const RISK = [
  { p: "MAK-2411", PPE: 1, "Height": 0, "Electrical": 0, "Hot work": 1, "Housekeeping": 2 },
  { p: "MAK-2409", PPE: 0, "Height": 1, "Electrical": 2, "Hot work": 0, "Housekeeping": 1 },
  { p: "MAK-2418", PPE: 0, "Height": 0, "Electrical": 0, "Hot work": 0, "Housekeeping": 1 },
  { p: "MAK-2402", PPE: 1, "Height": 1, "Electrical": 1, "Hot work": 2, "Housekeeping": 0 },
  { p: "MAK-2420", PPE: 2, "Height": 3, "Electrical": 0, "Hot work": 1, "Housekeeping": 1 },
  { p: "MAK-2419", PPE: 0, "Height": 1, "Electrical": 1, "Hot work": 2, "Housekeeping": 0 },
];
const CATS = ["PPE", "Height", "Electrical", "Hot work", "Housekeeping"];
const heat = (v: number) => v >= 3 ? "bg-rose-500/70" : v === 2 ? "bg-amber-500/60" : v === 1 ? "bg-primary/40" : "bg-muted/60";

export default function HsePage() {
  return (
    <div>
      <PageHeader title="HSE & Quality" subtitle="Safety observations, quality inspections and corrective actions."
        actions={<>
          <button onClick={() => toast.success("Observation reported")} className="h-9 rounded-lg border border-border px-3 text-sm hover:bg-accent">Report observation</button>
          <button onClick={() => toast.info("Inspection scheduled")} className="h-9 rounded-lg bg-primary text-primary-foreground px-3 text-sm">Schedule inspection</button>
        </>} />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Safe working days" value="214" trend="Best run" trendDir="up" />
        <KpiCard label="Open observations" value={String(observations.filter((o) => o.status !== "Closed").length)} trend="Action needed" trendDir="down" />
        <KpiCard label="Inspections (30d)" value="42" trend="+6 MoM" trendDir="up" />
        <KpiCard label="Open NCRs" value="3" trend="-2 MoM" trendDir="up" />
        <KpiCard label="Toolbox talks" value="87" trend="+12 MoM" trendDir="up" />
        <KpiCard label="Training compliance" value="96%" trend="+2%" trendDir="up" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 xl:col-span-8 p-5">
          <SectionTitle title="Safety trend (12 months)" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={safetyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="nearMiss" stackId="a" fill="#FFB547" name="Near miss" radius={[0,0,0,0]} />
                <Bar dataKey="firstAid" stackId="a" fill="#FF5C70" name="First aid" radius={[0,0,0,0]} />
                <Bar dataKey="unsafe" stackId="a" fill="#675CFF" name="Unsafe obs." radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Inspection score" />
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={safetyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} domain={[70, 100]} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Line dataKey="score" stroke="#1FC79A" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-8 overflow-hidden">
          <div className="p-4 border-b border-border"><SectionTitle title="HSE observations" /></div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground bg-muted/40"><tr>{["ID", "Project", "Category", "Severity", "Owner", "Due", "Status"].map((h) => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>{observations.map((o) => (
              <tr key={o.id} className="border-t border-border/60"><td className="px-4 py-3 font-medium">{o.id.toUpperCase()}</td><td>{o.project}</td><td>{o.category}</td><td><StatusBadge status={o.severity} /></td><td>{o.owner}</td><td>{fmtDate(o.due)}</td><td><StatusBadge status={o.status} /></td></tr>
            ))}</tbody>
          </table>
        </Panel>

        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Risk heatmap" />
          <div className="text-[10px] text-muted-foreground grid gap-1" style={{ gridTemplateColumns: "60px repeat(5,1fr)" }}>
            <div></div>{CATS.map((c) => <div key={c} className="text-center">{c}</div>)}
            {RISK.map((r) => (
              <>
                <div key={r.p} className="text-[10px] font-medium py-1">{r.p}</div>
                {CATS.map((c) => <div key={r.p + c} className={cn("h-8 rounded", heat((r as any)[c]))} title={`${(r as any)[c]}`} />)}
              </>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
