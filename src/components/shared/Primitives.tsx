import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export function Panel({ className, children, gradient }: { className?: string; children: ReactNode; gradient?: boolean }) {
  return (
    <div className={cn(
      "panel relative overflow-hidden",
      gradient && "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/8 before:via-transparent before:to-transparent before:pointer-events-none",
      className,
    )}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div className="min-w-0">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground truncate">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatusBadge({ status, tone }: { status: string; tone?: "success" | "warning" | "critical" | "info" | "muted" }) {
  const map: Record<string, string> = {
    "On track": "success", "In progress": "info", "At risk": "warning", "Delayed": "critical", "Completed": "info", "Handover": "info", "Planning": "muted", "Mobilizing": "info",
    "Approved": "success", "Pending": "warning", "Rejected": "critical", "Under review": "warning", "Draft": "muted", "Submitted": "info",
    "Under certification": "warning", "Partially paid": "warning", "Paid": "success", "Overdue": "critical",
    "In use": "info", "Available": "success", "Under maintenance": "warning", "New": "info", "Assigned": "info", "Awaiting parts": "warning", "Client review": "info",
    "Open": "warning", "In review": "info", "Closed": "success", "Blocked": "critical",
    "Excellent": "success", "Good": "info", "Fair": "warning", "Needs service": "critical",
    "Active": "success", "On leave": "warning", "On site": "info", "Off duty": "muted", "Prospect": "info", "Dormant": "muted",
    "High": "warning", "Critical": "critical", "Medium": "info", "Low": "muted",
  };
  const t = tone ?? (map[status] as any) ?? "muted";
  const tones: Record<string, string> = {
    success: "bg-emerald-500/12 text-emerald-400 ring-emerald-400/25",
    warning: "bg-amber-500/12 text-amber-400 ring-amber-400/25",
    critical: "bg-rose-500/12 text-rose-400 ring-rose-400/25",
    info: "bg-primary/12 text-primary ring-primary/25",
    muted: "bg-muted text-muted-foreground ring-border",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 tabular whitespace-nowrap", tones[t])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />{status}
    </span>
  );
}

export function TrendBadge({ text, dir }: { text: string; dir: "up" | "down" | "flat" }) {
  const cls = dir === "up" ? "text-emerald-400" : dir === "down" ? "text-rose-400" : "text-muted-foreground";
  const Icon = dir === "up" ? ArrowUpRight : dir === "down" ? ArrowDownRight : Minus;
  return <span className={cn("inline-flex items-center gap-1 text-xs font-medium", cls)}><Icon className="h-3.5 w-3.5" />{text}</span>;
}

export function Sparkline({ data, positive = true }: { data: number[]; positive?: boolean }) {
  if (!data.length) return null;
  const min = Math.min(...data); const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`).join(" ");
  const stroke = positive ? "text-emerald-400" : "text-rose-400";
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-10 w-full">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" className={stroke} vectorEffect="non-scaling-stroke" />
      <polygon points={`0,100 ${points} 100,100`} fill="currentColor" className={cn(stroke, "opacity-15")} />
    </svg>
  );
}

export function KpiCard({ label, value, trend, trendDir = "up", icon, spark }: {
  label: string; value: string; trend?: string; trendDir?: "up" | "down" | "flat"; icon?: ReactNode; spark?: number[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Panel className="p-5 h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-2 font-display text-3xl font-bold tabular text-foreground">{value}</div>
            {trend && <div className="mt-1"><TrendBadge text={trend} dir={trendDir} /></div>}
          </div>
          {icon && (
            <div className="shrink-0 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              {icon}
            </div>
          )}
        </div>
        {spark && <div className="mt-3"><Sparkline data={spark} positive={trendDir !== "down"} /></div>}
      </Panel>
    </motion.div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="grid place-items-center py-16 text-center">
      <div className="max-w-sm">
        <div className="mx-auto h-12 w-12 rounded-2xl grid-bg border border-border grid place-items-center text-muted-foreground">∅</div>
        <div className="mt-4 font-semibold">{title}</div>
        {hint && <div className="mt-1 text-sm text-muted-foreground">{hint}</div>}
      </div>
    </div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-foreground tracking-tight">{title}</h3>
      {action}
    </div>
  );
}

export function ProgressBar({ value, tone = "primary" }: { value: number; tone?: "primary" | "success" | "warning" | "critical" }) {
  const map: Record<string, string> = {
    primary: "bg-primary",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-rose-500",
  };
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("h-full rounded-full", map[tone])}
      />
    </div>
  );
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const hue = Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className="grid place-items-center rounded-full font-semibold text-[11px] text-white shrink-0"
      style={{ width: size, height: size, background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${(hue + 60) % 360} 70% 40%))` }}
      title={name}
    >
      {initials}
    </div>
  );
}

export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
      <defs>
        <linearGradient id="bmg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F80FF" />
          <stop offset="1" stopColor="#675CFF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0A0F16" />
      <path d="M12 46 V18 L22 32 L32 18 L42 32 L52 18 V46" stroke="url(#bmg)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="32" cy="50" r="2" fill="#23C9D6" />
    </svg>
  );
}
