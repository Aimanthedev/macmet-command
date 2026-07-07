import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, FolderKanban, CheckSquare, Briefcase, Landmark, ShoppingCart,
  Users, Truck, Wrench, ShieldCheck, FileText, BarChart3, Settings, ChevronsLeft, ChevronsRight,
  Radio,
} from "lucide-react";
import { useApp, useT } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/shared/Primitives";

const nav = [
  { group: "Command", items: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/projects", label: "Projects", icon: FolderKanban },
    { to: "/approvals", label: "Tasks & Approvals", icon: CheckSquare },
  ] },
  { group: "Commercial", items: [
    { to: "/sales", label: "Sales & CRM", icon: Briefcase },
    { to: "/finance", label: "Finance", icon: Landmark },
    { to: "/procurement", label: "Procurement", icon: ShoppingCart },
  ] },
  { group: "Operations", items: [
    { to: "/employees", label: "Employees", icon: Users },
    { to: "/assets", label: "Assets & Fleet", icon: Truck },
    { to: "/maintenance", label: "Maintenance", icon: Wrench },
    { to: "/hse", label: "HSE & Quality", icon: ShieldCheck },
  ] },
  { group: "Intelligence", items: [
    { to: "/documents", label: "Documents", icon: FileText },
    { to: "/reports", label: "Reports", icon: BarChart3 },
  ] },
  { group: "System", items: [
    { to: "/settings", label: "Settings", icon: Settings },
  ] },
];

export function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const { sidebarCollapsed, toggleSidebarCollapsed, setSidebarOpen, role } = useApp();
  const t = useT();
  const collapsed = !mobile && sidebarCollapsed;

  return (
    <aside className={cn(
      "flex flex-col h-full border-r border-border bg-sidebar text-sidebar-foreground",
      mobile ? "w-72" : collapsed ? "w-[78px]" : "w-[264px]",
      "transition-[width] duration-300 ease-out",
    )}>
      <div className={cn("flex items-center gap-3 px-4 py-4 border-b border-border", collapsed && "justify-center px-2")}>
        <BrandMark size={36} />
        {!collapsed && (
          <div className="min-w-0">
            <div className="font-display text-sm font-bold leading-tight">MACMET AL-KHALEEJ</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">MAK · Command Center</div>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mx-3 mt-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-[11px] flex items-center gap-2">
          <Radio className="h-3 w-3 text-emerald-400 animate-pulse" />
          <span className="text-muted-foreground">Demo environment · Fictional data</span>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {nav.map((g) => (
          <div key={g.group}>
            {!collapsed && <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t(g.group)}</div>}
            <ul className="space-y-0.5">
              {g.items.map((it) => (
                <li key={it.to}>
                  <NavLink
                    to={it.to}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => cn(
                      "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground",
                      collapsed && "justify-center px-2",
                    )}
                    title={collapsed ? t(it.label) : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-primary" />}
                        <it.icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                        {!collapsed && <span className="truncate">{t(it.label)}</span>}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={cn("border-t border-border p-3", collapsed && "px-2")}>
        {!collapsed ? (
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent transition">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-white text-xs font-bold">MK</div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">Mohammed Al-Khaleej</div>
              <div className="text-[11px] text-muted-foreground truncate">{role}</div>
            </div>
          </div>
        ) : (
          <div className="grid h-9 w-9 mx-auto place-items-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-white text-xs font-bold">MK</div>
        )}

        {!mobile && (
          <button
            onClick={toggleSidebarCollapsed}
            className={cn(
              "mt-2 w-full flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition",
            )}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <><ChevronsLeft className="h-4 w-4" /> Collapse</>}
          </button>
        )}
      </div>
    </aside>
  );
}
