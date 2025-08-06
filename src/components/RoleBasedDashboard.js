import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Alert,
} from "@mui/material";
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  CheckCircle,
} from "@mui/icons-material";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  InputNumber,
} from "antd";
import { UploadOutlined, CalculatorOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;

const RoleBasedDashboard = ({ userRole }) => {
  const navigate = useNavigate();

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalType, setModalType] = useState(""); // 'funding-request' or 'term-sheet'
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Add state for Request Info modal
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  const [requestInfoComment, setRequestInfoComment] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  // Add state for Funding Notice modal
  const [showFundingNoticeModal, setShowFundingNoticeModal] = useState(false);
  const [fundingNoticeData, setFundingNoticeData] = useState({
    fundingRequestId: "",
    borrowerName: "",
    drawAmount: "",
    fundingDate: "",
    purpose: "",
    collateralValue: "",
    noticeId: "",
  });
  const [isESignComplete, setIsESignComplete] = useState(false);

  // Add state for U2 Funding Notice form
  const [fundingNoticeForm, setFundingNoticeForm] = useState({
    linkedFundingRequestId: "",
    approvedDrawAmount: "",
    lenderAllocation: [
      { lender: "Lender A", amount: "", margin: "", spreadFloor: "" },
      { lender: "Lender B", amount: "", margin: "", spreadFloor: "" },
      { lender: "Lender C", amount: "", margin: "", spreadFloor: "" },
    ],
    pricingIndex: "",
    fixedRate: "",
    facilityMargin: "",
    fundingAccount: "",
    fundingDateConfirmed: "",
    pdfPreview: null,
  });

  // Add state for E-Signature modal
  const [showESignatureModal, setShowESignatureModal] = useState(false);
  // const [isESignComplete, setIsESignComplete] = useState(false);
  const [eSignatureData, setESignatureData] = useState({
    signerName: "Facility Agent",
    signerId: "FA-001",
    timestamp: "",
    signatureHash: "",
  });

  // Mock data with status updates
  const [deals, setDeals] = useState([
    {
      dealId: "DEAL-2024-001",
      termSheets: [
        {
          id: "TS-2024-001",
          status: "Approved",
          borrowerName: "ABC Corporation",
          commitmentAmount: "$100,000,000",
          submittedDate: "2024-01-15",
        },
      ],
      masterCommitment: {
        id: "MC-2024-001",
        status: "Active",
        borrowerName: "ABC Corporation",
        commitmentAmount: "$100,000,000",
        availableCapacity: "$100,000,000",
        activatedDate: "2024-01-20",
        lenderAcceptance: "100%",
        nextSteps: "Ready for Funding Requests",
      },
    },
    {
      dealId: "DEAL-2024-002",
      termSheets: [
        {
          id: "TS-2024-002",
          status: "Pending Review",
          borrowerName: "XYZ Holdings",
          commitmentAmount: "$75,000,000",
          submittedDate: "2024-01-20",
        },
      ],
      masterCommitment: null,
    },
  ]);

  // Add state for Treasury Operations
  const [settlements, setSettlements] = useState([
    {
      id: "SETTLE-2024-001",
      fundingNoticeId: "FN-2024-001",
      borrowerName: "DEF Industries",
      amount: "$2,000,000",
      status: "Settled",
      settlementDate: "2024-02-09",
      wireReference: "WIRE-2024-001",
      lenderName: "Lender A",
      settlementType: "Fedwire",
      reconciliationStatus: "Matched",
    },
    {
      id: "SETTLE-2024-002",
      fundingNoticeId: "FN-2024-001",
      borrowerName: "DEF Industries",
      amount: "$2,000,000",
      status: "Settled",
      settlementDate: "2024-02-09",
      wireReference: "WIRE-2024-002",
      lenderName: "Lender B",
      settlementType: "Fedwire",
      reconciliationStatus: "Matched",
    },
    {
      id: "SETTLE-2024-003",
      fundingNoticeId: "FN-2024-001",
      borrowerName: "DEF Industries",
      amount: "$1,000,000",
      status: "Pending",
      settlementDate: "",
      wireReference: "",
      lenderName: "Lender C",
      settlementType: "USDC",
      reconciliationStatus: "Pending",
    },
  ]);

  // Add state for showing comments textarea
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState("");

  // Modal functions
  const showModal = (task, type) => {
    setSelectedTask(task);
    setModalType(type);
    setIsModalVisible(true);

    // Pre-fill form data based on task
    if (type === "funding-request") {
      form.setFieldsValue({
        masterCommitmentId: task.masterCommitmentId,
        fundingRequestId: task.id,
        drawAmount: task.amount,
        fundingDate: dayjs(),
        purposeOfFunds: task.purpose,
        drawCurrency: "USD",
        notes: "",
      });
    } else if (type === "term-sheet") {
      form.setFieldsValue({
        borrowerEntity: task.borrowerName,
        requestedCommitment: task.amount,
        requestedAdvanceRate: "85.00",
        requestedMargin: "350",
        requestedPricingIndex: "SOFR 1M",
        requestedFixedRate: "",
        requestedMaturityDate: dayjs().add(1, "year"),
        requestedDrawFrequency: "Monthly",
        covenantTemplate: "Standard",
        collateralProfile: "Residential Mortgages",
        supportingDocuments: [],
        financialStatements: [],
        kycDocuments: [],
        collateralData: [],
      });
    }
  };

  const handleModalOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      if (modalType === "funding-request") {
        // Handle funding request approval/rejection
        console.log("Funding Request Review:", { task: selectedTask, values });
        message.success("Funding request review completed successfully!");
      } else if (modalType === "term-sheet") {
        // Handle term sheet approval/rejection
        console.log("Term Sheet Review:", { task: selectedTask, values });
        message.success("Term sheet review completed successfully!");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Add the missing handler functions
  const handleRequestInfo = (taskId) => {
    setCurrentTaskId(taskId);
    setRequestInfoComment("");
    setShowRequestInfoModal(true);
  };

  // Add function to submit the info request
  const handleSubmitRequestInfo = async () => {
    try {
      setLoading(true);

      console.log(
        "Sending info request for:",
        currentTaskId,
        requestInfoComment
      );

      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // Set status to info_requested and send comment to borrower
      alert(
        "Info request sent to borrower successfully! Status updated to: info_requested"
      );

      setShowRequestInfoModal(false);
      setIsModalVisible(false);
      setRequestInfoComment("");
      setCurrentTaskId(null);
      form.resetFields();
    } catch (error) {
      message.error("Failed to send info request");
    } finally {
      setLoading(false);
    }
  };

  // Add function to cancel info request
  const handleCancelRequestInfo = () => {
    setShowRequestInfoModal(false);
    setRequestInfoComment("");
    setCurrentTaskId(null);
  };

  // Add function to handle textarea change
  const handleCommentChange = (e) => {
    setRequestInfoComment(e.target.value);
  };

  const handleReject = async (taskId) => {
    try {
      setLoading(true);
      const comments = form.getFieldValue("reviewComments") || "";

      console.log("Rejecting task:", taskId, comments);

      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));

      alert("Funding request rejected successfully!");
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Failed to reject funding request");
    } finally {
      setLoading(false);
    }
  };

  // Update handleApprove to hide textarea
  const handleApprove = async (taskId) => {
    setShowComments(false);
    setComments("");

    try {
      setLoading(true);
      const reviewComments = form.getFieldValue("reviewComments") || "";

      console.log("Approving task:", taskId, reviewComments);

      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1000));

      if (modalType === "term-sheet") {
        // For Term Sheet approval - Redirect to Master Commitment creation
        alert(
          "Term Sheet approved and fully signed! Redirecting to Master Commitment creation..."
        );

        // Close modal and redirect to Master Commitment page
        setIsModalVisible(false);
        form.resetFields();

        // Navigate to Master Commitment with term sheet data
        navigate("/master-commitment", {
          state: {
            termSheet: selectedTask,
            status: "Fully_Signed",
          },
        });
      } else if (modalType === "funding-request") {
        // For Funding Request approval - Issue Funding Notice
        message.success(
          "Funding request approved! Now e-sign the funding notice."
        );

        // Set e-signature data
        setESignatureData({
          signerName: "Facility Agent",
          signerId: "FA-001",
          timestamp: new Date().toISOString(),
          signatureHash: "",
        });

        // Close review modal and open E-Signature modal
        setIsModalVisible(false);
        setShowESignatureModal(true);
        form.resetFields();
      }
    } catch (error) {
      message.error("Failed to approve request");
    } finally {
      setLoading(false);
    }
  };

  // Add function to handle e-signature completion
  const handleESignatureComplete = async () => {
    try {
      setLoading(true);

      console.log("E-signing funding notice...");

      // Simulate e-signature process
      // await new Promise(resolve => setTimeout(resolve, 2000));

      setIsESignComplete(true);

      // Simulate backend transaction
      console.log("Backend call → mintFT()");
      console.log("Emits: FUNDING_NOTICE_ISSUED");
      console.log("Locks collateral NFTs");
      console.log("Updates FundingRequest.status → Notice_Issued");

      message.success(
        "E-signature complete! Funding notice issued successfully."
      );

      // Close e-signature modal and open funding notice confirmation modal
      setTimeout(() => {
        setShowESignatureModal(false);
        setIsESignComplete(false);
        setShowFundingNoticeModal(true);
      }, 2000);
    } catch (error) {
      message.error("Failed to complete e-signature");
    } finally {
      setLoading(false);
    }
  };

  // Add function to cancel e-signature
  const handleCancelESignature = () => {
    setShowESignatureModal(false);
    setIsESignComplete(false);
    setESignatureData({});
  };

  // Add function to handle lender allocation changes
  const handleLenderAllocationChange = (index, field, value) => {
    const newAllocation = [...fundingNoticeForm.lenderAllocation];
    newAllocation[index][field] = value;

    setFundingNoticeForm((prev) => ({
      ...prev,
      lenderAllocation: newAllocation,
    }));
  };

  // Add function to calculate total allocation
  const getTotalAllocation = () => {
    return fundingNoticeForm.lenderAllocation.reduce((sum, lender) => {
      return sum + (parseFloat(lender.amount) || 0);
    }, 0);
  };

  // Add function to validate form
  const validateFundingNotice = () => {
    const totalAllocation = getTotalAllocation();
    const approvedAmount = parseFloat(
      fundingNoticeForm.approvedDrawAmount.replace(/[$,]/g, "")
    );

    return (
      totalAllocation === approvedAmount &&
      fundingNoticeForm.fundingAccount &&
      fundingNoticeForm.fundingDateConfirmed
    );
  };

  // Add function to handle CSV paste for lender allocation
  const handleCSVPaste = (event) => {
    const csvData = event.clipboardData.getData("text");
    const rows = csvData.split("\n").filter((row) => row.trim());

    const newAllocation = rows.map((row, index) => {
      const [lender, amount, margin, spreadFloor] = row
        .split(",")
        .map((cell) => cell.trim());
      return {
        lender: lender || `Lender ${index + 1}`,
        amount: amount || "",
        margin: margin || "350",
        spreadFloor: spreadFloor || "0",
      };
    });

    setFundingNoticeForm((prev) => ({
      ...prev,
      lenderAllocation: newAllocation,
    }));
  };

  const getDashboardContent = () => {
    switch (userRole) {
      case "Borrower":
        return <BorrowerDashboard deals={deals} />;
      case "Facility Agent":
        return <FacilityAgentDashboard />;
      case "Lender":
        return <LenderDashboard />;
      case "verification_agent":
        return <VerificationAgentDashboard />;
      case "servicer":
        return <ServicerDashboard />;
      case "trustee":
        return <TrusteeDashboard />;
      case "Treasury Ops":
        return <TreasuryOpsDashboard />;
      default:
        return <div>Dashboard not found for role: {userRole}</div>;
    }
  };

  const BorrowerDashboard = ({ deals }) => {
    const activeDeals = deals.filter(
      (deal) => deal.masterCommitment?.status === "Active"
    );
    const pendingDeals = deals.filter(
      (deal) => deal.masterCommitment?.status === "Pending_Lender"
    );
    const draftDeals = deals.filter((deal) =>
      deal.termSheets.some((ts) => ts.status === "Draft")
    );

    return (
      <div className="">
        <h2>Borrower Dashboard</h2>

        {/* Active Commitments Section */}
        {activeDeals.length > 0 && (
          <div className="deals-table-section">
            <div className="table-header"></div>

            <div className="table-container">
              <table className="deals-table">
                <thead>
                  <tr>
                    <th>Master Commitment ID</th>
                    <th>Borrower</th>
                    <th>Commitment Amount</th>
                    <th>Available Capacity</th>
                    <th>Activated Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeDeals.map((deal) => (
                    <tr key={deal.dealId}>
                      <td>{deal.masterCommitment.id}</td>
                      <td>{deal.masterCommitment.borrowerName}</td>
                      <td>{deal.masterCommitment.commitmentAmount}</td>
                      <td className="available-capacity">
                        <strong>
                          {deal.masterCommitment.availableCapacity}
                        </strong>
                        <span className="capacity-label">
                          Available for Draw
                        </span>
                      </td>
                      <td>{deal.masterCommitment.activatedDate}</td>
                      <td>
                        <span className="status-badge status-active">
                          ✅ Active
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/funding-request/create/${deal.masterCommitment.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            📤 Create Funding Request
                          </Link>
                          <Link
                            to={`/commitment-details/${deal.masterCommitment.id}`}
                            className="btn btn-secondary btn-sm"
                          >
                            🔍 View Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pending Lender Acceptance */}
        {pendingDeals.length > 0 && (
          <div className="deals-table-section">
            <div className="table-header">
              <h3>⏳ Pending Lender Acceptance</h3>
            </div>

            <div className="table-container">
              <table className="deals-table">
                <thead>
                  <tr>
                    <th>Master Commitment ID</th>
                    <th>Borrower</th>
                    <th>Commitment Amount</th>
                    <th>Lender Acceptance</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDeals.map((deal) => (
                    <tr key={deal.dealId}>
                      <td>{deal.masterCommitment.id}</td>
                      <td>{deal.masterCommitment.borrowerName}</td>
                      <td>{deal.masterCommitment.commitmentAmount}</td>
                      <td>
                        <div className="acceptance-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${deal.masterCommitment.lenderAcceptance}`,
                              }}
                            ></div>
                          </div>
                          <span>{deal.masterCommitment.lenderAcceptance}</span>
                        </div>
                      </td>
                      <td>
                        <span className="status-badge status-pending">
                          ⏳ Pending Lender
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/commitment-details/${deal.masterCommitment.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          🔍 View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Draft Term Sheets */}
        {draftDeals.length > 0 && (
          <div className="deals-table-section">
            <div className="table-header">
              <h3>📝 Draft Term Sheets</h3>
            </div>

            <div className="table-container">
              <table className="deals-table">
                <thead>
                  <tr>
                    <th>Term Sheet ID</th>
                    <th>Borrower</th>
                    <th>Commitment Amount</th>
                    <th>Submitted Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {draftDeals.map((deal) =>
                    deal.termSheets
                      .filter((ts) => ts.status === "Draft")
                      .map((termSheet) => (
                        <tr key={termSheet.id}>
                          <td>{termSheet.id}</td>
                          <td>{termSheet.borrowerName}</td>
                          <td>{termSheet.commitmentAmount}</td>
                          <td>{termSheet.submittedDate}</td>
                          <td>
                            <span className="status-badge status-draft">
                              📝 Draft
                            </span>
                          </td>
                          <td>
                            <Link
                              to={`/term-sheet/${termSheet.id}`}
                              className="btn btn-primary btn-sm"
                            >
                              ✏️ Edit
                            </Link>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FacilityAgentDashboard = () => {
    // Combined tasks data with dummy funding notice
    const pendingTasks = [
      {
        id: "FR-2024-001",
        type: "Funding Request",
        borrowerName: "ABC Corporation",
        masterCommitmentId: "MC-2024-001",
        amount: "$5,000,000",
        purpose: "Working Capital",
        status: "Pending Review",
        submittedDate: "2024-02-10",
        priority: "High",
      },
      {
        id: "FR-2024-002",
        type: "Funding Request",
        borrowerName: "XYZ Holdings",
        masterCommitmentId: "MC-2024-002",
        amount: "$3,500,000",
        purpose: "Origination Funding",
        status: "Pending Review",
        submittedDate: "2024-02-12",
        priority: "Medium",
      },
      {
        id: "FR-2024-003",
        type: "Funding Request",
        borrowerName: "DEF Industries",
        masterCommitmentId: "MC-2024-003",
        amount: "$2,000,000",
        purpose: "Re-advance",
        status: "Notice Issued",
        submittedDate: "2024-02-08",
        priority: "Low",
        noticeId: "FN-2024-001",
        issuedDate: "2024-02-09",
        issuedBy: "FA-001",
      },
      {
        id: "TS-2024-001",
        type: "Term Sheet",
        borrowerName: "ABC Corporation",
        masterCommitmentId: "N/A",
        amount: "$100M",
        purpose: "New Facility",
        status: "Pending Review",
        submittedDate: "2024-01-15",
        priority: "Medium",
      },
    ];

    const getPriorityColor = (priority) => {
      switch (priority) {
        case "High":
          return "error";
        case "Medium":
          return "warning";
        case "Low":
          return "info";
        default:
          return "default";
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "Pending Review":
          return "warning";
        case "Notice Issued":
          return "success";
        case "Approved":
          return "success";
        case "Rejected":
          return "error";
        default:
          return "default";
      }
    };

    const handleReview = (task) => {
      if (task.type === "Funding Request") {
        showModal(task, "funding-request");
      } else if (task.type === "Term Sheet") {
        showModal(task, "term-sheet");
      }
    };

    const getActionButton = (task) => {
      if (task.status === "Notice Issued") {
        return (
          <Button
            variant="outlined"
            size="small"
            startIcon={<ViewIcon />}
            color="success"
            disabled
          >
            Notice Issued
          </Button>
        );
      }

      return (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleReview(task)}
          startIcon={<ViewIcon />}
          color="primary"
        >
          {task.type === "Funding Request"
            ? "Review Funding Req"
            : "Review Term Sheet"}
        </Button>
      );
    };

    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Facility Agent (Market Maker) Dashboard
        </Typography>

        {/* Combined Tasks Table */}
        <Card>
          <CardContent>
           
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Borrower</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Master Commitment ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Purpose</strong>
                  </TableCell>
                  {/* <TableCell><strong>Priority</strong></TableCell> */}
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Submitted Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.borrowerName}</TableCell>
                    <TableCell>{task.masterCommitmentId}</TableCell>
                    <TableCell>{task.amount}</TableCell>
                    <TableCell>{task.purpose}</TableCell>
                    {/* <TableCell>
                      <Chip 
                        label={task.priority} 
                        color={getPriorityColor(task.priority)}
                        size="small"
                      /> */}
                    {/* </TableCell> */}
                    <TableCell>
                      <Chip
                        label={task.status}
                        color={getStatusColor(task.status)}
                        size="small"
                      />
                      {task.status === "Notice Issued" && (
                        <div
                          style={{
                            marginTop: "4px",
                            fontSize: "11px",
                            color: "#666",
                          }}
                        >
                          Notice ID: {task.noticeId}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{task.submittedDate}</TableCell>
                    <TableCell>{getActionButton(task)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Main Review Modal */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ViewIcon />
              {modalType === "funding-request"
                ? "Review Funding Request"
                : "Review Term Sheet"}
            </div>
          }
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={800}
          destroyOnClose
        >
          {selectedTask && (
            <div style={{ marginTop: "20px" }}>
              <Alert severity="info" style={{ marginBottom: "20px" }}>
                Reviewing: <strong>{selectedTask.id}</strong> -{" "}
                {selectedTask.borrowerName}
              </Alert>

              {modalType === "funding-request" ? (
                <div className="">
                  <div className="form-header">
                    <h3>Review funding request submitted by borrower.</h3>
                  </div>

                  {/* Funding Request Details - Read-only display of U1 form */}
                  <div className="form-section">
                    <h4>Funding Request Details</h4>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Master Commitment ID</label>
                        <input
                          type="text"
                          value={selectedTask.masterCommitmentId}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Funding Request ID</label>
                        <input
                          type="text"
                          value={selectedTask.id}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Borrower Name</label>
                        <input
                          type="text"
                          value={selectedTask.borrowerName}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Submitted Date</label>
                        <input
                          type="text"
                          value={selectedTask.submittedDate}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Draw Amount (USD)</label>
                        <input
                          type="text"
                          value={selectedTask.amount}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Funding Date</label>
                        <input
                          type="text"
                          value="2024-02-15"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Purpose of Funds</label>
                        <input
                          type="text"
                          value={selectedTask.purpose}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Draw Currency</label>
                        <input
                          type="text"
                          value="USD"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Borrowing Base Snapshot */}
                  <div className="form-section">
                    <h4>Borrowing Base Snapshot</h4>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Total Commitment</label>
                        <input
                          type="text"
                          value="$100,000,000"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Available Capacity</label>
                        <input
                          type="text"
                          value="$95,000,000"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Advance Rate</label>
                        <input
                          type="text"
                          value="85%"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Margin</label>
                        <input
                          type="text"
                          value="350 bps"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Last BB Update</label>
                      <input
                        type="text"
                        value="2024-02-10 14:30:00 UTC"
                        readOnly
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      />
                    </div>
                  </div>

                  {/* Collateral Information */}
                  <div className="form-section">
                    <h4>Collateral Information</h4>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Collateral Addendum Upload</label>
                      <div
                        style={{
                          border: "2px dashed #d9d9d9",
                          padding: "20px",
                          textAlign: "center",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <p>📎 collateral_data_2024_02_10.csv</p>
                        <p>
                          <em>File uploaded by borrower</em>
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Estimated Collateral Value</label>
                      <input
                        type="text"
                        value="$4,850,000"
                        readOnly
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      />
                      <small>
                        Auto-calculated based on uploaded collateral and
                        eligibility rules
                      </small>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="form-section">
                    <h4>Additional Information</h4>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Notes / Internal Reference</label>
                      <textarea
                        value="Funding request for Q1 2024 working capital needs. Collateral includes residential mortgages with average FICO 750."
                        readOnly
                        rows="4"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      />
                    </div>
                  </div>

                  {/* Review Decision with inline textarea for Term Sheet */}
                  <div className="form-section">
                    <h4>Review Decision</h4>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Review Comments (Optional)</label>
                      <textarea
                        name="reviewComments"
                        placeholder="Add any comments for the borrower..."
                        rows="3"
                        maxLength="500"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleRequestInfo(selectedTask.id)}
                        disabled={loading}
                      >
                        ✏️ Request Info
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleReject(selectedTask.id)}
                        disabled={loading}
                      >
                        ❌ Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(selectedTask.id)}
                        disabled={loading}
                      >
                        ✅ Approve & E-Sign
                      </Button>
                    </div>

                    {/* Inline Comments Section - Only for Term Sheet */}
                    {modalType === "term-sheet" && showComments && (
                      <div
                        style={{
                          marginTop: "16px",
                          padding: "16px",
                          backgroundColor: "#fff3cd",
                          borderRadius: "6px",
                          border: "1px solid #ffeaa7",
                        }}
                      >
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                            color: "#856404",
                          }}
                        >
                          Comments / Reason *
                        </label>
                        <textarea
                          // value={comments}
                          // onChange={(e) => setComments(e.target.value)}
                          placeholder="Please provide detailed comments or reason for changes..."
                          rows="4"
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            fontSize: "14px",
                            resize: "vertical",
                          }}
                        />
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "12px",
                            color: "#856404",
                          }}
                        >
                          Please specify what changes are needed from the
                          borrower.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="form-header">
                    <h3>Review term sheet submitted by borrower.</h3>
                  </div>

                  <div className="form-section">
                    <h4>Basic Information</h4>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Borrower Entity</label>
                        <input
                          type="text"
                          value={selectedTask.borrowerName}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Term Sheet ID</label>
                        <input
                          type="text"
                          value={selectedTask.id}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Requested Commitment Amount</label>
                        <input
                          type="text"
                          value={selectedTask.amount}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Requested Advance Rate</label>
                        <input
                          type="text"
                          value="85.00%"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Requested Margin</label>
                        <input
                          type="text"
                          value="350 bps"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Requested Pricing Index</label>
                        <input
                          type="text"
                          value="SOFR 1M"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Requested Fixed Rate</label>
                        <input
                          type="text"
                          value="N/A"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Requested Maturity Date</label>
                        <input
                          type="text"
                          value="2026-12-31"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <label>Requested Draw Frequency</label>
                        <input
                          type="text"
                          value="Monthly"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label>Covenant Template</label>
                        <input
                          type="text"
                          value="Standard"
                          readOnly
                          style={{
                            width: "100%",
                            padding: "8px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            backgroundColor: "#f5f5f5",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Collateral Profile</label>
                      <input
                        type="text"
                        value="Residential Mortgages, Commercial RE"
                        readOnly
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h4>Supporting Documents</h4>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Financial Statements</label>
                      <div
                        style={{
                          border: "2px dashed #d9d9d9",
                          padding: "20px",
                          textAlign: "center",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <p>📎 financial_statements_2024.pdf</p>
                        <p>
                          <em>File uploaded by borrower</em>
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label>KYC Documents</label>
                      <div
                        style={{
                          border: "2px dashed #d9d9d9",
                          padding: "20px",
                          textAlign: "center",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <p>📎 kyc_documents_2024.pdf</p>
                        <p>
                          <em>File uploaded by borrower</em>
                        </p>
                      </div>
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Collateral Data</label>
                      <div
                        style={{
                          border: "2px dashed #d9d9d9",
                          padding: "20px",
                          textAlign: "center",
                          borderRadius: "6px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        <p>📎 collateral_data_2024.xlsx</p>
                        <p>
                          <em>File uploaded by borrower</em>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review Decision with inline textarea for Term Sheet */}
                  <div className="form-section">
                    <h4>Review Decision</h4>

                    <div style={{ marginBottom: "16px" }}>
                      <label>Review Comments (Optional)</label>
                      <textarea
                        name="reviewComments"
                        placeholder="Add any comments for the borrower..."
                        rows="3"
                        maxLength="500"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #d9d9d9",
                          borderRadius: "6px",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="warning"
                        onClick={() => handleRequestChanges(selectedTask.id)}
                        disabled={loading}
                      >
                        ✏️ Request Changes
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleReject(selectedTask.id)}
                        disabled={loading}
                      >
                        ❌ Reject
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(selectedTask.id)}
                        disabled={loading}
                      >
                        ✅ Approve & E-Sign
                      </Button>
                    </div>

                    {/* Inline Comments Section - Only for Term Sheet */}
                    {modalType === "term-sheet" && showComments && (
                      <div
                        style={{
                          marginTop: "16px",
                          padding: "16px",
                          backgroundColor: "#fff3cd",
                          borderRadius: "6px",
                          border: "1px solid #ffeaa7",
                        }}
                      >
                        <label
                          style={{
                            display: "block",
                            marginBottom: "8px",
                            fontWeight: "bold",
                            color: "#856404",
                          }}
                        >
                          Comments / Reason *
                        </label>
                        <textarea
                          // value={comments}
                          // onChange={(e) => setComments(e.target.value)}
                          placeholder="Please provide detailed comments or reason for changes..."
                          rows="4"
                          required
                          style={{
                            width: "100%",
                            padding: "12px",
                            border: "1px solid #d9d9d9",
                            borderRadius: "6px",
                            fontSize: "14px",
                            resize: "vertical",
                          }}
                        />
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "12px",
                            color: "#856404",
                          }}
                        >
                          Please specify what changes are needed from the
                          borrower.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>

        {/* Request Info Modal with Textarea */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ViewIcon />
              Request Additional Information
            </div>
          }
          open={showRequestInfoModal}
          onOk={handleSubmitRequestInfo}
          onCancel={handleCancelRequestInfo}
          okText="Send Request"
          cancelText="Cancel"
          confirmLoading={loading}
          width={600}
          destroyOnClose={false}
          maskClosable={false}
          // Add these props to prevent modal from closing unexpectedly
          keyboard={false}
          closable={true}
        >
          <div style={{ marginTop: "20px" }}>
            <Alert severity="info" style={{ marginBottom: "20px" }}>
              You are requesting additional information from the borrower for:{" "}
              <strong>{currentTaskId}</strong>
            </Alert>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                What additional information do you need from the borrower?
              </label>
              <textarea
                // value={requestInfoComment}
                // onChange={(e) => setRequestInfoComment(e.target.value)}
                placeholder="Please specify what additional information or documents you need from the borrower. For example: 'Please upload latest bank statement' or 'Please provide additional collateral documentation'"
                rows="6"
                maxLength="1000"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  fontSize: "14px",
                  resize: "vertical",
                }}
                // Add these props to prevent event bubbling
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
              />
              <div
                style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}
              >
                {requestInfoComment.length}/1000 characters
              </div>
            </div>

            <Alert severity="warning" style={{ marginTop: "16px" }}>
              <strong>Note:</strong> This will set the status to
              "info_requested" and send your comment to the borrower. The
              borrower will be notified and can respond with the requested
              information.
            </Alert>
          </div>
        </Modal>

        {/* Funding Notice Modal */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle />
              Issue Funding Notice
            </div>
          }
          open={showFundingNoticeModal}
          onCancel={handleCancelFundingNotice}
          footer={null}
          width={800}
          destroyOnClose
        >
          <div style={{ marginTop: "20px" }}>
            <Alert severity="success" style={{ marginBottom: "20px" }}>
              Funding request approved! Now issue the funding notice with
              e-signature.
            </Alert>

            <div className="form-section">
              <h4>Funding Notice Details</h4>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Notice ID</label>
                  <input
                    type="text"
                    value={fundingNoticeData.noticeId}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Funding Request ID</label>
                  <input
                    type="text"
                    value={fundingNoticeData.fundingRequestId}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Borrower</label>
                  <input
                    type="text"
                    value={fundingNoticeData.borrowerName}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Draw Amount</label>
                  <input
                    type="text"
                    value={fundingNoticeData.drawAmount}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Funding Date</label>
                  <input
                    type="text"
                    value={fundingNoticeData.fundingDate}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Purpose</label>
                  <input
                    type="text"
                    value={fundingNoticeData.purpose}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label>Collateral Value</label>
                <input
                  type="text"
                  value={fundingNoticeData.collateralValue}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </div>
            </div>

            <div className="form-section">
              <h4>E-Signature</h4>

              <div
                style={{
                  border: "2px dashed #d9d9d9",
                  padding: "20px",
                  textAlign: "center",
                  borderRadius: "6px",
                  marginBottom: "16px",
                }}
              >
                {!isESignComplete ? (
                  <div>
                    <p>Click below to e-sign the funding notice</p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleESignatureComplete}
                      disabled={loading}
                      style={{ marginTop: "10px" }}
                    >
                      {loading ? "Signing..." : "E-Sign Funding Notice"}
                    </Button>
                  </div>
                ) : (
                  <div style={{ color: "green" }}>
                    <CheckCircle
                      style={{ fontSize: "48px", marginBottom: "10px" }}
                    />
                    <p>
                      <strong>E-Signature Complete!</strong>
                    </p>
                    <p>Funding notice has been issued successfully.</p>
                  </div>
                )}
              </div>

              <Alert severity="info" style={{ marginTop: "16px" }}>
                <strong>Backend Transaction:</strong> This will lock collateral
                NFTs and call mintFT(). Event: FUNDING_NOTICE_ISSUED will be
                emitted.
              </Alert>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button onClick={handleCancelFundingNotice}>Cancel</Button>
              {isESignComplete && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setShowFundingNoticeModal(false)}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </Modal>

        {/* E-Signature Modal */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle />
              E-Signature Required
            </div>
          }
          open={showESignatureModal}
          onCancel={handleCancelESignature}
          footer={null}
          width={600}
          destroyOnClose
        >
          <div style={{ marginTop: "20px" }}>
            <Alert severity="info" style={{ marginBottom: "20px" }}>
              You are about to e-sign the funding notice. This will trigger the
              issuance process.
            </Alert>

            <div className="form-section">
              <h4>Funding Notice Summary</h4>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Funding Request ID</label>
                  <input
                    type="text"
                    value={selectedTask?.id || ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Approved Amount</label>
                  <input
                    type="text"
                    value={selectedTask?.amount || ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Borrower</label>
                  <input
                    type="text"
                    value={selectedTask?.borrowerName || ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Funding Date</label>
                  <input
                    type="text"
                    value="2024-02-15"
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>E-Signature</h4>

              <div
                style={{
                  border: "2px dashed #d9d9d9",
                  padding: "20px",
                  textAlign: "center",
                  borderRadius: "6px",
                  marginBottom: "16px",
                }}
              >
                {!isESignComplete ? (
                  <div>
                    <p>Click below to e-sign the funding notice</p>
                    <p>
                      <strong>Signer:</strong> {eSignatureData.signerName} (
                      {eSignatureData.signerId})
                    </p>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleESignatureComplete}
                      disabled={loading}
                      style={{ marginTop: "10px" }}
                    >
                      {loading ? "Signing..." : "E-Sign Funding Notice"}
                    </Button>
                  </div>
                ) : (
                  <div style={{ color: "green" }}>
                    <CheckCircle
                      style={{ fontSize: "48px", marginBottom: "10px" }}
                    />
                    <p>
                      <strong>E-Signature Complete!</strong>
                    </p>
                    <p>Backend processing...</p>
                    <p>• mintFT() called</p>
                    <p>• Collateral NFTs locked</p>
                    <p>• FUNDING_NOTICE_ISSUED emitted</p>
                  </div>
                )}
              </div>

              <Alert severity="warning" style={{ marginTop: "16px" }}>
                <strong>Backend Transaction:</strong> This will lock collateral
                NFTs, call mintFT(), update FacilityToken balances, and emit
                FUNDING_NOTICE_ISSUED event.
              </Alert>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button onClick={handleCancelESignature}>Cancel</Button>
            </div>
          </div>
        </Modal>

        {/* Funding Notice Confirmation Modal */}
        <Modal
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle />
              Funding Notice Issued Successfully
            </div>
          }
          open={showFundingNoticeModal}
          onCancel={handleCancelFundingNotice}
          footer={null}
          width={800}
          destroyOnClose
        >
          <div style={{ marginTop: "20px" }}>
            <Alert severity="success" style={{ marginBottom: "20px" }}>
              Funding notice has been issued successfully! Status updated to:
              Notice_Issued
            </Alert>

            <div className="form-section">
              <h4>Notice Summary</h4>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Notice ID</label>
                  <input
                    type="text"
                    value={`FN-${Date.now()}`}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Funding Request ID</label>
                  <input
                    type="text"
                    value={selectedTask?.id || ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Issued Amount</label>
                  <input
                    type="text"
                    value={selectedTask?.amount || ""}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Issued Date</label>
                  <input
                    type="text"
                    value={new Date().toLocaleString()}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label>Transaction Hash</label>
                <input
                  type="text"
                  value="0x1234567890abcdef..."
                  readOnly
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "6px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Token Mint Summary</h4>

              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  padding: "16px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <p>
                  <strong>FT supply minted to lender wallets:</strong>
                </p>
                <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                  <li>Lender A: $2,000,000 FT tokens</li>
                  <li>Lender B: $2,000,000 FT tokens</li>
                  <li>Lender C: $1,000,000 FT tokens</li>
                </ul>
                <p>
                  <strong>Total: $5,000,000 FT tokens minted</strong>
                </p>
              </div>
            </div>

            <div className="form-section">
              <h4>Settlement Status</h4>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <div style={{ flex: 1 }}>
                  <label>Settlement Status</label>
                  <input
                    type="text"
                    value="Pending"
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#fff3cd",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Expected Settlement Date</label>
                  <input
                    type="text"
                    value="2024-02-15"
                    readOnly
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </div>
              </div>

              <Alert severity="info" style={{ marginTop: "16px" }}>
                <strong>Next Steps:</strong> Lenders will wire funds
                (Fedwire/USDC) → TRO matches against mint amount →
                Settlement.status = Pending → Settled → Reconciliation job
                ingests bank file.
              </Alert>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button onClick={handleCancelFundingNotice}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setShowFundingNoticeModal(false);
                  // Could redirect to Notice Summary screen here
                }}
              >
                View Notice Summary
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  const LenderDashboard = () => {
    const allItems = [
      // Master Commitments
      {
        id: "MC-2024-001",
        type: "commitment",
        borrowerName: "ABC Corporation",
        amount: "$100,000,000",
        status: "Pending_Lender",
        submittedDate: "2024-01-15",
        currentAcceptance: 75,
        acceptanceThreshold: 100,
      },
      {
        id: "MC-2024-002",
        type: "commitment",
        borrowerName: "XYZ Holdings",
        amount: "$75,000,000",
        status: "Active",
        submittedDate: "2024-01-20",
        currentAcceptance: 100,
        acceptanceThreshold: 100,
      },
      // Funding Notices
      {
        id: "FN-2024-001",
        type: "funding_notice",
        facilityId: "FAC-2024-001",
        borrowerName: "ABC Corporation",
        amount: "$25,000,000",
        status: "Notice Issued",
        deadline: "2024-01-27",
        issueDate: "2024-01-20",
      },
      {
        id: "FN-2024-002",
        type: "funding_notice",
        facilityId: "FAC-2024-002",
        borrowerName: "XYZ Holdings",
        amount: "$15,000,000",
        status: "Funds Confirmed",
        deadline: "2024-01-25",
        issueDate: "2024-01-18",
      },
      {
        id: "FN-2024-003",
        type: "funding_notice",
        facilityId: "FAC-2024-003",
        borrowerName: "DEF Industries",
        amount: "$30,000,000",
        status: "Treasury Verified",
        deadline: "2024-01-30",
        issueDate: "2024-01-22",
      },
    ];

    const notifications = [
      {
        id: 1,
        type: "funding_notice",
        title: "New Funding Notice",
        message: "Funding Notice FN-2024-001 requires $25M wire transfer by 2024-01-27",
        timestamp: "2024-01-20 09:15 AM",
        read: false,
        priority: "high",
      },
      {
        id: 2,
        type: "funding_notice",
        title: "Funds Confirmed",
        message: "Your wire transfer for FN-2024-002 has been confirmed. Waiting for Treasury verification.",
        timestamp: "2024-01-18 11:30 AM",
        read: false,
        priority: "medium",
      },
      {
        id: 3,
        type: "funding_notice",
        title: "Treasury Verification Complete",
        message: "Treasury Operations has verified your wire transfer for FN-2024-003. Funding is complete!",
        timestamp: "2024-01-15 03:45 PM",
        read: false,
        priority: "medium",
      },
      {
        id: 4,
        type: "commitment_request",
        title: "Master Commitment Review",
        message: "New Master Commitment MC-2024-003 requires your review and signature",
        timestamp: "2024-01-14 10:30 AM",
        read: false,
        priority: "high",
      },
    ];

    const getStatusColor = (status) => {
      switch (status) {
        case "Pending_Lender":
        case "Notice Issued":
          return "warning";
        case "Active":
        case "Funds Confirmed":
          return "info";
        case "Treasury Verified":
        case "Completed":
          return "success";
        case "Rejected":
          return "error";
        default:
          return "default";
      }
    };

   

    const getItemTypeLabel = (type) => {
      return type === "commitment" ? "Master Commitment" : "Funding Notice";
    };

    const getActionButton = (item) => {
      if (item.type === "commitment") {
        if (item.status === "Pending_Lender") {
          return (
            <Button
              variant="contained"
              size="small"
              component={Link}
              to={`/lender-commitment/${item.id}`}
              startIcon={<ViewIcon />}
              color="primary"
            >
              Review & Approve
            </Button>
          );
        } else if (item.status === "Active") {
          return (
            <Button
              variant="outlined"
              size="small"
              disabled
              color="success"
            >
              Already Approved
            </Button>
          );
        } else if (item.status === "Rejected") {
          return (
            <Button
              variant="outlined"
              size="small"
              disabled
              color="error"
            >
              Rejected
            </Button>
          );
        }
      } else if (item.type === "funding_notice") {
        if (item.status === "Notice Issued") {
          return (
            <Button
              variant="contained"
              size="small"
              component={Link}
              to={`/lender-funding-notice/${item.id}`}
              startIcon={<ViewIcon />}
              color="primary"
            >
              Wire Funds
            </Button>
          );
        } else if (item.status === "Funds Confirmed") {
          return (
            <Button
              variant="outlined"
              size="small"
              disabled
              color="info"
            >
              Funds Confirmed
            </Button>
          );
        } else if (item.status === "Treasury Verified") {
          return (
            <Button
              variant="outlined"
              size="small"
              disabled
              color="success"
            >
              Treasury Verified
            </Button>
          );
        } else if (item.status === "Completed") {
          return (
            <Button
              variant="outlined"
              size="small"
              disabled
              color="success"
            >
              Completed
            </Button>
          );
        }
      }
      
      return (
        <Button
          variant="outlined"
          size="small"
          disabled
        >
          N/A
        </Button>
      );
    };

    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Lender Dashboard
        </Typography>

        {/* Notifications Section */}
       

        {/* Unified Items Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📋 All Items (Commitments & Funding Notices)
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Borrower</strong></TableCell>
                  <TableCell><strong>Amount</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Chip
                        label={getItemTypeLabel(item.type)}
                        color={item.type === "commitment" ? "primary" : "secondary"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.borrowerName}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      {item.type === "commitment" 
                        ? item.submittedDate 
                        : item.issueDate
                      }
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status.replace("_", " ")}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {getActionButton(item)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const VerificationAgentDashboard = () => {
    return (
      <>
        <div className="dashboard-header">
          <h1>Verification Agent Dashboard</h1>
          <p>Review collateral data and verify compliance.</p>
        </div>

        <div className="dashboard-content">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/collateral-review" className="btn btn-primary">
                Review Collateral
              </Link>
              <Link to="/compliance-checks" className="btn btn-secondary">
                Compliance Checks
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const ServicerDashboard = () => {
    const stats = [
      {
        label: "Active Facilities",
        value: "15",
        change: "+2",
        changeType: "positive",
      },
      {
        label: "Collections This Month",
        value: "$45M",
        change: "+$8M",
        changeType: "positive",
      },
      {
        label: "Performance Data",
        value: "Updated",
        change: "Today",
        changeType: "positive",
      },
    ];

    return (
      <>
        <div className="dashboard-header">
          <h1>Servicer Dashboard</h1>
          <p>Upload collections and performance data for credit facilities.</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className={`stat-change ${stat.changeType}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/upload-collections" className="btn btn-primary">
                Upload Collections
              </Link>
              <Link to="/performance-data" className="btn btn-secondary">
                Performance Data
              </Link>
              <Link to="/servicing-reports" className="btn btn-secondary">
                Servicing Reports
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const TrusteeDashboard = () => {
    return (
      <>
        <div className="dashboard-header">
          <h1>Trustee / Custodian Dashboard</h1>
          <p>Manage legal title and custody for credit facilities.</p>
        </div>

        <div className="dashboard-content">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <Link to="/legal-title" className="btn btn-primary">
                Legal Title Management
              </Link>
              <Link to="/custody-accounts" className="btn btn-secondary">
                Custody Accounts
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const TreasuryOpsDashboard = () => {
    const stats = [
      {
        label: "Settlements Today",
        value: "8",
        change: "+2",
        changeType: "positive",
      },
      {
        label: "Total Settled",
        value: "$25M",
        change: "+$5M",
        changeType: "positive",
      },
      {
        label: "Pending Settlements",
        value: "3",
        change: "-1",
        changeType: "negative",
      },
    ];

    const getSettlementStatusColor = (status) => {
      switch (status) {
        case "Settled":
          return "success";
        case "Pending":
          return "warning";
        case "Failed":
          return "error";
        default:
          return "default";
      }
    };

    const getReconciliationStatusColor = (status) => {
      switch (status) {
        case "Matched":
          return "success";
        case "Pending":
          return "warning";
        case "Mismatch":
          return "error";
        default:
          return "default";
      }
    };

    return (
      <div style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Treasury Operations Dashboard
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Settlement Management
            </Typography>
            
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Settlement ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Funding Notice</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Borrower</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Lender</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Amount</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Settlement Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Reconciliation</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settlements.map((settlement) => (
                  <TableRow key={settlement.id}>
                    <TableCell>{settlement.id}</TableCell>
                    <TableCell>{settlement.fundingNoticeId}</TableCell>
                    <TableCell>{settlement.borrowerName}</TableCell>
                    <TableCell>{settlement.lenderName}</TableCell>
                    <TableCell>{settlement.amount}</TableCell>
                    <TableCell>{settlement.settlementType}</TableCell>
                    <TableCell>
                      <Chip
                        label={settlement.status}
                        color={getSettlementStatusColor(settlement.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{settlement.settlementDate || "Pending"}</TableCell>
                    <TableCell>
                      <Chip
                        label={settlement.reconciliationStatus}
                        color={getReconciliationStatusColor(settlement.reconciliationStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {settlement.status === "Pending" && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          onClick={() => handleSettlementMatch(settlement.id)}
                        >
                          Match Settlement
                        </Button>
                      )}
                      {settlement.status === "Settled" && (
                        <Button
                          variant="outlined"
                          size="small"
                          color="success"
                          onClick={() =>
                            handleViewSettlementDetails(settlement.id)
                          }
                        >
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary">
                Upload Bank File
              </Button>
              <Button variant="outlined" color="secondary">
                Run Reconciliation
              </Button>
              <Button variant="outlined" color="secondary">
                Settlement Reports
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
    );
  };

  const DefaultDashboard = () => {
    return (
      <>
        <div className="dashboard-header">
          <h1>Welcome to IntainMARKETS</h1>
          <p>Please select your role to access the appropriate dashboard.</p>
        </div>
      </>
    );
  };

  const handleCancelFundingNotice = () => {
    setShowFundingNoticeModal(false);
    setIsESignComplete(false);
    setFundingNoticeData({});
  };

  // Add function to handle settlement matching
  const handleSettlementMatch = async (settlementId) => {
    try {
      console.log("Matching settlement:", settlementId);

      // Simulate settlement matching
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // Update settlement status
      setSettlements((prev) =>
        prev.map((s) =>
          s.id === settlementId
            ? {
                ...s,
                status: "Settled",
                settlementDate: new Date().toISOString().split("T")[0],
                reconciliationStatus: "Matched",
              }
            : s
        )
      );

      message.success(
        "Settlement matched successfully! Status updated to Settled."
      );
    } catch (error) {
      message.error("Failed to match settlement");
    }
  };

  // Add function to view settlement details
  const handleViewSettlementDetails = (settlementId) => {
    const settlement = settlements.find((s) => s.id === settlementId);
    console.log("Viewing settlement details:", settlement);
    // Could open a modal with detailed settlement information
  };

  // Update handleRequestChanges to show inline textarea
  const handleRequestChanges = (taskId) => {
    setShowComments(true);
  };

  return <div className="">{getDashboardContent()}</div>;
};

export default RoleBasedDashboard;
