import { useState } from "react";
import { PageHeader, Panel, KpiCard, StatusBadge, ProgressBar, SectionTitle } from "@/components/shared/Primitives";
import { purchaseOrders, purchaseRequests, suppliers } from "@/data/mock";
import { fmtQAR, fmtDate } from "@/lib/format";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const STAGES = ["Request", "Review", "RFQ", "Comparison", "Approval", "Purchase Order", "Delivery"];

export default function ProcurementPage() {
  const [prs, setPrs] = useState(purchaseRequests);
  return (
    <div>
      <PageHeader title="Procurement" subtitle="Requests, purchase orders, suppliers and material deliveries."
        actions={<button onClick={() => toast.success("Purchase request drafted")} className="h-9 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-3 text-sm"><Plus className="h-4 w-4" /> New request</button>} />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        <KpiCard label="Open PRs" value={String(prs.length)} trend="+2 today" trendDir="up" />
        <KpiCard label="POs this month" value={String(purchaseOrders.length + 5)} trend="+3 WoW" trendDir="up" />
        <KpiCard label="Pending approvals" value="4" trend="Action needed" trendDir="down" />
        <KpiCard label="In-transit value" value="QAR 4.2M" trend="On plan" trendDir="up" />
        <KpiCard label="Delayed deliveries" value="2" trend="1 critical" trendDir="down" />
        <KpiCard label="Avg lead time" value="18 d" trend="-2d MoM" trendDir="up" />
      </div>

      <Panel className="p-5 mb-4">
        <SectionTitle title="Procurement workflow" />
        <div className="flex items-center gap-2 overflow-x-auto">
          {STAGES.map((s, i) => (
            <div key={s} className="flex items-center gap-2 shrink-0">
              <div className="rounded-lg border border-border px-3 py-2 bg-muted/40 text-xs font-medium">{s}</div>
              {i < STAGES.length - 1 && <div className="h-px w-6 bg-border" />}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 xl:col-span-6 overflow-hidden">
          <div className="p-4 border-b border-border"><SectionTitle title="Purchase requests" /></div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground bg-muted/40"><tr>{["PR", "Project", "Category", "Value", "Priority", "Status"].map((h) => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody>{prs.map((r) => (
              <tr key={r.id} className="border-t border-border/60"><td className="px-3 py-2 font-medium">{r.number}</td><td>{r.project}</td><td className="truncate max-w-[160px]">{r.category}</td><td className="tabular">{fmtQAR(r.value)}</td><td><StatusBadge status={r.priority} /></td><td><StatusBadge status={r.status} /></td></tr>
            ))}</tbody>
          </table>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 overflow-hidden">
          <div className="p-4 border-b border-border"><SectionTitle title="Purchase orders" /></div>
          <table className="w-full text-sm">
            <thead className="text-xs text-muted-foreground bg-muted/40"><tr>{["PO", "Supplier", "Value", "Delivery", "Status"].map((h) => <th key={h} className="text-left px-3 py-2 font-medium">{h}</th>)}</tr></thead>
            <tbody>{purchaseOrders.map((po) => (
              <tr key={po.id} className="border-t border-border/60"><td className="px-3 py-2 font-medium">{po.number}</td><td className="truncate max-w-[140px]">{po.supplier}</td><td className="tabular">{fmtQAR(po.value)}</td><td className="w-28"><ProgressBar value={po.deliveryProgress} /></td><td><StatusBadge status={po.status} /></td></tr>
            ))}</tbody>
          </table>
        </Panel>

        <Panel className="col-span-12 p-5">
          <SectionTitle title="Supplier directory" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground"><tr>{["Supplier", "Categories", "Contact", "Rating", "On time", "Open POs", "Spend", "Status"].map((h) => <th key={h} className="text-left py-2 font-medium">{h}</th>)}</tr></thead>
              <tbody>{suppliers.map((s) => (
                <tr key={s.id} className="border-t border-border/60">
                  <td className="py-2 font-medium">{s.name}</td>
                  <td>{s.categories.join(", ")}</td>
                  <td>{s.contact}</td>
                  <td className="tabular">⭐ {s.rating}</td>
                  <td className="tabular">{s.onTime}%</td>
                  <td className="tabular">{s.openOrders}</td>
                  <td className="tabular">{fmtQAR(s.spend)}</td>
                  <td><StatusBadge status={s.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Panel>

        <Panel className="col-span-12 p-5">
          <SectionTitle title="Material delivery tracker" />
          <div className="grid grid-cols-5 gap-2 text-xs">
            {["Ordered", "Dispatched", "Customs", "Delivered", "Inspected"].map((s, i) => (
              <div key={s} className="rounded-lg border border-border p-3 text-center">
                <div className="font-medium">{s}</div>
                <div className="text-2xl font-display font-bold tabular mt-1">{[24, 18, 6, 12, 9][i]}</div>
                <div className="text-[10px] text-muted-foreground">this week</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
