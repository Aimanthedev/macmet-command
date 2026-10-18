const KEY = "ght_demo_session";
export function validDemoCredentials(username: string, password: string) { return username.trim() === "admin" && password === "admin123"; }
export function hasDemoSession() { try { return localStorage.getItem(KEY) === "active" || sessionStorage.getItem(KEY) === "active"; } catch { return false; } }
export function startDemoSession(remember: boolean) { endDemoSession(); (remember ? localStorage : sessionStorage).setItem(KEY, "active"); }
export function endDemoSession() { localStorage.removeItem(KEY); sessionStorage.removeItem(KEY); }
