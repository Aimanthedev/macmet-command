import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, Eye, EyeOff, LoaderCircle, LockKeyhole } from "lucide-react";
import { BrandMark } from "@/components/shared/Primitives";
import { Button } from "@/components/ui/button";
import { hasDemoSession, startDemoSession, validDemoCredentials } from "@/lib/demo-session";

export function DemoGuard({ children }: { children: React.ReactNode }) { return hasDemoSession() ? children : <Navigate to="/login" replace />; }
export default function LoginPage() {
  const navigate = useNavigate(); const reduced = useReducedMotion();
  const [username, setUsername] = useState(""); const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); const [remember, setRemember] = useState(true);
  const [error, setError] = useState(""); const [entering, setEntering] = useState(false); const [copied, setCopied] = useState(false);
  useEffect(() => { if (!entering) return; const timer = setTimeout(() => { startDemoSession(remember); navigate("/dashboard", { replace: true }); }, 1000); return () => clearTimeout(timer); }, [entering, navigate, remember]);
  if (hasDemoSession()) return <Navigate to="/dashboard" replace />;
  const submit = (event: FormEvent) => { event.preventDefault(); if (!validDemoCredentials(username, password)) { setError("Incorrect demo username or password."); return; } setError(""); setEntering(true); };
  const copy = async () => { try { await navigator.clipboard.writeText("Username: admin\nPassword: admin123"); setCopied(true); } catch { setError("Clipboard unavailable. Demo credentials are shown below."); } };
  return <main className="dark login-page min-h-dvh flex items-center justify-center p-5 text-foreground">
    {entering ? <motion.div className="text-center flex flex-col items-center gap-6" initial={{ opacity: 0, scale: reduced ? 1 : .96 }} animate={{ opacity: 1, scale: 1 }} role="status"><BrandMark size={72} /><div className="font-display font-semibold">GREEN HOUSE TECHNOLOGY</div><LoaderCircle className="h-5 w-5 text-primary animate-spin" aria-label="Opening command center" /></motion.div> :
    <motion.div initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-[420px]">
      <div className="flex flex-col items-center text-center mb-8 gap-4"><BrandMark size={64} /><div><h1 className="font-display text-xl font-bold">GREEN HOUSE TECHNOLOGY</h1><p className="text-xs text-muted-foreground tracking-[0.18em] mt-2">COMMAND CENTER</p></div></div>
      <section className="panel p-6 sm:p-8"><div className="flex items-center gap-2 mb-6"><LockKeyhole className="h-4 w-4 text-primary" /><h2 className="font-semibold">Sign in</h2></div>
        <form onSubmit={submit} className="space-y-5">
          <label className="block text-sm">Username / Email<input className="workspace-input mt-2" autoComplete="username" value={username} onChange={e => { setUsername(e.target.value); setError(""); }} required /></label>
          <label className="block text-sm">Password<div className="relative mt-2"><input className="workspace-input pr-12" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={e => { setPassword(e.target.value); setError(""); }} required /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}>{show ? <EyeOff /> : <Eye />}</Button></div></label>
          <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" className="accent-primary h-4 w-4" checked={remember} onChange={e => setRemember(e.target.checked)} />Remember session</label>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full h-11">Sign In <ArrowRight /></Button>
        </form>
        <div className="mt-6 pt-5 border-t border-border"><div className="flex justify-between items-center"><span className="text-xs font-semibold text-muted-foreground uppercase">Demo access</span><Button variant="ghost" size="sm" onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy credentials"}</Button></div><dl className="text-sm mt-2 space-y-1"><div className="flex justify-between"><dt className="text-muted-foreground">Username</dt><dd className="font-mono">admin</dd></div><div className="flex justify-between"><dt className="text-muted-foreground">Password</dt><dd className="font-mono">admin123</dd></div></dl></div>
      </section><p className="text-center text-xs text-muted-foreground mt-5">Demo environment · Fictional operational data<br /><span className="block mt-1">Local demo session only · Not production authentication</span></p>
    </motion.div>}
  </main>;
}
