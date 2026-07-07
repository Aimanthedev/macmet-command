import type {
  Project, Employee, Client, Opportunity, Invoice, PurchaseOrder,
  Asset, WorkOrder, Observation, Doc, Notification, Approval, Task,
} from "@/types";

export const projects: Project[] = [
  { id: "p1", code: "MAK-2411", name: "Lycee Francais Bonaparte — MEP Upgrade", client: "Lycee Francais Bonaparte", location: "West Bay, Doha", disciplines: ["MEP", "HVAC", "Electrical"], progress: 72, budgetUsed: 68, contractValue: 14200000, startDate: "2025-02-10", endDate: "2026-04-30", manager: "Ahmed Al-Suwaidi", team: ["Rahim K.", "Priya S.", "Omar H."], status: "In progress", health: "On track", nextMilestone: { name: "HVAC first fix inspection", date: "2026-07-18" }, description: "Complete MEP retrofit including chilled water plant, LV distribution and firefighting upgrade across academic wing.", costToDate: 8100000, certified: 9200000, collected: 7800000, variations: 620000, retention: 460000 },
  { id: "p2", code: "MAK-2409", name: "Qatar Distribution Company — Electrical Works", client: "Qatar Distribution Company", location: "Abu Hamour, Doha", disciplines: ["Electrical", "Instrumentation"], progress: 45, budgetUsed: 51, contractValue: 8600000, startDate: "2025-05-01", endDate: "2026-09-15", manager: "Vinod Menon", team: ["Sami R.", "Layla A."], status: "At risk", health: "At risk", nextMilestone: { name: "MV switchgear delivery", date: "2026-07-22" }, description: "MV/LV distribution, standby generation and integrated instrumentation for main distribution facility.", costToDate: 4400000, certified: 3900000, collected: 3100000, variations: 210000, retention: 195000 },
  { id: "p3", code: "MAK-2418", name: "Saudia Hypermarket — HVAC & Firefighting", client: "Saudia Hypermarket", location: "Al Rayyan", disciplines: ["HVAC", "Firefighting"], progress: 88, budgetUsed: 82, contractValue: 5400000, startDate: "2024-11-05", endDate: "2026-07-30", manager: "Ibrahim Nassar", team: ["Kiran D.", "Faisal M."], status: "Handover", health: "On track", nextMilestone: { name: "T&C completion", date: "2026-07-14" }, description: "Chilled water HVAC, ventilation and NFPA-compliant firefighting for a 12,400 m² hypermarket.", costToDate: 4400000, certified: 4750000, collected: 4200000, variations: 180000, retention: 270000 },
  { id: "p4", code: "MAK-2402", name: "Qatar Oxygen Company AIRTEC — Industrial MEP", client: "Qatar Oxygen Company", location: "Mesaieed Industrial City", disciplines: ["MEP", "Instrumentation", "Electrical"], progress: 34, budgetUsed: 39, contractValue: 22400000, startDate: "2025-06-15", endDate: "2027-01-31", manager: "Ahmed Al-Suwaidi", team: ["Deepak R.", "Nour A.", "Bilal K."], status: "In progress", health: "On track", nextMilestone: { name: "Cable tray routing sign-off", date: "2026-07-25" }, description: "Industrial MEP works for AIRTEC facility including hazardous area electrical, HVAC and control instrumentation.", costToDate: 7900000, certified: 7100000, collected: 5900000, variations: 480000, retention: 355000 },
  { id: "p5", code: "MAK-2415", name: "Korean Embassy — Facilities Refurbishment", client: "Embassy of the Republic of Korea", location: "West Bay, Doha", disciplines: ["Architectural", "MEP", "Maintenance"], progress: 61, budgetUsed: 58, contractValue: 3800000, startDate: "2025-03-20", endDate: "2026-08-15", manager: "Layla Kassem", team: ["Reza M.", "Anas T."], status: "In progress", health: "On track", nextMilestone: { name: "Chancery finishes inspection", date: "2026-07-20" }, description: "Diplomatic residence and chancery refurbishment including finishes, MEP and security-integrated maintenance.", costToDate: 2200000, certified: 2350000, collected: 2000000, variations: 90000, retention: 118000 },
  { id: "p6", code: "MAK-2420", name: "Lusail Villa Compound — Civil & MEP", client: "Private Developer", location: "Lusail", disciplines: ["Civil", "MEP", "HVAC"], progress: 22, budgetUsed: 26, contractValue: 31200000, startDate: "2025-08-01", endDate: "2027-06-30", manager: "Vinod Menon", team: ["Hassan A.", "Meera P.", "Yousef R."], status: "In progress", health: "On track", nextMilestone: { name: "Foundation pour Block C", date: "2026-07-30" }, description: "24-villa compound with full civil construction, MEP and district cooling connection.", costToDate: 8100000, certified: 6800000, collected: 5400000, variations: 320000, retention: 340000 },
  { id: "p7", code: "MAK-2412", name: "Warehouse 14 — MEP Retrofit", client: "Milaha Logistics", location: "Ras Bufontas", disciplines: ["MEP", "Electrical", "Firefighting"], progress: 55, budgetUsed: 62, contractValue: 6900000, startDate: "2025-04-10", endDate: "2026-09-01", manager: "Ibrahim Nassar", team: ["Zain M.", "Rashed O."], status: "Delayed", health: "Delayed", nextMilestone: { name: "Sprinkler test", date: "2026-07-19" }, description: "Full MEP retrofit including HV distribution, LED lighting and NFPA-13 sprinkler system.", costToDate: 4300000, certified: 3600000, collected: 2800000, variations: 210000, retention: 180000 },
  { id: "p8", code: "MAK-2419", name: "Utility Substation Works — Electrical & Civil", client: "Kahramaa (framework)", location: "Ras Laffan", disciplines: ["Electrical", "Civil", "Infrastructure"], progress: 40, budgetUsed: 42, contractValue: 18700000, startDate: "2025-07-01", endDate: "2026-12-20", manager: "Ahmed Al-Suwaidi", team: ["Firas B.", "Nadia T.", "Karim S."], status: "In progress", health: "On track", nextMilestone: { name: "Transformer pad handover", date: "2026-07-28" }, description: "Civil and electrical works for a 132/11 kV substation package under long-term framework contract.", costToDate: 7500000, certified: 7100000, collected: 5900000, variations: 260000, retention: 355000 },
  { id: "p9", code: "MAK-2408", name: "Al Wakrah Clinic — MEP Fitout", client: "PHCC (demo)", location: "Al Wakrah", disciplines: ["MEP", "HVAC", "Electrical"], progress: 100, budgetUsed: 96, contractValue: 4200000, startDate: "2024-09-01", endDate: "2026-05-30", manager: "Layla Kassem", team: ["Sana K."], status: "Completed", health: "Completed", nextMilestone: { name: "Retention release", date: "2026-11-30" }, description: "Turnkey MEP fitout for primary care clinic including medical gas and specialized HVAC.", costToDate: 3900000, certified: 4200000, collected: 4000000, variations: 60000, retention: 210000 },
];

export const employees: Employee[] = [
  { id: "e1", name: "Ahmed Al-Suwaidi", role: "Senior Project Manager", department: "Project Management", project: "MAK-2411", phone: "+974 5501 2200", status: "On site", nationality: "Qatari", joined: "2018-03-11", qidExpiry: "2027-01-14", visaExpiry: "2027-01-14", skills: ["PMP", "MEP", "Client relations"], manager: "Mohammed Al-Khaleej" },
  { id: "e2", name: "Vinod Menon", role: "Project Manager", department: "Project Management", project: "MAK-2409", phone: "+974 5501 2201", status: "Active", nationality: "Indian", joined: "2019-08-22", qidExpiry: "2026-11-04", visaExpiry: "2026-11-04", skills: ["Electrical", "MV/LV"], manager: "Ahmed Al-Suwaidi" },
  { id: "e3", name: "Ibrahim Nassar", role: "Project Manager", department: "Project Management", project: "MAK-2418", phone: "+974 5501 2202", status: "On site", nationality: "Lebanese", joined: "2020-01-14", qidExpiry: "2027-05-22", visaExpiry: "2027-05-22", skills: ["HVAC", "Firefighting", "T&C"], manager: "Ahmed Al-Suwaidi" },
  { id: "e4", name: "Layla Kassem", role: "Project Manager", department: "Project Management", project: "MAK-2415", phone: "+974 5501 2203", status: "Active", nationality: "Jordanian", joined: "2021-06-01", qidExpiry: "2026-09-10", visaExpiry: "2026-09-10", skills: ["Architectural", "Interiors"], manager: "Ahmed Al-Suwaidi" },
  { id: "e5", name: "Rahim Kutty", role: "MEP Engineer", department: "MEP", project: "MAK-2411", phone: "+974 5501 2204", status: "On site", nationality: "Indian", joined: "2022-02-18", qidExpiry: "2026-08-19", visaExpiry: "2026-08-19", skills: ["MEP design", "Revit"], manager: "Ahmed Al-Suwaidi" },
  { id: "e6", name: "Priya Sharma", role: "HVAC Engineer", department: "HVAC", project: "MAK-2411", phone: "+974 5501 2205", status: "On site", nationality: "Indian", joined: "2022-09-05", qidExpiry: "2027-02-01", visaExpiry: "2027-02-01", skills: ["Chilled water", "TAB"], manager: "Ibrahim Nassar" },
  { id: "e7", name: "Omar Hadi", role: "Electrical Foreman", department: "Electrical", project: "MAK-2411", phone: "+974 5501 2206", status: "On site", nationality: "Egyptian", joined: "2020-11-11", qidExpiry: "2026-07-30", visaExpiry: "2026-07-30", skills: ["LV panels", "Cable pulling"], manager: "Rahim Kutty" },
  { id: "e8", name: "Sami Rachid", role: "Electrical Engineer", department: "Electrical", project: "MAK-2409", phone: "+974 5501 2207", status: "Active", nationality: "Moroccan", joined: "2023-01-08", qidExpiry: "2027-01-08", visaExpiry: "2027-01-08", skills: ["MV switchgear"], manager: "Vinod Menon" },
  { id: "e9", name: "Layla Ahmed", role: "Instrumentation Engineer", department: "Instrumentation", project: "MAK-2409", phone: "+974 5501 2208", status: "On leave", nationality: "Tunisian", joined: "2022-04-30", qidExpiry: "2026-10-12", visaExpiry: "2026-10-12", skills: ["SCADA", "PLC"], manager: "Vinod Menon" },
  { id: "e10", name: "Kiran Dev", role: "HVAC Technician", department: "HVAC", project: "MAK-2418", phone: "+974 5501 2209", status: "On site", nationality: "Nepali", joined: "2021-10-19", qidExpiry: "2026-09-01", visaExpiry: "2026-09-01", skills: ["Refrigerant", "Ductwork"], manager: "Ibrahim Nassar" },
  { id: "e11", name: "Faisal Malek", role: "Firefighting Supervisor", department: "Firefighting", project: "MAK-2418", phone: "+974 5501 2210", status: "On site", nationality: "Pakistani", joined: "2019-05-25", qidExpiry: "2026-12-18", visaExpiry: "2026-12-18", skills: ["NFPA", "FM-200"], manager: "Ibrahim Nassar" },
  { id: "e12", name: "Deepak Rajan", role: "Instrumentation Foreman", department: "Instrumentation", project: "MAK-2402", phone: "+974 5501 2211", status: "On site", nationality: "Indian", joined: "2020-07-14", qidExpiry: "2026-08-05", visaExpiry: "2026-08-05", skills: ["Loop testing"], manager: "Ahmed Al-Suwaidi" },
  { id: "e13", name: "Nour Abdullah", role: "MEP Engineer", department: "MEP", project: "MAK-2402", phone: "+974 5501 2212", status: "Active", nationality: "Syrian", joined: "2023-03-11", qidExpiry: "2027-03-11", visaExpiry: "2027-03-11", skills: ["Coordination", "BIM"], manager: "Ahmed Al-Suwaidi" },
  { id: "e14", name: "Meera Pillai", role: "Civil Engineer", department: "Civil", project: "MAK-2420", phone: "+974 5501 2213", status: "On site", nationality: "Indian", joined: "2022-11-22", qidExpiry: "2026-10-01", visaExpiry: "2026-10-01", skills: ["Structural", "Concrete"], manager: "Vinod Menon" },
  { id: "e15", name: "Hassan Al-Ali", role: "Plumbing Supervisor", department: "Plumbing", project: "MAK-2420", phone: "+974 5501 2214", status: "On site", nationality: "Yemeni", joined: "2018-09-19", qidExpiry: "2026-11-19", visaExpiry: "2026-11-19", skills: ["Sanitary", "PPR"], manager: "Meera Pillai" },
  { id: "e16", name: "Sara Al-Mansoori", role: "HR & Admin Manager", department: "Administration", project: null, phone: "+974 5501 2215", status: "Active", nationality: "Qatari", joined: "2017-05-14", qidExpiry: "2027-05-14", visaExpiry: "2027-05-14", skills: ["Payroll", "PRO"], manager: "Mohammed Al-Khaleej" },
  { id: "e17", name: "Rania Fahed", role: "Finance Controller", department: "Administration", project: null, phone: "+974 5501 2216", status: "Active", nationality: "Lebanese", joined: "2019-02-01", qidExpiry: "2026-12-05", visaExpiry: "2026-12-05", skills: ["IFRS", "Tally", "SAP"], manager: "Mohammed Al-Khaleej" },
  { id: "e18", name: "Youssef Rahim", role: "HSE Manager", department: "Administration", project: null, phone: "+974 5501 2217", status: "Active", nationality: "Egyptian", joined: "2020-04-08", qidExpiry: "2026-08-15", visaExpiry: "2026-08-15", skills: ["NEBOSH", "IOSH", "ISO 45001"], manager: "Mohammed Al-Khaleej" },
];

// Fill up to 184 with synthetic labourers for count display purposes
export const workforceCount = 184;

export const clients: Client[] = [
  { id: "c1", name: "Qatar Energy", sector: "Energy", contact: "Eng. Faisal M.", email: "procurement@demo.qe", phone: "+974 4013 1000", projects: 3, totalValue: 42000000, status: "Active" },
  { id: "c2", name: "Qatar Airways", sector: "Aviation", contact: "Ms. Aisha K.", email: "facilities@demo.qr", phone: "+974 4023 0000", projects: 1, totalValue: 6800000, status: "Prospect" },
  { id: "c3", name: "Ashghal", sector: "Public Works", contact: "Eng. Hamad A.", email: "contracts@demo.ashghal", phone: "+974 4495 0000", projects: 2, totalValue: 28500000, status: "Active" },
  { id: "c4", name: "ORYX GTL", sector: "Petrochemical", contact: "Eng. Rashid O.", email: "purchasing@demo.oryx", phone: "+974 4477 0000", projects: 1, totalValue: 9200000, status: "Active" },
  { id: "c5", name: "PHCC", sector: "Healthcare", contact: "Dr. Muna S.", email: "estates@demo.phcc", phone: "+974 4407 0000", projects: 2, totalValue: 7900000, status: "Active" },
  { id: "c6", name: "Qatar Cool", sector: "District Cooling", contact: "Eng. Nasser T.", email: "ops@demo.qcool", phone: "+974 4453 0000", projects: 1, totalValue: 4300000, status: "Prospect" },
  { id: "c7", name: "QAPCO", sector: "Petrochemical", contact: "Eng. Yasser B.", email: "tenders@demo.qapco", phone: "+974 4477 6000", projects: 1, totalValue: 12500000, status: "Active" },
  { id: "c8", name: "Hamad Medical Corporation", sector: "Healthcare", contact: "Eng. Salem A.", email: "facilities@demo.hmc", phone: "+974 4439 0000", projects: 2, totalValue: 18700000, status: "Active" },
  { id: "c9", name: "WOQOD", sector: "Fuel & Retail", contact: "Ms. Reem H.", email: "maintenance@demo.woqod", phone: "+974 4405 0000", projects: 1, totalValue: 3400000, status: "Active" },
  { id: "c10", name: "Mwani Qatar", sector: "Ports", contact: "Eng. Khalid M.", email: "engineering@demo.mwani", phone: "+974 4458 0000", projects: 1, totalValue: 11200000, status: "Prospect" },
  { id: "c11", name: "Ooredoo", sector: "Telecom", contact: "Eng. Tariq R.", email: "infrastructure@demo.ooredoo", phone: "+974 4400 0000", projects: 1, totalValue: 5600000, status: "Active" },
];

export const opportunities: Opportunity[] = [
  { id: "o1", title: "West Bay Tower — HVAC Upgrade", client: "Qatar Cool", value: 4200000, probability: 45, stage: "Estimating", owner: "Ibrahim Nassar", closeDate: "2026-09-30", service: "HVAC", lastActivity: "2 days ago" },
  { id: "o2", title: "HMC Auxiliary — Electrical Retrofit", client: "Hamad Medical Corporation", value: 6800000, probability: 60, stage: "Quotation submitted", owner: "Vinod Menon", closeDate: "2026-08-15", service: "Electrical" },
  { id: "o3", title: "WOQOD Station 24 — MEP Maintenance", client: "WOQOD", value: 900000, probability: 75, stage: "Negotiation", owner: "Layla Kassem", closeDate: "2026-08-01", service: "Maintenance", lastActivity: "Today" },
  { id: "o4", title: "Ashghal Framework Add-on Package", client: "Ashghal", value: 12500000, probability: 30, stage: "Qualified", owner: "Ahmed Al-Suwaidi", closeDate: "2026-11-20", service: "Infrastructure", lastActivity: "5 days ago" },
  { id: "o5", title: "QAPCO Firefighting Retrofit", client: "QAPCO", value: 3800000, probability: 50, stage: "Site visit", owner: "Ibrahim Nassar", closeDate: "2026-10-10", service: "Firefighting", lastActivity: "1 day ago" },
  { id: "o6", title: "Ooredoo Data Center Cooling", client: "Ooredoo", value: 5600000, probability: 40, stage: "Estimating", owner: "Vinod Menon", closeDate: "2026-10-30", service: "HVAC", lastActivity: "3 days ago" },
  { id: "o7", title: "Mwani Warehouse Electrical", client: "Mwani Qatar", value: 2100000, probability: 20, stage: "New enquiry", owner: "Layla Kassem", closeDate: "2026-12-01", service: "Electrical", lastActivity: "6 days ago" },
  { id: "o8", title: "PHCC Facility Plumbing Overhaul", client: "PHCC", value: 1400000, probability: 65, stage: "Quotation submitted", owner: "Ibrahim Nassar", closeDate: "2026-08-25", service: "Plumbing", lastActivity: "Yesterday" },
  { id: "o9", title: "QR Cargo Terminal MEP", client: "Qatar Airways", value: 6800000, probability: 25, stage: "Qualified", owner: "Ahmed Al-Suwaidi", closeDate: "2026-11-01", service: "MEP", lastActivity: "1 week ago" },
  { id: "o10", title: "ORYX Instrument Loops", client: "ORYX GTL", value: 3200000, probability: 55, stage: "Estimating", owner: "Vinod Menon", closeDate: "2026-09-15", service: "Instrumentation", lastActivity: "4 days ago" },
  { id: "o11", title: "QE Substation Framework Renewal", client: "Qatar Energy", value: 18400000, probability: 35, stage: "Site visit", owner: "Ahmed Al-Suwaidi", closeDate: "2027-01-20", service: "Electrical", lastActivity: "2 days ago" },
  { id: "o12", title: "Villa Compound — MEP Fitout", client: "Private (referral)", value: 2400000, probability: 80, stage: "Won", owner: "Layla Kassem", closeDate: "2026-07-01", service: "MEP", lastActivity: "Today" },
];

export const invoices: Invoice[] = [
  { id: "i1", number: "INV-2026-042", client: "Lycee Francais Bonaparte", project: "MAK-2411", amount: 1450000, issued: "2026-06-10", due: "2026-07-10", paid: 1450000, status: "Paid" },
  { id: "i2", number: "INV-2026-045", client: "Qatar Distribution Company", project: "MAK-2409", amount: 890000, issued: "2026-06-20", due: "2026-07-20", paid: 400000, status: "Partially paid" },
  { id: "i3", number: "INV-2026-048", client: "Saudia Hypermarket", project: "MAK-2418", amount: 620000, issued: "2026-06-25", due: "2026-07-25", paid: 0, status: "Under certification" },
  { id: "i4", number: "INV-2026-050", client: "Qatar Oxygen Company", project: "MAK-2402", amount: 2100000, issued: "2026-05-30", due: "2026-06-30", paid: 0, status: "Overdue" },
  { id: "i5", number: "INV-2026-052", client: "Embassy of Korea", project: "MAK-2415", amount: 380000, issued: "2026-07-01", due: "2026-08-01", paid: 0, status: "Submitted" },
  { id: "i6", number: "INV-2026-053", client: "Private Developer", project: "MAK-2420", amount: 1800000, issued: "2026-07-02", due: "2026-08-02", paid: 0, status: "Under certification" },
  { id: "i7", number: "INV-2026-039", client: "Milaha Logistics", project: "MAK-2412", amount: 540000, issued: "2026-05-15", due: "2026-06-15", paid: 0, status: "Overdue" },
  { id: "i8", number: "INV-2026-055", client: "Kahramaa (framework)", project: "MAK-2419", amount: 1300000, issued: "2026-07-04", due: "2026-08-04", paid: 0, status: "Submitted" },
  { id: "i9", number: "INV-2026-036", client: "PHCC", project: "MAK-2408", amount: 210000, issued: "2026-04-30", due: "2026-05-30", paid: 0, status: "Overdue" },
  { id: "i10", number: "INV-2026-057", client: "Qatar Distribution Company", project: "MAK-2409", amount: 420000, issued: "2026-07-05", due: "2026-08-05", paid: 0, status: "Draft" },
];

export const suppliers = [
  { id: "s1", name: "Al-Faisal Electricals", categories: ["Electrical", "Cables"], contact: "Mr. Faisal Al-Naimi", rating: 4.6, onTime: 92, openOrders: 4, spend: 3200000, status: "Approved" },
  { id: "s2", name: "Gulf HVAC Systems", categories: ["HVAC", "Ducting"], contact: "Ms. Reem Nassar", rating: 4.4, onTime: 88, openOrders: 3, spend: 2400000, status: "Approved" },
  { id: "s3", name: "Qatar Fire Solutions", categories: ["Firefighting"], contact: "Eng. Hamza R.", rating: 4.8, onTime: 95, openOrders: 2, spend: 1400000, status: "Approved" },
  { id: "s4", name: "Doha Steel Trading", categories: ["Steel", "Fabrication"], contact: "Mr. Ali Khan", rating: 4.1, onTime: 82, openOrders: 5, spend: 4100000, status: "Approved" },
  { id: "s5", name: "Techno Instruments", categories: ["Instrumentation"], contact: "Mr. Vinod K.", rating: 4.5, onTime: 90, openOrders: 2, spend: 980000, status: "Approved" },
  { id: "s6", name: "Al-Rayan Plumbing Supply", categories: ["Plumbing", "PPR"], contact: "Ms. Sara Ali", rating: 4.2, onTime: 85, openOrders: 3, spend: 620000, status: "Approved" },
  { id: "s7", name: "MAK Tools & Rentals", categories: ["Tools", "Rentals"], contact: "Mr. Omar T.", rating: 4.3, onTime: 87, openOrders: 6, spend: 850000, status: "Approved" },
  { id: "s8", name: "Peninsula Building Materials", categories: ["Civil", "Aggregates"], contact: "Eng. Salem M.", rating: 4.0, onTime: 79, openOrders: 4, spend: 2200000, status: "Under review" },
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po1", number: "PO-2026-118", supplier: "Al-Faisal Electricals", project: "MAK-2411", value: 640000, ordered: "2026-06-12", expected: "2026-07-14", deliveryProgress: 80, paymentStatus: "Partial", status: "In transit" },
  { id: "po2", number: "PO-2026-122", supplier: "Gulf HVAC Systems", project: "MAK-2418", value: 320000, ordered: "2026-06-18", expected: "2026-07-16", deliveryProgress: 100, paymentStatus: "Paid", status: "Delivered" },
  { id: "po3", number: "PO-2026-127", supplier: "Qatar Fire Solutions", project: "MAK-2418", value: 210000, ordered: "2026-06-22", expected: "2026-07-20", deliveryProgress: 65, paymentStatus: "Pending", status: "In transit" },
  { id: "po4", number: "PO-2026-131", supplier: "Doha Steel Trading", project: "MAK-2402", value: 1800000, ordered: "2026-06-25", expected: "2026-08-05", deliveryProgress: 30, paymentStatus: "Partial", status: "In transit" },
  { id: "po5", number: "PO-2026-134", supplier: "Techno Instruments", project: "MAK-2409", value: 480000, ordered: "2026-07-01", expected: "2026-07-30", deliveryProgress: 0, paymentStatus: "Pending", status: "Approved" },
  { id: "po6", number: "PO-2026-137", supplier: "Al-Rayan Plumbing Supply", project: "MAK-2420", value: 180000, ordered: "2026-07-03", expected: "2026-07-18", deliveryProgress: 50, paymentStatus: "Pending", status: "In transit" },
  { id: "po7", number: "PO-2026-140", supplier: "Peninsula Building Materials", project: "MAK-2420", value: 1240000, ordered: "2026-07-05", expected: "2026-07-22", deliveryProgress: 20, paymentStatus: "Pending", status: "In transit" },
  { id: "po8", number: "PO-2026-143", supplier: "MAK Tools & Rentals", project: "MAK-2411", value: 92000, ordered: "2026-07-06", expected: "2026-07-13", deliveryProgress: 100, paymentStatus: "Paid", status: "Closed" },
];

export const purchaseRequests = [
  { id: "pr1", number: "PR-1024", project: "MAK-2411", requester: "Rahim Kutty", category: "Cable trays", value: 82000, required: "2026-07-18", priority: "High", status: "Approved" },
  { id: "pr2", number: "PR-1025", project: "MAK-2409", requester: "Sami Rachid", category: "MV cable termination kits", value: 46000, required: "2026-07-20", priority: "Medium", status: "Under review" },
  { id: "pr3", number: "PR-1026", project: "MAK-2418", requester: "Kiran Dev", category: "Refrigerant R-410A", value: 22000, required: "2026-07-15", priority: "High", status: "RFQ" },
  { id: "pr4", number: "PR-1027", project: "MAK-2420", requester: "Meera Pillai", category: "Rebar ø16", value: 380000, required: "2026-07-25", priority: "Critical", status: "Comparison" },
  { id: "pr5", number: "PR-1028", project: "MAK-2402", requester: "Deepak Rajan", category: "Loop calibrators (rental)", value: 18000, required: "2026-07-17", priority: "Medium", status: "PO created" },
  { id: "pr6", number: "PR-1029", project: "MAK-2412", requester: "Zain Mahfouz", category: "Sprinkler heads NFPA-13", value: 64000, required: "2026-07-19", priority: "High", status: "Approved" },
];

export const assets: Asset[] = [
  { id: "a1", code: "VEH-014", name: "Toyota Hilux 2024", type: "Vehicle", project: "MAK-2411", assignedTo: "Ahmed Al-Suwaidi", condition: "Excellent", utilization: 82, lastService: "2026-05-14", nextService: "2026-08-14", status: "In use" },
  { id: "a2", code: "VEH-021", name: "Mitsubishi Canter 3.5t", type: "Vehicle", project: "MAK-2420", assignedTo: "Hassan Al-Ali", condition: "Good", utilization: 74, lastService: "2026-04-30", nextService: "2026-07-30", status: "In use" },
  { id: "a3", code: "EQP-102", name: "Mobile Crane 25T", type: "Equipment", project: "MAK-2420", assignedTo: null, condition: "Good", utilization: 68, lastService: "2026-06-05", nextService: "2026-09-05", status: "In use" },
  { id: "a4", code: "EQP-108", name: "Scissor Lift 12m", type: "Equipment", project: "MAK-2411", assignedTo: "Omar Hadi", condition: "Excellent", utilization: 91, lastService: "2026-06-20", nextService: "2026-09-20", status: "In use" },
  { id: "a5", code: "TLS-045", name: "Welding Machine Miller 350", type: "Tool", project: "MAK-2402", assignedTo: "Deepak Rajan", condition: "Good", utilization: 60, lastService: "2026-05-10", nextService: "2026-08-10", status: "In use" },
  { id: "a6", code: "TLS-051", name: "Cable Testing Unit", type: "Tool", project: null, assignedTo: null, condition: "Excellent", utilization: 34, lastService: "2026-03-11", nextService: "2026-09-11", status: "Available" },
  { id: "a7", code: "EQP-110", name: "HVAC Vacuum Pump", type: "Equipment", project: "MAK-2418", assignedTo: "Kiran Dev", condition: "Fair", utilization: 55, lastService: "2026-02-14", nextService: "2026-07-14", status: "Under maintenance" },
  { id: "a8", code: "TLS-062", name: "Pipe Threading Machine", type: "Tool", project: "MAK-2420", assignedTo: "Hassan Al-Ali", condition: "Good", utilization: 48, lastService: "2026-05-01", nextService: "2026-08-01", status: "In use" },
  { id: "a9", code: "EQP-114", name: "FLIR Thermal Imaging Camera", type: "Equipment", project: null, assignedTo: null, condition: "Excellent", utilization: 22, lastService: "2026-06-01", nextService: "2026-12-01", status: "Available" },
  { id: "a10", code: "EQP-118", name: "Site Generator 100 kVA", type: "Equipment", project: "MAK-2419", assignedTo: null, condition: "Needs service", utilization: 78, lastService: "2026-04-08", nextService: "2026-07-08", status: "Under maintenance" },
  { id: "a11", code: "VEH-025", name: "Nissan Patrol 2023", type: "Vehicle", project: null, assignedTo: "Sara Al-Mansoori", condition: "Good", utilization: 55, lastService: "2026-04-20", nextService: "2026-07-20", status: "In use" },
  { id: "a12", code: "IT-088", name: "Autodesk Workstation", type: "IT", project: null, assignedTo: "Nour Abdullah", condition: "Excellent", utilization: 88, lastService: "2026-01-15", nextService: "2027-01-15", status: "In use" },
];

export const workOrders: WorkOrder[] = [
  { id: "w1", number: "WO-4021", client: "Saudia Hypermarket", location: "Al Rayyan Store 3", category: "HVAC", priority: "High", technician: "Kiran Dev", sla: "2026-07-09 18:00", status: "In progress", description: "Chiller 2 tripping on high pressure, intermittent." },
  { id: "w2", number: "WO-4022", client: "Korean Embassy", location: "West Bay Chancery", category: "Electrical", priority: "Medium", technician: "Omar Hadi", sla: "2026-07-10 12:00", status: "Assigned", description: "Ground floor lighting circuit failure — Panel LP-2 breaker CB-7." },
  { id: "w3", number: "WO-4023", client: "Milaha Logistics", location: "Warehouse 14", category: "Firefighting", priority: "Critical", technician: "Faisal Malek", sla: "2026-07-08 09:00", status: "Awaiting parts", description: "Sprinkler zone 3 leak — replace pendant heads and gasket." },
  { id: "w4", number: "WO-4024", client: "WOQOD Station 24", location: "Al Wakrah", category: "Plumbing", priority: "Medium", technician: "Hassan Al-Ali", sla: "2026-07-11 15:00", status: "New", description: "Backflow preventer leak on domestic water inlet." },
  { id: "w5", number: "WO-4025", client: "Internal — Fleet", location: "MAK Yard", category: "Mechanical", priority: "Low", technician: "Rashed O.", sla: "2026-07-14 17:00", status: "Assigned", description: "100 kVA generator preventive service — 500 h interval." },
  { id: "w6", number: "WO-4026", client: "PHCC Clinic", location: "Al Wakrah", category: "HVAC", priority: "High", technician: "Priya Sharma", sla: "2026-07-09 12:00", status: "Client review", description: "Consultation room 3 humidity above spec — coil cleaning + control setpoint." },
  { id: "w7", number: "WO-4027", client: "Qatar Cool Tower A", location: "West Bay", category: "Preventive", priority: "Low", technician: "Kiran Dev", sla: "2026-07-20 17:00", status: "New", description: "Quarterly PPM — filters, belts, sensors." },
  { id: "w8", number: "WO-4028", client: "Ooredoo POP", location: "Al Sadd", category: "Electrical", priority: "High", technician: "Sami Rachid", sla: "2026-07-09 20:00", status: "In progress", description: "UPS bypass failure — investigate static switch." },
];

export const observations: Observation[] = [
  { id: "ob1", project: "MAK-2411", category: "PPE", severity: "Medium", reportedBy: "Youssef Rahim", date: "2026-07-05", owner: "Ahmed Al-Suwaidi", due: "2026-07-12", status: "Open" },
  { id: "ob2", project: "MAK-2420", category: "Working at height", severity: "High", reportedBy: "Site HSE", date: "2026-07-04", owner: "Vinod Menon", due: "2026-07-11", status: "In review" },
  { id: "ob3", project: "MAK-2402", category: "Housekeeping", severity: "Low", reportedBy: "Youssef Rahim", date: "2026-07-03", owner: "Deepak Rajan", due: "2026-07-10", status: "Closed" },
  { id: "ob4", project: "MAK-2409", category: "Electrical isolation", severity: "Critical", reportedBy: "Sami Rachid", date: "2026-07-06", owner: "Vinod Menon", due: "2026-07-08", status: "Open" },
  { id: "ob5", project: "MAK-2418", category: "Manual handling", severity: "Medium", reportedBy: "Site HSE", date: "2026-07-02", owner: "Ibrahim Nassar", due: "2026-07-09", status: "In review" },
  { id: "ob6", project: "MAK-2419", category: "Hot work permit", severity: "High", reportedBy: "Youssef Rahim", date: "2026-07-07", owner: "Ahmed Al-Suwaidi", due: "2026-07-14", status: "Open" },
];

export const docs: Doc[] = [
  { id: "d1", number: "DWG-2411-EL-001", name: "Ground Floor Lighting Layout Rev C", category: "Drawings", project: "MAK-2411", revision: "C", owner: "Rahim Kutty", updated: "2026-07-05", status: "Approved" },
  { id: "d2", number: "SUB-2411-HVAC-014", name: "Chilled Water Piping Submittal", category: "Material submittals", project: "MAK-2411", revision: "B", owner: "Priya Sharma", updated: "2026-07-04", status: "Approved with comments" },
  { id: "d3", number: "MS-2420-CIV-002", name: "Concrete Pouring Method Statement", category: "Method statements", project: "MAK-2420", revision: "A", owner: "Meera Pillai", updated: "2026-07-06", status: "Submitted" },
  { id: "d4", number: "RFI-2409-045", name: "MV Cable Routing Clarification", category: "RFIs", project: "MAK-2409", revision: "0", owner: "Sami Rachid", updated: "2026-07-07", status: "Internal review" },
  { id: "d5", number: "IR-2418-020", name: "T&C Inspection Request — Chiller 2", category: "Inspection requests", project: "MAK-2418", revision: "0", owner: "Ibrahim Nassar", updated: "2026-07-06", status: "Submitted" },
  { id: "d6", number: "CERT-HSE-014", name: "ISO 45001 Certificate", category: "Certificates", project: "Corporate", revision: "-", owner: "Youssef Rahim", updated: "2025-12-01", status: "Approved", expiry: "2027-11-30" },
  { id: "d7", number: "CERT-QID-e10", name: "QID — Kiran Dev", category: "Employee documents", project: "Corporate", revision: "-", owner: "Sara Al-Mansoori", updated: "2025-09-01", status: "Approved", expiry: "2026-09-01" },
  { id: "d8", number: "CON-MAK-2420-01", name: "Main Contract — Lusail Villa Compound", category: "Contracts", project: "MAK-2420", revision: "1", owner: "Rania Fahed", updated: "2025-08-01", status: "Approved" },
  { id: "d9", number: "IPC-2411-06", name: "Interim Payment Certificate 06", category: "Invoices", project: "MAK-2411", revision: "0", owner: "Rania Fahed", updated: "2026-06-30", status: "Approved" },
  { id: "d10", number: "SDR-2409-011", name: "Shop Drawing — MV Panel Layout", category: "Shop drawings", project: "MAK-2409", revision: "B", owner: "Sami Rachid", updated: "2026-07-02", status: "Approved" },
  { id: "d11", number: "HSE-2411-TB-018", name: "Toolbox Talk — Working at Height", category: "HSE documents", project: "MAK-2411", revision: "-", owner: "Youssef Rahim", updated: "2026-07-01", status: "Approved" },
];

export const approvals: Approval[] = [
  { id: "ap1", type: "Interim payment certificate", title: "IPC 06 — Lycee Bonaparte MEP", project: "MAK-2411", requestedBy: "Rania Fahed", amount: 1450000, submitted: "2026-07-06", priority: "High", status: "Pending" },
  { id: "ap2", type: "Purchase order", title: "PO-2026-131 — Doha Steel Trading", project: "MAK-2402", requestedBy: "Nour Abdullah", amount: 1800000, submitted: "2026-07-05", priority: "High", status: "Pending" },
  { id: "ap3", type: "Variation order", title: "VO-004 — Additional cable tray", project: "MAK-2411", requestedBy: "Rahim Kutty", amount: 210000, submitted: "2026-07-04", priority: "Medium", status: "Pending" },
  { id: "ap4", type: "Leave request", title: "Annual leave — Layla Ahmed", project: "MAK-2409", requestedBy: "Layla Ahmed", submitted: "2026-07-03", priority: "Low", status: "Pending" },
  { id: "ap5", type: "Material submittal", title: "Submittal — VRF Units Rev B", project: "MAK-2418", requestedBy: "Priya Sharma", submitted: "2026-07-02", priority: "Medium", status: "Pending" },
  { id: "ap6", type: "Purchase request", title: "PR-1027 — Rebar ø16", project: "MAK-2420", requestedBy: "Meera Pillai", amount: 380000, submitted: "2026-07-06", priority: "Critical", status: "Pending" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Review HVAC first fix inspection checklist", project: "MAK-2411", category: "Inspection", assignee: "Ibrahim Nassar", priority: "High", due: "2026-07-08", progress: 40, status: "In progress" },
  { id: "t2", title: "Sign VO-004 variation letter", project: "MAK-2411", category: "Approval", assignee: "Ahmed Al-Suwaidi", priority: "High", due: "2026-07-08", progress: 0, status: "Open" },
  { id: "t3", title: "Prepare MV switchgear delivery plan", project: "MAK-2409", category: "Logistics", assignee: "Vinod Menon", priority: "Medium", due: "2026-07-15", progress: 55, status: "In progress" },
  { id: "t4", title: "Snagging walk — chancery finishes", project: "MAK-2415", category: "Quality", assignee: "Layla Kassem", priority: "Medium", due: "2026-07-12", progress: 30, status: "In progress" },
  { id: "t5", title: "Kickoff Lusail Villa Block C", project: "MAK-2420", category: "Coordination", assignee: "Meera Pillai", priority: "High", due: "2026-07-10", progress: 20, status: "In progress" },
  { id: "t6", title: "Close corrective action — hot work permit", project: "MAK-2419", category: "HSE", assignee: "Youssef Rahim", priority: "Critical", due: "2026-07-09", progress: 60, status: "In progress" },
  { id: "t7", title: "Submit RFI-045 response", project: "MAK-2409", category: "RFI", assignee: "Sami Rachid", priority: "Medium", due: "2026-07-11", progress: 10, status: "Open" },
  { id: "t8", title: "Prepare monthly board briefing pack", project: "Corporate", category: "Reporting", assignee: "Rania Fahed", priority: "High", due: "2026-07-13", progress: 25, status: "In progress" },
];

export const notifications: Notification[] = [
  { id: "n1", category: "Approvals", title: "IPC 06 awaiting your approval", detail: "Lycee Bonaparte — QAR 1,450,000", time: "12 min ago", read: false, severity: "warning" },
  { id: "n2", category: "Project alerts", title: "MV switchgear delivery delayed", detail: "Qatar Distribution Company — new ETA 22 Jul", time: "1 h ago", read: false, severity: "critical" },
  { id: "n3", category: "HR", title: "QID expiring for Omar Hadi", detail: "Expires 30 Jul 2026 — renewal in progress", time: "3 h ago", read: false, severity: "warning" },
  { id: "n4", category: "Finance", title: "Invoice INV-2026-050 overdue", detail: "Qatar Oxygen Company — QAR 2,100,000 · 8 days", time: "5 h ago", read: false, severity: "critical" },
  { id: "n5", category: "Maintenance", title: "Generator service due", detail: "EQP-118 · 100 kVA · service window 8–10 Jul", time: "Yesterday", read: true, severity: "info" },
  { id: "n6", category: "Documents", title: "Submittal approved with comments", detail: "VRF Units Rev B — resubmit by 12 Jul", time: "Yesterday", read: true, severity: "success" },
  { id: "n7", category: "System", title: "Demo environment refreshed", detail: "Baseline scenario restored", time: "2 d ago", read: true, severity: "info" },
];

export const kpiSpark = (base: number, n = 12) => Array.from({ length: n }, (_, i) => base + Math.sin(i * 0.9) * base * 0.12 + (i - n / 2) * base * 0.02);

export const revenueSeries = [
  { m: "Jan", planned: 5.2, actual: 4.9, cost: 3.8 },
  { m: "Feb", planned: 5.4, actual: 5.2, cost: 4.0 },
  { m: "Mar", planned: 5.6, actual: 5.3, cost: 4.1 },
  { m: "Apr", planned: 5.8, actual: 6.0, cost: 4.3 },
  { m: "May", planned: 6.0, actual: 5.8, cost: 4.4 },
  { m: "Jun", planned: 6.2, actual: 6.4, cost: 4.6 },
  { m: "Jul", planned: 6.4, actual: 6.42, cost: 4.7 },
  { m: "Aug", planned: 6.6, actual: 0, cost: 0 },
  { m: "Sep", planned: 6.8, actual: 0, cost: 0 },
  { m: "Oct", planned: 7.0, actual: 0, cost: 0 },
  { m: "Nov", planned: 7.2, actual: 0, cost: 0 },
  { m: "Dec", planned: 7.4, actual: 0, cost: 0 },
];

export const workforceByDept = [
  { dept: "Electrical", allocated: 42, capacity: 48 },
  { dept: "Mechanical", allocated: 26, capacity: 30 },
  { dept: "Civil", allocated: 34, capacity: 40 },
  { dept: "HVAC", allocated: 28, capacity: 32 },
  { dept: "Plumbing", allocated: 18, capacity: 20 },
  { dept: "Firefighting", allocated: 12, capacity: 14 },
  { dept: "PM & Admin", allocated: 14, capacity: 16 },
  { dept: "Instrumentation", allocated: 10, capacity: 12 },
];

export const cashSnapshot = [
  { label: "Invoiced", value: 42.6 },
  { label: "Collected", value: 30.1 },
  { label: "Pending certification", value: 6.4 },
  { label: "Overdue", value: 4.1 },
  { label: "Retention", value: 2.0 },
];

export const expenseBreakdown = [
  { name: "Materials", value: 42 },
  { name: "Labour", value: 24 },
  { name: "Subcontractors", value: 14 },
  { name: "Equipment", value: 9 },
  { name: "Vehicles", value: 5 },
  { name: "Office", value: 3 },
  { name: "Other", value: 3 },
];

export const receivablesAging = [
  { bucket: "Current", value: 6.2 },
  { bucket: "1–30 d", value: 2.8 },
  { bucket: "31–60 d", value: 1.6 },
  { bucket: "61–90 d", value: 1.0 },
  { bucket: ">90 d", value: 1.0 },
];

export const projectDistribution = [
  { city: "Doha", count: 8 },
  { city: "Lusail", count: 3 },
  { city: "Al Rayyan", count: 2 },
  { city: "Mesaieed", count: 2 },
  { city: "Ras Laffan", count: 3 },
];

export const safetyTrend = Array.from({ length: 12 }, (_, i) => ({
  m: ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul"][i],
  nearMiss: Math.max(0, 6 - i + (i % 3)),
  firstAid: (i % 4 === 0 ? 1 : 0),
  unsafe: 8 - Math.min(6, i),
  score: 82 + i,
}));

export const projectHealth = [
  { name: "On track", value: 12, color: "#1FC79A" },
  { name: "At risk", value: 3, color: "#FFB547" },
  { name: "Delayed", value: 2, color: "#FF5C70" },
  { name: "Completed", value: 1, color: "#2F80FF" },
];

export const reportTemplates = [
  { id: "r1", name: "Executive monthly summary", desc: "Consolidated KPIs, project health, financial highlights.", freq: "Monthly", owner: "Rania Fahed", lastGen: "2026-06-30" },
  { id: "r2", name: "Project portfolio report", desc: "Full portfolio with progress, cost, forecast.", freq: "Monthly", owner: "Ahmed Al-Suwaidi", lastGen: "2026-06-28" },
  { id: "r3", name: "Financial performance", desc: "Revenue, cost, margin, cashflow.", freq: "Monthly", owner: "Rania Fahed", lastGen: "2026-06-30" },
  { id: "r4", name: "Receivables aging", desc: "Client-wise aging buckets.", freq: "Weekly", owner: "Rania Fahed", lastGen: "2026-07-05" },
  { id: "r5", name: "Workforce allocation", desc: "Department capacity vs allocation.", freq: "Weekly", owner: "Sara Al-Mansoori", lastGen: "2026-07-05" },
  { id: "r6", name: "Procurement status", desc: "Open PRs, POs, delivery health.", freq: "Weekly", owner: "Sara Al-Mansoori", lastGen: "2026-07-06" },
  { id: "r7", name: "HSE performance", desc: "Observations, NCRs, training compliance.", freq: "Monthly", owner: "Youssef Rahim", lastGen: "2026-06-30" },
  { id: "r8", name: "Asset utilization", desc: "Fleet and equipment utilization trends.", freq: "Monthly", owner: "Sara Al-Mansoori", lastGen: "2026-06-30" },
  { id: "r9", name: "Sales pipeline", desc: "Stage-wise pipeline and win rate.", freq: "Weekly", owner: "Layla Kassem", lastGen: "2026-07-06" },
  { id: "r10", name: "Maintenance SLA report", desc: "Work order SLA compliance and MTTR.", freq: "Monthly", owner: "Ibrahim Nassar", lastGen: "2026-06-30" },
];
