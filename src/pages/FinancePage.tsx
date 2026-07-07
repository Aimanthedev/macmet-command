import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, Panel, KpiCard, StatusBadge, SectionTitle } from "@/components/shared/Primitives";
import { expenseBreakdown, invoices, projects, receivablesAging, revenueSeries } from "@/data/mock";
import { fmtQAR, fmtQARFull, fmtDate, toCSV } from "@/lib/format";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Invoice } from "@/types";

const COLORS = ["#2F80FF", "#675CFF", "#23C9D6", "#1FC79A", "#FFB547", "#FF5C70", "#9A6CFF"];

export default function FinancePage() {
  const [list, setList] = useState<Invoice[]>(invoices);
  const [detail, setDetail] = useState<Invoice | null>(null);
  const totalReceivable = list.reduce((s, i) => s + (i.amount - i.paid), 0);
  const revenueMonth = 6420000;

  const setStatus = (id: string, patch: Partial<Invoice>) => setList((prev) => prev.map((i) => i.id === id ? { ...i, ...patch } : i));

  return (
    <div>
      <PageHeader title="Finance" subtitle="Executive view of revenue, receivables and project profitability."
        actions={<button onClick={() => toCSV(list as any, "invoices.csv")} className="h-9 inline-flex items-center gap-2 rounded-lg border border-border px-3 text-sm"><Download className="h-4 w-4" /> Export invoices</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Revenue this month" value={fmtQAR(revenueMonth)} trend="+12.6%" trendDir="up" />
        <KpiCard label="Expenses this month" value="QAR 4.72M" trend="+9.1%" trendDir="down" />
        <KpiCard label="Gross margin" value="26.5%" trend="+1.8 pts" trendDir="up" />
        <KpiCard label="Receivables" value={fmtQAR(totalReceivable)} trend="4 overdue" trendDir="down" />
        <KpiCard label="Payables" value="QAR 8.9M" trend="Within terms" trendDir="flat" />
        <KpiCard label="Cash position" value="QAR 18.4M" trend="+3.2%" trendDir="up" />
      </div>

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 xl:col-span-8 p-5">
          <SectionTitle title="Revenue vs expense" />
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={revenueSeries.slice(0, 7)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="m" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="actual" fill="#2F80FF" name="Revenue" radius={[6, 6, 0, 0]} />
                <Bar dataKey="cost" fill="#FFB547" name="Cost" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel className="col-span-12 xl:col-span-4 p-5">
          <SectionTitle title="Expense breakdown" />
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={expenseBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2} stroke="none">
                  {expenseBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] mt-2">
            {expenseBreakdown.map((e, i) => (
              <div key={e.name} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />{e.name} <span className="ml-auto tabular font-medium">{e.value}%</span></div>
            ))}
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Receivables aging" />
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={receivablesAging}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="bucket" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {receivablesAging.map((_, i) => <Cell key={i} fill={i > 2 ? "#FF5C70" : i > 0 ? "#FFB547" : "#1FC79A"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Project profitability" />
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {projects.slice(0, 6).map((p) => {
              const margin = ((p.certified - p.costToDate) / Math.max(p.certified, 1)) * 100;
              return (
                <div key={p.id} className="grid grid-cols-12 items-center gap-2 text-xs">
                  <div className="col-span-5 truncate">{p.name}</div>
                  <div className="col-span-3 tabular text-muted-foreground">{fmtQAR(p.contractValue)}</div>
                  <div className="col-span-2 tabular">{fmtQAR(p.certified - p.costToDate)}</div>
                  <div className={`col-span-2 tabular text-right font-semibold ${margin > 15 ? "text-emerald-400" : margin > 0 ? "text-amber-400" : "text-rose-400"}`}>{margin.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6 overflow-hidden">
        <div className="p-4 border-b border-border"><SectionTitle title="Invoice tracker" /></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground bg-muted/40"><tr>{["Invoice", "Client", "Project", "Amount", "Paid", "Balance", "Due", "Status"].map((h) => <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>)}</tr></thead>
            <tbody>{list.map((i) => (
              <tr key={i.id} onClick={() => setDetail(i)} className="border-t border-border/60 cursor-pointer hover:bg-accent/30">
                <td className="px-4 py-3 font-medium">{i.number}</td><td>{i.client}</td><td>{i.project}</td>
                <td className="tabular">{fmtQARFull(i.amount)}</td><td className="tabular">{fmtQARFull(i.paid)}</td>
                <td className="tabular">{fmtQARFull(i.amount - i.paid)}</td><td>{fmtDate(i.due)}</td><td><StatusBadge status={i.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </Panel>

      {detail && (
        <div className="fixed inset-0 z-50 grid place-items-end sm:place-items-center px-0 sm:px-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative w-full max-w-md bg-popover border border-border rounded-t-2xl sm:rounded-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3"><div className="text-xs text-muted-foreground">Invoice</div><div className="font-display font-bold text-lg">{detail.number}</div></div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Client</div><div>{detail.client}</div></div>
              <div><div className="text-xs text-muted-foreground">Project</div><div>{detail.project}</div></div>
              <div><div className="text-xs text-muted-foreground">Amount</div><div className="tabular">{fmtQARFull(detail.amount)}</div></div>
              <div><div className="text-xs text-muted-foreground">Due</div><div>{fmtDate(detail.due)}</div></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => { setStatus(detail.id, { status: "Submitted" }); toast.success("Marked as submitted"); setDetail(null); }} className="text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-accent">Mark submitted</button>
              <button onClick={() => { setStatus(detail.id, { status: "Partially paid", paid: Math.round(detail.amount / 2) }); toast.success("Partial payment"); setDetail(null); }} className="text-xs px-3 py-1.5 rounded-md bg-amber-500/15 text-amber-400">Partial payment</button>
              <button onClick={() => { setStatus(detail.id, { status: "Paid", paid: detail.amount }); toast.success("Marked paid"); setDetail(null); }} className="text-xs px-3 py-1.5 rounded-md bg-emerald-500/15 text-emerald-400">Mark paid</button>
              <button onClick={() => toast.info("Reminder sent (demo)")} className="text-xs px-3 py-1.5 rounded-md bg-muted hover:bg-accent">Send reminder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
