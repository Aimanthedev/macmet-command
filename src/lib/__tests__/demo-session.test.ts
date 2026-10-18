import { test, expect } from "bun:test";
import { validDemoCredentials } from "../demo-session";
test("demo accepts admin with admin123", () => { expect(validDemoCredentials("admin", "admin123")).toBe(true); });
test("demo rejects incorrect credentials", () => { expect(validDemoCredentials("admin", "wrong")).toBe(false); expect(validDemoCredentials("other", "admin123")).toBe(false); });
