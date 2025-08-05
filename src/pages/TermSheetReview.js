import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockTermSheets = [
  {
    id: "TS-2024-001",
    borrowerName: "ABC Corporation",
    borrowerEntity: "borrower1",
    submittedDate: "2024-01-15",
    status: "Pending Review",
    requestedCommitment: "100000000",
    requestedAdvanceRate: "85.00",
    requestedMargin: "350",
    requestedPricingIndex: "SOFR 1M",
    requestedMaturityDate: "2026-12-31",
    requestedDrawFrequency: "Monthly",
    covenantTemplate: "Standard",
    collateralProfile: "Residential Mortgages, Commercial RE",
    supportingDocs: ["financials.pdf", "kyc_docs.pdf"],
    termSheetPDF: "signed_term_sheet.pdf",
    version: 1,
  },
  {
    id: "TS-2024-002",
    borrowerName: "XYZ Holdings",
    borrowerEntity: "borrower2",
    submittedDate: "2024-01-20",
    status: "Pending Review",
    requestedCommitment: "75000000",
    requestedAdvanceRate: "80.00",
    requestedMargin: "400",
    requestedPricingIndex: "SOFR Daily",
    requestedMaturityDate: "2025-12-31",
    requestedDrawFrequency: "Weekly",
    covenantTemplate: "Custom",
    collateralProfile: "Commercial Real Estate",
    supportingDocs: ["financials.pdf", "kyc_docs.pdf", "custom_covenant.xlsx"],
    termSheetPDF: "signed_term_sheet_v2.pdf",
    version: 2,
  },
];

const TermSheetReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const termSheet = mockTermSheets.find((ts) => ts.id === id);
  const [reviewDecision, setReviewDecision] = useState("");
  const [comments, setComments] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [status, setStatus] = useState(termSheet.status);

  // Check if termSheet exists BEFORE using its properties
  if (!termSheet) {
    return (
      <div className="form-container">
        <div className="form-header">
          <h1>Term Sheet Not Found</h1>
          <p>The requested term sheet could not be found.</p>
        </div>
        <div className="error-message">
          <p>Term Sheet ID: {id}</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Now it's safe to use termSheet properties

  const handleDecision = (decision) => {
    setReviewDecision(decision);
    if (decision === "approve") {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewDecision === "approve") {
      setStatus("Fully_Signed");
      setTimeout(() => {
        alert(
          "Term Sheet approved and fully signed! Redirecting to Master Commitment creation..."
        );
        navigate("/master-commitment", { state: { termSheet } });
      }, 1000);
    } else if (reviewDecision === "request_changes") {
      setStatus("Revise");
      setTimeout(() => {
        alert(
          "Changes requested. Borrower will be notified to submit a new version."
        );
        // navigate("/dashboard");
      }, 1000);
    } else if (reviewDecision === "reject") {
      setStatus("Rejected");
      setTimeout(() => {
        alert("Term Sheet rejected. Borrower will be notified.");
        // navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Term Sheet Review</h1>
        <p>Review and approve Borrower's Term Sheet application</p>
      </div>

      <div className="review-summary">
        <div className="review-header">
          <h3>📋 Term Sheet Summary</h3>
          <div
            className={`status-badge ${status.replace("_", "-").toLowerCase()}`}
          >
            {status.replace("_", " ")}
          </div>
        </div>
        <div className="review-details">
          <div className="detail-row">
            <span className="label">Term Sheet ID:</span>
            <span className="value">{termSheet.id}</span>
          </div>
          <div className="detail-row">
            <span className="label">Borrower:</span>
            <span className="value">{termSheet.borrowerName}</span>
          </div>
          <div className="detail-row">
            <span className="label">Submitted Date:</span>
            <span className="value">{termSheet.submittedDate}</span>
          </div>
          <div className="detail-row">
            <span className="label">Version:</span>
            <span className="value">v{termSheet.version}</span>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="form-section">
        <h3>Signed Term Sheet</h3>
        <div className="term-sheet-preview">
          <div className="pdf-placeholder">
            <div className="pdf-icon">📄</div>
            <div className="pdf-info">
              <h4>{termSheet.termSheetPDF}</h4>
              <p>Signed by Borrower on {termSheet.submittedDate}</p>
              <p>Version: {termSheet.version}</p>
            </div>
            <button type="button" className="btn btn-secondary">
              View PDF
            </button>
          </div>
        </div>
      </div>

      {/* Term Sheet Details */}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Term Sheet Details</h3>
          <div className="review-grid">
            <div className="review-item">
              <label>Requested Commitment Amount</label>
              <div className="readonly-value">
                ${parseInt(termSheet.requestedCommitment).toLocaleString()}
              </div>
            </div>
            <div className="review-item">
              <label>Advance Rate</label>
              <div className="readonly-value">
                {termSheet.requestedAdvanceRate}%
              </div>
            </div>
            <div className="review-item">
              <label>Margin</label>
              <div className="readonly-value">
                {termSheet.requestedMargin} bps
              </div>
            </div>
            <div className="review-item">
              <label>Pricing Index</label>
              <div className="readonly-value">
                {termSheet.requestedPricingIndex}
              </div>
            </div>
            <div className="review-item">
              <label>Maturity Date</label>
              <div className="readonly-value">
                {termSheet.requestedMaturityDate}
              </div>
            </div>
            <div className="review-item">
              <label>Draw Frequency</label>
              <div className="readonly-value">
                {termSheet.requestedDrawFrequency}
              </div>
            </div>
            <div className="review-item">
              <label>Covenant Template</label>
              <div className="readonly-value">{termSheet.covenantTemplate}</div>
            </div>
            <div className="review-item">
              <label>Collateral Profile</label>
              <div className="readonly-value">
                {termSheet.collateralProfile}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Documents */}
        <div className="form-section">
          <h3>Supporting Documents</h3>
          <div className="documents-list">
            {termSheet.supportingDocs.map((doc, idx) => (
              <div key={idx} className="document-item">
                <div className="document-icon">📄</div>
                <div className="document-info">
                  <div className="document-name">{doc}</div>
                  <div className="document-meta">Uploaded by Borrower</div>
                </div>
                <div className="document-actions">
                  <button type="button" className="btn-download">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review Decision */}
        <div className="form-section">
          <h3>Review Decision</h3>
          <div className="decision-buttons">
            <button
              type="button"
              className={`decision-btn approve ${
                reviewDecision === "approve" ? "active" : ""
              }`}
              onClick={() => handleDecision("approve")}
            >
              ✅ Approve & E-Sign
            </button>
            <button
              type="button"
              className={`decision-btn request-changes ${
                reviewDecision === "request_changes" ? "active" : ""
              }`}
              onClick={() => handleDecision("request_changes")}
            >
              ✏️ Request Changes
            </button>
            <button
              type="button"
              className={`decision-btn reject ${
                reviewDecision === "reject" ? "active" : ""
              }`}
              onClick={() => handleDecision("reject")}
            >
              ❌ Reject
            </button>
          </div>
          {showComments && (
            <div className="comments-section">
              <label className="required">Comments / Reason</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please provide detailed comments or reason for rejection/changes..."
                rows="4"
                required
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!reviewDecision || (showComments && !comments.trim())}
          >
            {reviewDecision === "approve"
              ? "Approve & E-Sign"
              : reviewDecision === "request_changes"
              ? "Request Changes"
              : reviewDecision === "reject"
              ? "Reject Term Sheet"
              : "Submit Decision"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TermSheetReview;
