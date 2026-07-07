import type { ReactNode } from "react";

export type Discipline = "MEP" | "HVAC" | "Electrical" | "Plumbing" | "Firefighting" | "Civil" | "Architectural" | "Instrumentation" | "Maintenance" | "Infrastructure";
export type ProjectStatus = "Planning" | "Mobilizing" | "In progress" | "At risk" | "Delayed" | "Handover" | "Completed";
export type Priority = "Low" | "Medium" | "High" | "Critical";

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  location: string;
  disciplines: Discipline[];
  progress: number;
  budgetUsed: number;
  contractValue: number;
  startDate: string;
  endDate: string;
  manager: string;
  team: string[];
  status: ProjectStatus;
  health: "On track" | "At risk" | "Delayed" | "Completed";
  nextMilestone: { name: string; date: string };
  description: string;
  costToDate: number;
  certified: number;
  collected: number;
  variations: number;
  retention: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  project: string | null;
  phone: string;
  status: "Active" | "On leave" | "On site" | "Off duty";
  nationality: string;
  joined: string;
  qidExpiry: string;
  visaExpiry: string;
  skills: string[];
  manager: string;
}

export interface Client {
  id: string;
  name: string;
  sector: string;
  contact: string;
  email: string;
  phone: string;
  projects: number;
  totalValue: number;
  status: "Active" | "Prospect" | "Dormant";
}

export interface Opportunity {
  id: string;
  title: string;
  client: string;
  value: number;
  probability: number;
  stage: "New enquiry" | "Qualified" | "Site visit" | "Estimating" | "Quotation submitted" | "Negotiation" | "Won" | "Lost";
  owner: string;
  closeDate: string;
  service: Discipline;
  lastActivity?: string;
}

export interface Invoice {
  id: string;
  number: string;
  client: string;
  project: string;
  amount: number;
  issued: string;
  due: string;
  paid: number;
  status: "Draft" | "Submitted" | "Under certification" | "Partially paid" | "Paid" | "Overdue";
}

export interface PurchaseOrder {
  id: string;
  number: string;
  supplier: string;
  project: string;
  value: number;
  ordered: string;
  expected: string;
  deliveryProgress: number;
  paymentStatus: "Pending" | "Partial" | "Paid";
  status: "Draft" | "Approved" | "In transit" | "Delivered" | "Closed";
}

export interface Asset {
  id: string;
  code: string;
  name: string;
  type: "Equipment" | "Vehicle" | "Tool" | "IT";
  project: string | null;
  assignedTo: string | null;
  condition: "Excellent" | "Good" | "Fair" | "Needs service";
  utilization: number;
  lastService: string;
  nextService: string;
  status: "In use" | "Available" | "Under maintenance";
}

export interface WorkOrder {
  id: string;
  number: string;
  client: string;
  location: string;
  category: "HVAC" | "Electrical" | "Plumbing" | "Firefighting" | "Mechanical" | "Civil" | "Preventive";
  priority: Priority;
  technician: string;
  sla: string;
  status: "New" | "Assigned" | "In progress" | "Awaiting parts" | "Client review" | "Completed";
  description: string;
}

export interface Observation {
  id: string;
  project: string;
  category: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  reportedBy: string;
  date: string;
  owner: string;
  due: string;
  status: "Open" | "In review" | "Closed";
}

export interface Doc {
  id: string;
  number: string;
  name: string;
  category: string;
  project: string;
  revision: string;
  owner: string;
  updated: string;
  status: "Draft" | "Internal review" | "Submitted" | "Approved" | "Approved with comments" | "Rejected" | "Superseded";
  expiry?: string;
}

export interface Notification {
  id: string;
  category: "Approvals" | "Project alerts" | "Finance" | "Documents" | "HR" | "Maintenance" | "System";
  title: string;
  detail: string;
  time: string;
  read: boolean;
  severity: "info" | "warning" | "critical" | "success";
}

export interface Approval {
  id: string;
  type: "Purchase order" | "Variation order" | "Leave request" | "Interim payment certificate" | "Material submittal" | "Purchase request" | "Quotation" | "Payment request";
  title: string;
  project: string;
  requestedBy: string;
  amount?: number;
  submitted: string;
  priority: Priority;
  status: "Pending" | "Approved" | "Rejected";
}

export interface Task {
  id: string;
  title: string;
  project: string;
  category: string;
  assignee: string;
  priority: Priority;
  due: string;
  progress: number;
  status: "Open" | "In progress" | "Blocked" | "Completed";
}

export interface KpiTrend {
  label: string;
  value: string;
  trend: string;
  trendDir: "up" | "down" | "flat";
  icon?: ReactNode;
  spark: number[];
}
