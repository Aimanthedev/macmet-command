# Macmet Command

# Build Macmet Al-Khaleej Command Center — Complete UI-Only Demo

Build a complete, premium, management-grade company operations dashboard for:

**Macmet Al-Khaleej Constructions**
Doha, Qatar
Construction, Civil Contracting, MEP, HVAC, Electrical, Plumbing, Firefighting, Instrumentation, Architectural Works, Maintenance, and Infrastructure Services.

This is a **UI-only client demonstration**. Do not connect Supabase, Lovable Cloud, authentication providers, external APIs, or any backend yet.

The interface must feel complete and interactive, but all information must come from typed local mock data and local React state.

Do not ask additional questions. Make sensible product and design decisions and implement the complete project.

---

# 1. Product Objective

Create an all-in-one digital command center that gives Macmet’s management team a clear view of:

* Company performance
* Active construction and MEP projects
* Project progress and profitability
* Sales opportunities and quotations
* Finance and payment status
* Employees and workforce allocation
* Procurement and purchase orders
* Equipment, vehicles, and company assets
* Maintenance jobs and service requests
* HSE and quality control
* Documents, approvals, and expiring certificates
* Executive reports

The product should make management feel that the entire company can eventually be operated from one calm, modern system instead of disconnected spreadsheets, WhatsApp messages, emails, and paper documents.

The dashboard should be comprehensive without feeling like a complicated ERP.

Use the product name:

**Macmet Command Center**

Subtitle:

**Operations Intelligence Platform**

All business figures, project statuses, employees, transactions, and analytics must be clearly treated as fictional demo data and not real company records.

---

# 2. Required Technology

Build this as a clean static application using:

* React
* Vite
* TypeScript
* Tailwind CSS
* shadcn/ui-style reusable components
* Lucide React icons
* Recharts for charts
* Framer Motion for controlled micro-interactions
* React Router using `HashRouter`
* date-fns where useful

Use `HashRouter` so every screen works reliably on Cloudflare Pages and Vercel without server rewrites or `_redirects`.

Do not use Next.js.

Do not use TanStack Start.

Do not use SSR.

Do not use server components.

Do not use a backend.

Do not install unnecessary packages.

---

# 3. Strict Deployment Architecture

This project must be a static React + Vite + TypeScript application compatible with Cloudflare Pages and Vercel.

## Forbidden technologies and files

Do not use or create:

* TanStack Start
* `@tanstack/react-start`
* SSR
* Cloudflare Workers
* Wrangler
* `@cloudflare/vite-plugin`
* `@lovable.dev/vite-tanstack-config`
* `wrangler.json`
* `wrangler.jsonc`
* `wrangler.toml`
* `public/_redirects`
* `_redirects`
* `src/server.ts`
* Worker entry files
* Server route files
* Edge Functions
* Supabase files
* API routes

## Required package scripts

The `package.json` scripts must be exactly:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

The production build must output to:

```text
dist/
```

## Cloudflare Pages settings

The generated application must work with:

```text
Install command: npm install
Build command: npm run build
Output directory: dist
Deploy command: empty
```

## Vercel support

Create a root-level `vercel.json` containing a simple Vite-compatible configuration:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Do not add Vercel rewrites because routing uses `HashRouter`.

Before completing the project:

1. Run `npm run build`.
2. Fix all TypeScript and build errors.
3. Confirm that `dist/` is generated.
4. Confirm that no Wrangler, Worker, TanStack Start, server, or `_redirects` files exist.
5. Confirm that the root `index.html` exists and contains valid complete HTML.

---

# 4. Remove Lovable Branding

Remove all visible and hidden Lovable starter branding from the application.

In `index.html`:

* Remove references to `favicon.ico`.
* Remove all Lovable preview images.
* Remove all Lovable Open Graph images.
* Remove “Lovable App” from the title.
* Remove Lovable descriptions and metadata.
* Remove any `lovable.dev` asset references.
* Do not leave empty or broken metadata tags.

Set the browser title to:

```text
Macmet Command Center
```

Set the meta description to:

```text
Macmet Al-Khaleej Constructions operations, projects, workforce, finance, procurement and management command center.
```

Create an original lightweight SVG brand mark in `public/macmet-mark.svg`.

Use it as the favicon:

```html
<link rel="icon" type="image/svg+xml" href="/macmet-mark.svg" />
```

Create a simple original Open Graph graphic at:

```text
public/macmet-og.svg
```

Use the SVG in the Open Graph and Twitter metadata.

Do not use or display a Lovable badge, logo, watermark, preview image, text label, or attribution inside the application UI.

---

# 5. Brand Direction

Create a refined visual identity for Macmet without depending on an uploaded logo.

Use an abstract geometric **MAK** monogram inspired by:

* Structural beams
* Engineering grid lines
* Construction geometry
* Electrical flow
* Precision and reliability

The logo lockup should display:

**MAK**
**MACMET AL-KHALEEJ**

Use the full company name in suitable areas, but use “Macmet” and “MAK” in compact navigation areas.

Do not imitate another company’s logo.

---

# 6. Design Direction

The visual style must be:

* Futuristic
* Premium
* Cutting-edge
* Calm
* Data-first
* Executive
* Scannable
* Sophisticated
* Trustworthy
* Suitable for a Qatar-based construction and engineering management team

Avoid an overly playful gaming interface.

Avoid excessive neon.

Avoid generic admin-template styling.

Avoid making every container glow.

The result should look like a premium 2026 enterprise SaaS product designed specifically for an engineering and construction company.

## Dark mode

Dark mode is the default.

Suggested tokens:

```text
Main background: #070A0F
Secondary background: #0A0F16
Panel background: rgba(16, 23, 34, 0.78)
Elevated panel: rgba(20, 29, 43, 0.88)
Primary text: #F4F7FB
Secondary text: #9BA8BA
Muted text: #667386
Border: rgba(255, 255, 255, 0.075)
Electric blue: #2F80FF
Indigo: #675CFF
Emerald: #1FC79A
Amber: #FFB547
Critical red: #FF5C70
Teal: #23C9D6
Purple: #9A6CFF
```

## Light mode

Create a fully designed light mode rather than simply inverting colors.

Suggested tokens:

```text
Main background: #F4F6F9
Secondary background: #EEF2F6
Panel background: rgba(255, 255, 255, 0.88)
Elevated panel: #FFFFFF
Primary text: #101722
Secondary text: #586578
Muted text: #8691A2
Border: rgba(18, 32, 53, 0.09)
```

The theme toggle must work and persist with `localStorage`.

## Typography

Use:

* Inter for UI text
* Manrope or Space Grotesk for KPI numbers and major headings

Use large, confident KPI numbers with excellent alignment and tabular numerals.

Do not use tiny text excessively.

Minimum normal body size should remain comfortably readable.

## Surfaces

Use:

* Frosted glass panels
* Carefully controlled backdrop blur
* Soft inner highlights
* Thin borders
* Layered shadows
* Subtle radial background lighting
* Occasional gradient edges
* Floating cards
* Moderate border radii between 14px and 22px

Do not apply glassmorphism to every small control.

Inputs, tables, and dense data areas must remain clear.

---

# 7. Global Layout

Build a responsive application shell consisting of:

## Desktop sidebar

Create a left navigation sidebar approximately 264px wide.

Include:

* MAK brand lockup
* Workspace label: “Macmet Al-Khaleej”
* Main navigation
* Collapsible navigation groups
* Demo mode status
* Current user card
* Collapse sidebar control

Collapsed width should be approximately 78px and show icon tooltips.

Organize navigation into these groups:

### Command

* Overview
* Projects
* Tasks & Approvals

### Commercial

* Sales & CRM
* Finance
* Procurement

### Operations

* Employees
* Assets & Fleet
* Maintenance
* HSE & Quality

### Intelligence

* Documents
* Reports

### System

* Settings

Use consistent Lucide icons.

## Top bar

Create a sticky top bar containing:

* Mobile sidebar trigger
* Breadcrumb
* Global command search
* Qatar local date and time
* English/Arabic interface toggle
* Dark/light mode toggle
* Notifications button
* User profile menu

The time display should use the Asia/Qatar timezone.

The global search should open a polished command palette using `Ctrl/Cmd + K`.

The command palette should search mock:

* Projects
* Employees
* Clients
* Documents
* Purchase orders
* Work orders

Selecting a result should navigate to the relevant page or detail view.

## Main content

Use:

* A responsive 12-column grid
* Bento-style card composition
* F-pattern hierarchy
* Generous but efficient spacing
* Maximum useful width without creating huge empty margins
* Sticky section headers where appropriate

---

# 8. Responsive Behaviour

The complete application must work at:

* 1440px and larger desktop screens
* Standard laptop widths
* Tablets
* Mobile screens around 375px

## Tablet

* Sidebar becomes a drawer.
* Tables can switch to compact cards where appropriate.
* KPI cards use a two-column grid.
* Charts remain readable.

## Mobile

* Use a polished drawer for navigation.
* Stack KPI cards.
* Use horizontally scrollable tab bars.
* Transform large data tables into mobile summary cards.
* Keep primary actions easily reachable.
* Prevent horizontal page overflow.
* Keep charts at usable heights.
* Use sheets instead of tiny dropdowns where appropriate.

Do not hide important information merely to make mobile easier.

---

# 9. Shared Components

Build modular reusable components instead of repeating markup.

Create components such as:

* `AppShell`
* `Sidebar`
* `Topbar`
* `PageHeader`
* `Breadcrumbs`
* `CommandPalette`
* `KpiCard`
* `TrendBadge`
* `StatusBadge`
* `ChartCard`
* `DataTable`
* `EmptyState`
* `LoadingSkeleton`
* `FilterBar`
* `DateRangeSelector`
* `NotificationDrawer`
* `QuickActionMenu`
* `UserAvatar`
* `ProgressRing`
* `ProjectCard`
* `EmployeeCard`
* `ApprovalCard`
* `ActivityTimeline`
* `DetailDrawer`
* `ConfirmDialog`
* `FormDialog`
* `ToastProvider`
* `ExportButton`
* `MetricTooltip`

Use a consistent design system for:

* Button variants
* Inputs
* Dropdowns
* Tabs
* Tables
* Badges
* Dialogs
* Drawers
* Tooltips
* Toasts
* Pagination
* Skeletons
* Charts

---

# 10. Demo Data Rules

Create realistic, typed mock datasets in dedicated files.

Suggested folder:

```text
src/data/
  dashboard.ts
  projects.ts
  employees.ts
  clients.ts
  finance.ts
  procurement.ts
  assets.ts
  maintenance.ts
  hse.ts
  documents.ts
  notifications.ts
```

Create shared TypeScript types in:

```text
src/types/
```

Add a discreet label in the UI:

```text
Demo environment · Fictional operational data
```

Use Qatari Riyal formatting:

```text
QAR 6.42M
QAR 284,500
```

Use Qatar-relevant formatting and project terminology.

Use metric units.

Use realistic construction language:

* Mobilization
* Submittals
* Shop drawings
* Variation orders
* Interim payment certificates
* Material requests
* RFIs
* Inspections
* Snagging
* Testing and commissioning
* Practical completion
* Retention
* Manpower allocation
* HSE observations
* Procurement lead time

---

# 11. Overview Dashboard

Route:

```text
#/dashboard
```

Create a striking executive overview.

## Header

Show:

* “Good morning, Mohammed”
* “Here is today’s operating position across Macmet.”
* Date selector
* “Export briefing” action
* “Add new” quick action menu

The quick action menu should include:

* New project
* New lead
* New employee
* New purchase request
* New work order
* Upload document

Each option must open a working demo modal.

## KPI row

Create six premium KPI cards:

1. Active Projects
   Value: 18
   Trend: +2 this quarter

2. Total Contract Value
   Value: QAR 146.8M
   Trend: +8.4%

3. Monthly Revenue
   Value: QAR 6.42M
   Trend: +12.6%

4. Outstanding Receivables
   Value: QAR 12.6M
   Trend: 4 overdue invoices

5. Active Workforce
   Value: 184
   Trend: 91% allocated

6. Safety Performance
   Value: 0 LTI
   Trend: 214 safe days

Give each KPI:

* Icon
* Large value
* Context label
* Trend badge
* Subtle sparkline
* Hover elevation
* Accessible tooltip

## Main dashboard grid

Create the following cards:

### Portfolio Performance

Large area chart showing:

* Planned revenue
* Actual revenue
* Project cost
* Forecast

Provide 6M, 12M, and YTD controls.

### Project Health

Donut or segmented visualization showing:

* On track
* At risk
* Delayed
* Completed

Do not overuse radial charts.

### Active Projects

Display five active projects with:

* Project name
* Client
* Discipline
* Progress
* Budget health
* Project manager
* Status
* Next milestone

Use fictional demo records inspired by Macmet’s portfolio:

* Lycee Francais Bonaparte — MEP Upgrade
* Qatar Distribution Company — Electrical Works
* Saudia Hypermarket — HVAC and Firefighting
* Qatar Oxygen Company AIRTEC — Industrial MEP
* Korean Embassy — Facilities Refurbishment
* Lusail Villa Compound — Civil and MEP
* Warehouse 14 — MEP Retrofit
* Utility Substation Works — Electrical and Civil

Clearly mark these as demo projects rather than verified live projects.

### Cash Flow Snapshot

Show:

* Invoiced
* Collected
* Pending certification
* Overdue
* Retention

Use an elegant horizontal stacked bar.

### Workforce Allocation

Show workforce by department:

* Electrical
* Mechanical
* Civil
* HVAC
* Plumbing
* Firefighting
* Administration
* Project management

Include capacity bars and allocation percentages.

### Priority Approvals

Show approval cards for:

* Purchase order
* Variation order
* Leave request
* Interim payment certificate
* Material submittal

Each card must offer working Approve, Reject, and Review actions.

Actions update local state and show a toast.

### Upcoming Milestones

Display a vertical timeline of:

* Inspection
* Material delivery
* Testing and commissioning
* Client handover
* Invoice submission

### Alerts and Risks

Display a concise risk panel with severity levels:

* Delayed material delivery
* Invoice overdue
* Certificate expiring
* Low inventory
* Vehicle service due

Clicking an alert should open a detail drawer.

### Recent Activity

Show a polished activity feed with users, actions, timestamps, and contextual icons.

### Project Locations

Create a lightweight visual card representing project distribution across:

* Doha
* Lusail
* Al Rayyan
* Mesaieed
* Ras Laffan

Do not add a large mapping dependency.

Use an original abstract Qatar-inspired SVG map or location visualization.

---

# 12. Projects Module

Route:

```text
#/projects
```

Create:

* Page title and description
* Add project button
* Portfolio KPIs
* Search
* Filters
* Sort control
* Grid/table view switch
* Export button
* Saved filter button

Filters:

* Status
* Client
* Project manager
* Discipline
* Location
* Risk level
* Date range

Project statuses:

* Planning
* Mobilizing
* In progress
* At risk
* Delayed
* Handover
* Completed

## Project card view

Each project card should include:

* Project code
* Project name
* Client
* Location
* Discipline tags
* Progress
* Budget used
* Completion date
* Project manager
* Team avatars
* Health status
* Next milestone

## Project table view

Columns:

* Project
* Client
* Manager
* Contract value
* Progress
* Cost variance
* Schedule status
* Next milestone
* Status
* Actions

Support:

* Sorting
* Search
* Filtering
* Pagination
* Row selection
* Bulk status update
* CSV export

## Add project

“Add project” opens a polished multi-section modal with:

* Project name
* Project code
* Client
* Location
* Project type
* Contract value
* Start date
* Target completion
* Project manager
* Disciplines
* Initial status
* Description

Submitting adds the project to local state and displays a success toast.

## Project detail

Route pattern:

```text
#/projects/:projectId
```

Create a detailed project workspace.

Header should show:

* Project name
* Project code
* Client
* Location
* Status
* Progress
* Contract value
* Project manager
* Back button
* Edit project
* More actions

Tabs:

* Overview
* Schedule
* Financials
* Team
* Procurement
* Documents
* HSE & Quality
* Activity

### Project overview tab

Include:

* Progress summary
* Cost health
* Schedule health
* Current phase
* Key dates
* Next milestone
* Scope summary
* Progress by discipline
* Weekly progress trend
* Recent site updates
* Risks
* Approvals required

### Schedule tab

Create a simplified visual Gantt-style timeline without a heavy scheduling package.

Show phases:

* Design and approvals
* Procurement
* Civil works
* MEP first fix
* MEP second fix
* Testing and commissioning
* Handover

### Financials tab

Show:

* Contract value
* Approved variations
* Revised contract value
* Certified amount
* Collected amount
* Cost to date
* Forecast margin
* Retention
* Invoice history

### Team tab

Show:

* Project manager
* Engineers
* Supervisors
* Foremen
* Technicians
* Labour allocation
* Attendance summary

### Documents tab

Show project documents with categories, revision numbers, statuses, and approval flows.

All tabs must contain designed content rather than placeholder messages.

---

# 13. Tasks & Approvals

Route:

```text
#/approvals
```

Build a combined personal work queue.

Tabs:

* My tasks
* Awaiting my approval
* Submitted by me
* Completed

Create summary KPIs:

* Due today
* Overdue
* Awaiting approval
* Completed this week

Each task should contain:

* Title
* Project
* Category
* Assignee
* Priority
* Due date
* Progress
* Status

Approval types:

* Purchase request
* Purchase order
* Quotation
* Variation order
* Payment request
* Leave request
* Material submittal
* Document approval

Actions must work with local state:

* Approve
* Reject
* Request changes
* Reassign
* Mark complete
* Add comment

Use modals for confirmation and comments.

---

# 14. Sales & CRM

Route:

```text
#/sales
```

Create a practical CRM suitable for a construction and MEP contractor.

## KPIs

* Open opportunities: 21
* Pipeline value: QAR 32.4M
* Submitted quotations: 14
* Win rate: 38%
* Expected this quarter: QAR 8.9M

## Pipeline board

Create draggable-looking Kanban columns, but drag-and-drop is optional if it risks instability.

Stages:

* New enquiry
* Qualified
* Site visit
* Estimating
* Quotation submitted
* Negotiation
* Won
* Lost

Cards display:

* Opportunity
* Client
* Estimated value
* Probability
* Owner
* Expected close date
* Service type
* Last activity

Clicking a card opens a detailed drawer.

## Sales table

Provide:

* Search
* Filters
* Add opportunity
* Add client
* Export
* Stage changes
* Follow-up date

## Client directory

Create client cards or a client table with fictional demo contacts and recognizable client names supplied for demonstration, such as:

* Qatar Energy
* Qatar Airways
* Ashghal
* ORYX GTL
* PHCC
* Qatar Cool
* QAPCO
* Hamad Medical Corporation
* WOQOD
* Mwani Qatar
* Ooredoo

Do not use external client logos. Use initials or neutral generated marks.

## Quotation detail

Include:

* Scope summary
* Submitted value
* Estimated cost
* Expected margin
* Validity
* Contact person
* Follow-up timeline
* Documents
* Internal notes

---

# 15. Finance

Route:

```text
#/finance
```

This is an executive finance interface, not a full accounting system.

## KPIs

* Revenue this month
* Expenses this month
* Gross margin
* Accounts receivable
* Accounts payable
* Cash position

## Sections

### Revenue versus expense

Interactive line and bar chart.

### Receivables aging

Show:

* Current
* 1–30 days
* 31–60 days
* 61–90 days
* More than 90 days

### Invoice tracker

Columns:

* Invoice number
* Client
* Project
* Amount
* Certification status
* Issue date
* Due date
* Paid amount
* Balance
* Status

Statuses:

* Draft
* Submitted
* Under certification
* Partially paid
* Paid
* Overdue

### Expense breakdown

Categories:

* Materials
* Labour
* Subcontractors
* Equipment
* Vehicles
* Office
* Other

### Project profitability

Show contract value, cost to date, forecast cost, revenue, and forecast margin by project.

### Payment detail drawer

Allow demo actions:

* Mark as submitted
* Mark partial payment
* Mark as paid
* Send reminder
* Download statement

Actions update local state and show toasts.

Use QAR throughout.

---

# 16. Employees and HR

Route:

```text
#/employees
```

## KPIs

* Total employees
* On site today
* On leave
* New hires
* Visa renewals due
* Training compliance

## Employee directory

Support:

* Search
* Department filter
* Project filter
* Employment status
* Card/table view
* Add employee
* Export

Employee cards display:

* Avatar or initials
* Name
* Employee ID
* Role
* Department
* Assigned project
* Phone
* Status
* Skill tags
* Availability

Use diverse realistic fictional names appropriate to a Qatar-based workforce.

## Employee detail drawer

Tabs:

* Profile
* Assignment
* Attendance
* Leave
* Documents
* Training

Display:

* Contact information
* Nationality
* Joining date
* Manager
* Project assignment
* Trade or specialization
* Certification status
* Visa expiry
* QID expiry
* Training records

Do not include actual sensitive personal information.

## Workforce allocation

Create a visual matrix showing personnel assigned to projects and available capacity.

## Leave management

Create a calendar/list combination with working approve and reject actions.

## Expiry alerts

Display upcoming expiries for:

* QID
* Visa
* Medical
* Driving licence
* Safety training
* Trade certification

---

# 17. Procurement

Route:

```text
#/procurement
```

## KPIs

* Open purchase requests
* Purchase orders this month
* Pending approvals
* Material value in transit
* Delayed deliveries
* Average lead time

## Procurement workflow

Represent:

```text
Request → Review → RFQ → Comparison → Approval → Purchase Order → Delivery
```

## Purchase requests

Create a data table with:

* Request number
* Project
* Requested by
* Material category
* Estimated value
* Required date
* Priority
* Status

## Purchase orders

Columns:

* PO number
* Supplier
* Project
* Order value
* Ordered date
* Expected delivery
* Delivery progress
* Payment status
* Status

## Supplier directory

Show:

* Supplier name
* Categories
* Contact
* Rating
* On-time delivery
* Open orders
* Total spend
* Approval status

## Material delivery tracker

Create a timeline showing ordered, dispatched, customs, delivered, and inspected stages.

Add working demo actions:

* New purchase request
* Create RFQ
* Approve request
* Reject request
* Create purchase order
* Mark delivery received

---

# 18. Assets & Fleet

Route:

```text
#/assets
```

Tabs:

* Equipment
* Vehicles
* Tools
* IT assets

## KPIs

* Total assets
* In use
* Available
* Under maintenance
* Service due
* Utilization rate

## Asset table

Columns:

* Asset ID
* Asset
* Type
* Assigned project
* Assigned employee
* Condition
* Utilization
* Last service
* Next service
* Status

Example assets:

* Toyota Hilux
* Mitsubishi Canter
* Mobile crane
* Scissor lift
* Welding machine
* Cable testing unit
* HVAC vacuum pump
* Pipe threading machine
* Thermal imaging camera
* Site generator

## Fleet visual

Show:

* Available vehicles
* Assigned vehicles
* Service due
* Registration expiry
* Fuel trend

Clicking an asset opens a detail drawer with:

* Assignment history
* Service history
* Documents
* Cost history
* Current condition
* Upcoming service

---

# 19. Maintenance and Work Orders

Route:

```text
#/maintenance
```

This module handles both internal equipment maintenance and client maintenance jobs.

## KPIs

* Open work orders
* Due today
* Emergency requests
* SLA compliance
* First-time fix rate
* Completed this month

## Work order board

Statuses:

* New
* Assigned
* In progress
* Awaiting parts
* Client review
* Completed

Work order cards display:

* Work order number
* Client or asset
* Location
* Service category
* Priority
* Assigned technician
* SLA deadline
* Status

Service categories:

* HVAC
* Electrical
* Plumbing
* Firefighting
* Mechanical
* Civil
* Preventive maintenance

## Work order detail

Include:

* Description
* Site location
* Contact
* Photos placeholders
* Assigned team
* Required materials
* Activity timeline
* Technician notes
* Resolution
* Client sign-off state

Support working actions:

* Assign technician
* Change status
* Add note
* Add material
* Complete work order
* Reopen work order

---

# 20. HSE & Quality

Route:

```text
#/hse
```

Create a safety and quality dashboard.

## KPIs

* Safe working days
* Open observations
* Inspections this month
* NCRs open
* Toolbox talks
* Training compliance

## Safety trend

Display:

* Near misses
* First aid cases
* Unsafe observations
* Closed actions
* Inspection scores

## HSE observations

Columns:

* Observation ID
* Project
* Category
* Severity
* Reported by
* Reported date
* Assigned owner
* Due date
* Status

## Quality management

Display:

* Inspection requests
* Material inspections
* Non-conformance reports
* Snag items
* Testing and commissioning records

## Heatmap

Create a tasteful risk heatmap by project and category.

## Actions

Provide working UI for:

* Report observation
* Create inspection
* Raise NCR
* Close corrective action
* Schedule toolbox talk

---

# 21. Documents

Route:

```text
#/documents
```

Create a polished document control center.

## KPIs

* Total documents
* Awaiting approval
* Expiring soon
* Revised this week
* Archived

## Categories

* Contracts
* Drawings
* Shop drawings
* Material submittals
* Method statements
* RFIs
* Inspection requests
* Purchase documents
* Invoices
* Employee documents
* Certificates
* HSE documents

## Document table

Columns:

* Document number
* Document name
* Category
* Project
* Revision
* Owner
* Updated
* Approval status
* Expiry
* Actions

Status examples:

* Draft
* Internal review
* Submitted
* Approved
* Approved with comments
* Rejected
* Superseded

## Document preview drawer

Display:

* File preview placeholder
* Metadata
* Revision history
* Approval timeline
* Related project
* Comments
* Download action
* Share action
* Submit for approval

No actual file upload backend is required.

A mock upload modal should add a local document entry.

---

# 22. Reports

Route:

```text
#/reports
```

Create an executive reporting center.

## Report templates

* Executive monthly summary
* Project portfolio report
* Financial performance
* Receivables aging
* Workforce allocation
* Procurement status
* HSE performance
* Asset utilization
* Sales pipeline
* Maintenance SLA report

Each report card should show:

* Description
* Last generated date
* Frequency
* Owner
* Preview
* Export PDF
* Export CSV

Since there is no backend, PDF export may use a print-friendly view and `window.print()`.

CSV export should generate and download a valid local CSV file.

## Report builder UI

Create a simple visual report builder containing:

* Report type
* Date range
* Projects
* Departments
* Metrics
* Grouping
* Include charts toggle
* Include details toggle
* Generate preview button

The generated preview should update locally.

---

# 23. Settings

Route:

```text
#/settings
```

Create settings sections for:

* Company profile
* Appearance
* Notifications
* Roles preview
* Regional preferences
* Demo data
* System information

## Company profile

Display:

* Macmet Al-Khaleej Constructions
* Doha, Qatar
* C Ring Road
* P.O. Box 63073
* Phone +974 4451 7976
* General email [info@macmet.qa](mailto:info@macmet.qa)
* Sales email [sales@macmet.qa](mailto:sales@macmet.qa)
* Website macmet.qa

Allow editing in local state.

## Appearance

Allow:

* Dark/light theme
* Compact/comfortable density
* Reduced motion
* Sidebar style
* Chart palette
* Accent color

Persist appearance preferences in `localStorage`.

## Regional preferences

Use:

* Currency: QAR
* Timezone: Asia/Qatar
* Date format selector
* Week start selector
* English/Arabic interface selector

## Roles preview

Create fictional roles:

* Managing Director
* Operations Manager
* Finance Manager
* HR and Administration
* Sales Manager
* Project Manager
* HSE Manager
* Employee

Allow switching the active demo role and adjust a few visible quick actions accordingly.

Do not build real authorization.

## Demo data controls

Provide working controls to:

* Reset demo data
* Load optimistic scenario
* Load risk scenario
* Clear saved preferences

Use confirmation dialogs.

---

# 24. Arabic UI Support

Add an English/Arabic toggle in the top bar.

English is the default.

When Arabic is selected:

* Set document direction to `rtl`.
* Mirror the sidebar and directional UI correctly.
* Translate major navigation labels, page headings, buttons, statuses, and common controls.
* Keep project names and technical codes readable.
* Preserve chart layouts and numbers.
* Use a suitable Arabic-compatible font fallback.

A compact translation dictionary is sufficient.

Do not add a large i18n dependency unless necessary.

---

# 25. Notifications

Create a working notification drawer with categories:

* Approvals
* Project alerts
* Finance
* Documents
* HR
* Maintenance
* System

Features:

* Unread count
* Mark as read
* Mark all as read
* Filter by category
* Open related item
* Clear notification

Use fictional notifications such as:

* Interim payment certificate awaiting approval
* Material delivery delayed
* QID expiry approaching
* Invoice overdue
* Vehicle service due
* HSE corrective action overdue

---

# 26. Interaction Requirements

No major visible button should be dead.

Create meaningful UI-only behavior for:

* Navigation
* Theme switching
* Language switching
* Sidebar collapsing
* Search
* Filters
* Sorting
* Pagination
* Tabs
* Modals
* Drawers
* Notifications
* Adding mock records
* Editing mock records
* Approvals
* Status changes
* Exporting CSV
* Printing report views
* Resetting demo data
* Command palette
* Role preview
* Date range selection
* Chart tooltips

Use local React state.

Use `localStorage` only for:

* Theme
* Density
* Language
* Sidebar state
* Demo records created or edited during the session
* Notification read state
* Active demo role

When a user performs an action, provide immediate feedback using:

* Toasts
* Updated badges
* Optimistic state changes
* Confirmation dialogs where appropriate

Create a subtle 300–500ms skeleton transition when opening major routes for the first time.

Do not make the interface feel slow.

---

# 27. Motion and Micro-interactions

Use restrained premium motion:

* Smooth page fades
* Subtle staggered card entry
* Gentle hover lift
* Button press feedback
* Animated chart entrance
* Count-up KPI numbers
* Sidebar width transition
* Drawer and modal spring transitions
* Soft active-navigation indicator
* Small pulsing live-status indicator
* Animated progress bars

Respect `prefers-reduced-motion`.

Do not use:

* Constant large animations
* Excessive parallax
* Cursor-follow effects
* Dramatic 3D rotation on data cards
* Distracting floating objects
* Excessive neon pulses

The dashboard should feel expensive because it is smooth and precise, not because everything moves.

---

# 28. Chart Design

Use minimal, high-quality charts.

Requirements:

* No chart junk
* Minimal borders
* Subtle grid lines
* Useful tooltips
* Clear units
* Accessible colors
* Consistent legend placement
* Realistic data patterns
* Responsive containers
* Empty-state handling
* Theme-aware tooltip surfaces

Use:

* Area charts
* Line charts
* Bar charts
* Horizontal stacked bars
* Small sparklines
* One or two donut charts
* One risk heatmap

Avoid excessive radial gauges.

---

# 29. Tables

All major tables should support the appropriate subset of:

* Search
* Sorting
* Filtering
* Pagination
* Row selection
* Column visibility
* Status badges
* Row actions
* CSV export
* Responsive card transformation

Use sticky table headers where useful.

Avoid overly faint text.

Keep table row heights comfortable.

---

# 30. Accessibility

Implement:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible labels
* Tooltips for icon-only buttons
* Proper dialog focus handling
* Sufficient contrast
* `aria-label` attributes where needed
* Reduced-motion support
* Logical heading structure
* A skip-to-content link

Do not rely on color alone for statuses.

---

# 31. Recommended File Structure

Use a clear structure similar to:

```text
src/
  app/
    App.tsx
    routes.tsx
  components/
    layout/
    shared/
    charts/
    tables/
    forms/
    feedback/
  pages/
    DashboardPage.tsx
    ProjectsPage.tsx
    ProjectDetailPage.tsx
    ApprovalsPage.tsx
    SalesPage.tsx
    FinancePage.tsx
    EmployeesPage.tsx
    ProcurementPage.tsx
    AssetsPage.tsx
    MaintenancePage.tsx
    HsePage.tsx
    DocumentsPage.tsx
    ReportsPage.tsx
    SettingsPage.tsx
    NotFoundPage.tsx
  data/
  hooks/
  lib/
  types/
  styles/
```

Do not place the entire application in one large component.

Keep page-level components readable.

Extract repeated patterns.

Use strict TypeScript types.

Avoid `any`.

---

# 32. Not Found Page

Create a designed 404 route containing:

* MAK brand mark
* “This workspace could not be found.”
* Return to dashboard button
* Subtle engineering-grid visual

Ensure unknown hash routes display this page.

---

# 33. Final Quality Standard

The finished dashboard must feel like a client-ready product demonstration, not a wireframe.

It must include:

* Real content
* Realistic fictional operational data
* Complete navigation
* Designed states
* Functional demo interactions
* Responsive behavior
* Dark and light themes
* Qatar localization
* Working charts
* Working forms
* Working modals
* Working filters
* Working exports
* Clean Vite architecture
* Complete metadata
* No Lovable branding
* No backend
* No Supabase
* No TanStack
* No Worker files
* No broken routes
* No missing HTML
* No deployment-specific hacks

Do not use placeholder text such as lorem ipsum.

Do not leave unfinished cards.

Do not create blank pages.

Do not show “coming soon” for any primary module.

Prioritize visual polish, management usability, and system consistency.

---

# 34. Final Verification Checklist

Before declaring the project complete, inspect the complete codebase and verify:

* The project is React + Vite + TypeScript.
* `index.html` is present and complete.
* The browser title is “Macmet Command Center”.
* No Lovable branding or preview assets remain.
* The custom SVG favicon works.
* Every sidebar item opens a designed route.
* Every primary action has a demo interaction.
* Dark and light themes both look intentional.
* Mobile layouts do not overflow.
* Hash routing works after static deployment.
* `vercel.json` exists at the project root.
* `package.json` contains only the required Vite scripts.
* `npm run build` succeeds.
* The output folder is `dist/`.
* There are no TypeScript errors.
* There are no console errors.
* There are no Wrangler files.
* There are no Worker files.
* There are no TanStack Start packages.
* There are no server files.
* There are no `_redirects` files.
* There is no Supabase connection.
* There are no exposed secrets or API keys.

Deliver the complete working UI-only demonstration.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1d71bb27-4461-4a00-9a7c-9844c7137475).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
