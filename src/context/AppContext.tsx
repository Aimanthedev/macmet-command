import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { notifications as initialNotifications, projects as initialProjects, tasks as initialTasks, approvals as initialApprovals } from "@/data/mock";
import type { Notification, Project, Task, Approval } from "@/types";

type Lang = "en" | "ar";
type Role = "Managing Director" | "Operations Manager" | "Finance Manager" | "HR & Administration" | "Sales Manager" | "Project Manager" | "HSE Manager" | "Employee";
type Density = "comfortable" | "compact";

interface AppState {
  theme: "dark" | "light";
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  sidebarCollapsed: boolean;
  toggleSidebarCollapsed: () => void;
  role: Role;
  setRole: (r: Role) => void;
  density: Density;
  setDensity: (d: Density) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  accent: string;
  setAccent: (v: string) => void;

  notifications: Notification[];
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearNotification: (id: string) => void;

  projects: Project[];
  addProject: (p: Project) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;

  tasks: Task[];
  updateTask: (id: string, patch: Partial<Task>) => void;

  approvals: Approval[];
  actOnApproval: (id: string, status: "Approved" | "Rejected") => void;

  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

const readLS = <T,>(k: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch { return fallback; }
};
const writeLS = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } };

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"dark" | "light">(() => readLS("mak_theme", "dark" as const));
  const [lang, setLangS] = useState<Lang>(() => readLS("mak_lang", "en" as Lang));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => readLS("mak_sb_collapsed", false));
  const [role, setRoleS] = useState<Role>(() => readLS("mak_role", "Managing Director" as Role));
  const [density, setDensityS] = useState<Density>(() => readLS("mak_density", "comfortable" as Density));
  const [reducedMotion, setReducedMotionS] = useState<boolean>(() => readLS("mak_reduced_motion", false));
  const [accent, setAccentS] = useState<string>(() => readLS("mak_accent", "#2F80FF"));

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const readState = readLS<Record<string, boolean>>("mak_notif_read", {});
    return initialNotifications.map((n) => ({ ...n, read: readState[n.id] ?? n.read }));
  });
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [approvals, setApprovals] = useState<Approval[]>(initialApprovals);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    writeLS("mak_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    writeLS("mak_lang", lang);
  }, [lang]);

  useEffect(() => { writeLS("mak_sb_collapsed", sidebarCollapsed); }, [sidebarCollapsed]);
  useEffect(() => { writeLS("mak_role", role); }, [role]);
  useEffect(() => { writeLS("mak_density", density); }, [density]);
  useEffect(() => { writeLS("mak_reduced_motion", reducedMotion); }, [reducedMotion]);
  useEffect(() => { writeLS("mak_accent", accent); }, [accent]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  const setLang = useCallback((l: Lang) => setLangS(l), []);
  const toggleSidebarCollapsed = useCallback(() => setSidebarCollapsed((v) => !v), []);
  const setRole = useCallback((r: Role) => setRoleS(r), []);
  const setDensity = useCallback((d: Density) => setDensityS(d), []);
  const setReducedMotion = useCallback((v: boolean) => setReducedMotionS(v), []);
  const setAccent = useCallback((v: string) => setAccentS(v), []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      writeLS("mak_notif_read", Object.fromEntries(next.map((n) => [n.id, n.read])));
      return next;
    });
  }, []);
  const markAllRead = useCallback(() => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      writeLS("mak_notif_read", Object.fromEntries(next.map((n) => [n.id, n.read])));
      return next;
    });
  }, []);
  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addProject = useCallback((p: Project) => setProjects((prev) => [p, ...prev]), []);
  const updateProject = useCallback((id: string, patch: Partial<Project>) => setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p))), []);
  const updateTask = useCallback((id: string, patch: Partial<Task>) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t))), []);
  const actOnApproval = useCallback((id: string, status: "Approved" | "Rejected") => setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a))), []);

  const value = useMemo<AppState>(() => ({
    theme, toggleTheme, lang, setLang, sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapsed,
    role, setRole, density, setDensity, reducedMotion, setReducedMotion, accent, setAccent,
    notifications, markRead, markAllRead, clearNotification,
    projects, addProject, updateProject, tasks, updateTask, approvals, actOnApproval,
    commandOpen, setCommandOpen, notificationsOpen, setNotificationsOpen,
  }), [theme, toggleTheme, lang, setLang, sidebarOpen, sidebarCollapsed, toggleSidebarCollapsed, role, setRole, density, setDensity, reducedMotion, setReducedMotion, accent, setAccent,
       notifications, markRead, markAllRead, clearNotification, projects, addProject, updateProject, tasks, updateTask, approvals, actOnApproval,
       commandOpen, notificationsOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp outside provider");
  return v;
}

const dict: Record<string, { en: string; ar: string }> = {
  Overview: { en: "Overview", ar: "نظرة عامة" },
  Projects: { en: "Projects", ar: "المشاريع" },
  "Tasks & Approvals": { en: "Tasks & Approvals", ar: "المهام والموافقات" },
  "Sales & CRM": { en: "Sales & CRM", ar: "المبيعات والعملاء" },
  Finance: { en: "Finance", ar: "المالية" },
  Procurement: { en: "Procurement", ar: "المشتريات" },
  Employees: { en: "Employees", ar: "الموظفون" },
  "Assets & Fleet": { en: "Assets & Fleet", ar: "الأصول والمركبات" },
  Maintenance: { en: "Maintenance", ar: "الصيانة" },
  "HSE & Quality": { en: "HSE & Quality", ar: "السلامة والجودة" },
  Documents: { en: "Documents", ar: "المستندات" },
  Reports: { en: "Reports", ar: "التقارير" },
  Settings: { en: "Settings", ar: "الإعدادات" },
  Command: { en: "Command", ar: "القيادة" },
  Commercial: { en: "Commercial", ar: "التجارية" },
  Operations: { en: "Operations", ar: "العمليات" },
  Intelligence: { en: "Intelligence", ar: "المعلومات" },
  System: { en: "System", ar: "النظام" },
  Search: { en: "Search projects, employees, docs…", ar: "ابحث في المشاريع والموظفين…" },
  "Add new": { en: "Add new", ar: "إضافة جديد" },
  "Export briefing": { en: "Export briefing", ar: "تصدير الملخص" },
};

export function useT() {
  const { lang } = useApp();
  return useCallback((k: string) => (dict[k] ? dict[k][lang] : k), [lang]);
}
