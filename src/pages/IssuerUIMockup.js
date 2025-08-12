import React, { useMemo, useState } from "react";
import {
  Home,
  Upload,
  Database,
  History,
  Blocks,
  ListChecks,
  BadgeCheck,
  Layers,
  DollarSign,
  Landmark,
  FolderOpen,
  FileText,
  Plug,
  Settings as SettingsIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Send,
  Sparkles,
  Paperclip,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Card, CardContent } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import "../App.css";

/**
 * Issuer UI Mockup — v0.8 (UI only)
 * Fixes: resolved JSX syntax error (broken Sidebar), restored missing components (TopBar, HomePage, RegistryPage).
 * - Collapsible left panel (280px → 72px)
 * - "New Batch" routes to Loan Registry **select mode** (shared picker)
 * - Batch Details stub (Loans / Docs / Timeline)
 * - Standardized Snapshot page (from Imports → View Std)
 * - Asset classes: RRE / CRE / Auto
 */

// ---- Sidebar model (BRD v0.5) ----
const NAV = [
  { group: null, items: [{ id: "/home", label: "Home", icon: Home }] },
  {
    group: "Loans",
    items: [
      { id: "/loans/imports", label: "Imports", icon: Upload },
      {
        id: "/loans/registry",
        label: "Loan Registry (Latest)",
        icon: Database,
      },
      { id: "/loans/historical", label: "Historical Tape", icon: History },
      { id: "/loans/nfts", label: "Loan NFTs", icon: Blocks },
    ],
  },
  {
    group: "Verification",
    items: [
      { id: "/verification/batches", label: "Batches", icon: ListChecks },
      {
        id: "/verification/certificates",
        label: "Certificates",
        icon: BadgeCheck,
      },
    ],
  },
  {
    group: "Transactions",
    items: [
      { id: "/transactions", label: "Overview", icon: Layers },
      { id: "/transactions/pools", label: "Pools", icon: Layers },
      {
        id: "/transactions/whole",
        label: "Whole Loan Sales",
        icon: DollarSign,
      },
      {
        id: "/transactions/facilities",
        label: "Credit Facilities",
        icon: Landmark,
      },
      {
        id: "/transactions/participation",
        label: "Participation Agreements",
        icon: DollarSign,
      },
      {
        id: "/transactions/securitizations",
        label: "Securitizations",
        icon: FolderOpen,
      },
    ],
  },
  {
    group: "Other",
    items: [
      { id: "/activity", label: "Activity & Audit", icon: FileText },
      { id: "/integrations", label: "Integrations", icon: Plug },
      { id: "/settings", label: "Settings", icon: SettingsIcon },
    ],
  },
];

// ---- Sample data ----
const initialLoans = [
  {
    loanId: "LN-0001",
    asOfDate: "2025-07-31",
    state: "D",
    selfCertified: false,
    batchId: "IMVA20250731-0001",
    va: "Certified",
    nft: "Minted",
  },
  {
    loanId: "LN-0002",
    asOfDate: "2025-07-31",
    state: "C",
    selfCertified: false,
    batchId: "IMVA20250731-0001",
    va: "Submitted",
    nft: "—",
  },
  {
    loanId: "LN-0003",
    asOfDate: "2025-07-31",
    state: "B",
    selfCertified: true,
    batchId: "—",
    va: "Self-Certified",
    nft: "(blocked)",
  },
  {
    loanId: "LN-0004",
    asOfDate: "2025-07-28",
    state: "B",
    selfCertified: false,
    batchId: "—",
    va: "—",
    nft: "—",
  },
  {
    loanId: "LN-0005",
    asOfDate: "2025-07-25",
    state: "A",
    selfCertified: false,
    batchId: "—",
    va: "—",
    nft: "—",
  },
];

const initialBatches = [
  {
    batchId: "IMVA20250731-0001",
    va: "IntainAI",
    status: "Submitted",
    loans: 25,
    docs: 3,
    submittedAt: "2025-07-31",
    updatedAt: "2025-08-01",
  },
  {
    batchId: "IMVA20250728-0002",
    va: "IntainAI",
    status: "Certified",
    loans: 18,
    docs: 2,
    submittedAt: "2025-07-28",
    updatedAt: "2025-07-30",
  },
  {
    batchId: "IMSC20250720-0003",
    va: "IntainAI",
    status: "Draft",
    loans: 7,
    docs: 0,
    submittedAt: "—",
    updatedAt: "2025-07-20",
  },
];

const sampleCerts = [
  {
    batchId: "IMVA20250728-0002",
    certificateId: "CERT-00045.pdf",
    issuedAt: "2025-07-30",
    size: "184 KB",
    sha256: "a9b3…f1",
  },
];

// ---- Transactions sample data (Dashboard Overview) ----
const deals = [
  {
    id: "POOL-2025-01",
    name: "Mortgage Pool 1",
    type: "Pool",
    status: "Open",
    value: 12500000,
    outstanding: 11800000,
    start: "2025-07-15",
  },
  {
    id: "WLS-2025-05",
    name: "Whole Loan Sale 5",
    type: "Whole Loan Sale",
    status: "Settled",
    value: 5400000,
    outstanding: 0,
    start: "2025-07-28",
  },
  {
    id: "CF-2025-02",
    name: "Warehouse Facility B",
    type: "Credit Facility",
    status: "Active",
    value: 30000000,
    outstanding: 12000000,
    start: "2025-06-01",
  },
  {
    id: "PA-2025-01",
    name: "Residential Participation A",
    type: "Participation Agreement",
    status: "Active",
    value: 15000000,
    outstanding: 15000000,
    start: "2025-07-20",
  },
  {
    id: "PA-2025-02",
    name: "Commercial RE Participation",
    type: "Participation Agreement",
    status: "Draft",
    value: 25000000,
    outstanding: 0,
    start: "2025-08-01",
  },
  {
    id: "SEC-2025-01",
    name: "RMBS 2025-1",
    type: "Securitization",
    status: "Closing",
    value: 80000000,
    outstanding: 80000000,
    start: "2025-08-05",
  },
];

const fmt = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

// ---- UI bits ----
function StateChip({ s }) {
  const cfg = {
    A: { label: "Uploaded", cls: "a" },
    B: { label: "Standardized", cls: "b" },
    C: { label: "Submitted", cls: "c" },
    D: { label: "Verified", cls: "d" },
  };
  return (
    <span className={`state-chip ${cfg[s].cls}`}>
      {s} — {cfg[s].label}
    </span>
  );
}

function Stat({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="metric-label">{title}</div>
      <div className="metric-value">{value}</div>
      {subtitle && <div className="metric-change positive">{subtitle}</div>}
    </div>
  );
}

function TopBar({ route }) {
  const getPageTitle = (route) => {
    if (route === "/home") return "Dashboard";
    if (route === "/loans/imports") return "Imports";
    if (route === "/loans/registry") return "Loan Registry";
    if (route === "/loans/historical") return "Historical Tape";
    if (route === "/loans/nfts") return "Loan NFTs";
    if (route === "/verification/batches") return "Batches";
    if (route === "/verification/certificates") return "Certificates";
    if (route.startsWith("/verification/batch/")) return "Batch Details";
    if (route.startsWith("/loans/standardized/")) return "Standardized Tape";
    if (route === "/transactions") return "Transactions Overview";
    if (route === "/transactions/pools") return "Pools";
    if (route === "/transactions/whole") return "Whole Loan Sales";
    if (route === "/transactions/facilities") return "Credit Facilities";
    if (route === "/transactions/securitizations") return "Securitizations";
    if (route === "/activity") return "Activity & Audit";
    if (route === "/integrations") return "Integrations";
    if (route === "/settings") return "Settings";
    return "Dashboard";
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span className="app-title">Issuer</span>
      </div>
      <div className="top-bar-right">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            className="search-input"
            placeholder="Search loanId, batchId…"
          />
        </div>
        {/* <select className="filter-select">
          <option>RRE</option>
          <option>CRE</option>
          <option>Auto</option>
        </select>
        <select className="filter-select">
          <option>UAT</option>
          <option>Prod</option>
        </select> */}
        {/* <button className="action-button">Help</button> */}
        <button className="action-button secondary">User</button>
      </div>
    </div>
  );
}

function Sidebar({ route, setRoute, collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Sparkles className="nav-icon" />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <div className="logo-title">IntainMARKETS</div>
              <div className="logo-subtitle">Issuer</div>
            </div>
          )}
        </div>
        <button
          className="collapse-button"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="nav-icon" />
          ) : (
            <ChevronLeft className="nav-icon" />
          )}
        </button>
      </div>

      <div className="sidebar-nav">
        {NAV.map((section, si) => (
          <div key={si} className="nav-section">
            {!collapsed && section.group && (
              <div className="nav-group">{section.group}</div>
            )}
            <div className="nav-items">
              {section.items.map((item) => {
                const active = route.startsWith(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => setRoute(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`nav-item ${active ? "active" : ""} ${
                      collapsed ? "collapsed" : ""
                    }`}
                  >
                    <span className="nav-item-content">
                      <item.icon className="nav-icon" />
                      {!collapsed && <span>{item.label}</span>}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Legend (expanded only) */}
        {!collapsed && (
          <div className="sidebar-legend">
            <div className="legend-separator"></div>
            <div className="legend-title">Legend</div>
            <div className="legend-items">
              <div className="legend-item">
                <StateChip s="A" /> <span>Raw uploaded</span>
              </div>
              <div className="legend-item">
                <StateChip s="B" /> <span>Standardized (LTS)</span>
              </div>
              <div className="legend-item">
                <StateChip s="C" /> <span>Submitted to VA</span>
              </div>
              <div className="legend-item">
                <StateChip s="D" /> <span>Verified (Cert)</span>
              </div>
            </div>
            <div className="legend-separator"></div>
            <div className="legend-title">Labels</div>
            <div className="legend-badges">
              <span className="badge secondary">Self‑Certified</span>
              <span className="badge outline">NFT: Minted</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ---- Pages ----
function HomePage() {
  // Transactions overview metrics
  const wlCount = deals.filter((d) => d.type === "Whole Loan Sale").length;
  const cfCount = deals.filter((d) => d.type === "Credit Facility").length;
  const paCount = deals.filter(
    (d) => d.type === "Participation Agreement"
  ).length;
  const secCount = deals.filter((d) => d.type === "Securitization").length;
  const totalFinancing = deals
    .filter((d) => d.type !== "Pool")
    .reduce((a, d) => a + d.value, 0);
  const totalOutstanding = deals.reduce((a, d) => a + d.outstanding, 0);
  const totalLoanValue = deals.reduce((a, d) => a + d.value, 0);

  return (
    <div className="main-content-area">
      {/* Page Header */}
      {/* <div className="page-header">
        <div className="page-title">IntainMARKETS Dashboard</div>
        <div className="page-subtitle">Welcome back! Here's an overview of your loan portfolio and transactions.</div>
      </div> */}

      {/* Pipeline KPIs */}
      <div className="section-header">
        <div className="section-title">Loan Pipeline</div>
      </div>
      <div className="grid-stats">
        <div className="stat-card">
          <div className="metric-value">128</div>
          <div className="metric-label">Raw (A) - Uploaded</div>
          <div className="metric-change positive">+12 this week</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">118</div>
          <div className="metric-label">Standardized (B) - LTS Complete</div>
          <div className="metric-change positive">+8 this week</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">62</div>
          <div className="metric-label">Submitted (C) - Awaiting Cert</div>
          <div className="metric-change negative">-3 this week</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">56</div>
          <div className="metric-label">Verified (D) - Eligible to Mint</div>
          <div className="metric-change positive">+15 this week</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">52</div>
          <div className="metric-label">NFTs Minted - On-chain</div>
          <div className="metric-change positive">+6 this week</div>
        </div>
      </div>

      {/* Transactions Overview */}
      <div className="section-header">
        <div className="section-title">Transactions Overview</div>
      </div>
      <div className="grid-stats">
        <div className="stat-card">
          <div className="metric-value">{wlCount}</div>
          <div className="metric-label">Whole Loan Sales</div>
          <div className="metric-change positive">Active/Recent</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{cfCount}</div>
          <div className="metric-label">Credit Facilities</div>
          <div className="metric-change positive">Active/Recent</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{paCount}</div>
          <div className="metric-label">Participation Agreements</div>
          <div className="metric-change positive">Active/Recent</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{secCount}</div>
          <div className="metric-label">Securitizations</div>
          <div className="metric-change positive">Active/Recent</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{fmt(totalFinancing)}</div>
          <div className="metric-label">Total Financing</div>
          <div className="metric-change positive">Deals + Facilities</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{fmt(totalOutstanding)}</div>
          <div className="metric-label">Total Outstanding</div>
          <div className="metric-change positive">As of today</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="">
        {/* Pools & Deals Table */}
        <div className="main-panel">
          <div className="section-header">
            <div className="section-title">Pools & Deals</div>
            <div className="filter-controls">
              <select className="filter-select">
                <option>All Types</option>
                <option>Credit Facilities</option>
                <option>Participation Agreements</option>
                <option>Whole Loan Sales</option>
                <option>Securitizations</option>
              </select>
              <input
                type="text"
                placeholder="Search deals..."
                className="search-input"
              />
            </div>
          </div>

          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Value</th>
                  <th>Outstanding</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((d) => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: "600" }}>{d.id}</td>
                    <td>{d.type}</td>
                    <td>
                      <span
                        className={`status-badge ${d.status.toLowerCase()}`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td style={{ fontWeight: "600" }}>{fmt(d.value)}</td>
                    <td>{fmt(d.outstanding)}</td>
                    <td>
                      <button
                        className="action-button"
                        style={{ fontSize: "12px" }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImportsPage({ onViewStd }) {
  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold">Imports</div>
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="text-sm font-medium">Excel Upload</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <input
              type="file"
              className="border rounded-xl px-3 py-2 text-sm"
            />
            <input
              type="date"
              className="border rounded-xl px-3 py-2 text-sm"
            />
            <select className="border rounded-xl px-3 py-2 text-sm bg-background">
              <option>RRE</option>
              <option>CRE</option>
              <option>Auto</option>
            </select>
            <Input placeholder="Notes (optional)" />
          </div>
          <div className="flex gap-2">
            <Button size="sm">Upload</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-medium mb-3">Jobs</div>
          <div className="grid grid-cols-12 px-3 py-2 text-xs bg-muted/40 rounded-t-xl">
            <div className="col-span-3">ImportJobId</div>
            <div className="col-span-2">As Of Date</div>
            <div className="col-span-1">Source</div>
            <div className="col-span-1">Rows</div>
            <div className="col-span-2">Checksum</div>
            <div className="col-span-1">LTS</div>
            <div className="col-span-2">Actions</div>
          </div>
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-12 px-3 py-3 text-sm">
                <div className="col-span-3">7f2a9e5c-00{i}</div>
                <div className="col-span-2">2025-07-31</div>
                <div className="col-span-1">excel</div>
                <div className="col-span-1">{1000 + i}</div>
                <div className="col-span-2">a9b3…f1</div>
                <div className="col-span-1">Complete</div>
                <div className="col-span-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    Trigger LTS
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onViewStd(`7f2a9e5c-00${i}`)}
                  >
                    View Std
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RegistryPage({ selectMode, onCreateBatch }) {
  const [selected, setSelected] = useState({});
  const selectedCount = useMemo(
    () => Object.values(selected).filter(Boolean).length,
    [selected]
  );

  const toggle =
    (id, disabled = false) =>
    () => {
      if (disabled) return;
      setSelected((s) => ({ ...s, [id]: !s[id] }));
    };

  return (
    <div className="main-content-area">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <div>
          <div style={{ fontSize: "20px", fontWeight: "600" }}>
            Loan Registry (Latest)
            {selectMode && (
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                — Select loans to create a Batch
              </span>
            )}
          </div>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>
            Select **B — Standardized** loans to create a Batch.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selectMode ? (
            <Button
              size="sm"
              disabled={selectedCount === 0}
              onClick={() =>
                onCreateBatch(Object.keys(selected).filter((k) => selected[k]))
              }
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Batch ({selectedCount})
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              <Send className="h-4 w-4 mr-1" />
              Submit to VA
            </Button>
          )}
        </div>
      </div>

      <div className="grid-stats">
        <Stat title="Raw (A)" value="128" subtitle="Uploaded" />
        <Stat title="Standardized (B)" value="118" subtitle="LTS complete" />
        <Stat title="Submitted (C)" value="62" subtitle="Awaiting Cert" />
        <Stat title="Verified (D)" value="56" subtitle="Eligible to mint" />
      </div>

      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          {selectMode && <div className="col-span-1"></div>}
          <div className={`${selectMode ? "col-span-2" : "col-span-3"}`}>
            Loan ID
          </div>
          <div className="col-span-2">As Of Date</div>
          <div className="col-span-3">State</div>
          <div className="col-span-2">Batch</div>
          <div className="col-span-2">VA</div>
        </div>
        <ScrollArea className="max-h-[48vh]">
          {initialLoans.map((r) => {
            const selectable = r.state === "B";
            const checked = !!selected[r.loanId];
            return (
              <div
                key={r.loanId}
                className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30"
              >
                {selectMode && (
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      aria-label={`select ${r.loanId}`}
                      className="h-4 w-4"
                      disabled={!selectable}
                      checked={checked}
                      onChange={toggle(r.loanId, !selectable)}
                    />
                  </div>
                )}
                <div
                  className={`${
                    selectMode ? "col-span-2" : "col-span-3"
                  } font-medium flex items-center gap-2`}
                >
                  <span>{r.loanId}</span>
                  {r.selfCertified && (
                    <Badge variant="secondary" className="text-[10px]">
                      Self‑Certified
                    </Badge>
                  )}
                </div>
                <div className="col-span-2">{r.asOfDate}</div>
                <div className="col-span-3">
                  <StateChip s={r.state} />
                </div>
                <div className="col-span-2">{r.batchId}</div>
                <div className="col-span-2">{r.va}</div>
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {selectMode && (
        <div className="text-xs text-muted-foreground">
          You are selecting from **Loan Registry (Latest)**. Only B —
          Standardized loans are eligible.
        </div>
      )}
    </div>
  );
}

function HistoricalPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold">Historical Tape (Raw)</div>
      <div className="flex items-center gap-2">
        <Input placeholder="LoanId" className="w-44" />
        <input type="date" className="border rounded-xl px-3 py-2 text-sm" />
        <input type="date" className="border rounded-xl px-3 py-2 text-sm" />
        <Button size="sm" variant="outline">
          Filter
        </Button>
      </div>
      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          <div className="col-span-3">LoanId</div>
          <div className="col-span-2">As Of Date</div>
          <div className="col-span-3">ImportJobId</div>
          <div className="col-span-2">Columns(#)</div>
          <div className="col-span-2">Download</div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm border-t">
            <div className="col-span-3">LN-00{i}</div>
            <div className="col-span-2">2025-07-2{i}</div>
            <div className="col-span-3">7f2a9e5c-00{i}</div>
            <div className="col-span-2">35</div>
            <div className="col-span-2">
              <Button size="sm" variant="outline">
                Raw JSON
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NFTsPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold">Loan NFTs</div>
      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          <div className="col-span-2">LoanId</div>
          <div className="col-span-2">BatchId</div>
          <div className="col-span-2">TokenId</div>
          <div className="col-span-2">Chain</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right pr-2">Actions</div>
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30"
          >
            <div className="col-span-2">LN-000{i}</div>
            <div className="col-span-2">IMVA20250728-0002</div>
            <div className="col-span-2">1000{i}</div>
            <div className="col-span-2">Polygon</div>
            <div className="col-span-2">
              <Badge variant="outline">Minted</Badge>
            </div>
            <div className="col-span-2 text-right pr-2">
              <Button size="sm" variant="outline">
                View on chain
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BatchesPage({ onNewBatch, onOpen }) {
  const [statusFilter] = useState("All Statuses");
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Batches</div>
        <Button size="sm" variant="outline" onClick={onNewBatch}>
          New Batch
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <select
          className="border rounded-xl px-3 py-2 text-sm bg-background"
          value={statusFilter}
          readOnly
        >
          <option>All Statuses</option>
          <option>Draft</option>
          <option>Submitted</option>
          <option>Accepted</option>
          <option>Rejected</option>
          <option>Certified</option>
          <option>Self-Certified</option>
        </select>
        <Input placeholder="Search batchId…" className="w-60" />
      </div>
      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          <div className="col-span-3">BatchId</div>
          <div className="col-span-2">VA</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Loans</div>
          <div className="col-span-1">Docs</div>
          <div className="col-span-1">Submitted</div>
          <div className="col-span-2">Updated</div>
        </div>
        {initialBatches.map((b) => (
          <button
            key={b.batchId}
            className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30 w-full text-left"
            onClick={() => onOpen(b.batchId)}
          >
            <div className="col-span-3 font-medium text-blue-600 hover:underline">
              {b.batchId}
            </div>
            <div className="col-span-2">{b.va}</div>
            <div className="col-span-2">{b.status}</div>
            <div className="col-span-1">{b.loans}</div>
            <div className="col-span-1">{b.docs}</div>
            <div className="col-span-1">{b.submittedAt}</div>
            <div className="col-span-2">{b.updatedAt}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CertificatesPage() {
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [mintModalOpen, setMintModalOpen] = useState(false);
  const [mintType, setMintType] = useState("batch"); // 'batch' or 'single'
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [acknowledgmentAccepted, setAcknowledgmentAccepted] = useState(false);

  const handleMintNFT = (certificate) => {
    setSelectedCertificate(certificate);
    setMintModalOpen(true);
    setMintType("single");
    setAcknowledgmentAccepted(false);
  };

  const handleBatchMint = () => {
    if (selectedCertificates.length > 0) {
      setMintModalOpen(true);
      setMintType("batch");
      setAcknowledgmentAccepted(false);
    }
  };

  const getVerificationBadge = (type) => {
    switch (type) {
      case "SC_DAI":
        return (
          <span className="badge secondary">Self-Certified (Docs + AI)</span>
        );
      case "SC_LTS":
        return (
          <span className="badge secondary">Self-Certified (Data-Only)</span>
        );
      case "VA_CERT":
        return <span className="badge outline">Certified by VA</span>;
      default:
        return <span className="badge outline">—</span>;
    }
  };

  const getVerificationAgentText = (type, agent) => {
    if (type === "SC_DAI") {
      return "Issuer (Self)";
    } else if (type === "VA_CERT") {
      return agent || "—";
    } else if (type === "SC_LTS") {
      return "—";
    }
    return "—";
  };

  const isReadyToMint = (cert) => {
    // BR-08: Status validation
    if (
      cert.verificationType === "SC_DAI" ||
      cert.verificationType === "VA_CERT"
    ) {
      return cert.status === "Certified";
    } else if (cert.verificationType === "SC_LTS") {
      return cert.status === "Ready" && cert.ltsSnapshotId;
    }
    return false;
  };

  // Mock data for certificates with verification types per BRD
  const certificates = [
    {
      id: "CERT-001",
      loanId: "LN-0001",
      borrower: "John Smith",
      verificationType: "SC_DAI",
      verificationAgent: "IntainAI",
      asOfDate: "2025-07-31",
      status: "Certified",
      amount: 250000,
      hasDocuments: true,
      overrideCount: 2,
      attestationId: "SC_DAI-ACME-20250731-001",
      attestationUri: "ipfs://QmX...",
      ltv: 75,
      fico: 720,
      aiExceptionReportId: "AI-REP-001",
      docEvidence: ["doc1.pdf", "doc2.pdf"],
      overrides: [
        {
          field: "income",
          aiValue: 75000,
          issuerValue: 85000,
          reason: "Updated W2",
        },
      ],
    },
    {
      id: "CERT-002",
      loanId: "LN-0002",
      borrower: "Jane Doe",
      verificationType: "VA_CERT",
      verificationAgent: "ThirdParty VA",
      asOfDate: "2025-07-31",
      status: "Certified",
      amount: 180000,
      hasDocuments: true,
      overrideCount: 0,
      attestationId: "VA_CERT-TPV-20250731-002",
      attestationUri: "ipfs://QmY...",
      ltv: 68,
      fico: 745,
      vaCertificateUri: "ipfs://QmZ...",
      agentId: "uuid-123",
      agentName: "ThirdParty VA",
    },
    {
      id: "CERT-003",
      loanId: "LN-0003",
      borrower: "Bob Johnson",
      verificationType: "SC_LTS",
      verificationAgent: null,
      asOfDate: "2025-07-31",
      status: "Ready",
      amount: 320000,
      hasDocuments: false,
      overrideCount: 0,
      attestationId: "SC_LTS-ACME-20250731-003",
      attestationUri: "ipfs://QmA...",
      ltv: 82,
      fico: 680,
      ltsSnapshotId: "LTS-SNAP-003",
      ltsSchemaVersion: "1.2",
      mappingConfigId: "MAP-001",
      dataCompleteness: {
        requiredPct: 95,
        optionalPct: 78,
        unmapped: ["field1", "field2"],
      },
    },
    {
      id: "CERT-004",
      loanId: "LN-0004",
      borrower: "Alice Brown",
      verificationType: "VA_CERT",
      verificationAgent: "Premium VA Services",
      asOfDate: "2025-07-28",
      status: "Certified",
      amount: 195000,
      hasDocuments: true,
      overrideCount: 1,
      attestationId: "VA_CERT-PVS-20250728-004",
      attestationUri: "ipfs://QmB...",
      ltv: 71,
      fico: 735,
      vaCertificateUri: "ipfs://QmC...",
      agentId: "uuid-456",
      agentName: "Premium VA Services",
    },
    {
      id: "CERT-005",
      loanId: "LN-0005",
      borrower: "Charlie Wilson",
      verificationType: "SC_DAI",
      verificationAgent: "IntainAI",
      asOfDate: "2025-07-25",
      status: "Certified",
      amount: 275000,
      hasDocuments: true,
      overrideCount: 3,
      attestationId: "SC_DAI-ACME-20250725-005",
      attestationUri: "ipfs://QmD...",
      ltv: 78,
      fico: 710,
      aiExceptionReportId: "AI-REP-002",
      docEvidence: ["contract.pdf", "income.pdf", "appraisal.pdf"],
      overrides: [
        {
          field: "propertyValue",
          aiValue: 350000,
          issuerValue: 375000,
          reason: "Updated appraisal",
        },
        {
          field: "fico",
          aiValue: 695,
          issuerValue: 710,
          reason: "Recent credit pull",
        },
      ],
    },
  ];

  const filteredCertificates = certificates.filter((cert) => {
    const matchesType =
      filterType === "all" ||
      (filterType === "sc_dai" && cert.verificationType === "SC_DAI") ||
      (filterType === "sc_lts" && cert.verificationType === "SC_LTS") ||
      (filterType === "va_cert" && cert.verificationType === "VA_CERT");

    const matchesSearch =
      searchTerm === "" ||
      cert.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.borrower.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getVerificationAgentText(cert.verificationType, cert.verificationAgent)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  const readyToMintCertificates = filteredCertificates.filter(isReadyToMint);
  const selectedReadyToMint = selectedCertificates.filter((id) =>
    readyToMintCertificates.some((cert) => cert.id === id)
  );

  const totalSelectedValue = selectedReadyToMint.reduce((sum, certId) => {
    const cert = certificates.find((c) => c.id === certId);
    return sum + (cert ? cert.amount : 0);
  }, 0);

  const hasSC_LTSSelected = selectedReadyToMint.some((id) => {
    const cert = certificates.find((c) => c.id === id);
    return cert && cert.verificationType === "SC_LTS";
  });

  const fmt = (n) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  return (
    <div className="main-content-area">
      <div className="section-header">
        <div className="section-title">NFT Creation - Certificates</div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Verification Types</option>
            <option value="sc_dai">Self-Certified (Docs + AI)</option>
            <option value="sc_lts">Self-Certified (Data-Only)</option>
            <option value="va_cert">Certified by VA</option>
          </select>
          <input
            type="text"
            placeholder="Search loan, borrower or verification agent..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="action-button"
            onClick={handleBatchMint}
            disabled={selectedReadyToMint.length === 0}
          >
            <Plus className="h-4 w-4 mr-1" />
            Mint Selected ({selectedReadyToMint.length})
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid-stats" style={{ marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="metric-value">{readyToMintCertificates.length}</div>
          <div className="metric-label">Ready to Mint</div>
          <div className="metric-change positive">Certified & Validated</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">
            {fmt(
              readyToMintCertificates.reduce(
                (sum, cert) => sum + cert.amount,
                0
              )
            )}
          </div>
          <div className="metric-label">Total Value</div>
          <div className="metric-change positive">Ready for NFT Creation</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{selectedReadyToMint.length}</div>
          <div className="metric-label">Selected for Minting</div>
          <div className="metric-change positive">
            {fmt(totalSelectedValue)}
          </div>
        </div>
        <div className="stat-card">
          <div className="metric-value">
            {
              readyToMintCertificates.filter(
                (c) => c.verificationType === "SC_LTS"
              ).length
            }
          </div>
          <div className="metric-label">Data-Only Certificates</div>
          <div className="metric-change positive">Require Acknowledgment</div>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedReadyToMint.length ===
                      readyToMintCertificates.length &&
                    readyToMintCertificates.length > 0
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCertificates(
                        readyToMintCertificates.map((c) => c.id)
                      );
                    } else {
                      setSelectedCertificates([]);
                    }
                  }}
                />
              </th>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>As-Of Date</th>
              <th>Verification Type</th>
              <th>Verification Agent</th>
              <th>Amount</th>
              <th>LTV</th>
              <th>FICO</th>
              <th>Docs?</th>
              <th>Overrides</th>
              <th>Attestation ID</th>
              <th>Ready to Mint</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCertificates.map((cert) => {
              const ready = isReadyToMint(cert);
              const selected = selectedCertificates.includes(cert.id);

              return (
                <tr key={cert.id} className={!ready ? "disabled-row" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected}
                      disabled={!ready}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCertificates([
                            ...selectedCertificates,
                            cert.id,
                          ]);
                        } else {
                          setSelectedCertificates(
                            selectedCertificates.filter((id) => id !== cert.id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td style={{ fontWeight: "600" }}>{cert.loanId}</td>
                  <td>{cert.borrower}</td>
                  <td>{cert.asOfDate}</td>
                  <td>{getVerificationBadge(cert.verificationType)}</td>
                  <td>
                    <span className="text-xs text-slate-500">
                      {getVerificationAgentText(
                        cert.verificationType,
                        cert.verificationAgent
                      )}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{fmt(cert.amount)}</td>
                  <td>{cert.ltv}%</td>
                  <td>{cert.fico}</td>
                  <td>
                    <span className="text-xs text-slate-500">
                      {cert.hasDocuments ? "Yes" : "No"}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-slate-500">
                      {cert.overrideCount > 0 ? `${cert.overrideCount}` : "—"}
                    </span>
                  </td>
                  <td>
                    <span className="text-xs text-slate-500 font-mono">
                      {cert.attestationId}
                    </span>
                  </td>
                  <td>
                    {ready ? (
                      <Badge variant="outline" className="status-badge ready">
                        Ready
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="status-badge not-ready"
                      >
                        Not Ready
                      </Badge>
                    )}
                  </td>
                  <td>
                    <button
                      className="action-button"
                      onClick={() => handleMintNFT(cert)}
                      disabled={!ready}
                      style={{ fontSize: "12px" }}
                    >
                      Mint NFT
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Enhanced Mint Modal */}
      {mintModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "700px" }}>
            <div className="modal-header">
              <h3>Confirm NFT Minting</h3>
              <button
                className="modal-close"
                onClick={() => setMintModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {mintType === "single" && selectedCertificate ? (
                <div>
                  <div className="certificate-preview">
                    <h4>Certificate Details</h4>
                    <div className="certificate-grid">
                      <div className="cert-field">
                        <label>Certificate ID:</label>
                        <span>{selectedCertificate.id}</span>
                      </div>
                      <div className="cert-field">
                        <label>Loan ID:</label>
                        <span>{selectedCertificate.loanId}</span>
                      </div>
                      <div className="cert-field">
                        <label>Borrower:</label>
                        <span>{selectedCertificate.borrower}</span>
                      </div>
                      <div className="cert-field">
                        <label>Verification Type:</label>
                        <span>
                          {getVerificationBadge(
                            selectedCertificate.verificationType
                          )}
                        </span>
                      </div>
                      <div className="cert-field">
                        <label>Verification Agent:</label>
                        <span>
                          {getVerificationAgentText(
                            selectedCertificate.verificationType,
                            selectedCertificate.verificationAgent
                          )}
                        </span>
                      </div>
                      <div className="cert-field">
                        <label>Attestation ID:</label>
                        <span className="font-mono">
                          {selectedCertificate.attestationId}
                        </span>
                      </div>
                      <div className="cert-field">
                        <label>Amount:</label>
                        <span>{fmt(selectedCertificate.amount)}</span>
                      </div>
                      <div className="cert-field">
                        <label>Documents:</label>
                        <span>
                          {selectedCertificate.hasDocuments ? "Yes" : "No"}
                        </span>
                      </div>
                      {selectedCertificate.overrideCount > 0 && (
                        <div className="cert-field">
                          <label>Overrides:</label>
                          <span>{selectedCertificate.overrideCount}</span>
                        </div>
                      )}
                      {selectedCertificate.verificationType === "SC_LTS" && (
                        <div className="cert-field">
                          <label>LTS Snapshot ID:</label>
                          <span className="font-mono">
                            {selectedCertificate.ltsSnapshotId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCertificate.verificationType === "SC_LTS" && (
                    <div className="acknowledgment-section">
                      <div className="acknowledgment-header">
                        <div className="acknowledgment-icon">⚠️</div>
                        <h4>Data-Only Acknowledgment Required</h4>
                      </div>
                      <div className="acknowledgment-content">
                        <p>
                          This NFT will be minted based on LTS-standardized data
                          only. No loan documents are attached.
                        </p>
                        <ul>
                          <li>Investor-visible verification type</li>
                          <li>No document evidence included</li>
                          <li>
                            Based on LTS snapshot:{" "}
                            {selectedCertificate.ltsSnapshotId}
                          </li>
                        </ul>
                        <label className="acknowledgment-checkbox">
                          <input
                            type="checkbox"
                            checked={acknowledgmentAccepted}
                            onChange={(e) =>
                              setAcknowledgmentAccepted(e.target.checked)
                            }
                          />
                          <span>
                            I acknowledge that this NFT will be minted without
                            document verification (data-only)
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="batch-summary">
                    <h4>Batch Minting Summary</h4>
                    <div className="batch-stats">
                      <div className="batch-stat">
                        <label>Selected Certificates:</label>
                        <span>{selectedReadyToMint.length}</span>
                      </div>
                      <div className="batch-stat">
                        <label>Total Value:</label>
                        <span>{fmt(totalSelectedValue)}</span>
                      </div>
                      <div className="batch-stat">
                        <label>Verification Types:</label>
                        <span>
                          {Array.from(
                            new Set(
                              selectedReadyToMint.map((id) => {
                                const cert = certificates.find(
                                  (c) => c.id === id
                                );
                                return cert ? cert.verificationType : null;
                              })
                            )
                          ).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {hasSC_LTSSelected && (
                    <div className="acknowledgment-section">
                      <div className="acknowledgment-header">
                        <div className="acknowledgment-icon">⚠️</div>
                        <h4>Data-Only Acknowledgment Required</h4>
                      </div>
                      <div className="acknowledgment-content">
                        <p>
                          Some NFTs will be minted based on LTS-standardized
                          data only. No loan documents are attached.
                        </p>
                        <ul>
                          <li>Investor-visible verification type</li>
                          <li>No document evidence included</li>
                          <li>Based on LTS snapshots</li>
                        </ul>
                        <label className="acknowledgment-checkbox">
                          <input
                            type="checkbox"
                            checked={acknowledgmentAccepted}
                            onChange={(e) =>
                              setAcknowledgmentAccepted(e.target.checked)
                            }
                          />
                          <span>
                            I acknowledge that some NFTs will be minted without
                            document verification (data-only)
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setMintModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  if (hasSC_LTSSelected && !acknowledgmentAccepted) {
                    alert(
                      "Please acknowledge the data-only minting before proceeding."
                    );
                    return;
                  }
                  console.log(
                    "Minting NFTs...",
                    mintType === "single"
                      ? selectedCertificate
                      : selectedReadyToMint
                  );
                  setMintModalOpen(false);
                  setSelectedCertificates([]);
                }}
                disabled={hasSC_LTSSelected && !acknowledgmentAccepted}
              >
                {mintType === "single"
                  ? "Mint NFT"
                  : `Mint ${selectedReadyToMint.length} NFTs`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BatchDetailsPage({ batchId, selectedLoans }) {
  const [tab, setTab] = useState("loans");
  const [docs, setDocs] = useState(0);
  const [verificationType, setVerificationType] = useState("VA_CERT"); // Default to VA certification
  const [selfCertified, setSelfCertified] = useState(false);
  
  // Determine what actions are available based on verification type
  const getBatchActions = () => {
    if (verificationType === "SC_DAI") {
      // Self-Certified (Docs + AI Review)
      return (
        <div className="flex items-center gap-2">
          {/* <div className="verification-type-indicator">
            <span className="badge secondary">Self-Certified (Docs + AI)</span>
          </div> */}
          <Button 
            size="sm" 
            disabled={docs === 0}
            className="action-button primary"
          >
            <Send className="h-4 w-4 mr-1"/>
            Submit to IntainAI for Review
          </Button>
        </div>
      );
    } else if (verificationType === "SC_LTS") {
      // Self-Certified (Data-Only)
      return (
        <div className="flex items-center gap-2">
          {/* <div className="verification-type-indicator">
            <span className="badge secondary">Self-Certified (Data-Only)</span>
          </div> */}
          <Button 
            size="sm" 
            disabled={selectedLoans.length === 0}
            className="action-button primary"
          >
            <BadgeCheck className="h-4 w-4 mr-1"/>
            Self-Certify Batch
          </Button>
        </div>
      );
    } else {
      // VA_CERT - Default case
      return (
        <div className="flex items-center gap-2">
          {/* <div className="verification-type-indicator">
            <span className="badge outline">Certified by VA</span>
          </div> */}
          <Button 
            size="sm" 
            disabled={docs === 0}
            className="action-button"
          >
            <Send className="h-4 w-4 mr-1"/>
            Submit to IntainAI
          </Button>
        </div>
      );
    }
  };

  const getBatchStatus = () => {
    if (verificationType === "SC_LTS") {
      return "Draft • Data-Only Self-Certification";
    } else if (verificationType === "SC_DAI") {
      return "Draft • Self-Certified (Docs + AI)";
    } else {
      return "Draft • VA: IntainAI";
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Batch {batchId}</div>
          <div className="text-sm text-muted-foreground">{getBatchStatus()}</div>
        </div>
        
        {/* Verification Type Selector */}
        <div className="flex items-center gap-4">
          <div className="verification-type-selector">
            <label className="text-sm font-medium">Verification Type:</label>
            <select 
              className="filter-select ml-2"
              value={verificationType}
              onChange={(e) => setVerificationType(e.target.value)}
            >
              <option value="VA_CERT">Certified by VA</option>
              <option value="SC_DAI">Self-Certified (Docs + AI)</option>
              <option value="SC_LTS">Self-Certified (Data-Only)</option>
            </select>
          </div>
          
          {getBatchActions()}
        </div>
      </div>

      {/* Verification Type Info */}
      <div className="verification-info-card">
        <div className="info-header">
          <h4 className="info-title">Verification Type Details</h4>
        </div>
        <div className="info-content">
          {verificationType === "SC_DAI" && (
            <div className="info-text">
              <p><strong>Self-Certified (Docs + AI Review):</strong> Upload loan documents for AI review. 
              You will review AI exceptions and can override them before self-certifying.</p>
              <ul className="info-list">
                <li>Documents required for each loan</li>
                <li>AI will flag exceptions for your review</li>
                <li>You can override AI findings with reasons</li>
                <li>Final self-certification by issuer</li>
              </ul>
            </div>
          )}
          {verificationType === "SC_LTS" && (
            <div className="info-text">
              <p><strong>Self-Certified (Data-Only):</strong> No documents uploaded. 
              Self-certification based on LTS-standardized data only.</p>
              <ul className="info-list">
                <li>No documents required</li>
                <li>Based on LTS-standardized loan data</li>
                <li>Investor-visible verification type</li>
                <li>Requires explicit acknowledgment</li>
              </ul>
            </div>
          )}
          {verificationType === "VA_CERT" && (
            <div className="info-text">
              <p><strong>Certified by VA:</strong> Third-party verification agent (IntainAI) 
              will review and certify the loans.</p>
              <ul className="info-list">
                <li>Documents required for each loan</li>
                <li>IntainAI performs verification</li>
                <li>Third-party certification</li>
                <li>Standard verification process</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={tab === "loans" ? "default" : "outline"} size="sm" onClick={() => setTab("loans")}>Loans</Button>
        {verificationType !== "SC_LTS" && (
          <Button variant={tab === "docs" ? "default" : "outline"} size="sm" onClick={() => setTab("docs")}>Documents</Button>
        )}
        <Button variant={tab === "timeline" ? "default" : "outline"} size="sm" onClick={() => setTab("timeline")}>Timeline</Button>
      </div>

      {tab === "loans" && (
        <div className="border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
            <div className="col-span-4">LoanId</div>
            <div className="col-span-3">As Of Date Used</div>
            <div className="col-span-3">State</div>
            <div className="col-span-2">Verification Type</div>
          </div>
          {initialLoans.filter((l) => selectedLoans.includes(l.loanId)).map((l) => (
            <div key={l.loanId} className="grid grid-cols-12 px-4 py-3 text-sm border-t">
              <div className="col-span-4">{l.loanId}</div>
              <div className="col-span-3">{l.asOfDate}</div>
              <div className="col-span-3"><StateChip s={l.state} /></div>
              <div className="col-span-2">
                <span className="text-xs">
                  {verificationType === "SC_DAI" ? "Docs + AI" : 
                   verificationType === "SC_LTS" ? "Data-Only" : "VA Cert"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "docs" && verificationType !== "SC_LTS" && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="text-sm font-medium">Upload Documents</div>
            <div className="flex items-center gap-2">
              <input type="file" multiple className="border rounded-xl px-3 py-2 text-sm" />
              <select className="border rounded-xl px-3 py-2 text-sm bg-background">
                <option>contract</option>
                <option>supporting</option>
                <option>other</option>
              </select>
              <Button size="sm" onClick={() => setDocs((d) => d + 1)}>
                <Paperclip className="h-4 w-4 mr-1"/>Add
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              {docs} document(s) added in this session. (SHA‑256 computed server‑side)
            </div>
            {verificationType === "SC_DAI" && (
              <div className="text-xs text-blue-600">
                Note: Documents will be reviewed by AI, and you'll have the opportunity to review exceptions.
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "timeline" && (
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Events</div>
            <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
              <li>Batch created (Draft)</li>
              <li>Verification type set to: {verificationType}</li>
              {verificationType !== "SC_LTS" && <li>Documents uploaded (pending)</li>}
              <li>— awaiting submit —</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StdSnapshotPage({ jobId, onOpenRegistry }) {
  const standardized = initialLoans.filter((l) =>
    ["B", "C", "D"].includes(l.state)
  );
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">
            Standardized Tape — ImportJob {jobId}
          </div>
          <div className="text-sm text-muted-foreground">
            Read‑only view of StdLoanSnapshot for this import. Batch creation
            happens in Loan Registry (Latest).
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            Export CSV
          </Button>
          <Button size="sm" variant="outline">
            Export JSON
          </Button>
          <Button size="sm" onClick={onOpenRegistry}>
            Open in Registry (Latest)
          </Button>
        </div>
      </div>

      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          <div className="col-span-3">LoanId</div>
          <div className="col-span-2">As Of Date</div>
          <div className="col-span-2">Asset Class</div>
          <div className="col-span-3">Template</div>
          <div className="col-span-2">State</div>
        </div>
        {standardized.map((l) => (
          <div
            key={l.loanId}
            className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30"
          >
            <div className="col-span-3">{l.loanId}</div>
            <div className="col-span-2">{l.asOfDate}</div>
            <div className="col-span-2">RMBS</div>
            <div className="col-span-3">MortgageTemplateV1</div>
            <div className="col-span-2">
              <StateChip s={l.state} />
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">
            Note: If newer snapshots exist for a LoanId, **Loan Registry
            (Latest)** will automatically use the latest `asOfDate` when
            creating a batch.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="p-4">
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-muted-foreground">
        (Mockup placeholder – to be built in dedicated module.)
      </div>
    </div>
  );
}

function PoolsPage() {
  const [selectedPool, setSelectedPool] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [dealWizardOpen, setDealWizardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Sample pools data
  const pools = [
    {
      id: "POOL-2025-01",
      name: "Residential Mortgage Pool Alpha",
      type: "Securitization",
      status: "Preview",
      loanCount: 1250,
      totalValue: 250000000,
      nftCount: 1180,
      missingNfts: 70,
      createdBy: "John Smith",
      createdAt: "2025-07-15",
      lastShared: "2025-08-01",
      sharedWith: ["Goldman Sachs", "Morgan Stanley"],
      feedback: [
        {
          from: "Goldman Sachs",
          date: "2025-08-02",
          type: "Pool",
          message: "Consider adding more jumbo loans",
        },
        {
          from: "Morgan Stanley",
          date: "2025-08-03",
          type: "Loan",
          loanId: "LN-0456",
          message: "Verify borrower income documentation",
        },
      ],
    },
    {
      id: "POOL-2025-02",
      name: "Commercial RE Portfolio Beta",
      type: "Credit Facility",
      status: "Preview",
      loanCount: 45,
      totalValue: 85000000,
      nftCount: 45,
      missingNfts: 0,
      createdBy: "Sarah Johnson",
      createdAt: "2025-07-20",
      lastShared: "2025-07-25",
      sharedWith: ["JP Morgan"],
      feedback: [],
    },
    {
      id: "POOL-2025-03",
      name: "Auto Loan Bundle Gamma",
      type: "Whole Loan Sale",
      status: "Preview",
      loanCount: 320,
      totalValue: 45000000,
      nftCount: 280,
      missingNfts: 40,
      createdBy: "Mike Chen",
      createdAt: "2025-07-28",
      lastShared: null,
      sharedWith: [],
      feedback: [],
    },
  ];

  const sampleLoans = [
    {
      loanId: "LN-0001",
      borrower: "John Doe",
      amount: 450000,
      state: "D",
      nftStatus: "Minted",
      poolStatus: "Included",
    },
    {
      loanId: "LN-0002",
      borrower: "Jane Smith",
      amount: 320000,
      state: "C",
      nftStatus: "Pending",
      poolStatus: "Included",
    },
    {
      loanId: "LN-0003",
      borrower: "Bob Wilson",
      amount: 280000,
      state: "B",
      nftStatus: "Not Minted",
      poolStatus: "Included",
    },
    {
      loanId: "LN-0004",
      borrower: "Alice Brown",
      amount: 550000,
      state: "D",
      nftStatus: "Minted",
      poolStatus: "Included",
    },
    {
      loanId: "LN-0005",
      borrower: "Charlie Davis",
      amount: 380000,
      state: "A",
      nftStatus: "Not Minted",
      poolStatus: "Included",
    },
  ];

  const handleSharePool = (pool) => {
    console.log("Sharing pool:", pool); // Debug log
    setSelectedPool(pool);
    setShareModalOpen(true);
  };

  const handleStartDeal = (pool) => {
    console.log("Starting deal for pool:", pool); // Debug log
    setSelectedPool(pool);
    setDealWizardOpen(true);
  };

  const closeShareModal = () => {
    console.log("Closing share modal"); // Debug log
    setShareModalOpen(false);
  };

  const closeDealModal = () => {
    console.log("Closing deal modal"); // Debug log
    setDealWizardOpen(false);
  };

  const getStatusBadge = (status) => {
    return (
      <Badge variant="outline" className="status-badge preview">
        {status}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const typeClasses = {
      Securitization: "type-badge securitization",
      "Credit Facility": "type-badge credit-facility",
      "Whole Loan Sale": "type-badge whole-loan",
      "Participation Agreement": "type-badge participation",
    };
    return (
      <Badge variant="outline" className={typeClasses[type]}>
        {type}
      </Badge>
    );
  };

  const fmt = (n) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  if (selectedPool) {
    return (
      <div className="main-content-area">
        {/* Pool Detail Header */}
        <div className="pool-detail-header">
          <div className="pool-header-left">
            <button
              onClick={() => setSelectedPool(null)}
              className="back-button"
            >
              <ChevronLeft className="nav-icon" />
            </button>
            <div className="pool-title-section">
              <h1 className="pool-title">{selectedPool.name}</h1>
              <p className="pool-id">{selectedPool.id}</p>
            </div>
          </div>
          <div className="pool-header-actions">
            <button
              onClick={() => handleSharePool(selectedPool)}
              className="action-button"
            >
              <Send className="nav-icon" />
              Share
            </button>
            <button
              onClick={() => handleStartDeal(selectedPool)}
              className="action-button primary"
            >
              <Plus className="nav-icon" />
              Start Deal
            </button>
          </div>
        </div>

        {/* Pool Stats */}
        <div className="pool-stats-grid">
          <div className="stat-card blue-gradient">
            <div className="metric-value blue-text">
              {selectedPool.loanCount.toLocaleString()}
            </div>
            <div className="metric-label blue-text">Total Loans</div>
          </div>
          <div className="stat-card green-gradient">
            <div className="metric-value green-text">
              {fmt(selectedPool.totalValue)}
            </div>
            <div className="metric-label green-text">Total Value</div>
          </div>
          <div className="stat-card purple-gradient">
            <div className="metric-value purple-text">
              {selectedPool.nftCount.toLocaleString()}
            </div>
            <div className="metric-label purple-text">NFTs Minted</div>
          </div>
          <div className="stat-card orange-gradient">
            <div className="metric-value orange-text">
              {selectedPool.missingNfts}
            </div>
            <div className="metric-label orange-text">Missing NFTs</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="pool-tabs">
          {["overview", "loans", "feedback", "sharing", "history"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pool-tab ${activeTab === tab ? "active" : ""}`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="overview-content">
            <div className="overview-grid">
              <Card className="info-card">
                <CardContent className="card-content">
                  <h3 className="card-title">Pool Information</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Type:</span>
                      <span className="info-value">
                        {getTypeBadge(selectedPool.type)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Status:</span>
                      <span className="info-value">
                        {getStatusBadge(selectedPool.status)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Created By:</span>
                      <span className="info-value">
                        {selectedPool.createdBy}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Created:</span>
                      <span className="info-value">
                        {selectedPool.createdAt}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="info-card">
                <CardContent className="card-content">
                  <h3 className="card-title">NFT Status</h3>
                  <div className="info-list">
                    <div className="info-item">
                      <span className="info-label">Minted:</span>
                      <span className="info-value success-text">
                        {selectedPool.nftCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Missing:</span>
                      <span className="info-value error-text">
                        {selectedPool.missingNfts}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Completion:</span>
                      <div className="completion-info">
                        <span className="completion-percentage">
                          {Math.round(
                            (selectedPool.nftCount / selectedPool.loanCount) *
                              100
                          )}
                          %
                        </span>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${
                                (selectedPool.nftCount /
                                  selectedPool.loanCount) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div className="loans-table-container">
            <div className="data-table">
              <table className="loans-table">
                <thead>
                  <tr className="table-header">
                    <th>Loan ID</th>
                    <th>Borrower</th>
                    <th>Amount</th>
                    <th>State</th>
                    <th>NFT Status</th>
                    <th>Pool Status</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {sampleLoans.map((loan) => (
                    <tr key={loan.loanId} className="table-row">
                      <td className="loan-id">{loan.loanId}</td>
                      <td className="borrower-name">{loan.borrower}</td>
                      <td className="loan-amount">{fmt(loan.amount)}</td>
                      <td>
                        <StateChip s={loan.state} />
                      </td>
                      <td>
                        <Badge
                          variant={
                            loan.nftStatus === "Minted"
                              ? "outline"
                              : "secondary"
                          }
                          className={`nft-status-badge ${
                            loan.nftStatus === "Minted" ? "minted" : "pending"
                          }`}
                        >
                          {loan.nftStatus}
                        </Badge>
                      </td>
                      <td>
                        <Badge variant="outline" className="pool-status-badge">
                          {loan.poolStatus}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="feedback-content">
            {selectedPool.feedback.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg
                    className="empty-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="empty-title">No Feedback Yet</h3>
                <p className="empty-description">
                  Share this pool to receive feedback from market makers and
                  investors.
                </p>
              </div>
            ) : (
              selectedPool.feedback.map((item, index) => (
                <Card key={index} className="feedback-card">
                  <CardContent className="feedback-content">
                    <div className="feedback-header">
                      <div className="feedback-author">
                        <div className="author-avatar">
                          <span className="author-initial">
                            {item.from.charAt(0)}
                          </span>
                        </div>
                        <div className="author-info">
                          <span className="author-name">{item.from}</span>
                          <div className="feedback-badges">
                            <Badge
                              variant="outline"
                              className="feedback-type-badge"
                            >
                              {item.type}
                            </Badge>
                            {item.loanId && (
                              <Badge
                                variant="secondary"
                                className="loan-id-badge"
                              >
                                {item.loanId}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="feedback-date">{item.date}</span>
                    </div>
                    <p className="feedback-message">{item.message}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === "sharing" && (
          <div className="sharing-content">
            <div className="sharing-header">
              <h3 className="sharing-title">Shared With</h3>
              <button
                onClick={() => handleSharePool(selectedPool)}
                className="action-button"
              >
                <Send className="nav-icon" />
                Share Again
              </button>
            </div>
            {selectedPool.sharedWith.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg
                    className="empty-svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="empty-title">Not Shared Yet</h3>
                <p className="empty-description">
                  Share this pool to collaborate with market makers and
                  investors.
                </p>
              </div>
            ) : (
              <div className="shared-list">
                {selectedPool.sharedWith.map((recipient, index) => (
                  <div key={index} className="shared-item">
                    <div className="shared-info">
                      <div className="shared-avatar">
                        <svg
                          className="shared-icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="shared-details">
                        <span className="shared-name">{recipient}</span>
                        <p className="shared-date">
                          Shared on {selectedPool.lastShared}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="shared-badge">
                      Shared
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="history-content">
            <div className="timeline-card">
              <h3 className="timeline-title">Pool Timeline</h3>
              <div className="timeline-list">
                <div className="timeline-item">
                  <div className="timeline-dot blue"></div>
                  <div className="timeline-content">
                    <div className="timeline-event">Pool Created</div>
                    <div className="timeline-date">
                      {selectedPool.createdAt} by {selectedPool.createdBy}
                    </div>
                  </div>
                </div>
                {selectedPool.lastShared && (
                  <div className="timeline-item">
                    <div className="timeline-dot green"></div>
                    <div className="timeline-content">
                      <div className="timeline-event">Last Shared</div>
                      <div className="timeline-date">
                        {selectedPool.lastShared}
                      </div>
                    </div>
                  </div>
                )}
                {selectedPool.feedback.length > 0 && (
                  <div className="timeline-item">
                    <div className="timeline-dot purple"></div>
                    <div className="timeline-content">
                      <div className="timeline-event">Feedback Received</div>
                      <div className="timeline-date">
                        {selectedPool.feedback.length} feedback items
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
  
  );
}

}

function TransactionsOverviewPage() {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [filters, setFilters] = useState({
    entityKind: "all",
    transactionType: "all",
    assetClass: "all",
    status: "all",
    mmRole: "all",
    searchTerm: "",
  });

  // Sample data for Transactions Overview
  const transactionsData = [
    // Pools
    {
      entityKind: "Pool",
      entityId: "POOL-2025-01",
      name: "Prime RMBS WL Pool A",
      transactionType: "WL",
      assetClass: "RMBS",
      status: "Accepted",
      marketMaker: { name: "Acme Markets", roleCode: "DL", roleName: "Dealer" },
      loanCount: 1254,
      upb: 312450000,
      verificationPct: 96,
      nftPct: 92,
      updatedAt: "2025-08-10T22:15:00Z",
    },
    {
      entityKind: "Pool",
      entityId: "POOL-2025-02",
      name: "Commercial RE Portfolio Beta",
      transactionType: "CF",
      assetClass: "CRE",
      status: "Preview Shared",
      marketMaker: {
        name: "JP Morgan",
        roleCode: "FA",
        roleName: "Facility Agent",
      },
      loanCount: 45,
      upb: 85000000,
      verificationPct: 100,
      nftPct: 100,
      updatedAt: "2025-08-09T14:30:00Z",
    },
    {
      entityKind: "Pool",
      entityId: "POOL-2025-03",
      name: "Auto Loan Bundle Gamma",
      transactionType: "WL",
      assetClass: "Auto",
      status: "Draft",
      marketMaker: null,
      loanCount: 320,
      upb: 45000000,
      verificationPct: 87,
      nftPct: 78,
      updatedAt: "2025-08-08T09:45:00Z",
    },
    // Deals
    {
      entityKind: "Deal",
      entityId: "DL-2025-0012",
      name: "2025-08 Auto Loan ABS",
      transactionType: "ABS",
      assetClass: "Auto",
      status: "Docs / Closing",
      marketMaker: {
        name: "ABC Securities",
        roleCode: "UW",
        roleName: "Underwriter",
      },
      loanCount: 18742,
      upb: 425000000,
      verificationPct: 100,
      nftPct: 100,
      updatedAt: "2025-08-10T16:45:12Z",
    },
    {
      entityKind: "Deal",
      entityId: "CF-2025-002",
      name: "XYZ Revolver CF-1",
      transactionType: "CF",
      assetClass: "SME",
      status: "Settled",
      marketMaker: {
        name: "XYZ Inc.",
        roleCode: "FA",
        roleName: "Facility Agent",
      },
      loanCount: 143,
      upb: 75000000,
      verificationPct: 100,
      nftPct: 100,
      updatedAt: "2025-08-09T13:02:00Z",
    },
    {
      entityKind: "Deal",
      entityId: "WLS-2025-005",
      name: "Whole Loan Sale 5",
      transactionType: "WL",
      assetClass: "RMBS",
      status: "Settled",
      marketMaker: {
        name: "Goldman Sachs",
        roleCode: "DL",
        roleName: "Dealer",
      },
      loanCount: 89,
      upb: 54000000,
      verificationPct: 100,
      nftPct: 100,
      updatedAt: "2025-08-07T11:20:00Z",
    },
    {
      entityKind: "Deal",
      entityId: "SEC-2025-001",
      name: "RMBS 2025-1",
      transactionType: "ABS",
      assetClass: "RMBS",
      status: "Published / Open",
      marketMaker: {
        name: "Morgan Stanley",
        roleCode: "UW",
        roleName: "Underwriter",
      },
      loanCount: 2500,
      upb: 80000000,
      verificationPct: 98,
      nftPct: 95,
      updatedAt: "2025-08-10T10:15:00Z",
    },
  ];

  const getStatusBadge = (status, entityKind) => {
    const statusClasses = {
      // Pool statuses
      Draft: "status-draft",
      "Preview Shared": "status-preview",
      "Submitted to Underwriter": "status-submitted",
      "In UW Review": "status-review",
      "Changes Requested": "status-changes",
      Rejected: "status-rejected",
      Accepted: "status-accepted",
      "Converted to Deal": "status-converted",
      Withdrawn: "status-withdrawn",
      // Deal statuses
      "Issuer Review": "status-review",
      "Ready to Publish": "status-ready",
      "Published / Open": "status-published",
      Allocated: "status-allocated",
      "Docs / Closing": "status-closing",
      Settled: "status-settled",
      Closed: "status-closed",
      "Cancelled/Terminated": "status-cancelled",
    };

    return (
      <Badge
        variant="outline"
        className={`status-badge ${statusClasses[status] || "status-default"}`}
        title={`${entityKind}: ${status}`}
      >
        {status}
      </Badge>
    );
  };

  const getTransactionTypeBadge = (type) => {
    const typeClasses = {
      WL: "type-badge whole-loan",
      CF: "type-badge credit-facility",
      ABS: "type-badge securitization",
    };

    return (
      <Badge variant="outline" className={typeClasses[type]}>
        {type}
      </Badge>
    );
  };

  const getEntityKindBadge = (kind) => {
    return (
      <Badge
        variant={kind === "Deal" ? "default" : "secondary"}
        className="entity-kind-badge"
      >
        {kind}
      </Badge>
    );
  };

  const getMarketMakerDisplay = (marketMaker) => {
    if (!marketMaker || !marketMaker.name) {
      return <span className="text-muted">—</span>;
    }

    return (
      <div className="market-maker-info">
        <span className="market-maker-name">{marketMaker.name}</span>
        <span className="market-maker-role">({marketMaker.roleCode})</span>
        <div className="market-maker-tooltip">{marketMaker.roleName}</div>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const fmt = (n) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const filteredData = transactionsData.filter((item) => {
    const matchesEntityKind =
      filters.entityKind === "all" || item.entityKind === filters.entityKind;
    const matchesTransactionType =
      filters.transactionType === "all" ||
      item.transactionType === filters.transactionType;
    const matchesAssetClass =
      filters.assetClass === "all" || item.assetClass === filters.assetClass;
    const matchesStatus =
      filters.status === "all" || item.status === filters.status;
    const matchesMMRole =
      filters.mmRole === "all" ||
      (item.marketMaker && item.marketMaker.roleCode === filters.mmRole);
    const matchesSearch =
      !filters.searchTerm ||
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      item.entityId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (item.marketMaker &&
        item.marketMaker.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()));

    return (
      matchesEntityKind &&
      matchesTransactionType &&
      matchesAssetClass &&
      matchesStatus &&
      matchesMMRole &&
      matchesSearch
    );
  });

  const totals = filteredData.reduce(
    (acc, item) => {
      acc.loanCount += item.loanCount;
      acc.upb += item.upb;
      return acc;
    },
    { loanCount: 0, upb: 0 }
  );

  return (
    <div className="main-content-area">
      <div className="section-header">
        <div className="section-title">Transactions Overview</div>
        <div className="filter-controls">
          <select
            className="filter-select"
            value={filters.entityKind}
            onChange={(e) =>
              setFilters({ ...filters, entityKind: e.target.value })
            }
          >
            <option value="all">All Entities</option>
            <option value="Pool">Pools Only</option>
            <option value="Deal">Deals Only</option>
          </select>
          <select
            className="filter-select"
            value={filters.transactionType}
            onChange={(e) =>
              setFilters({ ...filters, transactionType: e.target.value })
            }
          >
            <option value="all">All Types</option>
            <option value="WL">Whole Loan</option>
            <option value="CF">Credit Facility</option>
            <option value="ABS">Securitization</option>
          </select>
          <select
            className="filter-select"
            value={filters.assetClass}
            onChange={(e) =>
              setFilters({ ...filters, assetClass: e.target.value })
            }
          >
            <option value="all">All Asset Classes</option>
            <option value="RMBS">RMBS</option>
            <option value="Auto">Auto</option>
            <option value="CRE">CRE</option>
            <option value="SME">SME</option>
          </select>
          <select
            className="filter-select"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Preview Shared">Preview Shared</option>
            <option value="Accepted">Accepted</option>
            <option value="Published / Open">Published / Open</option>
            <option value="Docs / Closing">Docs / Closing</option>
            <option value="Settled">Settled</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            className="filter-select"
            value={filters.mmRole}
            onChange={(e) => setFilters({ ...filters, mmRole: e.target.value })}
          >
            <option value="all">All Roles</option>
            <option value="UW">Underwriter</option>
            <option value="FA">Facility Agent</option>
            <option value="DL">Dealer</option>
            <option value="MM">Market Maker</option>
          </select>
          <input
            type="text"
            placeholder="Search entities, IDs, market makers..."
            className="search-input"
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid-stats" style={{ marginBottom: "24px" }}>
        <div className="stat-card">
          <div className="metric-value">{filteredData.length}</div>
          <div className="metric-label">Total Entities</div>
          <div className="metric-change positive">
            {filteredData.filter((d) => d.entityKind === "Pool").length} Pools,{" "}
            {filteredData.filter((d) => d.entityKind === "Deal").length} Deals
          </div>
        </div>
        <div className="stat-card">
          <div className="metric-value">
            {totals.loanCount.toLocaleString()}
          </div>
          <div className="metric-label">Total Loans</div>
          <div className="metric-change positive">Across All Entities</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">{fmt(totals.upb)}</div>
          <div className="metric-label">Total UPB</div>
          <div className="metric-change positive">Unpaid Principal Balance</div>
        </div>
        <div className="stat-card">
          <div className="metric-value">
            {filteredData.length > 0
              ? Math.round(
                  filteredData.reduce(
                    (sum, item) => sum + item.verificationPct,
                    0
                  ) / filteredData.length
                )
              : 0}
            %
          </div>
          <div className="metric-label">Avg Verification %</div>
          <div className="metric-change positive">Across All Entities</div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Entity</th>
              <th>Txn Type</th>
              <th>Asset Class</th>
              <th>Status</th>
              <th>Market Maker</th>
              <th># Loans</th>
              <th>UPB</th>
              <th>Verification %</th>
              <th>NFT %</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.entityId}
                className="table-row"
                onClick={() => setSelectedEntity(item)}
              >
                <td className="entity-cell">
                  <div className="entity-info">
                    <div className="entity-name">{item.name}</div>
                    <div className="entity-meta">
                      {getEntityKindBadge(item.entityKind)}
                      <span className="entity-id">{item.entityId}</span>
                    </div>
                  </div>
                </td>
                <td>{getTransactionTypeBadge(item.transactionType)}</td>
                <td className="asset-class">{item.assetClass}</td>
                <td>{getStatusBadge(item.status, item.entityKind)}</td>
                <td className="market-maker-cell">
                  {getMarketMakerDisplay(item.marketMaker)}
                </td>
                <td className="loan-count">
                  {item.loanCount.toLocaleString()}
                </td>
                <td className="upb-amount">{fmt(item.upb)}</td>
                <td className="verification-pct">
                  <div className="percentage-bar">
                    <span className="percentage-text">
                      {item.verificationPct}%
                    </span>
                    <div
                      className="percentage-fill"
                      style={{ width: `${item.verificationPct}%` }}
                    />
                  </div>
                </td>
                <td className="nft-pct">
                  <div className="percentage-bar">
                    <span className="percentage-text">{item.nftPct}%</span>
                    <div
                      className="percentage-fill"
                      style={{ width: `${item.nftPct}%` }}
                    />
                  </div>
                </td>
                <td className="updated-date">{formatDate(item.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Entity Detail Modal */}
      {selectedEntity && (
        <div className="modal-overlay" onClick={() => setSelectedEntity(null)}>
          <div
            className="entity-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">{selectedEntity.name}</h3>
              <button
                className="modal-close"
                onClick={() => setSelectedEntity(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="entity-detail-grid">
                <div className="detail-section">
                  <h4>Entity Information</h4>
                  <div className="detail-list">
                    <div className="detail-item">
                      <span className="detail-label">Entity ID:</span>
                      <span className="detail-value">
                        {selectedEntity.entityId}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Type:</span>
                      <span className="detail-value">
                        {getEntityKindBadge(selectedEntity.entityKind)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Transaction Type:</span>
                      <span className="detail-value">
                        {getTransactionTypeBadge(
                          selectedEntity.transactionType
                        )}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Asset Class:</span>
                      <span className="detail-value">
                        {selectedEntity.assetClass}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">
                        {getStatusBadge(
                          selectedEntity.status,
                          selectedEntity.entityKind
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Market Maker</h4>
                  <div className="detail-list">
                    {selectedEntity.marketMaker ? (
                      <>
                        <div className="detail-item">
                          <span className="detail-label">Name:</span>
                          <span className="detail-value">
                            {selectedEntity.marketMaker.name}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Role:</span>
                          <span className="detail-value">
                            {selectedEntity.marketMaker.roleName} (
                            {selectedEntity.marketMaker.roleCode})
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="detail-item">
                        <span className="detail-label">Market Maker:</span>
                        <span className="detail-value text-muted">
                          Not assigned
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Metrics</h4>
                  <div className="detail-list">
                    <div className="detail-item">
                      <span className="detail-label">Loan Count:</span>
                      <span className="detail-value">
                        {selectedEntity.loanCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">UPB:</span>
                      <span className="detail-value">
                        {fmt(selectedEntity.upb)}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Verification %:</span>
                      <span className="detail-value">
                        {selectedEntity.verificationPct}%
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">NFT %:</span>
                      <span className="detail-value">
                        {selectedEntity.nftPct}%
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Last Updated:</span>
                      <span className="detail-value">
                        {formatDate(selectedEntity.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setSelectedEntity(null)}
                className="cancel-button"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Navigate to appropriate detail page based on entity kind
                  if (selectedEntity.entityKind === "Pool") {
                    // Navigate to pool detail
                    console.log(
                      "Navigate to pool detail:",
                      selectedEntity.entityId
                    );
                  } else {
                    // Navigate to deal detail
                    console.log(
                      "Navigate to deal detail:",
                      selectedEntity.entityId
                    );
                  }
                  setSelectedEntity(null);
                }}
                className="action-button primary"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function IssuerUIMockup() {
  const [route, setRoute] = useState("/home");
  const [collapsed, setCollapsed] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [activeBatchId, setActiveBatchId] = useState(null); // Used in createBatch and openBatch functions
  const [newBatchLoans, setNewBatchLoans] = useState([]);

  // Actions
  const goNewBatch = () => {
    setSelectMode(true);
    setRoute("/loans/registry");
  };

  const createBatch = (loanIds) => {
    // mock batch id
    const date = "2025-08-08".replaceAll("-", "");
    const seq = String(Math.floor(Math.random() * 9000) + 1000);
    const id = `IMVA${date}-${seq}`;
    setActiveBatchId(id);
    setNewBatchLoans(loanIds);
    setSelectMode(false);
    setRoute(`/verification/batch/${id}`);
  };

  const openBatch = (id) => {
    setActiveBatchId(id);
    setNewBatchLoans([]); // unknown composition for seeded batches
    setRoute(`/verification/batch/${id}`);
  };

  const viewStd = (jobId) => {
    setRoute(`/loans/standardized/${jobId}`);
  };

  const openRegistryFromStd = () => {
    setSelectMode(true);
    setRoute("/loans/registry");
  };

  // Choose page
  let Main = null;
  if (route === "/home") Main = <HomePage />;
  else if (route === "/loans/imports")
    Main = <ImportsPage onViewStd={viewStd} />;
  else if (route === "/loans/registry")
    Main = <RegistryPage selectMode={selectMode} onCreateBatch={createBatch} />;
  else if (route === "/loans/historical") Main = <HistoricalPage />;
  else if (route === "/loans/nfts") Main = <NFTsPage />;
  else if (route === "/verification/batches")
    Main = <BatchesPage onNewBatch={goNewBatch} onOpen={openBatch} />;
  else if (route === "/verification/certificates") Main = <CertificatesPage />;
  else if (route.startsWith("/verification/batch/")) {
    const id = route.split("/verification/batch/")[1];
    Main = <BatchDetailsPage batchId={id} selectedLoans={newBatchLoans} />;
  } else if (route.startsWith("/loans/standardized/")) {
    const jobId = route.split("/loans/standardized/")[1];
    Main = (
      <StdSnapshotPage jobId={jobId} onOpenRegistry={openRegistryFromStd} />
    );
  } else if (route === "/transactions") Main = <TransactionsOverviewPage />;
  else if (route === "/transactions/pools") Main = <PoolsPage />;
  else if (route === "/transactions/whole")
    Main = <Placeholder title="Transactions — Whole Loan Sales" />;
  else if (route === "/transactions/facilities")
    Main = <Placeholder title="Transactions — Credit Facilities" />;
  else if (route === "/transactions/securitizations")
    Main = <Placeholder title="Transactions — Securitizations" />;
  else if (route === "/activity")
    Main = <Placeholder title="Activity & Audit" />;
  else if (route === "/integrations")
    Main = <Placeholder title="Integrations" />;
  else if (route === "/settings") Main = <Placeholder title="Settings" />;
  else Main = <HomePage />;

  return (
    <div className="app-container">
      <Sidebar
        route={route}
        setRoute={setRoute}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="main-content">
        <TopBar route={route} />
        <main className="main-content-area">{Main}</main>
      </div>
    </div>
  );
}
