import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Notification } from "@/types";

const categories: Notification["category"][] = ["Approvals", "Project alerts", "Finance", "Documents", "HR", "Maintenance", "System"];

export function NotificationDrawer() {
  const { notifications, notificationsOpen, setNotificationsOpen, markRead, markAllRead, clearNotification } = useApp();
  const [filter, setFilter] = useState<"All" | Notification["category"]>("All");

  const list = notifications.filter((n) => filter === "All" || n.category === filter);
  const dot = (s: Notification["severity"]) => ({ info: "bg-primary", warning: "bg-amber-500", critical: "bg-rose-500", success: "bg-emerald-500" }[s]);

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setNotificationsOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-popover border-l border-border shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <div className="font-display font-bold">Notifications</div>
                <div className="text-xs text-muted-foreground">{notifications.filter((n) => !n.read).length} unread</div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={markAllRead} className="text-xs px-2 py-1 rounded hover:bg-accent" title="Mark all read">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={() => setNotificationsOpen(false)} className="p-1 rounded hover:bg-accent"><X className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="px-3 py-2 flex gap-1 overflow-x-auto border-b border-border">
              {(["All", ...categories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c as any)}
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition",
                    filter === c ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-accent text-muted-foreground",
                  )}
                >{c}</button>
              ))}
            </div>
            <div className="flex-1 overflow-y-auto">
              {list.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No notifications.</div>}
              {list.map((n) => (
                <div key={n.id} className={cn("group px-4 py-3 border-b border-border/60 hover:bg-accent/50 transition", !n.read && "bg-primary/5")}>
                  <div className="flex items-start gap-3">
                    <span className={cn("mt-1.5 h-2 w-2 rounded-full shrink-0", dot(n.severity))} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold truncate">{n.title}</div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{n.detail}</div>
                      <div className="mt-1 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                        {!n.read && <button onClick={() => markRead(n.id)} className="text-[11px] text-primary hover:underline">Mark read</button>}
                        <button onClick={() => clearNotification(n.id)} className="text-[11px] text-muted-foreground hover:text-rose-400 inline-flex items-center gap-1"><Trash2 className="h-3 w-3" />Clear</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
