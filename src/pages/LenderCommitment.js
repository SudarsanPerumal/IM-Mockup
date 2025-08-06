import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './LenderCommitment.css';
const LenderCommitment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [commitment, setCommitment] = useState(null);
  const [decision, setDecision] = useState('');
  const [comments, setComments] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // E-Sign states
  const [showESignModal, setShowESignModal] = useState(false);
  const [signatureData, setSignatureData] = useState({
    lenderAddr: '0x1234567890abcdef...', // Mock lender address
    sigHash: '',
    commitmentPct: '25.00',
    signatureStatus: 'pending'
  });
  const [isConsentChecked, setIsConsentChecked] = useState(false); // Add this state

  // Mock commitment data - same structure as MasterCommitment.js
  const mockCommitments = [
    {
      id: 'MC-2024-001',
      dealId: 'DEAL-2024-001',
      // U0 Master Commitment Setup UI - BRD Specification (READ ONLY)
      masterCommitmentId: 'MC-2024-001', // Auto-generated
      borrowerEntity: 'borrower1', // Field 2
      facilityType: 'Revolver', // Field 3
      commitmentAmount: '100000000', // Field 4
      advanceRate: '85.00', // Field 5
      margin: '350', // Field 6
      pricingIndex: 'SOFR 1M', // Field 7
      fixedRate: '', // Field 8 (conditional)
      maturityDate: '2026-12-31', // Field 9
      drawFrequencyLimit: 'Monthly', // Field 10
      covenantTemplate: 'Standard', // Field 11
      customCovenantFile: null, // Field 11 (conditional)
      lenderGroup: [ // Field 12
        { lender: 'Goldman Sachs', commitmentPercent: '25.00', votingPercent: '25.00', status: 'Accepted' },
        { lender: 'Morgan Stanley', commitmentPercent: '25.00', votingPercent: '25.00', status: 'Accepted' },
        { lender: 'Citigroup', commitmentPercent: '25.00', votingPercent: '25.00', status: 'Pending' },
        { lender: 'Deutsche Bank', commitmentPercent: '25.00', votingPercent: '25.00', status: 'Pending' }
      ],
      collateralEligibilityRules: '3 rule groups configured: Loan Type, Geographic, Performance', // Field 13
      trustee: 'trustee1', // Field 14
      borrowerName: 'ABC Corporation',
      lenderAllocation: '25.00',
      lenderAllocationAmount: '25000000',
      totalLenders: 4,
      termSheetPDF: 'signed_term_sheet.pdf',
      masterCommitmentPDF: 'master_commitment.pdf',
      submittedDate: '2024-01-15',
      status: 'Pending Lender Commitment'
    }
  ];

  useEffect(() => {
    const foundCommitment = mockCommitments.find(c => c.id === id);
    if (foundCommitment) {
      setCommitment(foundCommitment);
    }
  }, [id]);

  const handleDecision = (newDecision) => {
    setDecision(newDecision);
    if (newDecision === 'accept') {
      setShowComments(false);
      // Trigger E-Sign modal for Accept
      setShowESignModal(true);
    } else {
      setShowComments(true);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToEnd(true);
    }
  };

  // E-Sign Functions
  const handleESignComplete = async (signatureData) => {
    console.log('E-Sign completed:', signatureData);
    
    // Update signature data
    setSignatureData({
      ...signatureData,
      sigHash: `0x${Math.random().toString(16).substr(2, 64)}`, // Mock signature hash
      signatureStatus: 'signed'
    });

    // Call API to record signature
    await recordSignature(signatureData);
  };

  const recordSignature = async (signatureData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to POST /cfdeals/{id}/signatures
      console.log('Calling POST /cfdeals/{id}/signatures');
      console.log('Payload:', {
        dealId: commitment.dealId,
        lenderAddr: signatureData.lenderAddr,
        sigHash: signatureData.sigHash,
        commitmentPct: signatureData.commitmentPct,
        timestamp: new Date().toISOString()
      });

      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate CommitmentSignature.status = Signed
      console.log('CommitmentSignature.status = Signed');
      console.log('Emitting SIGNATURE_RECORDED event');

      alert('Signature recorded successfully! Your commitment has been accepted.');
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Error recording signature:', error);
      alert('Error recording signature. Please try again.');
    } finally {
      setIsSubmitting(false);
      setShowESignModal(false);
      setIsConsentChecked(false); // Reset consent when modal closes
    }
  };

  const handleConsentChange = (e) => {
    setIsConsentChecked(e.target.checked);
  };

  const handleSignAndAccept = () => {
    if (isConsentChecked) {
      handleESignComplete(signatureData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!decision) return;

    setIsSubmitting(true);

    try {
      if (decision === 'accept') {
        // E-Sign is handled separately via modal
        return;
      } else if (decision === 'reject') {
        console.log('Rejecting commitment:', commitment.id, 'Reason:', comments);
        setTimeout(() => {
          alert('Commitment rejected. Facility Agent will be notified.');
          navigate('/dashboard');
        }, 1500);
      } else if (decision === 'request_changes') {
        console.log('Requesting changes:', commitment.id, 'Comments:', comments);
        setTimeout(() => {
          alert('Change request submitted. Facility Agent will review your feedback.');
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      console.error('Error submitting decision:', error);
      alert('Error submitting decision. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!commitment) {
    return (
      <div className="form-container">
        <div className="form-header">
          <h1>Commitment Not Found</h1>
          <p>The requested commitment could not be found.</p>
        </div>
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Master Commitment Review</h1>
        <p>Review and accept your commitment to the credit facility</p>
        <div className="commitment-info">
          <p><strong>Deal ID:</strong> {commitment.dealId} | <strong>MC ID:</strong> {commitment.id}</p>
          <p><strong>Borrower:</strong> {commitment.borrowerName}</p>
        </div>
      </div>

      {/* U0 Master Commitment Setup UI - IDENTICAL TO MasterCommitment.js BUT READ-ONLY */}
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Facility Basics (Pre-filled from Term Sheet)</h3>
          
          {/* Field 1: Master Commitment ID */}
          <div className="form-row">
            <div className="form-field">
              <label>Master Commitment ID</label>
              <input
                type="text"
                value={commitment.masterCommitmentId}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 2: Borrower Entity - READ ONLY */}
            <div className="form-field">
              <label>Borrower Entity</label>
              <select
                value={commitment.borrowerEntity}
                disabled
                className="readonly-field"
              >
                <option value="borrower1">ABC Corporation</option>
                <option value="borrower2">XYZ Holdings</option>
                <option value="borrower3">DEF Industries</option>
              </select>
            </div>
          </div>

          {/* Field 3: Facility Type - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Facility Type</label>
              <select
                value={commitment.facilityType}
                disabled
                className="readonly-field"
              >
                <option value="Revolver">Revolver</option>
                <option value="Delayed Draw Term">Delayed Draw Term</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            {/* Field 4: Commitment Amount - READ ONLY */}
            <div className="form-field">
              <label>Commitment Amount (USD)</label>
              <input
                type="number"
                value={commitment.commitmentAmount}
                readOnly
                className="readonly-field"
                placeholder="100,000,000"
                min="0"
                step="1000000"
              />
            </div>
          </div>

          {/* Field 5: Advance Rate - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Advance Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={commitment.advanceRate}
                readOnly
                className="readonly-field"
                placeholder="85.00"
                min="0"
                max="100"
              />
            </div>
            {/* Field 6: Margin - READ ONLY */}
            <div className="form-field">
              <label>Margin (bps)</label>
              <input
                type="number"
                value={commitment.margin}
                readOnly
                className="readonly-field"
                placeholder="350"
                min="0"
                max="1000"
              />
            </div>
          </div>

          {/* Field 7: Pricing Index - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Pricing Index</label>
              <select
                value={commitment.pricingIndex}
                disabled
                className="readonly-field"
              >
                <option value="SOFR 1M">SOFR 1M</option>
                <option value="SOFR Daily">SOFR Daily</option>
                <option value="Prime">Prime</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            {/* Field 8: Fixed Rate - READ ONLY (if applicable) */}
            {commitment.pricingIndex === 'Fixed' && (
              <div className="form-field">
                <label>Fixed Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={commitment.fixedRate}
                  readOnly
                  className="readonly-field"
                  placeholder="5.25"
                  min="0"
                  max="100"
                />
              </div>
            )}
          </div>

          {/* Field 9: Maturity Date - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Maturity Date</label>
              <input
                type="date"
                value={commitment.maturityDate}
                readOnly
                className="readonly-field"
                min={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                title="Typically 12-24 months"
              />
            </div>
            {/* Field 10: Draw Frequency Limit - READ ONLY */}
            <div className="form-field">
              <label>Draw Frequency Limit</label>
              <select
                value={commitment.drawFrequencyLimit}
                disabled
                className="readonly-field"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Unlimited">Unlimited</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Covenants & Parties</h3>
          
          {/* Field 11: Covenant Template - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Covenant Template</label>
              <select
                value={commitment.covenantTemplate}
                disabled
                className="readonly-field"
              >
                <option value="Standard">Standard</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            {/* Field 14: Trustee/Custodian - READ ONLY */}
            <div className="form-field">
              <label>Trustee / Custodian</label>
              <select
                value={commitment.trustee}
                disabled
                className="readonly-field"
              >
                <option value="trustee1">Bank of America</option>
                <option value="trustee2">JPMorgan Chase</option>
                <option value="trustee3">Wells Fargo</option>
              </select>
            </div>
          </div>

          {/* Field 11: Custom Covenant Upload - READ ONLY (if applicable) */}
          {commitment.covenantTemplate === 'Custom' && (
            <div className="form-field">
              <label>Custom Covenant Upload</label>
              <div className="file-upload readonly-field">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  disabled
                />
                <div>
                  <p>Click to upload or drag and drop</p>
                  <p>Excel files only (.xlsx, .xls)</p>
                  {commitment.customCovenantFile && (
                    <p>Selected: {commitment.customCovenantFile.name}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Field 12: Lender Group Table - READ ONLY */}
          <div className="form-field">
            <label>Lender Group Table</label>
            <table className="grid-table">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Commitment %</th>
                  <th>Voting %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {commitment.lenderGroup.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        value={row.lender}
                        disabled
                        className="readonly-field"
                      >
                        <option value="lender1">Goldman Sachs</option>
                        <option value="lender2">Morgan Stanley</option>
                        <option value="lender3">Citigroup</option>
                        <option value="lender4">Deutsche Bank</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        value={row.commitmentPercent}
                        readOnly
                        className="readonly-field"
                        placeholder="25.00"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        value={row.votingPercent}
                        readOnly
                        className="readonly-field"
                        placeholder="25.00"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <span className={`status-badge ${row.status === 'Accepted' ? 'approved' : 'pending'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Field 13: Collateral Eligibility Rules - READ ONLY */}
          <div className="form-field">
            <label>Collateral Eligibility Rules</label>
            <button 
              type="button" 
              className="btn btn-secondary"
              disabled
              style={{ width: 'auto', marginTop: '8px' }}
            >
              Configure Collateral Rules
            </button>
            {commitment.collateralEligibilityRules && (
              <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f0f8ff', borderRadius: '4px', fontSize: '12px' }}>
                <strong>Configured Rules:</strong> {commitment.collateralEligibilityRules}
              </div>
            )}
          </div>
        </div>

        {/* PDF Documents */}
        <div className="form-section">
          <h3> Facility Documents</h3>
          <div className="documents-grid">
            <div className="document-card">
              <div className="document-header">
                <h4>Signed Term Sheet</h4>
                <span className="document-badge">Borrower + FA Signed</span>
              </div>
              <div className="document-preview">
                <div className="pdf-placeholder">
                  <div className="pdf-icon">📄</div>
                  <div className="pdf-info">
                    <p><strong>{commitment.termSheetPDF}</strong></p>
                    <p>Signed by Borrower and Facility Agent</p>
                    <p>Version: 1.0</p>
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-secondary">View PDF</button>
            </div>

            <div className="document-card">
              <div className="document-header">
                <h4>Master Commitment</h4>
                <span className="document-badge">FA Created</span>
              </div>
              <div className="document-preview">
                <div className="pdf-placeholder">
                  <div className="pdf-icon">📄</div>
                  <div className="pdf-info">
                    <p><strong>{commitment.masterCommitmentPDF}</strong></p>
                    <p>Created by Facility Agent</p>
                    <p>Lender allocations configured</p>
                  </div>
                </div>
              </div>
              <button type="button" className="btn btn-secondary">View PDF</button>
            </div>
          </div>
        </div>

        {/* Lender Decision */}
        <div className="form-section">
          <h3>Your Decision</h3>
          <div className="decision-buttons">
            <button
              type="button"
              className={`decision-btn accept ${decision === 'accept' ? 'active' : ''}`}
              onClick={() => handleDecision('accept')}
            >
              ✅ Accept & E-Sign
            </button>
            <button
              type="button"
              className={`decision-btn request-changes ${decision === 'request_changes' ? 'active' : ''}`}
              onClick={() => handleDecision('request_changes')}
            >
              ✏️ Request Changes
            </button>
            <button
              type="button"
              className={`decision-btn reject ${decision === 'reject' ? 'active' : ''}`}
              onClick={() => handleDecision('reject')}
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
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!decision || (showComments && !comments.trim()) || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 
             decision === 'accept' ? 'Accept & E-Sign' :
             decision === 'request_changes' ? 'Request Changes' :
             decision === 'reject' ? 'Reject Commitment' :
             'Submit Decision'}
          </button>
        </div>
      </form>

      {/* E-Sign Modal */}
      {showESignModal && (
        <div className="modal-overlay">
          <div className="modal-content e-sign-modal">
            <div className="modal-header">
              <h3>Electronic Signature</h3>
              <button 
                type="button" 
                className="modal-close"
                onClick={() => {
                  setShowESignModal(false);
                  setIsConsentChecked(false); // Reset consent when modal closes
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="e-sign-document">
                <h4>Master Commitment Agreement</h4>
                <div className="document-preview">
                  <div className="pdf-placeholder">
                    <div className="pdf-icon">📄</div>
                    <div className="pdf-info">
                      <p><strong>Master Commitment: {commitment.masterCommitmentId}</strong></p>
                      <p>Borrower: {commitment.borrowerName}</p>
                      <p>Your Commitment: {signatureData.commitmentPct}%</p>
                      <p>Amount: ${parseInt(commitment.lenderAllocationAmount).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="signature-section">
                  <h5>Digital Signature</h5>
                  <div className="signature-field">
                    <label>Lender Address</label>
                    <input
                      type="text"
                      value={signatureData.lenderAddr}
                      readOnly
                      className="readonly-field"
                    />
                  </div>
                  <div className="signature-field">
                    <label>Commitment Percentage</label>
                    <input
                      type="text"
                      value={`${signatureData.commitmentPct}%`}
                      readOnly
                      className="readonly-field"
                    />
                  </div>
                  
                  <div className="signature-consent">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={isConsentChecked}
                        onChange={handleConsentChange}
                      />
                      I agree to the terms and conditions of this Master Commitment Agreement
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => {
                  setShowESignModal(false);
                  setIsConsentChecked(false); // Reset consent when modal closes
                }}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                disabled={!isConsentChecked || isSubmitting}
                onClick={handleSignAndAccept}
              >
                {isSubmitting ? 'Recording Signature...' : 'Sign & Accept'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LenderCommitment; 