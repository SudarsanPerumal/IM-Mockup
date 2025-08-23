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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  Slider,
  LinearProgress,
  Alert,
  Snackbar,
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
//   Description as ReportsIcon,
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
  Timeline as TimelineIcon,
  AttachMoney as MoneyIcon,
  AccountBalance as BankIcon,
  CreditCard as CreditCardIcon,
  Receipt as ReceiptIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  Verified as VerifiedIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Link as LinkIcon,
  QrCode as QrCodeIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
  Assessment as AssessmentIcon,
  Assignment as AssignmentIcon,
  NotificationsActive as NotificationsActiveIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  CalendarToday as CalendarTodayIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Language as LanguageIcon,
  Flag as FlagIcon,
  Gavel as GavelIcon,
  Handshake as HandshakeIcon,
  Payment as PaymentIcon,
  SwapHoriz as SwapHorizIcon,
  CompareArrows as CompareArrowsIcon,
  Speed as SpeedIcon,
  VerifiedUser as VerifiedUserIcon,
  Block as BlockIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  CloudDownload as CloudDownloadIcon,
  CloudUpload as CloudUploadIcon,
  GetApp as GetAppIcon,
  Send as SendIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Forum as ForumIcon,
  Comment as CommentIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Archive as ArchiveIcon,
  Unarchive as UnarchiveIcon,
  DeleteForever as DeleteForeverIcon,
  Restore as RestoreIcon,
  History as HistoryIcon,
  Update as UpdateIcon,
  Build as BuildIcon,
  Tune as TuneIcon,
  ViewList as ViewListIcon,
  ViewQuilt as ViewQuiltIcon,
  ViewComfy as ViewComfyIcon,
  ViewCompact as ViewCompactIcon,
  ViewHeadline as ViewHeadlineIcon,
  ViewStream as ViewStreamIcon,
  ViewWeek as ViewWeekIcon,
  ViewDay as ViewDayIcon,
  ViewAgenda as ViewAgendaIcon,
  ViewCarousel as ViewCarouselIcon,
  ViewColumn as ViewColumnIcon,
  ViewSidebar as ViewSidebarIcon,
  ViewTimeline as ViewTimelineIcon,
  ViewInAr as ViewInArIcon,
  ViewComfyAlt as ViewComfyAltIcon,
  ViewCompactAlt as ViewCompactAltIcon,
  ViewHeadlineAlt as ViewHeadlineAltIcon,
  ViewStreamAlt as ViewStreamAltIcon,
  ViewWeekAlt as ViewWeekAltIcon,
  ViewDayAlt as ViewDayAltIcon,
  ViewAgendaAlt as ViewAgendaAltIcon,
  ViewCarouselAlt as ViewCarouselAltIcon,
  ViewColumnAlt as ViewColumnAltIcon,
  ViewSidebarAlt as ViewSidebarAltIcon,
  ViewTimelineAlt as ViewTimelineAltIcon,
  ViewInArAlt as ViewInArAltIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Description as ReportsIcon,
  Description,
} from "@mui/icons-material";


// ... rest of the file remains the same ... 

// Enhanced CSS animations and styles
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

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
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

  .animate-glow {
    animation: glow 2s infinite;
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

  /* NFT and document status indicators */
  .status-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .status-verified {
    background: rgba(34, 197, 94, 0.1);
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .status-pending {
    background: rgba(245, 158, 11, 0.1);
    color: #d97706;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .status-error {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  /* Provenance tooltip styles */
  .provenance-tooltip {
    background: rgba(0, 0, 0, 0.9) !important;
    color: white !important;
    font-size: 12px !important;
    padding: 8px 12px !important;
    border-radius: 6px !important;
    max-width: 300px !important;
  }

  /* Asset type and verification level chips */
  .asset-type-chip {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: white;
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .verification-chip {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Document and NFT indicators */
  .doc-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(59, 130, 246, 0.1);
    color: #2563eb;
    border: 1px solid rgba(59, 130, 246, 0.3);
  }

  .nft-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(139, 92, 246, 0.1);
    color: #7c3aed;
    border: 1px solid rgba(139, 92, 246, 0.3);
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
// Enhanced Mock Data with Asset Types, Verification Levels, NFTs, and Documents
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
    // Enhanced fields per BRD
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
    rating: "AAA",
    access: "NDA",
    geography: "US",
    originationWindow: "2023-01/2023-12",
    seasoning: "12m",
    tranche: "A-1",
    coupon: "5.8%",
    priority: "Senior",
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
    assetType: "SC",
    verificationLevel: "SelfCertified",
    docCount: 8,
    hasNft: false,
    advanceRate: "65%",
    margin: "400bps",
    tenor: "24m",
    borrowingBaseMethod: "Advance Rate",
    access: "Data-room",
    geography: "US",
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
    assetType: "ThirdPartyCertified",
    verificationLevel: "ThirdPartyCertified",
    docCount: 25,
    hasNft: true,
    nftRef: {
      chain: "polygon",
      contract: "0x5678...",
      tokenId: "456",
      tokenUri: "ipfs://...",
    },
    waRate: "6.2%",
    waRemainingTerm: "28y",
    access: "Public",
    geography: "US",
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
    assetType: "SC_DAI",
    verificationLevel: "ThirdPartyCertified",
    docCount: 12,
    hasNft: true,
    nftRef: {
      chain: "ethereum",
      contract: "0x9abc...",
      tokenId: "789",
      tokenUri: "ipfs://...",
    },
    underlyingLoanId: "LOAN-998",
    servicer: "ServicerY",
    cashFlowPriority: "Senior",
    access: "NDA",
    geography: "US",
  },
];

// Enhanced KPIs with provenance
const kpis = [
  { 
    label: "Cash Available", 
    value: "$18.3m",
    provenance: {
      source: "Trustee",
      asOf: "2024-01-15",
      signer: "0xdef...",
      hash: "0xabc..."
    }
  },
  { 
    label: "Pending Settlements", 
    value: "$2.1m",
    provenance: {
      source: "Kinexys",
      asOf: "2024-01-15",
      signer: "0x123...",
      hash: "0x456..."
    }
  },
  { 
    label: "Total Exposure", 
    value: "$611.4m",
    provenance: {
      source: "VA",
      asOf: "2024-01-15",
      signer: "0x789...",
      hash: "0xdef..."
    }
  },
  { 
    label: "P&L / YTM", 
    value: "+1.8% / 6.2%",
    provenance: {
      source: "Servicer",
      asOf: "2024-01-15",
      signer: "0xabc...",
      hash: "0x123..."
    }
  },
  { 
    label: "Headroom (CF)", 
    value: "$58.7m",
    provenance: {
      source: "IntainADMIN",
      asOf: "2024-01-15",
      signer: "0x456...",
      hash: "0x789..."
    }
  },
  { 
    label: "Loans (WLS)", 
    value: "2,431",
    provenance: {
      source: "VA",
      asOf: "2024-01-15",
      signer: "0xdef...",
      hash: "0xabc..."
    }
  },
  { 
    label: "Participations (PA)", 
    value: "17",
    provenance: {
      source: "Servicer",
      asOf: "2024-01-15",
      signer: "0x123...",
      hash: "0x456..."
    }
  },
];

// Portfolio data
const portfolioData = {
  cf: {
    commitments: "$312m",
    utilized: "$254m",
    headroom: "$58m",
    ineligibles: "8.2%",
    nextFunding: "2024-02-01",
    covenantStatus: "Compliant",
    facilities: [
      { id: "FAC-12", name: "LenderCo Facility 12", utilized: "$200m", headroom: "$42m" },
      { id: "FAC-15", name: "LenderCo Facility 15", utilized: "$54m", headroom: "$16m" },
    ]
  },
  abs: {
    marketValue: "$205m",
    nextPayDate: "2024-02-15",
    lastFactor: "0.92",
    triggerStatus: "Green",
    lastDistribution: "$1.2m",
    holdings: [
      { id: "TRN-1A", name: "ABC Trust 2025-1", value: "$50m", factor: "0.92" },
      { id: "TRN-2B", name: "XYZ Trust 2024-2", value: "$155m", factor: "0.89" },
    ]
  },
  wls: {
    loanCount: 2431,
    upb: "$86m",
    waRate: "6.2%",
    waFico: 720,
    waLtv: 72,
    delinquency: "2.1%",
    exceptions: 3,
    loans: [
      { id: "LOAN-001", rate: "6.5%", term: "30y", fico: 750, ltv: 70, balance: "$250k", status: "Current", assetType: "SC_DAI", verification: "ThirdPartyCertified", hasNft: true },
      { id: "LOAN-002", rate: "6.2%", term: "30y", fico: 720, ltv: 75, balance: "$300k", status: "Current", assetType: "SC", verification: "SelfCertified", hasNft: false },
    ]
  },
  pa: {
    participationCount: 17,
    upbRepresented: "$8m",
    cashVsEntitlement: "98.5%",
    variances: "$120k",
    nextRemittance: "2024-02-01",
    participations: [
      { id: "PA-001", underlyingLoan: "LOAN-998", amount: "$500k", servicer: "ServicerY", priority: "Senior" },
      { id: "PA-002", underlyingLoan: "LOAN-999", amount: "$300k", servicer: "ServicerZ", priority: "Mezzanine" },
    ]
  }
};

// ---------------------------------------------
// Enhanced Helper Components
// ---------------------------------------------
function TopBar({ onToggleRight }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [orgAnchorEl, setOrgAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOrgMenu = (event) => {
    setOrgAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOrgAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
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
            flexGrow: 0,
            ml: 2,
            fontWeight: 700,
            background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            minWidth: "fit-content",
          }}
        >
          IntainMARKETS — Investor Console
        </Typography>

        <Button
          onClick={handleOrgMenu}
          sx={{
            ml: 2,
            color: "text.primary",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
            px: 2,
            py: 0.5,
            textTransform: "none",
            fontWeight: 600,
          }}
          endIcon={<ExpandMore />}
        >
          Demo Fund LP
        </Button>

        <Menu
          anchorEl={orgAnchorEl}
          open={Boolean(orgAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Demo Fund LP</MenuItem>
          <MenuItem onClick={handleClose}>Alpha Capital</MenuItem>
          <MenuItem onClick={handleClose}>Beta Investments</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Manage Organizations</MenuItem>
        </Menu>

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
            placeholder="Global search… deals, loans, tranches, documents"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
              sx: {
                borderRadius: 3,
                backgroundColor: "rgba(0, 0, 0, 0.02)",
              }
            }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile & Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SecurityIcon fontSize="small" />
              </ListItemIcon>
              Security & Access
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <NotificationsIcon fontSize="small" />
              </ListItemIcon>
              Notification Preferences
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
              <ListItemIcon>
                <CancelIcon fontSize="small" color="error" />
              </ListItemIcon>
              Sign out
            </MenuItem>
          </Menu>

          <Button
            variant="outlined"
            size="small"
            onClick={onToggleRight}
            sx={{ ml: 1 }}
            startIcon={<MoreVertIcon />}
          >
            Right Panel
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function SideNav({ current, onNavigate, collapsed, setCollapsed }) {
  const [portfolioOpen, setPortfolioOpen] = useState(true);

  const menuItems = [
    { key: "home", label: "Home", icon: <HomeIcon /> },
    { key: "opportunities", label: "Opportunities", icon: <LayersIcon /> },
    { key: "pools", label: "Pools", icon: <DatabaseIcon /> },
    { key: "portfolio", label: "Portfolio", icon: <WalletIcon /> },
    { key: "creditFacilities", label: "Credit Facilities", icon: <CreditCardIcon /> },
    { key: "wholeLoans", label: "Whole Loans", icon: <AccountBalanceWalletIcon /> },
    { key: "participationAgreements", label: "Participation Agreements", icon: <SwapHorizIcon /> },
    { key: "securitizations", label: "Securitizations", icon: <ReceiptIcon /> },
  ];

  const bottomItems = [
    { key: "activity", label: "Activity", icon: <ActivityIcon /> },
    { key: "audit", label: "Audit", icon: <SecurityIcon /> },
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
                Investor Console
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
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
          </List>
        </Box>

        {/* Bottom Section */}
        <Box>
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
              Standard Fields
            </Typography>
          )}

          <List>
            {bottomItems.map((item) => (
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
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

// ... existing code ...

function RightDrawer({ open, onClose }) {
    const [activeTab, setActiveTab] = useState(0);
  
    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
  
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 420,
            boxSizing: "border-box",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
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
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Context Panel
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CancelIcon />
            </IconButton>
          </Box>
  
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ mb: 2 }}
          >
            <Tab label="Tasks" />
            <Tab label="Messages" />
            <Tab label="Audit" />
          </Tabs>
  
          {activeTab === 0 && (
            <Box>
              <Card sx={{ mb: 2 }}>
                <CardHeader 
                  title="Active Tasks" 
                  titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircleIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="NDA — ABC Trust (today)" 
                        secondary="Pending signature"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <WarningIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Funding notice review overdue (CF‑12)" 
                        secondary="Due in 2 hours"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <InfoIcon color="info" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Allocate for WLS Pool 7" 
                        secondary="Tomorrow"
                      />
                    </ListItem>
                  </List>
                  <Button variant="outlined" size="small" fullWidth>
                    View all tasks
                  </Button>
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader 
                  title="Alerts" 
                  titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Alert severity="warning" sx={{ mb: 1 }}>
                    Trigger warning: OC ratio below 105% for TRN-1A
                  </Alert>
                  <Alert severity="info" sx={{ mb: 1 }}>
                    New document available: Servicer report for FAC-12
                  </Alert>
                  <Alert severity="success">
                    Settlement confirmed: $2.1m allocated to POOL-7
                  </Alert>
                </CardContent>
              </Card>
            </Box>
          )}
  
          {activeTab === 1 && (
            <Box>
              <Card sx={{ mb: 2 }}>
                <CardHeader 
                  title="Recent Messages" 
                  titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="ServicerX Pool 7 update" 
                        secondary="New loan data available"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <ChatIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Trustee notification" 
                        secondary="Factor update for TRN-1A"
                      />
                    </ListItem>
                  </List>
                  <Button variant="outlined" size="small" fullWidth>
                    View all messages
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
  
          {activeTab === 2 && (
            <Box>
              <Card>
                <CardHeader 
                  title="Audit Trail" 
                  titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
                />
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Recent activity and provenance events
                  </Typography>
                  <List dense>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <VisibilityIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Document viewed: Servicer report" 
                        secondary="2 minutes ago • User: john.doe"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <DownloadIcon color="secondary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Document downloaded: NDA" 
                        secondary="1 hour ago • User: jane.smith"
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Allocation confirmed" 
                        secondary="3 hours ago • System"
                      />
                    </ListItem>
                  </List>
                  <Button variant="outlined" size="small" fullWidth>
                    View full audit log
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </Drawer>
    );
  }
  
  // Enhanced KPI Strip with Provenance
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
                <Tooltip
                  title={
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Provenance
                      </Typography>
                      <Typography variant="body2">
                        Source: {kpi.provenance.source}
                      </Typography>
                      <Typography variant="body2">
                        As of: {kpi.provenance.asOf}
                      </Typography>
                      <Typography variant="body2">
                        Signer: {kpi.provenance.signer}
                      </Typography>
                      <Typography variant="body2">
                        Hash: {kpi.provenance.hash}
                      </Typography>
                    </Box>
                  }
                  arrow
                  placement="top"
                >
                  <Chip
                    label={kpi.provenance.source}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1, fontSize: 10 }}
                  />
                </Tooltip>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  
  // Enhanced Opportunities Snapshot with Asset Types and Verification
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
                    Asset Type
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
                    Verification
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
                    Docs/NFTs
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
                        label={o.assetType}
                        size="small"
                        className="asset-type-chip"
                        sx={{ fontSize: 10 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={o.verificationLevel}
                        size="small"
                        className="verification-chip"
                        sx={{ fontSize: 10 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                        <span className="doc-indicator">
                          {o.docCount}
                        </span>
                        {o.hasNft && (
                          <span className="nft-indicator">
                            ✓
                          </span>
                        )}
                      </Box>
                    </TableCell>
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
  
  // Enhanced Portfolio Snapshot with deep linking
  function PortfolioSnapshot({ onNavigate }) {
    const tiles = [
      {
        key: "portfolioCF",
        title: "Credit Facilities (CF)",
        kpi1: portfolioData.cf.commitments,
        kpi2: `Headroom ${portfolioData.cf.headroom}`,
        color: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
        borderColor: "#93c5fd",
        icon: <CreditCardIcon />,
      },
      {
        key: "portfolioABSMBS",
        title: "ABS/MBS",
        kpi1: portfolioData.abs.marketValue,
        kpi2: `Next pay ${portfolioData.abs.nextPayDate}`,
        color: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
        borderColor: "#86efac",
        icon: <ReceiptIcon />,
      },
      {
        key: "portfolioWLS",
        title: "Whole Loans (WLS)",
        kpi1: portfolioData.wls.upb,
        kpi2: `${portfolioData.wls.loanCount} loans`,
        color: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
        borderColor: "#c084fc",
        icon: <AccountBalanceWalletIcon />,
      },
      {
        key: "portfolioPA",
        title: "Participations (PA)",
        kpi1: portfolioData.pa.upbRepresented,
        kpi2: `${portfolioData.pa.participationCount} parts`,
        color: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
        borderColor: "#fb923c",
        icon: <SwapHorizIcon />,
      },
    ];
  
    return (
      <Grid container spacing={2}>
        {tiles.map((tile) => (
          <Grid item xs={12} sm={6} key={tile.key}>
            <Card
              onClick={() => onNavigate(tile.key)}
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
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                  {tile.icon}
                </Box>
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
                  {tile.title}
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
  
  // Enhanced Tasks Panel
  function TasksPanel() {
    const items = [
      { 
        id: 1, 
        text: "Sign NDA for ABC Trust", 
        due: "today", 
        priority: "high",
        type: "signature"
      },
      {
        id: 2,
        text: "Allocate for WLS Pool 7",
        due: "tomorrow",
        priority: "medium",
        type: "allocation"
      },
      { 
        id: 3, 
        text: "Review CF‑12 funding notice", 
        due: "due", 
        priority: "low",
        type: "review"
      },
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
  
    const getTypeIcon = (type) => {
      switch (type) {
        case "signature":
          return <EditIcon />;
        case "allocation":
          return <MoneyIcon />;
        case "review":
          return <VisibilityIcon />;
        default:
          return <AssignmentIcon />;
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
                  {getTypeIcon(item.type)}
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
            View all tasks
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Enhanced Landing Page - Updated based on feedback
  function Landing({ onOpenDetail, onViewAll, onNavigate }) {
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
  
            {/* Tasks and Alerts - Horizontal Layout */}
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
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CheckCircleIcon color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="NDA — ABC Trust (today)" 
                          secondary="Pending signature"
                        />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <WarningIcon color="warning" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Funding notice review overdue (CF‑12)" 
                          secondary="Due in 2 hours"
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Alert severity="warning">
                        Trigger warning: OC ratio below 105% for TRN-1A
                      </Alert>
                      <Alert severity="info">
                        New document available: Servicer report for FAC-12
                      </Alert>
                      <Alert severity="success">
                        Settlement confirmed: $2.1m allocated to POOL-7
                      </Alert>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} lg={4} className="animate-slide-right">
            <Box sx={{ mb: 3 }}>
              {/* Portfolio View - 2x2 Grid */}
              <Grid container spacing={2}>
                {[
                  {
                    key: "creditFacilities",
                    title: "Credit Facilities",
                    kpi1: portfolioData.cf.commitments,
                    kpi2: `Headroom ${portfolioData.cf.headroom}`,
                    color: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                    borderColor: "#93c5fd",
                    icon: <CreditCardIcon />,
                  },
                  {
                    key: "securitizations",
                    title: "Securitizations",
                    kpi1: portfolioData.abs.marketValue,
                    kpi2: `Next pay ${portfolioData.abs.nextPayDate}`,
                    color: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
                    borderColor: "#86efac",
                    icon: <ReceiptIcon />,
                  },
                  {
                    key: "wholeLoans",
                    title: "Whole Loans",
                    kpi1: portfolioData.wls.upb,
                    kpi2: `${portfolioData.wls.loanCount} loans`,
                    color: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                    borderColor: "#c084fc",
                    icon: <AccountBalanceWalletIcon />,
                  },
                  {
                    key: "participationAgreements",
                    title: "Participation Agreements",
                    kpi1: portfolioData.pa.upbRepresented,
                    kpi2: `${portfolioData.pa.participationCount} parts`,
                    color: "linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
                    borderColor: "#fb923c",
                    icon: <SwapHorizIcon />,
                  },
                ].map((tile) => (
                  <Grid item xs={6} key={tile.key}>
                    <Card
                      onClick={() => onNavigate(tile.key)}
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
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 1 }}>
                          {tile.icon}
                        </Box>
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
                          {tile.title}
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
            </Box>
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
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckIcon color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Allocation confirmed for POOL-7" 
                  secondary="2 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DownloadIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Document downloaded: Servicer report" 
                  secondary="4 hours ago"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <VisibilityIcon color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Opportunity viewed: ABC Trust 2025-1" 
                  secondary="1 day ago"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Container>
    );
  }
  
  // Enhanced Opportunities Table with Updated Filtering
  function OpportunitiesTable({ onOpenDetail }) {
    const [expanded, setExpanded] = useState(null);
    const [filters, setFilters] = useState({
      assetType: [],
      verificationLevel: [],
      stage: [],
      type: [],
      access: [],
    });
  
    const handleFilterChange = (filterType, value) => {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }));
    };
  
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
              Advanced Filters
            </Button>
            <Button variant="outlined" size="small" startIcon={<BookmarkIcon />}>
              Save View
            </Button>
          </Box>
        </Box>
  
        {/* Filter Panel */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Filters
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Transaction Type</InputLabel>
                  <Select
                    multiple
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="ABS">ABS</MenuItem>
                    <MenuItem value="CF">CF</MenuItem>
                    <MenuItem value="WLS">WLS</MenuItem>
                    <MenuItem value="PA">PA</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Asset Type</InputLabel>
                  <Select
                    multiple
                    value={filters.assetType}
                    onChange={(e) => handleFilterChange('assetType', e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="SC_DAI">SC_DAI</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="ThirdPartyCertified">ThirdPartyCertified</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Verification Level</InputLabel>
                  <Select
                    multiple
                    value={filters.verificationLevel}
                    onChange={(e) => handleFilterChange('verificationLevel', e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="SelfCertified">SelfCertified</MenuItem>
                    <MenuItem value="ThirdPartyCertified">ThirdPartyCertified</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel>Stage</InputLabel>
                  <Select
                    multiple
                    value={filters.stage}
                    onChange={(e) => handleFilterChange('stage', e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    <MenuItem value="Preview">Preview</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
  
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
                  Access
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
                        label={o.assetType}
                        size="small"
                        className="asset-type-chip"
                        sx={{ fontSize: 10 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={o.verificationLevel}
                        size="small"
                        className="verification-chip"
                        sx={{ fontSize: 10 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", gap: 0.5, alignItems: "center" }}
                      >
                        <span className="doc-indicator">
                          {o.docCount}
                        </span>
                        {o.hasNft && (
                          <span className="nft-indicator">
                            ✓
                          </span>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={o.access}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 10 }}
                      />
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
                      <TableCell colSpan={15}>
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
                                  {o.advanceRate}
                                </Typography>
                              )}
                              {o.type === "PA" && (
                                <Typography variant="body2">
                                  % Available {o.availPct}% | Priority {o.cashFlowPriority}
                                </Typography>
                              )}
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <Button size="small">Subscribe</Button>
                              <Button size="small">Indicate Interest</Button>
                              <Button size="small" variant="outlined">
                                Open Data Room
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
  
  // Enhanced Opportunities Compare
  function OpportunitiesCompare() {
    const cols = ["Yield/Price", "Size", "WAL", "Asset Type", "Verification", "Notes"];
  
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
                        {c === "Asset Type" && (
                          <Chip
                            label={o.assetType}
                            size="small"
                            className="asset-type-chip"
                            sx={{ fontSize: 10 }}
                          />
                        )}
                        {c === "Verification" && (
                          <Chip
                            label={o.verificationLevel}
                            size="small"
                            className="verification-chip"
                            sx={{ fontSize: 10 }}
                          />
                        )}
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
  
  // ... existing code ...

// Enhanced Opportunities Component
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
  
  // Enhanced Opportunity Detail with Asset Types, NFTs, and Documents
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
            <Chip
              label={deal.assetType}
              className="asset-type-chip"
              sx={{ fontSize: 10 }}
            />
            <Chip
              label={deal.verificationLevel}
              className="verification-chip"
              sx={{ fontSize: 10 }}
            />
            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
              <span className="doc-indicator">
                {deal.docCount}
              </span>
              {deal.hasNft && (
                <span className="nft-indicator">
                  ✓
                </span>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined">Subscribe</Button>
            <Button variant="outlined">Indicate Interest</Button>
            <Button variant="contained" onClick={() => setOpenSettlement(true)}>
              Settlement
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
                          <Typography variant="h6" sx={{ mb: 2 }}>
                            Summary KPIs
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body2" color="text.secondary">
                                Price/Yield
                              </Typography>
                              <Typography variant="h6">
                                {deal.priceYield}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body2" color="text.secondary">
                                Size
                              </Typography>
                              <Typography variant="h6">
                                ${deal.size}m
                              </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body2" color="text.secondary">
                                WAL
                              </Typography>
                              <Typography variant="h6">
                                {deal.wal}
                              </Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Typography variant="body2" color="text.secondary">
                                Asset Type
                              </Typography>
                              <Typography variant="h6">
                                {deal.assetType}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Card variant="outlined" sx={{ mb: 2 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ mb: 2 }}>
                            Charts / Tables
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Interactive charts and data tables will be rendered here.
                          </Typography>
                        </CardContent>
                      </Card>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          onClick={() => setOpenDataRoom(true)}
                        >
                          Open Data Room
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setOpenWaterfall(true)}
                        >
                          Open Waterfall Viewer
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setOpenPivot(true)}
                        >
                          Open Pivot/Strats
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
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Asset-Level Data
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Loan ID</TableCell>
                              <TableCell>Rate</TableCell>
                              <TableCell>Term</TableCell>
                              <TableCell>FICO</TableCell>
                              <TableCell>LTV</TableCell>
                              <TableCell>Balance</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Asset Type</TableCell>
                              <TableCell>Verification</TableCell>
                              <TableCell>Docs</TableCell>
                              <TableCell>NFT</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {portfolioData.wls.loans.map((loan) => (
                              <TableRow key={loan.id}>
                                <TableCell>{loan.id}</TableCell>
                                <TableCell>{loan.rate}</TableCell>
                                <TableCell>{loan.term}</TableCell>
                                <TableCell>{loan.fico}</TableCell>
                                <TableCell>{loan.ltv}%</TableCell>
                                <TableCell>${loan.balance}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={loan.status}
                                    size="small"
                                    color={loan.status === "Current" ? "success" : "warning"}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={loan.assetType}
                                    size="small"
                                    className="asset-type-chip"
                                    sx={{ fontSize: 10 }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Chip
                                    label={loan.verification}
                                    size="small"
                                    className="verification-chip"
                                    sx={{ fontSize: 10 }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <span className="doc-indicator">
                                    3
                                  </span>
                                </TableCell>
                                <TableCell>
                                  {loan.hasNft ? (
                                    <span className="nft-indicator">
                                      ✓
                                    </span>
                                  ) : (
                                    <span>-</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                  {tabValue === 5 && (
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Documents & NFTs
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardHeader title="Documents" />
                            <CardContent>
                              <List dense>
                                <ListItem>
                                  <ListItemIcon>
                                    <Description />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary="Servicer Report" 
                                    secondary="Uploaded 2 days ago"
                                  />
                                  <IconButton size="small">
                                    <DownloadIcon />
                                  </IconButton>
                                </ListItem>
                                <ListItem>
                                  <ListItemIcon>
                                    <Description />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary="Trustee Report" 
                                    secondary="Uploaded 1 week ago"
                                  />
                                  <IconButton size="small">
                                    <DownloadIcon />
                                  </IconButton>
                                </ListItem>
                              </List>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Card variant="outlined">
                            <CardHeader title="NFTs" />
                            <CardContent>
                              {deal.hasNft ? (
                                <Box>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    Chain: {deal.nftRef.chain}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    Contract: {deal.nftRef.contract}
                                  </Typography>
                                  <Typography variant="body2" sx={{ mb: 1 }}>
                                    Token ID: {deal.nftRef.tokenId}
                                  </Typography>
                                  <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<LinkIcon />}
                                  >
                                    View NFT
                                  </Button>
                                </Box>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  No NFTs available
                                </Typography>
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
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
                        Tx: {deal.provenance?.hash || "0xabc..."}
                      </Typography>
                    </Box>
                    <Button variant="outlined" size="small" fullWidth>
                      View Provenance
                    </Button>
                  </Box>
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader title="Access & NDA" />
                <CardContent>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Access: {deal.access}
                  </Typography>
                  <FormControlLabel
                    control={<Switch size="small" />}
                    label="I acknowledge NDA"
                  />
                </CardContent>
              </Card>
  
              <Card>
                <CardHeader title="Asset Information" />
                <CardContent>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2">Asset Type:</Typography>
                      <Chip
                        label={deal.assetType}
                        size="small"
                        className="asset-type-chip"
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2">Verification:</Typography>
                      <Chip
                        label={deal.verificationLevel}
                        size="small"
                        className="verification-chip"
                      />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2">Documents:</Typography>
                      <Typography variant="body2">{deal.docCount}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="body2">NFT Available:</Typography>
                      <Typography variant="body2">
                        {deal.hasNft ? "Yes" : "No"}
                      </Typography>
                    </Box>
                  </Box>
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
          <DialogTitle>Settlement</DialogTitle>
          <DialogContent>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Select Settlement Rail
              </Typography>
              <RadioGroup defaultValue="kinexys">
                <FormControlLabel
                  value="kinexys"
                  control={<Radio />}
                  label="Kinexys"
                />
                <FormControlLabel
                  value="stablecoin"
                  control={<Radio />}
                  label="Stablecoin"
                />
                <FormControlLabel
                  value="bank"
                  control={<Radio />}
                  label="Bank Wire"
                />
              </RadioGroup>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Allocation Amount
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter amount"
                type="number"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSettlement(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpenSettlement(false)}>
              Confirm Settlement
            </Button>
          </DialogActions>
        </Dialog>
  
        <Dialog
          open={openDataRoom}
          onClose={() => setOpenDataRoom(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Data Room Viewer</DialogTitle>
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
          <DialogTitle>Waterfall Viewer</DialogTitle>
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
          <DialogTitle>Pivot / Strats</DialogTitle>
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
  
  // Portfolio Components
  function PortfolioOverview() {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Portfolio Overview
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Exposure Summary" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6">$611.4m</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Exposure
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6">+1.8%</Typography>
                    <Typography variant="body2" color="text.secondary">
                      30-day P&L
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6">6.2%</Typography>
                    <Typography variant="body2" color="text.secondary">
                      YTM
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="h6">2,431</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Loans
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Recent Reports" />
              <CardContent>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Monthly Servicer Report" 
                      secondary="Available 2 days ago"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Description />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Trustee Distribution Report" 
                      secondary="Available 1 week ago"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  function PortfolioCF() {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Credit Facilities (CF)
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Facilities Overview" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Facility</TableCell>
                        <TableCell>Commitments</TableCell>
                        <TableCell>Utilized</TableCell>
                        <TableCell>Headroom</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolioData.cf.facilities.map((facility) => (
                        <TableRow key={facility.id}>
                          <TableCell>{facility.name}</TableCell>
                          <TableCell>{facility.utilized}</TableCell>
                          <TableCell>{facility.headroom}</TableCell>
                          <TableCell>
                            <Chip label="Active" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="KPIs" />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Commitments
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.cf.commitments}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Utilized
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.cf.utilized}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Headroom
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.cf.headroom}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Ineligibles
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.cf.ineligibles}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  function PortfolioABSMBS() {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ABS/MBS
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Holdings" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Security</TableCell>
                        <TableCell>Market Value</TableCell>
                        <TableCell>Factor</TableCell>
                        <TableCell>Next Pay</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolioData.abs.holdings.map((holding) => (
                        <TableRow key={holding.id}>
                          <TableCell>{holding.name}</TableCell>
                          <TableCell>{holding.value}</TableCell>
                          <TableCell>{holding.factor}</TableCell>
                          <TableCell>{holding.nextPay}</TableCell>
                          <TableCell>
                            <Chip label="Active" color="success" size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="KPIs" />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Market Value
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.abs.marketValue}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Next Pay Date
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.abs.nextPayDate}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Last Factor
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.abs.lastFactor}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Trigger Status
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.abs.triggerStatus}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  function PortfolioWLS() {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Whole Loans (WLS)
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Loan Inventory" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Loan ID</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Term</TableCell>
                        <TableCell>FICO</TableCell>
                        <TableCell>LTV</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Asset Type</TableCell>
                        <TableCell>Verification</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolioData.wls.loans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell>{loan.id}</TableCell>
                          <TableCell>{loan.rate}</TableCell>
                          <TableCell>{loan.term}</TableCell>
                          <TableCell>{loan.fico}</TableCell>
                          <TableCell>{loan.ltv}%</TableCell>
                          <TableCell>${loan.balance}</TableCell>
                          <TableCell>
                            <Chip
                              label={loan.status}
                              size="small"
                              color={loan.status === "Current" ? "success" : "warning"}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={loan.assetType}
                              size="small"
                              className="asset-type-chip"
                              sx={{ fontSize: 10 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={loan.verification}
                              size="small"
                              className="verification-chip"
                              sx={{ fontSize: 10 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="KPIs" />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Loan Count
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.wls.loanCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      UPB
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.wls.upb}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      WA Rate
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.wls.waRate}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      WA FICO
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.wls.waFico}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Delinquency
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.wls.delinquency}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  function PortfolioPA() {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Participations (PA)
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Participations" />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Participation ID</TableCell>
                        <TableCell>Underlying Loan</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Servicer</TableCell>
                        <TableCell>Priority</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolioData.pa.participations.map((participation) => (
                        <TableRow key={participation.id}>
                          <TableCell>{participation.id}</TableCell>
                          <TableCell>{participation.underlyingLoan}</TableCell>
                          <TableCell>{participation.amount}</TableCell>
                          <TableCell>{participation.servicer}</TableCell>
                          <TableCell>
                            <Chip
                              label={participation.priority}
                              size="small"
                              color={participation.priority === "Senior" ? "success" : "warning"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="KPIs" />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Participation Count
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.pa.participationCount}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      UPB Represented
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.pa.upbRepresented}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Cash vs Entitlement
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.pa.cashVsEntitlement}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Variances
                    </Typography>
                    <Typography variant="h6">
                      {portfolioData.pa.variances}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  // Placeholder components for other routes
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
  
  // Main App Component - Updated with new navigation structure
  export default function InvestorConsoleBRD() {
    const [route, setRoute] = useState("home");
    const [detailId, setDetailId] = useState(null);
    const [rightOpen, setRightOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
  
    const openDetail = (id) => {
      setDetailId(id);
      setRoute("detail");
    };
  
    const navigate = (route) => {
      setRoute(route);
      setDetailId(null);
    };
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <TopBar onToggleRight={() => setRightOpen(true)} />
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <SideNav
            current={route}
            onNavigate={navigate}
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
                  onViewAll={() => navigate("opportunities")}
                  onNavigate={navigate}
                />
              </>
            )}
            {route === "opportunities" && (
              <Opportunities onOpenDetail={openDetail} />
            )}
            {route === "detail" && detailId && (
              <OpportunityDetail
                id={detailId}
                onBack={() => navigate("opportunities")}
              />
            )}
  
            {/* New Navigation Routes */}
            {route === "pools" && <Placeholder title="Pools" />}
            {route === "portfolio" && <PortfolioPlaceholder />}
            {route === "creditFacilities" && <Placeholder title="Credit Facilities" />}
            {route === "wholeLoans" && <Placeholder title="Whole Loans" />}
            {route === "participationAgreements" && <Placeholder title="Participation Agreements" />}
            {route === "securitizations" && <Placeholder title="Securitizations" />}
  
            {/* Bottom Section Routes */}
            {route === "activity" && <Placeholder title="Activity" />}
            {route === "audit" && <Placeholder title="Audit" />}
          </Box>
          <RightDrawer open={rightOpen} onClose={() => setRightOpen(false)} />
        </Box>
      </Box>
    );
  }
  
  // Portfolio Placeholder Component
  function PortfolioPlaceholder() {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Portfolio
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Portfolio dashboard will be implemented based on IntainADMIN delivery specifications.
        </Typography>
        <Card variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Placeholder Content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This section will contain portfolio-specific functionality and data visualization
            once the IntainADMIN dashboard specifications are finalized.
          </Typography>
        </Card>
      </Container>
    );
  }
  