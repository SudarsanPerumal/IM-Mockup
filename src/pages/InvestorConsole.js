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
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Alert,
  Snackbar,
  LinearProgress,
  CircularProgress,
  AlertTitle,
  Breadcrumbs,
  Skeleton,
  Rating,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  Radio,
  RadioGroup,
  FormLabel,
  Stack,
  AlertTitle as MuiAlertTitle
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
  Timeline as TimelineIcon,
  CloudDownload as DownloadIcon,
  Verified as VerifiedIcon,
  Token as TokenIcon,
  Description as DocumentIcon,
  Link as LinkIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  AttachMoney as MoneyIcon,
  AccountBalance as BankIcon,
  CurrencyExchange as CryptoIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  Folder as FolderIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon,
  AudioFile as AudioIcon,
  Archive as ArchiveIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  DateRange as DateRangeIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  ShowChart as ShowChartIcon,
  Receipt as ReceiptIcon,
  Payment as PaymentIcon,
  CreditCard as CreditCardIcon,
  Send as SendIcon,
  GetApp as GetAppIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Flag as FlagIcon,
  Report as ReportIcon,
  Block as BlockIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Forum as ForumIcon,
  Comment as CommentIcon,
  Reply as ReplyIcon,
  Forward as ForwardIcon,
  Redo as RedoIcon,
  Undo as UndoIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  OpenInNew as OpenInNewIcon,
  Launch as LaunchIcon,
  ExitToApp as ExitToAppIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Domain as DomainIcon,
  LocationCity as LocationCityIcon,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Directions as DirectionsIcon,
  DirectionsCar as DirectionsCarIcon,
  DirectionsWalk as DirectionsWalkIcon,
  DirectionsBike as DirectionsBikeIcon,
  DirectionsBus as DirectionsBusIcon,
  DirectionsSubway as DirectionsSubwayIcon,
  DirectionsTrain as DirectionsTrainIcon,
  DirectionsBoat as DirectionsBoatIcon,
  DirectionsPlane as DirectionsPlaneIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Restaurant as RestaurantIcon,
  LocalBar as LocalBarIcon,
  LocalCafe as LocalCafeIcon,
  LocalDining as LocalDiningIcon,
  LocalDrink as LocalDrinkIcon,
  LocalGasStation as LocalGasStationIcon,
  LocalGroceryStore as LocalGroceryStoreIcon,
  LocalHospital as LocalHospitalIcon,
  LocalHotel as LocalHotelIcon,
  LocalLaundryService as LocalLaundryServiceIcon,
  LocalLibrary as LocalLibraryIcon,
  LocalMall as LocalMallIcon,
  LocalMovies as LocalMoviesIcon,
  LocalOffer as LocalOfferIcon,
  LocalParking as LocalParkingIcon,
  LocalPharmacy as LocalPharmacyIcon,
  LocalPhone as LocalPhoneIcon,
  LocalPizza as LocalPizzaIcon,
  LocalPlay as LocalPlayIcon,
  LocalPostOffice as LocalPostOfficeIcon,
  LocalPrintshop as LocalPrintshopIcon,
  LocalSee as LocalSeeIcon,
  LocalShipping as LocalShippingIcon,
  LocalTaxi as LocalTaxiIcon,
  LocalTheater as LocalTheaterIcon,
  LocalWc as LocalWcIcon,
  MyLocation as MyLocationIcon,
  NearMe as NearMeIcon,
  PersonPin as PersonPinIcon,
  PersonPinCircle as PersonPinCircleIcon,
  PinDrop as PinDropIcon,
  Place as PlaceIcon,
  RateReview as RateReviewIcon,
  RestaurantMenu as RestaurantMenuIcon,
  SatelliteAlt as SatelliteAltIcon,
  StoreMallDirectory as StoreMallDirectoryIcon,
  Streetview as StreetviewIcon,
  Subway as SubwayIcon,
  Terrain as TerrainIcon,
  Traffic as TrafficIcon,
  Train as TrainIcon,
  Tram as TramIcon,
  TransferWithinAStation as TransferWithinAStationIcon,
  TripOrigin as TripOriginIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  VolumeUp as VolumeUpIcon,
  VolumeDown as VolumeDownIcon,
  VolumeOff as VolumeOffIcon,
  VolumeMute as VolumeMuteIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  BrightnessAuto as BrightnessAutoIcon,
  Contrast as ContrastIcon,
  Opacity as OpacityIcon,
  BlurOn as BlurOnIcon,
  BlurOff as BlurOffIcon,
  CenterFocusStrong as CenterFocusStrongIcon,
  CenterFocusWeak as CenterFocusWeakIcon,
  Crop as CropIcon,
  CropFree as CropFreeIcon,
  CropLandscape as CropLandscapeIcon,
  CropPortrait as CropPortraitIcon,
  CropSquare as CropSquareIcon,
  Filter1 as Filter1Icon,
  Filter2 as Filter2Icon,
  Filter3 as Filter3Icon,
  Filter4 as Filter4Icon,
  Filter5 as Filter5Icon,
  Filter6 as Filter6Icon,
  Filter7 as Filter7Icon,
  Filter8 as Filter8Icon,
  Filter9 as Filter9Icon,
  Filter9Plus as Filter9PlusIcon,
  FilterBAndW as FilterBAndWIcon,
  FilterCenterFocus as FilterCenterFocusIcon,
  FilterDrama as FilterDramaIcon,
  FilterFrames as FilterFramesIcon,
  FilterHdr as FilterHdrIcon,
  FilterNone as FilterNoneIcon,
  FilterTiltShift as FilterTiltShiftIcon,
  FilterVintage as FilterVintageIcon,
  Grain as GrainIcon,
  GridOff as GridOffIcon,
  GridOn as GridOnIcon,
  HdrOff as HdrOffIcon,
  HdrOn as HdrOnIcon,
  HdrStrong as HdrStrongIcon,
  HdrWeak as HdrWeakIcon,
  Healing as HealingIcon,
  ImageAspectRatio as ImageAspectRatioIcon,
  Iso as IsoIcon,
  Landscape as LandscapeIcon,
  LeakAdd as LeakAddIcon,
  LeakRemove as LeakRemoveIcon,
  Lens as LensIcon,
  LinkedCamera as LinkedCameraIcon,
  Looks as LooksIcon,
  Looks3 as Looks3Icon,
  Looks4 as Looks4Icon,
  Looks5 as Looks5Icon,
  Looks6 as Looks6Icon,
  LooksOne as LooksOneIcon,
  LooksTwo as LooksTwoIcon,
  Loupe as LoupeIcon,
  MonochromePhotos as MonochromePhotosIcon,
  MovieCreation as MovieCreationIcon,
  MovieFilter as MovieFilterIcon,
  MusicNote as MusicNoteIcon,
  Nature as NatureIcon,
  NaturePeople as NaturePeopleIcon,
  Palette as PaletteIcon,
  Panorama as PanoramaIcon,
  PanoramaFishEye as PanoramaFishEyeIcon,
  PanoramaHorizontal as PanoramaHorizontalIcon,
  PanoramaVertical as PanoramaVerticalIcon,
  PanoramaWideAngle as PanoramaWideAngleIcon,
  Photo as PhotoIcon,
  PhotoAlbum as PhotoAlbumIcon,
  PhotoCamera as PhotoCameraIcon,
  PhotoFilter as PhotoFilterIcon,
  PhotoLibrary as PhotoLibraryIcon,
  PhotoSizeSelectActual as PhotoSizeSelectActualIcon,
  PhotoSizeSelectLarge as PhotoSizeSelectLargeIcon,
  PhotoSizeSelectSmall as PhotoSizeSelectSmallIcon,
  Portrait as PortraitIcon,
  RemoveRedEye as RemoveRedEyeIcon,
  Rotate90DegreesCcw as Rotate90DegreesCcwIcon,
  RotateLeft as RotateLeftIcon,
  RotateRight as RotateRightIcon,
  ShutterSpeed as ShutterSpeedIcon,
  Slideshow as SlideshowIcon,
  Straighten as StraightenIcon,
  Style as StyleIcon,
  SwitchCamera as SwitchCameraIcon,
  SwitchVideo as SwitchVideoIcon,
  TagFaces as TagFacesIcon,
  Texture as TextureIcon,
  Timelapse as TimelapseIcon,
  Timer as TimerIcon,
  Timer10 as Timer10Icon,
  Timer3 as Timer3Icon,
  TimerOff as TimerOffIcon,
  Tonality as TonalityIcon,
  Transform as TransformIcon,
  Tune as TuneIcon,
  ViewComfy as ViewComfyIcon,
  ViewCompact as ViewCompactIcon,
  Vignette as VignetteIcon,
  WbAuto as WbAutoIcon,
  WbCloudy as WbCloudyIcon,
  WbIncandescent as WbIncandescentIcon,
  WbIridescent as WbIridescentIcon,
  WbSunny as WbSunnyIcon,
  ThreeSixty as ThreeSixtyIcon,
  TwoWheeler as TwoWheelerIcon,
  Umbrella as UmbrellaIcon,
  VisibilityOff as VisibilityOffIcon,
  VoiceChat as VoiceChatIcon,
  Voicemail as VoicemailIcon,
  VpnKey as VpnKeyIcon,
  VpnLock as VpnLockIcon,
  Wallpaper as WallpaperIcon,
  Watch as WatchIcon,
  WatchLater as WatchLaterIcon,
  Wc as WcIcon,
  Web as WebIcon,
  WebAsset as WebAssetIcon,
  Weekend as WeekendIcon,
  Whatshot as WhatshotIcon,
  Widgets as WidgetsIcon,
  Wifi as WifiIcon,
  WifiLock as WifiLockIcon,
  WifiOff as WifiOffIcon,
  WifiTethering as WifiTetheringIcon,
  Work as WorkIcon,
  WorkOff as WorkOffIcon,
  WorkOutline as WorkOutlineIcon,
  WrapText as WrapTextIcon,
  YoutubeSearchedFor as YoutubeSearchedForIcon
} from "@mui/icons-material";

// ---------------------------------------------
// Enhanced Mock Data with Complete BRD Requirements
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
    // BRD Asset Type & Verification Level
    assetType: "SC_DAI",
    verificationLevel: "ThirdPartyCertified", 
    docCount: 15,
    hasNft: true,
    nftRef: {
      chain: "ethereum",
      contract: "0x1234567890abcdef",
      tokenId: "123",
      tokenUri: "ipfs://QmHash123",
      cid: "QmHash123"
    },
    docRefs: [
      { id: "doc1", checksum: "sha256:abc123", uri: "https://docs.example.com/doc1", signer: "0xabc123", asOf: "2024-01-15" },
      { id: "doc2", checksum: "sha256:def456", uri: "https://docs.example.com/doc2", signer: "0xdef456", asOf: "2024-01-16" }
    ],
    provenance: {
      source: "VA",
      asOf: "2024-01-15T10:30:00Z",
      signer: "0xabc123def456",
      hash: "0xdef789ghi012",
      txid: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    },
    access: "Data-room",
    rating: "AAA",
    geography: "US",
    assetClass: "Residential Mortgage",
    originationWindow: "2023-01 to 2023-12",
    seasoning: "12-24 months",
    collateralFacets: ["Prime", "Conforming", "Fixed Rate"],
    tranche: "A-1",
    coupon: "5.8%",
    priority: "Senior",
    nextPayDate: "2024-02-15"
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
    advanceRate: 65,
    margin: 400,
    tenor: "24m",
    borrowingBaseMethod: "Eligible Receivables",
    assetType: "SC",
    verificationLevel: "SelfCertified",
    docCount: 8,
    hasNft: false,
    provenance: {
      source: "Servicer",
      asOf: "2024-01-15T14:20:00Z",
      signer: "0xdef456ghi789",
      hash: "0xghi012jkl345",
      txid: null
    },
    access: "NDA",
    geography: "US",
    assetClass: "Commercial Lending",
    originationWindow: "2023-06 to 2024-01",
    seasoning: "0-6 months",
    collateralFacets: ["CRE", "Multifamily"]
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
      contract: "0xabcdef1234567890",
      tokenId: "456",
      tokenUri: "ipfs://QmHash456",
      cid: "QmHash456"
    },
    provenance: {
      source: "VA",
      asOf: "2024-01-12T09:15:00Z",
      signer: "0xghi789jkl012",
      hash: "0xjkl345mno678",
      txid: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
    },
    access: "Public",
    geography: "US",
    assetClass: "Residential Mortgage",
    originationWindow: "2022-01 to 2023-06",
    seasoning: "6-18 months",
    collateralFacets: ["Non-QM", "DSCR", "Investment Property"],
    waRate: "6.8%",
    waRemainingTerm: "28.5y"
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
    underlyingLoanId: "LOAN-998",
    servicer: "ServicerY",
    cashFlowPriority: "Senior",
    assetType: "SC_DAI",
    verificationLevel: "ThirdPartyCertified",
    docCount: 12,
    hasNft: true,
    nftRef: {
      chain: "ethereum",
      contract: "0x7890abcdef123456",
      tokenId: "789",
      tokenUri: "ipfs://QmHash789",
      cid: "QmHash789"
    },
    provenance: {
      source: "Trustee",
      asOf: "2024-01-10T16:45:00Z",
      signer: "0xjkl012mno345",
      hash: "0xmno678pqr901",
      txid: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456"
    },
    access: "NDA",
    geography: "US",
    assetClass: "Commercial Real Estate",
    originationWindow: "2022-06 to 2023-01",
    seasoning: "12-18 months",
    collateralFacets: ["Office", "Retail", "Senior Secured"]
  }
];

const kpis = [
  { label: "Cash Available", value: "$18.3m", trend: "+2.1%", color: "success" },
  { label: "Pending Settlements", value: "$2.1m", trend: "-0.3%", color: "warning" },
  { label: "Total Exposure", value: "$611.4m", trend: "+1.8%", color: "info" },
  { label: "P&L / YTM", value: "+1.8% / 6.2%", trend: "+0.2%", color: "success" },
  { label: "Headroom (CF)", value: "$58.7m", trend: "+5.2%", color: "success" },
  { label: "Loans (WLS)", value: "2,431", trend: "+12", color: "info" },
  { label: "Participations (PA)", value: "17", trend: "+2", color: "info" },
];

// Portfolio data
const portfolioData = {
  cf: {
    commitments: "$312m",
    utilized: "$253.3m",
    headroom: "$58.7m",
    ineligibles: "2.3%",
    nextFundingNotice: "2024-02-01",
    covenantStatus: "Compliant",
    facilities: [
      { id: "FAC-12", name: "LenderCo Facility 12", commitment: "$200m", utilized: "$158m", headroom: "$42m", status: "Active" },
      { id: "FAC-13", name: "LenderCo Facility 13", commitment: "$112m", utilized: "$95.3m", headroom: "$16.7m", status: "Active" }
    ]
  },
  abs: {
    marketValue: "$205m",
    nextPayDate: "2024-02-15",
    lastFactor: "0.92",
    triggerStatus: "All Clear",
    lastDistribution: "2024-01-15",
    holdings: [
      { id: "TRN-1A", name: "ABC Trust 2025-1", par: "$50m", marketValue: "$48.5m", factor: "0.92", nextPay: "2024-02-15" },
      { id: "TRN-2B", name: "XYZ Trust 2024-2", par: "$155m", marketValue: "$156.5m", factor: "0.95", nextPay: "2024-02-15" }
    ]
  },
  wls: {
    loanCount: 2431,
    upb: "$86m",
    waRate: "6.8%",
    waFico: 735,
    waLtv: 68,
    delinquency: "1.2%",
    exceptions: 3,
    loans: [
      { id: "LOAN-001", rate: "6.5%", term: "360", fico: 750, ltv: 65, balance: "$450k", status: "Current", exceptions: [], assetType: "SC_DAI", verificationLevel: "ThirdPartyCertified", docCount: 5, hasNft: true },
      { id: "LOAN-002", rate: "7.2%", term: "360", fico: 720, ltv: 70, balance: "$380k", status: "Current", exceptions: [], assetType: "SC", verificationLevel: "SelfCertified", docCount: 3, hasNft: false }
    ]
  },
  pa: {
    participationCount: 17,
    upbRepresented: "$8m",
    cashVsEntitlement: "98.5%",
    variances: "$120k",
    nextRemittance: "2024-02-01",
    participations: [
      { id: "L-998", underlyingLoanId: "LOAN-998", upb: "$10m", participation: "$8m", servicer: "ServicerY", priority: "Senior" }
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
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          IntainMARKETS — Investor Console
        </Typography>
        
        <Button
          onClick={handleOrgMenu}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{ mr: 2, textTransform: 'none' }}
        >
          <Chip label="Org: Demo Fund LP" size="small" />
        </Button>
        
        <Menu
          anchorEl={orgAnchorEl}
          open={Boolean(orgAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Demo Fund LP</MenuItem>
          <MenuItem onClick={handleClose}>Demo Fund II</MenuItem>
          <MenuItem onClick={handleClose}>Demo Fund III</MenuItem>
        </Menu>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, maxWidth: 600, mx: 2 }}>
          <TextField
            placeholder="Global search… deals, loans, tranches"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
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
          <IconButton
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>Profile & Settings</MenuItem>
          <MenuItem onClick={handleClose}>Preferences</MenuItem>
          <MenuItem onClick={handleClose}>API Keys</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose} sx={{ color: 'error.main' }}>Sign out</MenuItem>
        </Menu>

        <Button variant="outlined" size="small" onClick={onToggleRight} sx={{ ml: 1 }}>
          Right Drawer
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function SideNav({ current, onNavigate }) {
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
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', p: 2 }}>
        <Typography variant="overline" color="text.secondary" sx={{ mb: 1 }}>
          Navigation
        </Typography>
        
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={current === item.key}
                onClick={() => onNavigate(item.key)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem disablePadding>
            <ListItemButton onClick={() => setPortfolioOpen(!portfolioOpen)}>
              <ListItemIcon><WalletIcon /></ListItemIcon>
              <ListItemText primary="Portfolio" />
              {portfolioOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={portfolioOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {portfolioItems.map((item) => (
                <ListItemButton
                  key={item.key}
                  sx={{ pl: 4 }}
                  selected={current === item.key}
                  onClick={() => onNavigate(item.key)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>

        <Divider sx={{ my: 2 }} />
        
        <Typography variant="overline" color="text.secondary" sx={{ mb: 1 }}>
          Shortcuts
        </Typography>
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterIcon />}
              fullWidth
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
            >
              Issuers
            </Button>
          </Grid>
        </Grid>
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
        '& .MuiDrawer-paper': {
          width: 420,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="warning" />
                </ListItemIcon>
                <ListItemText primary="Covenant test approaching (FAC-13)" />
              </ListItem>
            </List>
            <Button variant="outlined" size="small" fullWidth>
              View all
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Audit & Provenance" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Recent audit events and provenance tracking.
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Document viewed: ABC Trust Offering Memo"
                  secondary="2024-01-15 14:30 UTC"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TokenIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="NFT linked: TRN-1A Token #123"
                  secondary="2024-01-15 10:15 UTC"
                />
              </ListItem>
            </List>
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
          <Card variant="outlined">
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                {kpi.label}
              </Typography>
              <Typography variant="h6" component="div" sx={{ color: `${kpi.color}.main` }}>
                {kpi.value}
              </Typography>
              <Typography variant="caption" color={`${kpi.color}.main`}>
                {kpi.trend}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// Asset Type & Verification Level Components
function AssetTypeChip({ assetType, provenance }) {
  const getColor = (type) => {
    switch (type) {
      case 'SC_DAI': return 'primary';
      case 'SC': return 'secondary';
      case 'ThirdPartyCertified': return 'success';
      default: return 'default';
    }
  };

  return (
    <Tooltip title={
      <Box>
        <Typography variant="body2"><strong>Source:</strong> {provenance.source}</Typography>
        <Typography variant="body2"><strong>As-Of:</strong> {new Date(provenance.asOf).toLocaleString()}</Typography>
        <Typography variant="body2"><strong>Signer:</strong> {provenance.signer}</Typography>
        <Typography variant="body2"><strong>Hash:</strong> {provenance.hash}</Typography>
        {provenance.txid && (
          <Typography variant="body2"><strong>TxID:</strong> {provenance.txid}</Typography>
        )}
      </Box>
    }>
      <Chip 
        label={assetType} 
        size="small" 
        color={getColor(assetType)}
        variant="outlined"
        icon={<VerifiedIcon />}
      />
    </Tooltip>
  );
}

function VerificationLevelChip({ level, provenance }) {
  const getColor = (level) => {
    switch (level) {
      case 'ThirdPartyCertified': return 'success';
      case 'SelfCertified': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Tooltip title={
      <Box>
        <Typography variant="body2"><strong>Source:</strong> {provenance.source}</Typography>
        <Typography variant="body2"><strong>As-Of:</strong> {new Date(provenance.asOf).toLocaleString()}</Typography>
        <Typography variant="body2"><strong>Signer:</strong> {provenance.signer}</Typography>
        <Typography variant="body2"><strong>Hash:</strong> {provenance.hash}</Typography>
      </Box>
    }>
      <Chip 
        label={level} 
        size="small" 
        color={getColor(level)}
        variant="outlined"
        icon={<CheckCircleIcon />}
      />
    </Tooltip>
  );
}

function DocsNftChip({ docCount, hasNft, nftRef }) {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
      <Chip 
        label={`Docs: ${docCount}`} 
        size="small" 
        variant="outlined"
        icon={<DocumentIcon />}
      />
      {hasNft && nftRef && (
        <Tooltip title={
          <Box>
            <Typography variant="body2"><strong>Chain:</strong> {nftRef.chain}</Typography>
            <Typography variant="body2"><strong>Contract:</strong> {nftRef.contract}</Typography>
            <Typography variant="body2"><strong>Token ID:</strong> {nftRef.tokenId}</Typography>
            <Typography variant="body2"><strong>URI:</strong> {nftRef.tokenUri}</Typography>
          </Box>
        }>
          <Chip 
            label="NFT ✓" 
            size="small" 
            color="success"
            icon={<TokenIcon />}
          />
        </Tooltip>
      )}
      {!hasNft && (
        <Chip 
          label="NFT –" 
          size="small" 
          variant="outlined"
          icon={<CancelIcon />}
        />
      )}
    </Box>
  );
}

function OpportunitiesSnapshot({ onOpenDetail, onViewAll }) {
  return (
    <Card>
      <CardHeader
        title="Opportunities — last updates"
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button size="small" onClick={onViewAll}>
              View all opportunities
            </Button>
            <Chip label="Preview" size="small" variant="outlined" />
            <Chip label="Open" size="small" color="primary" />
            <Chip label="Closing soon" size="small" variant="outlined" />
            <Chip label="New" size="small" variant="outlined" />
          </Box>
        }
      />
      <CardContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Issuer</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Price/Yield</TableCell>
                <TableCell>Stage</TableCell>
                <TableCell>Asset Type</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell>Docs/NFTs</TableCell>
                <TableCell>Last</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockOpportunities.slice(0, 3).map((o) => (
                <TableRow key={o.id} hover>
                  <TableCell>{o.type}</TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{o.issuer}</TableCell>
                  <TableCell>${o.size}m</TableCell>
                  <TableCell>{o.priceYield}</TableCell>
                  <TableCell>
                    <Chip
                      label={o.stage}
                      size="small"
                      color={o.stage === "Open" ? "primary" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <AssetTypeChip assetType={o.assetType} provenance={o.provenance} />
                  </TableCell>
                  <TableCell>
                    <VerificationLevelChip level={o.verificationLevel} provenance={o.provenance} />
                  </TableCell>
                  <TableCell>
                    <DocsNftChip docCount={o.docCount} hasNft={o.hasNft} nftRef={o.nftRef} />
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
    { key: "CF", kpi1: "$312m", kpi2: "Headroom $58m", route: "portfolioCF" },
    { key: "ABS/MBS", kpi1: "$205m", kpi2: "Next pay 15‑Feb", route: "portfolioABSMBS" },
    { key: "WLS", kpi1: "$86m", kpi2: "2,431 loans", route: "portfolioWLS" },
    { key: "PA", kpi1: "$8m", kpi2: "17 parts", route: "portfolioPA" },
  ];

  return (
    <Grid container spacing={2}>
      {tiles.map((tile) => (
        <Grid item xs={12} sm={6} key={tile.key}>
          <Card sx={{ cursor: 'pointer' }}>
            <CardContent sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                {tile.key}
              </Typography>
              <Typography variant="h5" component="div">
                {tile.kpi1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
    { id: 2, text: "Allocate for WLS Pool 7", due: "tomorrow", priority: "medium" },
    { id: 3, text: "Review CF‑12 funding notice", due: "due", priority: "high" },
  ];

  return (
    <Card>
      <CardHeader title="Tasks & Alerts" />
      <CardContent>
        <List dense>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemIcon>
                <SecurityIcon color={item.priority === "high" ? "error" : "warning"} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
              <Chip label={item.due} size="small" variant="outlined" />
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" size="small" fullWidth>
          View all
        </Button>
      </CardContent>
    </Card>
  );
}

function Landing({ onOpenDetail, onViewAll }) {
  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 3 }}>
        <KpiStrip />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ mb: 3 }}>
            <OpportunitiesSnapshot onOpenDetail={onOpenDetail} onViewAll={onViewAll} />
          </Box>

          <Card>
            <CardHeader title="Insights" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Exceptions: 3</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Triggers WARN: 1</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2">Covenants OK</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ mb: 3 }}>
            <PortfolioSnapshot />
          </Box>
          <TasksPanel />
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardHeader title="Recent Activity" />
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
// Enhanced Opportunities with Advanced Filters
// ---------------------------------------------
function AdvancedFilters({ filters, onFilterChange }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="Advanced Filters"
        action={
          <IconButton onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        }
      />
      <Collapse in={expanded}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Asset Type</InputLabel>
                <Select
                  multiple
                  value={filters.assetTypes}
                  onChange={(e) => onFilterChange('assetTypes', e.target.value)}
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
                  value={filters.verificationLevels}
                  onChange={(e) => onFilterChange('verificationLevels', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="SelfCertified">SelfCertified</MenuItem>
                  <MenuItem value="ThirdPartyCertified">ThirdPartyCertified</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Geography</InputLabel>
                <Select
                  multiple
                  value={filters.geographies}
                  onChange={(e) => onFilterChange('geographies', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="US">US</MenuItem>
                  <MenuItem value="EU">EU</MenuItem>
                  <MenuItem value="APAC">APAC</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Asset Class</InputLabel>
                <Select
                  multiple
                  value={filters.assetClasses}
                  onChange={(e) => onFilterChange('assetClasses', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Residential Mortgage">Residential Mortgage</MenuItem>
                  <MenuItem value="Commercial Lending">Commercial Lending</MenuItem>
                  <MenuItem value="Commercial Real Estate">Commercial Real Estate</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Access Level</InputLabel>
                <Select
                  multiple
                  value={filters.accessLevels}
                  onChange={(e) => onFilterChange('accessLevels', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="NDA">NDA</MenuItem>
                  <MenuItem value="Data-room">Data-room</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Stage</InputLabel>
                <Select
                  multiple
                  value={filters.stages}
                  onChange={(e) => onFilterChange('stages', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Preview">Preview</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={filters.hasNft}
                      onChange={(e) => onFilterChange('hasNft', e.target.checked)}
                    />
                  }
                  label="Has NFT"
                />
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={filters.hasDocuments}
                      onChange={(e) => onFilterChange('hasDocuments', e.target.checked)}
                    />
                  }
                  label="Has Documents"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function OpportunitiesTable({ onOpenDetail, filters }) {
  const [expanded, setExpanded] = useState(null);
  const [ndaAcknowledged, setNdaAcknowledged] = useState(false);
  const [mnpiAcknowledged, setMnpiAcknowledged] = useState(false);

  // Filter opportunities based on filters
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter(opp => {
      if (filters.assetTypes.length > 0 && !filters.assetTypes.includes(opp.assetType)) return false;
      if (filters.verificationLevels.length > 0 && !filters.verificationLevels.includes(opp.verificationLevel)) return false;
      if (filters.geographies.length > 0 && !filters.geographies.includes(opp.geography)) return false;
      if (filters.assetClasses.length > 0 && !filters.assetClasses.includes(opp.assetClass)) return false;
      if (filters.accessLevels.length > 0 && !filters.accessLevels.includes(opp.access)) return false;
      if (filters.stages.length > 0 && !filters.stages.includes(opp.stage)) return false;
      if (filters.hasNft && !opp.hasNft) return false;
      if (filters.hasDocuments && opp.docCount === 0) return false;
      return true;
    });
  }, [filters]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControlLabel
            control={<Switch size="small" checked={ndaAcknowledged} onChange={(e) => setNdaAcknowledged(e.target.checked)} />}
            label="NDA"
            labelPlacement="start"
          />
          <FormControlLabel
            control={<Switch size="small" checked={mnpiAcknowledged} onChange={(e) => setMnpiAcknowledged(e.target.checked)} />}
            label="MNPI"
            labelPlacement="start"
          />
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Issuer/Servicer</TableCell>
              <TableCell>Stage</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Ccy</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Price/Yield</TableCell>
              <TableCell>WAL</TableCell>
              <TableCell>Asset Type</TableCell>
              <TableCell>Verification</TableCell>
              <TableCell>Docs/NFTs</TableCell>
              <TableCell>Last</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOpportunities.map((o) => (
              <React.Fragment key={o.id}>
                <TableRow hover>
                  <TableCell padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    >
                      {expanded === o.id ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Chip label={o.type} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>{o.issuer}</TableCell>
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
                    <AssetTypeChip assetType={o.assetType} provenance={o.provenance} />
                  </TableCell>
                  <TableCell>
                    <VerificationLevelChip level={o.verificationLevel} provenance={o.provenance} />
                  </TableCell>
                  <TableCell>
                    <DocsNftChip docCount={o.docCount} hasNft={o.hasNft} nftRef={o.nftRef} />
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
                      <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', gap: 3 }}>
                            {o.type === "ABS" && (
                              <>
                                <Typography variant="body2">
                                  Triggers: OC {o.triggers?.oc} <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} /> | IC {o.triggers?.ic} <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />
                                </Typography>
                                <Typography variant="body2">Factor {o.factor}</Typography>
                                <Typography variant="body2">Next Pay: {o.nextPayDate}</Typography>
                              </>
                            )}
                            {o.type === "WLS" && (
                              <Typography variant="body2">
                                Loans {o.loans} | WA FICO {o.wafico} | LTV {o.ltv}% | WA Rate {o.waRate} | WA Term {o.waRemainingTerm}
                              </Typography>
                            )}
                            {o.type === "CF" && (
                              <Typography variant="body2">
                                Headroom {o.headroom} | Tenor {o.tenor} | Advance rate {o.advanceRate}%
                              </Typography>
                            )}
                            {o.type === "PA" && (
                              <Typography variant="body2">
                                % Available {o.availPct}% | Priority {o.cashFlowPriority}
                              </Typography>
                            )}
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
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
                {mockOpportunities.map(o => (
                  <TableCell key={o.id}>{o.issuer}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cols.map((c) => (
                <TableRow key={c}>
                  <TableCell sx={{ fontWeight: 'medium' }}>{c}</TableCell>
                  {mockOpportunities.map(o => (
                    <TableCell key={o.id}>
                      {c === "Yield/Price" && o.priceYield}
                      {c === "Size" && `$${o.size}m`}
                      {c === "WAL" && o.wal}
                      {c === "Notes" && <TextField size="small" placeholder="notes" fullWidth />}
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
  const [filters, setFilters] = useState({
    assetTypes: [],
    verificationLevels: [],
    geographies: [],
    assetClasses: [],
    accessLevels: [],
    stages: [],
    hasNft: false,
    hasDocuments: false
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Opportunities</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
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

      <AdvancedFilters filters={filters} onFilterChange={handleFilterChange} />

      {view === "table" && <OpportunitiesTable onOpenDetail={onOpenDetail} filters={filters} />}
      {view === "cards" && <OpportunitiesTable onOpenDetail={onOpenDetail} filters={filters} />}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
          <AssetTypeChip assetType={deal.assetType} provenance={deal.provenance} />
          <VerificationLevelChip level={deal.verificationLevel} provenance={deal.provenance} />
          <DocsNftChip docCount={deal.docCount} hasNft={deal.hasNft} nftRef={deal.nftRef} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined">Subscribe</Button>
          <Button variant="outlined">Indicate Interest</Button>
          <Button
            variant="contained"
            onClick={() => setOpenSettlement(true)}
          >
            Settlement (B4.1)
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                        <Typography variant="body2">Summary KPIs (placeholder)</Typography>
                      </CardContent>
                    </Card>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="body2">Charts / Tables (placeholder)</Typography>
                      </CardContent>
                    </Card>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" onClick={() => setOpenDataRoom(true)}>
                        Open Data Room (B10.2)
                      </Button>
                      <Button variant="outlined" onClick={() => setOpenWaterfall(true)}>
                        Open Waterfall Viewer (B10.3)
                      </Button>
                      <Button variant="outlined" onClick={() => setOpenPivot(true)}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Card>
              <CardHeader title="KPIs & Provenance" />
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label="VA" size="small" variant="outlined" />
                    <Typography variant="body2">Verification Agent data present</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label="Trustee" size="small" variant="outlined" />
                    <Typography variant="body2">Official report loaded</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label="On‑chain" size="small" variant="outlined" />
                    <Typography variant="body2">Tx: 0xabc… (placeholder)</Typography>
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
      <Dialog open={openSettlement} onClose={() => setOpenSettlement(false)} maxWidth="sm" fullWidth>
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

      <Dialog open={openDataRoom} onClose={() => setOpenDataRoom(false)} maxWidth="md" fullWidth>
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

      <Dialog open={openWaterfall} onClose={() => setOpenWaterfall(false)} maxWidth="lg" fullWidth>
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

      <Dialog open={openPivot} onClose={() => setOpenPivot(false)} maxWidth="lg" fullWidth>
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

  const openDetail = (id) => {
    setDetailId(id);
    setRoute("detail");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <TopBar onToggleRight={() => setRightOpen(true)} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <SideNav current={route} onNavigate={(k) => setRoute(k)} />
        <Box sx={{ flex: 1, overflow: 'auto', bgcolor: 'grey.50' }}>
          {route === "home" && (
            <>
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3">Home</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SparklesIcon />
                  <Typography variant="body2" color="text.secondary">
                    Unified Opportunities + Portfolio snapshot
                  </Typography>
                </Box>
              </Box>
              <Landing onOpenDetail={openDetail} onViewAll={() => setRoute("opportunities")} />
            </>
          )}
          {route === "opportunities" && <Opportunities onOpenDetail={openDetail} />}
          {route === "detail" && detailId && <OpportunityDetail id={detailId} onBack={() => setRoute("opportunities")} />}

          {route === "portfolioOverview" && <Placeholder title="Portfolio — Overview" />}
          {route === "portfolioCF" && <Placeholder title="Portfolio — Credit Facilities" />}
          {route === "portfolioABSMBS" && <Placeholder title="Portfolio — ABS/MBS" />}
          {route === "portfolioWLS" && <Placeholder title="Portfolio — Whole Loans" />}
          {route === "portfolioPA" && <Placeholder title="Portfolio — Participations" />}

          {route === "activity" && <Placeholder title="Activity" />}
          {route === "reports" && <Placeholder title="Reports" />}
          {route === "settings" && <Placeholder title="Settings" />}
        </Box>
        <RightDrawer open={rightOpen} onClose={() => setRightOpen(false)} />
      </Box>
    </Box>
  );
} 