import { Bell, Command, Globe, Menu, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/shared/Primitives";

const routeMap: Record<string, string> = {
  "/dashboard": "Overview", "/projects": "Projects", "/approvals": "Tasks & Approvals",
  "/sales": "Sales & CRM", "/finance": "Finance", "/procurement": "Procurement",
  "/employees": "Employees", "/assets": "Assets & Fleet", "/maintenance": "Maintenance",
  "/hse": "HSE & Quality", "/documents": "Documents", "/reports": "Reports", "/settings": "Settings",
};

function useQatarClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 30_000); return () => clearInterval(i); }, []);
  const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Qatar", hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB", { timeZone: "Asia/Qatar", weekday: "short", day: "2-digit", month: "short" });
  return `${date} · ${time} Doha`;
}

export function Topbar() {
  const { theme, toggleTheme, lang, setLang, setSidebarOpen, setCommandOpen, setNotificationsOpen, notifications } = useApp();
  const { pathname } = useLocation();
  const nav = useNavigate();
  const clock = useQatarClock();
  const unread = notifications.filter((n) => !n.read).length;
  const label = Object.entries(routeMap).find(([p]) => pathname.startsWith(p))?.[1] ?? "Macmet";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="h-full px-4 sm:px-6 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <nav className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground min-w-0">
          <button onClick={() => nav("/dashboard")} className="hover:text-foreground truncate">Macmet</button>
          <span className="opacity-40">/</span>
          <span className="text-foreground font-medium truncate">{label}</span>
        </nav>

        <div className="flex-1" />

        <button
          onClick={() => setCommandOpen(true)}
          className="hidden md:flex items-center gap-2 w-[320px] lg:w-[400px] rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left truncate">Search projects, employees, documents…</span>
          <kbd className="hidden lg:inline text-[10px] rounded border border-border px-1.5 py-0.5 bg-background">⌘K</kbd>
        </button>

        <button
          onClick={() => setCommandOpen(true)}
          aria-label="Search"
          className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent"
        ><Search className="h-4 w-4" /></button>

        <div className="hidden lg:flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-muted/30 text-xs tabular text-muted-foreground">
          {clock}
        </div>

        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent"
          aria-label="Toggle language"
          title={lang === "en" ? "العربية" : "English"}
        >
          <span className="text-xs font-semibold">{lang === "en" ? "AR" : "EN"}</span>
        </button>

        <button
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-[10px] font-bold text-white grid place-items-center">
              {unread}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
          <Avatar name="Mohammed Al-Khaleej" size={32} />
          <div className="hidden xl:block leading-tight">
            <div className="text-xs font-semibold">Mohammed Al-Khaleej</div>
            <div className="text-[10px] text-muted-foreground">Managing Director</div>
          </div>
        </div>
      </div>
    </header>
  );
}
