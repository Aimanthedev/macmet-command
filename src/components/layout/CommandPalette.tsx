import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command as CmdIcon, FileText, FolderKanban, ShoppingCart, User, Wrench, X, Building2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { employees, clients, docs, purchaseOrders, workOrders } from "@/data/mock";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const { commandOpen, setCommandOpen, projects } = useApp();
  const [q, setQ] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCommandOpen(true); }
      if (e.key === "Escape") setCommandOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setCommandOpen]);

  useEffect(() => { if (!commandOpen) setQ(""); }, [commandOpen]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    const filter = <T,>(arr: T[], fn: (x: T) => string) => (s ? arr.filter((x) => fn(x).toLowerCase().includes(s)) : arr).slice(0, 5);
    return [
      { group: "Projects", icon: FolderKanban, items: filter(projects, (p) => `${p.code} ${p.name} ${p.client}`).map((p) => ({ id: p.id, label: p.name, sub: `${p.code} · ${p.client}`, to: `/projects/${p.id}` })) },
      { group: "Employees", icon: User, items: filter(employees, (e) => `${e.name} ${e.role} ${e.department}`).map((e) => ({ id: e.id, label: e.name, sub: `${e.role} · ${e.department}`, to: `/employees` })) },
      { group: "Clients", icon: Building2, items: filter(clients, (c) => `${c.name} ${c.sector}`).map((c) => ({ id: c.id, label: c.name, sub: c.sector, to: `/sales` })) },
      { group: "Documents", icon: FileText, items: filter(docs, (d) => `${d.number} ${d.name}`).map((d) => ({ id: d.id, label: d.name, sub: `${d.number} · ${d.category}`, to: `/documents` })) },
      { group: "Purchase orders", icon: ShoppingCart, items: filter(purchaseOrders, (p) => `${p.number} ${p.supplier}`).map((p) => ({ id: p.id, label: p.number, sub: `${p.supplier} · ${p.project}`, to: `/procurement` })) },
      { group: "Work orders", icon: Wrench, items: filter(workOrders, (w) => `${w.number} ${w.client} ${w.category}`).map((w) => ({ id: w.id, label: w.number, sub: `${w.client} · ${w.category}`, to: `/maintenance` })) },
    ].filter((g) => g.items.length > 0);
  }, [q, projects]);

  if (!commandOpen) return null;

  const go = (to: string) => { setCommandOpen(false); nav(to); };

  return (
    <div className="fixed inset-0 z-50 grid place-items-start pt-[10vh] px-4" onClick={() => setCommandOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={cn("relative w-full max-w-2xl rounded-2xl border border-border bg-popover shadow-2xl overflow-hidden")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <CmdIcon className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, employees, documents, POs, work orders…"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
          <button onClick={() => setCommandOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">No results for “{q}”.</div>
          )}
          {results.map((g) => (
            <div key={g.group} className="py-1">
              <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">{g.group}</div>
              {g.items.map((it) => (
                <button
                  key={it.id}
                  onClick={() => go(it.to)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-accent transition"
                >
                  <div className="grid h-8 w-8 place-items-center rounded-md bg-muted"><g.icon className="h-4 w-4 text-muted-foreground" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{it.label}</div>
                    <div className="text-xs text-muted-foreground truncate">{it.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>⏎ open · esc close · ⌘K toggle</span>
          <span>Global search · demo dataset</span>
        </div>
      </div>
    </div>
  );
}
