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
      { id: "/loans/registry", label: "Loan Registry (Latest)", icon: Database },
      { id: "/loans/historical", label: "Historical Tape", icon: History },
      { id: "/loans/nfts", label: "Loan NFTs", icon: Blocks },
    ],
  },
  {
    group: "Verification",
    items: [
      { id: "/verification/batches", label: "Batches", icon: ListChecks },
      { id: "/verification/certificates", label: "Certificates", icon: BadgeCheck },
    ],
  },
  {
    group: "Transactions",
    items: [
      { id: "/transactions", label: "Overview", icon: Layers },
      { id: "/transactions/pools", label: "Pools", icon: Layers },
      { id: "/transactions/whole", label: "Whole Loan Sales", icon: DollarSign },
      { id: "/transactions/facilities", label: "Credit Facilities", icon: Landmark },
      { id: "/transactions/participation", label: "Participation Agreements", icon: DollarSign },
      { id: "/transactions/securitizations", label: "Securitizations", icon: FolderOpen },
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
  { loanId: "LN-0001", asOfDate: "2025-07-31", state: "D", selfCertified: false, batchId: "IMVA20250731-0001", va: "Certified", nft: "Minted" },
  { loanId: "LN-0002", asOfDate: "2025-07-31", state: "C", selfCertified: false, batchId: "IMVA20250731-0001", va: "Submitted", nft: "—" },
  { loanId: "LN-0003", asOfDate: "2025-07-31", state: "B", selfCertified: true, batchId: "—", va: "Self-Certified", nft: "(blocked)" },
  { loanId: "LN-0004", asOfDate: "2025-07-28", state: "B", selfCertified: false, batchId: "—", va: "—", nft: "—" },
  { loanId: "LN-0005", asOfDate: "2025-07-25", state: "A", selfCertified: false, batchId: "—", va: "—", nft: "—" },
];

const initialBatches = [
  { batchId: "IMVA20250731-0001", va: "IntainAI", status: "Submitted", loans: 25, docs: 3, submittedAt: "2025-07-31", updatedAt: "2025-08-01" },
  { batchId: "IMVA20250728-0002", va: "IntainAI", status: "Certified", loans: 18, docs: 2, submittedAt: "2025-07-28", updatedAt: "2025-07-30" },
  { batchId: "IMSC20250720-0003", va: "IntainAI", status: "Draft", loans: 7, docs: 0, submittedAt: "—", updatedAt: "2025-07-20" },
];

const sampleCerts = [
  { batchId: "IMVA20250728-0002", certificateId: "CERT-00045.pdf", issuedAt: "2025-07-30", size: "184 KB", sha256: "a9b3…f1" },
];

// ---- Transactions sample data (Dashboard Overview) ----
const deals = [
  { id: "POOL-2025-01", name: "Mortgage Pool 1", type: "Pool", status: "Open", value: 12500000, outstanding: 11800000, start: "2025-07-15" },
  { id: "WLS-2025-05", name: "Whole Loan Sale 5", type: "Whole Loan Sale", status: "Settled", value: 5400000, outstanding: 0, start: "2025-07-28" },
  { id: "CF-2025-02", name: "Warehouse Facility B", type: "Credit Facility", status: "Active", value: 30000000, outstanding: 12000000, start: "2025-06-01" },
  { id: "PA-2025-01", name: "Residential Participation A", type: "Participation Agreement", status: "Active", value: 15000000, outstanding: 15000000, start: "2025-07-20" },
  { id: "PA-2025-02", name: "Commercial RE Participation", type: "Participation Agreement", status: "Draft", value: 25000000, outstanding: 0, start: "2025-08-01" },
  { id: "SEC-2025-01", name: "RMBS 2025-1", type: "Securitization", status: "Closing", value: 80000000, outstanding: 80000000, start: "2025-08-05" },
];

const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// ---- UI bits ----
function StateChip({ s }) {
  const cfg = {
    A: { label: "Uploaded", cls: "a" },
    B: { label: "Standardized", cls: "b" },
    C: { label: "Submitted", cls: "c" },
    D: { label: "Verified", cls: "d" },
  };
  return (
    <span className={`state-chip ${cfg[s].cls}`}>{s} — {cfg[s].label}</span>
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
        <span className="app-title">Issuer Console</span>
      </div>
      <div className="top-bar-right">
        <div className="search-container">
          <Search className="search-icon" />
          <input className="search-input" placeholder="Search loanId, batchId…" />
        </div>
        <select className="filter-select">
          <option>RRE</option>
          <option>CRE</option>
          <option>Auto</option>
        </select>
        <select className="filter-select">
          <option>UAT</option>
          <option>Prod</option>
        </select>
        <button className="action-button">Help</button>
        <button className="action-button secondary">User</button>
      </div>
    </div>
  );
}

function Sidebar({ route, setRoute, collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Sparkles className="nav-icon" />
          </div>
          {!collapsed && (
            <div className="logo-text">
              <div className="logo-title">IntainMARKETS</div>
              <div className="logo-subtitle">Issuer Console</div>
            </div>
          )}
        </div>
        <button 
          className="collapse-button" 
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="nav-icon" /> : <ChevronLeft className="nav-icon" />}
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
                    className={`nav-item ${active ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
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
              <div className="legend-item"><StateChip s="A" /> <span>Raw uploaded</span></div>
              <div className="legend-item"><StateChip s="B" /> <span>Standardized (LTS)</span></div>
              <div className="legend-item"><StateChip s="C" /> <span>Submitted to VA</span></div>
              <div className="legend-item"><StateChip s="D" /> <span>Verified (Cert)</span></div>
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
  const paCount = deals.filter((d) => d.type === "Participation Agreement").length;
  const secCount = deals.filter((d) => d.type === "Securitization").length;
  const totalFinancing = deals.filter((d) => d.type !== "Pool").reduce((a, d) => a + d.value, 0);
  const totalOutstanding = deals.reduce((a, d) => a + d.outstanding, 0);
  const totalLoanValue = deals.reduce((a, d) => a + d.value, 0);

  return (
    <div className="main-content-area">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">IntainMARKETS Dashboard</div>
        <div className="page-subtitle">Welcome back! Here's an overview of your loan portfolio and transactions.</div>
      </div>

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
              <input type="text" placeholder="Search deals..." className="search-input" />
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
                    <td style={{fontWeight: '600'}}>{d.id}</td>
                    <td>{d.type}</td>
                    <td>
                      <span className={`status-badge ${d.status.toLowerCase()}`}>
                        {d.status}
                      </span>
                    </td>
                    <td style={{fontWeight: '600'}}>{fmt(d.value)}</td>
                    <td>{fmt(d.outstanding)}</td>
                    <td>
                      <button className="action-button" style={{fontSize: '12px'}}>View</button>
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
            <input type="file" className="border rounded-xl px-3 py-2 text-sm" />
            <input type="date" className="border rounded-xl px-3 py-2 text-sm" />
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
            {[1,2,3].map((i) => (
              <div key={i} className="grid grid-cols-12 px-3 py-3 text-sm">
                <div className="col-span-3">7f2a9e5c-00{i}</div>
                <div className="col-span-2">2025-07-31</div>
                <div className="col-span-1">excel</div>
                <div className="col-span-1">{1000 + i}</div>
                <div className="col-span-2">a9b3…f1</div>
                <div className="col-span-1">Complete</div>
                <div className="col-span-2 flex gap-2">
                  <Button size="sm" variant="outline">Trigger LTS</Button>
                  <Button size="sm" variant="secondary" onClick={() => onViewStd(`7f2a9e5c-00${i}`)}>View Std</Button>
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
  const selectedCount = useMemo(() => Object.values(selected).filter(Boolean).length, [selected]);

  const toggle = (id, disabled = false) => () => {
    if (disabled) return;
    setSelected((s) => ({ ...s, [id]: !s[id] }));
  };

  return (
    <div className="main-content-area">
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px'}}>
        <div>
          <div style={{fontSize: '20px', fontWeight: '600'}}>Loan Registry (Latest){selectMode && <span style={{marginLeft: '8px', fontSize: '12px', color: '#6b7280'}}>— Select loans to create a Batch</span>}</div>
          <p style={{fontSize: '14px', color: '#6b7280'}}>Select **B — Standardized** loans to create a Batch.</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          {selectMode ? (
            <Button size="sm" disabled={selectedCount === 0} onClick={() => onCreateBatch(Object.keys(selected).filter((k) => selected[k]))}>
              <Plus className="h-4 w-4 mr-1"/>Create Batch ({selectedCount})
            </Button>
          ) : (
            <Button size="sm" variant="outline" disabled>
              <Send className="h-4 w-4 mr-1"/>Submit to VA
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
          <div className={`${selectMode ? "col-span-2" : "col-span-3"}`}>Loan ID</div>
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
              <div key={r.loanId} className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30">
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
                <div className={`${selectMode ? "col-span-2" : "col-span-3"} font-medium flex items-center gap-2`}>
                  <span>{r.loanId}</span>
                  {r.selfCertified && <Badge variant="secondary" className="text-[10px]">Self‑Certified</Badge>}
                </div>
                <div className="col-span-2">{r.asOfDate}</div>
                <div className="col-span-3"><StateChip s={r.state} /></div>
                <div className="col-span-2">{r.batchId}</div>
                <div className="col-span-2">{r.va}</div>
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {selectMode && (
        <div className="text-xs text-muted-foreground">You are selecting from **Loan Registry (Latest)**. Only B — Standardized loans are eligible.</div>
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
        <Button size="sm" variant="outline">Filter</Button>
      </div>
      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          <div className="col-span-3">LoanId</div>
          <div className="col-span-2">As Of Date</div>
          <div className="col-span-3">ImportJobId</div>
          <div className="col-span-2">Columns(#)</div>
          <div className="col-span-2">Download</div>
        </div>
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm border-t">
            <div className="col-span-3">LN-00{i}</div>
            <div className="col-span-2">2025-07-2{i}</div>
            <div className="col-span-3">7f2a9e5c-00{i}</div>
            <div className="col-span-2">35</div>
            <div className="col-span-2"><Button size="sm" variant="outline">Raw JSON</Button></div>
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
        {[1,2,3].map((i) => (
          <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30">
            <div className="col-span-2">LN-000{i}</div>
            <div className="col-span-2">IMVA20250728-0002</div>
            <div className="col-span-2">1000{i}</div>
            <div className="col-span-2">Polygon</div>
            <div className="col-span-2"><Badge variant="outline">Minted</Badge></div>
            <div className="col-span-2 text-right pr-2">
              <Button size="sm" variant="outline">View on chain</Button>
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
        <Button size="sm" variant="outline" onClick={onNewBatch}>New Batch</Button>
      </div>
      <div className="flex items-center gap-2">
        <select className="border rounded-xl px-3 py-2 text-sm bg-background" value={statusFilter} readOnly>
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
          <button key={b.batchId} className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30 w-full text-left" onClick={() => onOpen(b.batchId)}>
            <div className="col-span-3 font-medium text-blue-600 hover:underline">{b.batchId}</div>
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
  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold">Certificates</div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search batchId/certificateId…" className="w-80" />
        <input type="date" className="border rounded-xl px-3 py-2 text-sm" />
        <input type="date" className="border rounded-xl px-3 py-2 text-sm" />
      </div>
      <div className="border rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
          <div className="col-span-3">BatchId</div>
          <div className="col-span-3">Certificate</div>
          <div className="col-span-2">IssuedAt</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">SHA-256</div>
        </div>
        {sampleCerts.map((c) => (
          <div key={c.certificateId} className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30">
            <div className="col-span-3">{c.batchId}</div>
            <div className="col-span-3">{c.certificateId}</div>
            <div className="col-span-2">{c.issuedAt}</div>
            <div className="col-span-2">{c.size}</div>
            <div className="col-span-2">{c.sha256}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BatchDetailsPage({ batchId, selectedLoans }) {
  const [tab, setTab] = useState("loans");
  const [docs, setDocs] = useState(0);
  const canSubmit = docs > 0; // mock rule

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Batch {batchId}</div>
          <div className="text-sm text-muted-foreground">Status: Draft • VA: IntainAI</div>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Self‑Certified</label>
          <Button size="sm" disabled={!canSubmit}><Send className="h-4 w-4 mr-1"/>Submit to IntainAI</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={tab === "loans" ? "default" : "outline"} size="sm" onClick={() => setTab("loans")}>Loans</Button>
        <Button variant={tab === "docs" ? "default" : "outline"} size="sm" onClick={() => setTab("docs")}>Documents</Button>
        <Button variant={tab === "timeline" ? "default" : "outline"} size="sm" onClick={() => setTab("timeline")}>Timeline</Button>
      </div>

      {tab === "loans" && (
        <div className="border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2 text-xs bg-muted/40">
            <div className="col-span-4">LoanId</div>
            <div className="col-span-3">As Of Date Used</div>
            <div className="col-span-3">State</div>
            <div className="col-span-2">Self‑Cert</div>
          </div>
          {initialLoans.filter((l) => selectedLoans.includes(l.loanId)).map((l) => (
            <div key={l.loanId} className="grid grid-cols-12 px-4 py-3 text-sm border-t">
              <div className="col-span-4">{l.loanId}</div>
              <div className="col-span-3">{l.asOfDate}</div>
              <div className="col-span-3"><StateChip s={l.state} /></div>
              <div className="col-span-2">{l.selfCertified ? "Yes" : "No"}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "docs" && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="text-sm font-medium">Upload Documents</div>
            <div className="flex items-center gap-2">
              <input type="file" multiple className="border rounded-xl px-3 py-2 text-sm" />
              <select className="border rounded-xl px-3 py-2 text-sm bg-background"><option>contract</option><option>supporting</option><option>other</option></select>
              <Button size="sm" onClick={() => setDocs((d) => d + 1)}><Paperclip className="h-4 w-4 mr-1"/>Add</Button>
            </div>
            <div className="text-xs text-muted-foreground">{docs} document(s) added in this session. (SHA‑256 computed server‑side)</div>
          </CardContent>
        </Card>
      )}

      {tab === "timeline" && (
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2">Events</div>
            <ul className="text-sm text-muted-foreground list-disc ml-5 space-y-1">
              <li>Batch created (Draft)</li>
              <li>Documents uploaded (pending)</li>
              <li>— awaiting submit —</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StdSnapshotPage({ jobId, onOpenRegistry }) {
  const standardized = initialLoans.filter((l) => ["B", "C", "D"].includes(l.state));
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-semibold">Standardized Tape — ImportJob {jobId}</div>
          <div className="text-sm text-muted-foreground">Read‑only view of StdLoanSnapshot for this import. Batch creation happens in Loan Registry (Latest).</div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">Export CSV</Button>
          <Button size="sm" variant="outline">Export JSON</Button>
          <Button size="sm" onClick={onOpenRegistry}>Open in Registry (Latest)</Button>
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
          <div key={l.loanId} className="grid grid-cols-12 px-4 py-3 text-sm border-t hover:bg-accent/30">
            <div className="col-span-3">{l.loanId}</div>
            <div className="col-span-2">{l.asOfDate}</div>
            <div className="col-span-2">RMBS</div>
            <div className="col-span-3">MortgageTemplateV1</div>
            <div className="col-span-2"><StateChip s={l.state} /></div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground">Note: If newer snapshots exist for a LoanId, **Loan Registry (Latest)** will automatically use the latest `asOfDate` when creating a batch.</div>
        </CardContent>
      </Card>
    </div>
  );
}

function Placeholder({ title }) {
  return (
    <div className="p-4">
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-muted-foreground">(Mockup placeholder – to be built in dedicated module.)</div>
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
  else if (route === "/loans/imports") Main = <ImportsPage onViewStd={viewStd} />;
  else if (route === "/loans/registry") Main = <RegistryPage selectMode={selectMode} onCreateBatch={createBatch} />;
  else if (route === "/loans/historical") Main = <HistoricalPage />;
  else if (route === "/loans/nfts") Main = <NFTsPage />;
  else if (route === "/verification/batches") Main = <BatchesPage onNewBatch={goNewBatch} onOpen={openBatch} />;
  else if (route === "/verification/certificates") Main = <CertificatesPage />;
  else if (route.startsWith("/verification/batch/")) {
    const id = route.split("/verification/batch/")[1];
    Main = <BatchDetailsPage batchId={id} selectedLoans={newBatchLoans} />;
  } else if (route.startsWith("/loans/standardized/")) {
    const jobId = route.split("/loans/standardized/")[1];
    Main = <StdSnapshotPage jobId={jobId} onOpenRegistry={openRegistryFromStd} />;
  } else if (route === "/transactions") Main = <Placeholder title="Transactions — Overview" />;
  else if (route === "/transactions/pools") Main = <Placeholder title="Transactions — Pools" />;
  else if (route === "/transactions/whole") Main = <Placeholder title="Transactions — Whole Loan Sales" />;
  else if (route === "/transactions/facilities") Main = <Placeholder title="Transactions — Credit Facilities" />;
  else if (route === "/transactions/securitizations") Main = <Placeholder title="Transactions — Securitizations" />;
  else if (route === "/activity") Main = <Placeholder title="Activity & Audit" />;
  else if (route === "/integrations") Main = <Placeholder title="Integrations" />;
  else if (route === "/settings") Main = <Placeholder title="Settings" />;
  else Main = <HomePage />;

  return (
    <div className="app-container">
      <Sidebar route={route} setRoute={setRoute} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="main-content">
        <TopBar route={route} />
        <main className="main-content-area">{Main}</main>
      </div>
    </div>
  );
} 