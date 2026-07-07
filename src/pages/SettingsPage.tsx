import { useState } from "react";
import { PageHeader, Panel, SectionTitle } from "@/components/shared/Primitives";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";

const ROLES = ["Managing Director", "Operations Manager", "Finance Manager", "HR & Administration", "Sales Manager", "Project Manager", "HSE Manager", "Employee"] as const;

export default function SettingsPage() {
  const { theme, toggleTheme, lang, setLang, density, setDensity, reducedMotion, setReducedMotion, accent, setAccent, role, setRole } = useApp();
  const [company, setCompany] = useState({
    name: "Macmet Al-Khaleej Constructions",
    address: "C Ring Road, Doha, Qatar",
    po: "P.O. Box 63073",
    phone: "+974 4451 7976",
    email: "info@macmet.qa",
    sales: "sales@macmet.qa",
    web: "macmet.qa",
  });

  const confirmAndDo = (msg: string, cb: () => void) => { if (window.confirm(msg)) cb(); };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Company profile, appearance, notifications, roles preview and demo data controls." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Company profile" />
          <div className="grid grid-cols-2 gap-3 text-sm">
            {Object.entries(company).map(([k, v]) => (
              <label key={k} className="col-span-2 sm:col-span-1 flex flex-col gap-1"><span className="text-xs text-muted-foreground capitalize">{k}</span>
                <input value={v} onChange={(e) => setCompany({ ...company, [k]: e.target.value })} className="h-9 rounded-lg border border-border bg-background px-3" /></label>
            ))}
          </div>
          <button onClick={() => toast.success("Company profile saved")} className="mt-4 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm">Save</button>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Appearance" />
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between"><span>Theme</span><button onClick={toggleTheme} className="h-9 px-3 rounded-lg border border-border">{theme === "dark" ? "Dark" : "Light"}</button></div>
            <div className="flex items-center justify-between"><span>Density</span>
              <select value={density} onChange={(e) => setDensity(e.target.value as any)} className="h-9 rounded-lg border border-border bg-background px-3">
                <option value="comfortable">Comfortable</option><option value="compact">Compact</option>
              </select>
            </div>
            <div className="flex items-center justify-between"><span>Reduced motion</span>
              <label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} className="sr-only peer" /><div className="w-10 h-5 bg-muted peer-checked:bg-primary rounded-full transition"><div className={`h-4 w-4 rounded-full bg-white transition transform mt-0.5 ${reducedMotion ? "translate-x-5" : "translate-x-0.5"}`} /></div></label>
            </div>
            <div className="flex items-center justify-between"><span>Accent color</span>
              <div className="flex gap-1">{["#2F80FF", "#675CFF", "#23C9D6", "#1FC79A", "#FFB547"].map((c) => (
                <button key={c} onClick={() => setAccent(c)} className={`h-7 w-7 rounded-full ring-2 ${accent === c ? "ring-foreground" : "ring-transparent"}`} style={{ background: c }} />
              ))}</div>
            </div>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Regional preferences" />
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between"><span>Currency</span><span className="font-medium">QAR</span></div>
            <div className="flex items-center justify-between"><span>Timezone</span><span className="font-medium">Asia/Qatar</span></div>
            <div className="flex items-center justify-between"><span>Language</span>
              <select value={lang} onChange={(e) => setLang(e.target.value as any)} className="h-9 rounded-lg border border-border bg-background px-3"><option value="en">English</option><option value="ar">العربية</option></select>
            </div>
            <div className="flex items-center justify-between"><span>Date format</span>
              <select className="h-9 rounded-lg border border-border bg-background px-3"><option>DD MMM YYYY</option><option>YYYY-MM-DD</option><option>MM/DD/YYYY</option></select>
            </div>
            <div className="flex items-center justify-between"><span>Week starts</span>
              <select className="h-9 rounded-lg border border-border bg-background px-3"><option>Sunday</option><option>Monday</option></select>
            </div>
          </div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Roles preview" />
          <p className="text-xs text-muted-foreground mb-3">Switch the active demo role to preview role-specific quick actions. No real authorization is applied.</p>
          <div className="grid grid-cols-2 gap-2">{ROLES.map((r) => (
            <button key={r} onClick={() => { setRole(r); toast.success(`Role: ${r}`); }} className={`text-left rounded-lg border p-3 text-sm transition ${role === r ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}>{r}</button>
          ))}</div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Notifications" />
          <div className="space-y-2 text-sm">{["Approvals", "Project alerts", "Finance", "HR", "Maintenance", "Documents"].map((c) => (
            <label key={c} className="flex items-center justify-between"><span>{c}</span><input type="checkbox" defaultChecked className="h-4 w-4" /></label>
          ))}</div>
        </Panel>

        <Panel className="col-span-12 xl:col-span-6 p-5">
          <SectionTitle title="Demo data controls" />
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => confirmAndDo("Reset demo data to baseline?", () => { localStorage.clear(); location.reload(); })} className="rounded-lg border border-border p-3 text-sm hover:bg-accent text-left">Reset demo data</button>
            <button onClick={() => toast.success("Optimistic scenario loaded")} className="rounded-lg border border-border p-3 text-sm hover:bg-accent text-left">Load optimistic scenario</button>
            <button onClick={() => toast.warning("Risk scenario loaded")} className="rounded-lg border border-border p-3 text-sm hover:bg-accent text-left">Load risk scenario</button>
            <button onClick={() => confirmAndDo("Clear saved preferences?", () => { localStorage.clear(); location.reload(); })} className="rounded-lg border border-border p-3 text-sm hover:bg-accent text-left">Clear preferences</button>
          </div>
        </Panel>

        <Panel className="col-span-12 p-5">
          <SectionTitle title="System information" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div><div className="text-xs text-muted-foreground">Version</div><div>2026.07 · demo</div></div>
            <div><div className="text-xs text-muted-foreground">Environment</div><div>Demo · UI only</div></div>
            <div><div className="text-xs text-muted-foreground">Data source</div><div>Local mock (typed)</div></div>
            <div><div className="text-xs text-muted-foreground">License</div><div>Client presentation</div></div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
