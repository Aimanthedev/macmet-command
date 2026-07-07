import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import DashboardPage from "@/pages/DashboardPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import ApprovalsPage from "@/pages/ApprovalsPage";
import SalesPage from "@/pages/SalesPage";
import FinancePage from "@/pages/FinancePage";
import ProcurementPage from "@/pages/ProcurementPage";
import EmployeesPage from "@/pages/EmployeesPage";
import AssetsPage from "@/pages/AssetsPage";
import MaintenancePage from "@/pages/MaintenancePage";
import HsePage from "@/pages/HsePage";
import DocumentsPage from "@/pages/DocumentsPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/approvals" element={<ApprovalsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/procurement" element={<ProcurementPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/hse" element={<HsePage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
