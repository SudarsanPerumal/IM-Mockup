import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
  Badge,
  Divider,
  Grid,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Fab,
} from "@mui/material";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Layers as LayersIcon,
  AccountBalanceWallet as WalletIcon,
  ExpandLess,
  ExpandMore,
  SwapHoriz as ActivityIcon,
  Description as ReportsIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  Storage as DatabaseIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AutoAwesome as SparklesIcon,
  ChevronLeft,
  ChevronRight,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Compare as CompareIcon,
  TableChart as TableChartIcon,
  ViewModule as ViewModuleIcon,
} from "@mui/icons-material";

// Add CSS animations
const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes pulse {
    0%, 100% { 
      opacity: 1; 
    }
    50% { 
      opacity: 0.7; 
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-slide-left {
    animation: slideInFromLeft 0.8s ease-out;
  }

  .animate-slide-right {
    animation: slideInFromRight 0.8s ease-out 0.2s both;
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }

  /* Custom scrollbar for main content */
  .main-content-area::-webkit-scrollbar {
    width: 8px;
  }

  .main-content-area::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  .main-content-area::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .main-content-area::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  /* Enhanced hover effects */
  .hover-lift {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  /* Gradient text effect */
  .gradient-text {
    background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Glow effect for active elements */
  .glow-effect {
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
  }

  .glow-effect:hover {
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// ---------------------------------------------
// Mock data
// ---------------------------------------------
const mockOpportunities = [
  {
    id: "TRN-1A",
    type: "ABS",
    issuer: "ABC Trust 2025-1",
    stage: "Open",
    ccy: "USD",
    size: 50,
    priceYield: "5.8%",
    wal: "3.2y",
    last: "1d",
    badges: ["Trustee", "Servicer"],
    factor: 0.92,
    triggers: { oc: "104%", ic: "120%" },
    // Add these new fields:
    assetType: "SC_DAI",
    verificationLevel: "ThirdPartyCertified",
    docCount: 15,
    hasNft: true,
    nftRef: {
      chain: "ethereum",
      contract: "0x1234...",
      tokenId: "123",
      tokenUri: "ipfs://...",
    },
    provenance: {
      source: "VA",
      asOf: "2024-01-15",
      signer: "0xabc...",
      hash: "0xdef...",
    },
  },
  {
    id: "FAC-12",
    type: "CF",
    issuer: "LenderCo Facility 12",
    stage: "Preview",
    ccy: "USD",
    size: 200,
    priceYield: "SOFR+400",
    wal: "–",
    last: "2h",
    badges: ["VA"],
    headroom: "$42m",
  },
  {
    id: "POOL-7",
    type: "WLS",
    issuer: "ServicerX Pool 7",
    stage: "Open",
    ccy: "USD",
    size: 75,
    priceYield: "97.50",
    wal: "–",
    last: "3d",
    badges: ["VA"],
    loans: 1234,
    wafico: 720,
    ltv: 72,
  },
  {
    id: "L-998",
    type: "PA",
    issuer: "ServicerY Loan 998 Participation",
    stage: "Open",
    ccy: "USD",
    size: 10,
    priceYield: "8.2%",
    wal: "4.1y",
    last: "5d",
    badges: ["Servicer"],
    availPct: 35,
  },
];

const kpis = [
  { label: "Cash Available", value: "$18.3m" },
  { label: "Pending Settlements", value: "$2.1m" },
  { label: "Total Exposure", value: "$611.4m" },
  { label: "P&L / YTM", value: "+1.8% / 6.2%" },
  { label: "Headroom (CF)", value: "$58.7m" },
  { label: "Loans (WLS)", value: "2,431" },
  { label: "Participations (PA)", value: "17" },
];

// ---------------------------------------------
// Helper components
// ---------------------------------------------
function TopBar({ onToggleRight }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ChevronLeft />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            ml: 2,
            fontWeight: 700,
            background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          IntainMARKETS — Investor Console
        </Typography>
        <Chip label="Org: Demo Fund LP" size="small" sx={{ mr: 2 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
            maxWidth: 600,
            mx: 2,
          }}
        >
          <TextField
            placeholder="Global search… deals, loans, tranches"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
          />
        </Box>

        <Tooltip title="Notifications">
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="User menu">
          <IconButton color="inherit" onClick={handleMenu}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleClose}>Profile & Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
            Sign out
          </MenuItem>
        </Menu>

        <Button
          variant="outlined"
          size="small"
          onClick={onToggleRight}
          sx={{ ml: 1 }}
        >
          Right Drawer
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function SideNav({ current, onNavigate, collapsed, setCollapsed }) {
  const [portfolioOpen, setPortfolioOpen] = useState(true);

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeIcon /> },
    { key: "opportunities", label: "Opportunities", icon: <LayersIcon /> },
    { key: "activity", label: "Activity", icon: <ActivityIcon /> },
    { key: "reports", label: "Reports", icon: <ReportsIcon /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon /> },
  ];

  const portfolioItems = [
    { key: "portfolioOverview", label: "Overview" },
    { key: "portfolioCF", label: "Credit Facilities (CF)" },
    { key: "portfolioABSMBS", label: "ABS/MBS" },
    { key: "portfolioWLS", label: "Whole Loans (WLS)" },
    { key: "portfolioPA", label: "Participations (PA)" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 72 : 280,
        flexShrink: 0,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "& .MuiDrawer-paper": {
          width: collapsed ? 72 : 280,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          background:
            "linear-gradient(180deg, #1e293b 0%, #334155 50%, #475569 100%)",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.2)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 100,
          overflow: "hidden",
        },
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              height: 40,
              width: 40,
              borderRadius: 2,
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
            }}
          >
            <SparklesIcon sx={{ color: "white", fontSize: 20 }} />
          </Box>
          {!collapsed && (
            <Box sx={{ color: "white" }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                IntainMARKETS
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                  mt: 0.25,
                }}
              >
                Investor
              </Typography>
            </Box>
          )}
        </Box>
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            p: 1.25,
            borderRadius: 2.5,
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.2)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <Box
        sx={{
          overflow: "auto",
          p: collapsed ? 1.5 : 2.5,
          height: "calc(100vh - 70px)",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: 2,
          },
        }}
      >
        {!collapsed && (
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              mb: 1,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 700,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -4,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
              },
            }}
          >
            Navigation
          </Typography>
        )}

        <List sx={{ mb: 3.5 }}>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                selected={current === item.key}
                onClick={() => onNavigate(item.key)}
                sx={{
                  borderRadius: 3,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  color: "rgba(255, 255, 255, 0.8)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    borderRadius: 3,
                  },
                  "&:hover::before": { opacity: 1 },
                  "&:hover": {
                    color: "white",
                    transform: "translateX(4px)",
                  },
                  "&.Mui-selected": {
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                    color: "white",
                    boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    "&::before": { opacity: 0 },
                  },
                  "&.Mui-selected:hover": {
                    transform: "translateX(4px)",
                    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: collapsed ? "auto" : 40,
                    mr: collapsed ? 0 : 1.5,
                    "& .MuiSvgIcon-root": {
                      fontSize: 20,
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding sx={{ mb: 0.75 }}>
            <ListItemButton
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              sx={{
                borderRadius: 3,
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.3s ease",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                color: "rgba(255, 255, 255, 0.8)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  borderRadius: 3,
                },
                "&:hover::before": { opacity: 1 },
                "&:hover": {
                  color: "white",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: collapsed ? "auto" : 40,
                  mr: collapsed ? 0 : 1.5,
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                <WalletIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Portfolio" />}
              {!collapsed && (portfolioOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>

          <Collapse in={portfolioOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {portfolioItems.map((item) => (
                <ListItemButton
                  key={item.key}
                  sx={{
                    pl: collapsed ? 1 : 4,
                    borderRadius: 3,
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    color: "rgba(255, 255, 255, 0.8)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      borderRadius: 3,
                    },
                    "&:hover::before": { opacity: 1 },
                    "&:hover": {
                      color: "white",
                      transform: "translateX(4px)",
                    },
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                      color: "white",
                      boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      "&::before": { opacity: 0 },
                    },
                    "&.Mui-selected:hover": {
                      transform: "translateX(4px)",
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                    },
                  }}
                  selected={current === item.key}
                  onClick={() => onNavigate(item.key)}
                >
                  {!collapsed && <ListItemText primary={item.label} />}
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>

        {!collapsed && (
          <>
            <Divider
              sx={{ my: 2.5, borderColor: "rgba(255, 255, 255, 0.2)" }}
            />

            <Typography
              variant="overline"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                mb: 1,
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontWeight: 700,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)",
                },
              }}
            >
              Shortcuts
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FilterIcon />}
                  fullWidth
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Filters
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<DatabaseIcon />}
                  fullWidth
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Data Room
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SecurityIcon />}
                  fullWidth
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Provenance
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<BusinessIcon />}
                  fullWidth
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Issuers
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Drawer>
  );
}

function RightDrawer({ open, onClose }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 420,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Context Panel</Typography>
          <IconButton onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </Box>

        <Card sx={{ mb: 2 }}>
          <CardHeader title="Tasks & Alerts" />
          <CardContent>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="success" />
                </ListItemIcon>
                <ListItemText primary="NDA — ABC Trust (today)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CancelIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Funding notice review overdue (CF‑12)" />
              </ListItem>
            </List>
            <Button variant="outlined" size="small" fullWidth>
              View all
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Audit (B10.5 Placeholder)" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Audit / Provenance drawer placeholder.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Drawer>
  );
}

function KpiStrip() {
  return (
    <Grid container spacing={2}>
      {kpis.map((kpi) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={kpi.label}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 3,
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                borderRadius: "12px 12px 0 0",
              },
            }}
          >
            <CardContent
              sx={{ p: 2, textAlign: "center", position: "relative" }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {kpi.label}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontSize: 28,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mt: 1,
                }}
              >
                {kpi.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function OpportunitiesSnapshot({ onOpenDetail, onViewAll }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardHeader
        title="Opportunities — last updates"
        titleTypographyProps={{
          variant: "h6",
          fontWeight: 700,
          color: "#1f2937",
        }}
        action={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button
              size="small"
              onClick={onViewAll}
              sx={{
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              View all opportunities
            </Button>
            <Chip
              label="Preview"
              size="small"
              variant="outlined"
              sx={{ fontSize: 10 }}
            />
            <Chip
              label="Open"
              size="small"
              color="primary"
              sx={{ fontSize: 10 }}
            />
            <Chip
              label="Closing soon"
              size="small"
              variant="outlined"
              sx={{ fontSize: 10 }}
            />
            <Chip
              label="New"
              size="small"
              variant="outlined"
              sx={{ fontSize: 10 }}
            />
          </Box>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Issuer
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Size
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Price/Yield
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Stage
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Last
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#475569",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockOpportunities.map((o) => (
                <TableRow
                  key={o.id}
                  hover
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                    },
                  }}
                >
                  <TableCell>
                    <Chip
                      label={o.type}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {o.issuer}
                  </TableCell>
                  <TableCell>${o.size}m</TableCell>
                  <TableCell>{o.priceYield}</TableCell>
                  <TableCell>
                    <Chip
                      label={o.stage}
                      size="small"
                      color={o.stage === "Open" ? "primary" : "default"}
                      sx={{ fontSize: 10 }}
                    />
                  </TableCell>
                  <TableCell color="text.secondary">{o.last}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onOpenDetail(o.id)}
                      sx={{ fontSize: 10 }}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

function PortfolioSnapshot() {
  const tiles = [
    {
      key: "CF",
      kpi1: "$312m",
      kpi2: "Headroom $58m",
      color: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      borderColor: "#93c5fd",
    },
    {
      key: "ABS/MBS",
      kpi1: "$205m",
      kpi2: "Next pay 15‑Feb",
      color: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
      borderColor: "#86efac",
    },
    {
      key: "WLS",
      kpi1: "$86m",
      kpi2: "2,431 loans",
      color: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      borderColor: "#c084fc",
    },
    {
      key: "PA",
      kpi1: "$8m",
      kpi2: "17 parts",
      color: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
      borderColor: "#fb923c",
    },
  ];

  return (
    <Grid container spacing={2}>
      {tiles.map((tile) => (
        <Grid item xs={12} sm={6} key={tile.key}>
          <Card
            sx={{
              borderRadius: 3,
              transition: "all 0.3s ease",
              cursor: "pointer",
              background: tile.color,
              border: `1px solid ${tile.borderColor}`,
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardContent sx={{ p: 2, textAlign: "center" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {tile.key}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#1f2937",
                  mt: 1,
                }}
              >
                {tile.kpi1}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: 11, fontWeight: 500 }}
              >
                {tile.kpi2}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function TasksPanel() {
  const items = [
    { id: 1, text: "Sign NDA for ABC Trust", due: "today", priority: "high" },
    {
      id: 2,
      text: "Allocate for WLS Pool 7",
      due: "tomorrow",
      priority: "medium",
    },
    { id: 3, text: "Review CF‑12 funding notice", due: "due", priority: "low" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#dc2626";
      case "medium":
        return "#d97706";
      case "low":
        return "#059669";
      default:
        return "#6b7280";
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardHeader
        title="Tasks & Alerts"
        titleTypographyProps={{
          variant: "h6",
          fontWeight: 700,
          color: "#1f2937",
        }}
      />
      <CardContent>
        <List dense>
          {items.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                mb: 1,
                borderRadius: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.02)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon>
                <SecurityIcon sx={{ color: getPriorityColor(item.priority) }} />
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#374151",
                  },
                }}
              />
              <Chip
                label={item.due}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: 10,
                  borderColor: getPriorityColor(item.priority),
                  color: getPriorityColor(item.priority),
                }}
              />
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            mt: 2,
            borderColor: "#d1d5db",
            color: "#374151",
            "&:hover": {
              borderColor: "#9ca3af",
              backgroundColor: "#f9fafb",
            },
          }}
        >
          View all
        </Button>
      </CardContent>
    </Card>
  );
}

function Landing({ onOpenDetail, onViewAll }) {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }} className="animate-slide-left">
        <KpiStrip />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8} className="animate-slide-left">
          <Box sx={{ mb: 3 }}>
            <OpportunitiesSnapshot
              onOpenDetail={onOpenDetail}
              onViewAll={onViewAll}
            />
          </Box>

          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <CardHeader
              title="Insights"
              titleTypographyProps={{
                variant: "h6",
                fontWeight: 700,
                color: "#1f2937",
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#dc2626" }}
                      >
                        Exceptions: 3
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#d97706" }}
                      >
                        Triggers WARN: 1
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, textAlign: "center" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#059669" }}
                      >
                        Covenants OK
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4} className="animate-slide-right">
          <Box sx={{ mb: 3 }}>
            <PortfolioSnapshot />
          </Box>
          <TasksPanel />
        </Grid>
      </Grid>

      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardHeader
          title="Recent Activity"
          titleTypographyProps={{
            variant: "h6",
            fontWeight: 700,
            color: "#1f2937",
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Watched deals, saved views (placeholder)
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

// ---------------------------------------------
// Opportunities (B3) — Table, Cards, Compare
// ---------------------------------------------
function OpportunityCards({ onOpenDetail }) {
  return (
    <Grid container spacing={2}>
      {mockOpportunities.map((o) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={o.id}>
          <Card hover>
            <CardHeader
              action={
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip label={o.type} size="small" variant="outlined" />
                  <Chip
                    label={o.stage}
                    size="small"
                    color={o.stage === "Open" ? "primary" : "default"}
                  />
                </Box>
              }
              title={o.issuer}
              titleTypographyProps={{ variant: "h6" }}
            />
            <CardContent>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Size: <strong>${o.size}m</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {o.type === "ABS"
                  ? "Yield"
                  : o.type === "WLS"
                  ? "Price"
                  : "Rate"}
                : <strong>{o.priceYield}</strong>
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {o.badges.map((b) => (
                  <Chip key={b} label={b} size="small" variant="outlined" />
                ))}
              </Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onOpenDetail(o.id)}
                fullWidth
              >
                Detail
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function OpportunitiesTable({ onOpenDetail }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" size="small" startIcon={<FilterIcon />}>
            Advanced Filters (B10.1)
          </Button>
          <Button variant="outlined" size="small">
            Save View
          </Button>
          <Button variant="outlined" size="small">
            Share
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <FormControlLabel
            control={<Switch size="small" />}
            label="NDA"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Switch size="small" />}
            label="MNPI"
            labelPlacement="start"
          />
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              }}
            >
              <TableCell padding="checkbox"></TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Issuer/Servicer
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Stage
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Ccy
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Size
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Price/Yield
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                WAL
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Asset Type
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Verification
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Docs/NFTs
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Last
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: 700,
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#475569",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOpportunities.map((o) => (
              <React.Fragment key={o.id}>
                <TableRow
                  hover
                  sx={{
                    transition: "all 0.2s ease",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() =>
                        setExpanded(expanded === o.id ? null : o.id)
                      }
                    >
                      {expanded === o.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Chip label={o.type} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {o.issuer}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={o.stage}
                      size="small"
                      color={o.stage === "Open" ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>{o.id}</TableCell>
                  <TableCell>{o.ccy}</TableCell>
                  <TableCell>${o.size}m</TableCell>
                  <TableCell>{o.priceYield}</TableCell>
                  <TableCell>{o.wal}</TableCell>
                  <TableCell>
                    <Chip
                      label={o.assetType || "—"}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={o.verificationLevel || "—"}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: 10 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
                    >
                      <Chip
                        label={`Docs: ${o.docCount || 0}`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 10 }}
                      />
                      <Chip
                        label={o.hasNft ? "NFT: ✓" : "NFT: —"}
                        size="small"
                        variant="outlined"
                        color={o.hasNft ? "success" : "default"}
                        sx={{ fontSize: 10 }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell color="text.secondary">{o.last}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onOpenDetail(o.id)}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
                {expanded === o.id && (
                  <TableRow>
                    <TableCell colSpan={14}>
                      <Paper sx={{ p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 3 }}>
                            {o.type === "ABS" && (
                              <>
                                <Typography variant="body2">
                                  Triggers: OC {o.triggers?.oc}{" "}
                                  <CheckCircleIcon
                                    sx={{ fontSize: 16, color: "success.main" }}
                                  />{" "}
                                  | IC {o.triggers?.ic}{" "}
                                  <CheckCircleIcon
                                    sx={{ fontSize: 16, color: "success.main" }}
                                  />
                                </Typography>
                                <Typography variant="body2">
                                  Factor {o.factor}
                                </Typography>
                                <Typography variant="body2">
                                  Next Pay: 15‑Feb
                                </Typography>
                              </>
                            )}
                            {o.type === "WLS" && (
                              <Typography variant="body2">
                                Loans {o.loans} | WA FICO {o.wafico} | LTV{" "}
                                {o.ltv}%
                              </Typography>
                            )}
                            {o.type === "CF" && (
                              <Typography variant="body2">
                                Headroom {o.headroom} | Tenor 24m | Advance rate
                                65%
                              </Typography>
                            )}
                            {o.type === "PA" && (
                              <Typography variant="body2">
                                % Available {o.availPct}% | Priority Senior
                              </Typography>
                            )}
                          </Box>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Button size="small">Subscribe</Button>
                            <Button size="small">Indicate Interest</Button>
                            <Button size="small" variant="outlined">
                              Open Data Room (B10.2)
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function OpportunitiesCompare() {
  const cols = ["Yield/Price", "Size", "WAL", "Notes"];

  return (
    <Card>
      <CardHeader title="Compare (up to 4)" />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                {mockOpportunities.map((o) => (
                  <TableCell key={o.id}>{o.issuer}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cols.map((c) => (
                <TableRow key={c}>
                  <TableCell sx={{ fontWeight: "medium" }}>{c}</TableCell>
                  {mockOpportunities.map((o) => (
                    <TableCell key={o.id}>
                      {c === "Yield/Price" && o.priceYield}
                      {c === "Size" && `$${o.size}m`}
                      {c === "WAL" && o.wal}
                      {c === "Notes" && (
                        <TextField size="small" placeholder="notes" fullWidth />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

function Opportunities({ onOpenDetail }) {
  const [view, setView] = useState("table");

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Opportunities</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant={view === "table" ? "contained" : "outlined"}
            startIcon={<TableChartIcon />}
            onClick={() => setView("table")}
          >
            Table
          </Button>
          <Button
            variant={view === "cards" ? "contained" : "outlined"}
            startIcon={<ViewModuleIcon />}
            onClick={() => setView("cards")}
          >
            Cards
          </Button>
          <Button
            variant={view === "compare" ? "contained" : "outlined"}
            startIcon={<CompareIcon />}
            onClick={() => setView("compare")}
          >
            Compare
          </Button>
        </Box>
      </Box>

      {view === "table" && <OpportunitiesTable onOpenDetail={onOpenDetail} />}
      {view === "cards" && <OpportunitiesTable onOpenDetail={onOpenDetail} />}
      {view === "compare" && <OpportunitiesCompare />}
    </Container>
  );
}

// ---------------------------------------------
// Opportunity Detail (B4) — Generic with placeholders for B4.1–B10.5
// ---------------------------------------------
function OpportunityDetail({ id, onBack }) {
  const deal = useMemo(() => mockOpportunities.find((o) => o.id === id), [id]);
  const [openSettlement, setOpenSettlement] = useState(false);
  const [openDataRoom, setOpenDataRoom] = useState(false);
  const [openWaterfall, setOpenWaterfall] = useState(false);
  const [openPivot, setOpenPivot] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  if (!deal) return null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={onBack}>
            <ChevronLeft />
          </IconButton>
          <Box>
            <Typography variant="h4">{deal.issuer}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID {deal.id} • {deal.ccy} • Size ${deal.size}m
            </Typography>
          </Box>
          <Chip label={deal.type} color="primary" />
          <Chip
            label={deal.stage}
            color={deal.stage === "Open" ? "primary" : "default"}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined">Subscribe</Button>
          <Button variant="outlined">Indicate Interest</Button>
          <Button variant="contained" onClick={() => setOpenSettlement(true)}>
            Settlement (B4.1)
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label="Overview" />
                <Tab label="Collateral/Strats" />
                <Tab label="Waterfall/Payments" />
                <Tab label="Facility Terms" />
                <Tab label="Asset‑Level" />
                <Tab label="Documents" />
                <Tab label="Settlement" />
                <Tab label="Messages" />
                <Tab label="Audit" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {tabValue === 0 && (
                  <Box>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="body2">
                          Summary KPIs (placeholder)
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="body2">
                          Charts / Tables (placeholder)
                        </Typography>
                      </CardContent>
                    </Card>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setOpenDataRoom(true)}
                      >
                        Open Data Room (B10.2)
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setOpenWaterfall(true)}
                      >
                        Open Waterfall Viewer (B10.3)
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setOpenPivot(true)}
                      >
                        Open Pivot/Strats (B10.4)
                      </Button>
                    </Box>
                  </Box>
                )}
                {tabValue === 1 && (
                  <Typography variant="body2" color="text.secondary">
                    Collateral/Strats — placeholder
                  </Typography>
                )}
                {tabValue === 2 && (
                  <Typography variant="body2" color="text.secondary">
                    Waterfall/Payments — placeholder
                  </Typography>
                )}
                {tabValue === 3 && (
                  <Typography variant="body2" color="text.secondary">
                    Facility Terms — placeholder
                  </Typography>
                )}
                {tabValue === 4 && (
                  <Typography variant="body2" color="text.secondary">
                    Asset‑Level — placeholder
                  </Typography>
                )}
                {tabValue === 5 && (
                  <Typography variant="body2" color="text.secondary">
                    Documents — placeholder
                  </Typography>
                )}
                {tabValue === 6 && (
                  <Typography variant="body2" color="text.secondary">
                    Settlement — placeholder
                  </Typography>
                )}
                {tabValue === 7 && (
                  <Typography variant="body2" color="text.secondary">
                    Messages — placeholder
                  </Typography>
                )}
                {tabValue === 8 && (
                  <Typography variant="body2" color="text.secondary">
                    Audit — placeholder
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Card>
              <CardHeader title="KPIs & Provenance" />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip label="VA" size="small" variant="outlined" />
                    <Typography variant="body2">
                      Verification Agent data present
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip label="Trustee" size="small" variant="outlined" />
                    <Typography variant="body2">
                      Official report loaded
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip label="On‑chain" size="small" variant="outlined" />
                    <Typography variant="body2">
                      Tx: 0xabc… (placeholder)
                    </Typography>
                  </Box>
                  <Button variant="outlined" size="small" fullWidth>
                    Provenance (B10.5)
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Access & NDA" />
              <CardContent>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Access: Data Room (Private)
                </Typography>
                <FormControlLabel
                  control={<Switch size="small" />}
                  label="I acknowledge NDA"
                />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <Dialog
        open={openSettlement}
        onClose={() => setOpenSettlement(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Settlement Widget — Placeholder (B4.1)</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Modal content placeholder for Kinexys / Stablecoin / Wire selection.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSettlement(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDataRoom}
        onClose={() => setOpenDataRoom(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Data Room Viewer — Placeholder (B10.2)</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Folder tree and document pane will render here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDataRoom(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openWaterfall}
        onClose={() => setOpenWaterfall(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Waterfall Viewer — Placeholder (B10.3)</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Charts, Triggers grid, Factors table placeholder.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenWaterfall(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPivot}
        onClose={() => setOpenPivot(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Pivot / Strats — Placeholder (B10.4)</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            Server‑side aggregated pivot table placeholder.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPivot(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

// ---------------------------------------------
// Portfolio placeholders (routes only)
// ---------------------------------------------
function Placeholder({ title }) {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Placeholder content for this section.
      </Typography>
    </Container>
  );
}

// ---------------------------------------------
// Root (B1 Shell + Router between Home, Opportunities, Detail, Portfolio stubs)
// ---------------------------------------------
export default function InvestorConsole() {
  const [route, setRoute] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [rightOpen, setRightOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const openDetail = (id) => {
    setDetailId(id);
    setRoute("detail");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar onToggleRight={() => setRightOpen(true)} />
      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <SideNav
          current={route}
          onNavigate={(k) => setRoute(k)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            animation: "fadeIn 0.3s ease-out",
            className: "main-content-area",
          }}
        >
          {route === "home" && (
            <>
              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                className="animate-fade-in"
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.025em",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Home
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SparklesIcon />
                  <Typography variant="body2" color="text.secondary">
                    Unified Opportunities + Portfolio snapshot
                  </Typography>
                </Box>
              </Box>
              <Landing
                onOpenDetail={openDetail}
                onViewAll={() => setRoute("opportunities")}
              />
            </>
          )}
          {route === "opportunities" && (
            <Opportunities onOpenDetail={openDetail} />
          )}
          {route === "detail" && detailId && (
            <OpportunityDetail
              id={detailId}
              onBack={() => setRoute("opportunities")}
            />
          )}

          {route === "portfolioOverview" && (
            <Placeholder title="Portfolio — Overview" />
          )}
          {route === "portfolioCF" && (
            <Placeholder title="Portfolio — Credit Facilities" />
          )}
          {route === "portfolioABSMBS" && (
            <Placeholder title="Portfolio — ABS/MBS" />
          )}
          {route === "portfolioWLS" && (
            <Placeholder title="Portfolio — Whole Loans" />
          )}
          {route === "portfolioPA" && (
            <Placeholder title="Portfolio — Participations" />
          )}

          {route === "activity" && <Placeholder title="Activity" />}
          {route === "reports" && <Placeholder title="Reports" />}
          {route === "settings" && <Placeholder title="Settings" />}
        </Box>
        <RightDrawer open={rightOpen} onClose={() => setRightOpen(false)} />
      </Box>
    </Box>
  );
}
