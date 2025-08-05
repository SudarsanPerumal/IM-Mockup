import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const LenderCommitmentAcceptance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - replace with API call
  const mockCommitments = {
    'MC-2024-001': {
      masterCommitmentId: 'MC-2024-001',
      borrowerName: 'ABC Corporation',
      commitmentAmount: '$100,000,000',
      advanceRate: '85%',
      margin: '350 bps',
      pricingIndex: 'SOFR 1M',
      maturityDate: '2026-12-31',
      facilityType: 'Revolver',
      covenantTemplate: 'Standard',
      submittedDate: '2024-01-15',
      status: 'Pending_Lender',
      acceptanceThreshold: 100,
      currentAcceptance: 75
    }
  };

  const [commitmentData, setCommitmentData] = useState(null);
  const [lenderAllocations, setLenderAllocations] = useState([]);
  const [currentLender, setCurrentLender] = useState('Citigroup');
  const [acceptanceDecision, setAcceptanceDecision] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch commitment data
    const commitment = mockCommitments[id];
    if (commitment) {
      setCommitmentData(commitment);
      // Set lender allocations based on commitment ID
      setLenderAllocations([
        {
          lender: 'Goldman Sachs',
          commitmentPercent: 25,
          votingPercent: 25,
          status: 'Accepted',
          acceptedDate: '2024-01-15 10:30:00 UTC',
          signatureHash: '0x1234567890abcdef...'
        },
        {
          lender: 'Morgan Stanley',
          commitmentPercent: 25,
          votingPercent: 25,
          status: 'Accepted',
          acceptedDate: '2024-01-15 11:15:00 UTC',
          signatureHash: '0xabcdef1234567890...'
        },
        {
          lender: 'Citigroup',
          commitmentPercent: 25,
          votingPercent: 25,
          status: 'Pending',
          acceptedDate: null,
          signatureHash: null
        },
        {
          lender: 'Deutsche Bank',
          commitmentPercent: 25,
          votingPercent: 25,
          status: 'Pending',
          acceptedDate: null,
          signatureHash: null
        }
      ]);
    }
  }, [id]);

  const handleAcceptance = (decision) => {
    setAcceptanceDecision(decision);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptanceDecision) {
      alert('Please select Accept or Decline');
      return;
    }

    setIsSubmitting(true);
    
    if (acceptanceDecision === 'accept') {
      console.log('Lender accepted commitment:', {
        lender: currentLender,
        masterCommitmentId: commitmentData.masterCommitmentId,
        timestamp: new Date().toISOString()
      });
      
      // Simulate API call to POST /cfdeals/{id}/signatures
      setTimeout(() => {
        alert('Commitment accepted successfully!');
        setIsSubmitting(false);
        
        // Update acceptance percentage
        const newAcceptance = commitmentData.currentAcceptance + 25;
        if (newAcceptance >= commitmentData.acceptanceThreshold) {
          alert('Facility activated! All lenders have accepted the commitment.');
          // Status changes to Active
          setCommitmentData(prev => ({
            ...prev,
            status: 'Active',
            currentAcceptance: newAcceptance
          }));
        } else {
          setCommitmentData(prev => ({
            ...prev,
            currentAcceptance: newAcceptance
          }));
        }
      }, 2000);
      
    } else if (acceptanceDecision === 'decline') {
      console.log('Lender declined commitment:', {
        lender: currentLender,
        masterCommitmentId: commitmentData.masterCommitmentId,
        comments,
        timestamp: new Date().toISOString()
      });
      
      setTimeout(() => {
        alert('Commitment declined. Facility Agent will be notified.');
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 2000);
    }
  };

  if (!commitmentData) {
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
        <h1>Lender Commitment Acceptance</h1>
        <p>Review and accept the Master Commitment for credit facility participation.</p>
      </div>

      <div className="commitment-summary">
        <div className="summary-header">
          <h3>📋 Master Commitment Summary</h3>
          <div className={`status-badge ${commitmentData.status === 'Pending_Lender' ? 'pending' : 'approved'}`}>
            {commitmentData.status === 'Pending_Lender' ? 'Pending Lender Acceptance' : 'Active'}
          </div>
        </div>
        
        <div className="summary-details">
          <div className="detail-row">
            <span className="label">Master Commitment ID:</span>
            <span className="value">{commitmentData.masterCommitmentId}</span>
          </div>
          <div className="detail-row">
            <span className="label">Borrower:</span>
            <span className="value">{commitmentData.borrowerName}</span>
          </div>
          <div className="detail-row">
            <span className="label">Submitted Date:</span>
            <span className="value">{commitmentData.submittedDate}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Facility Terms</h3>
          
          <div className="review-grid">
            <div className="review-item">
              <label>Commitment Amount</label>
              <div className="readonly-value">{commitmentData.commitmentAmount}</div>
            </div>
            
            <div className="review-item">
              <label>Advance Rate</label>
              <div className="readonly-value">{commitmentData.advanceRate}</div>
            </div>
            
            <div className="review-item">
              <label>Margin</label>
              <div className="readonly-value">{commitmentData.margin}</div>
            </div>
            
            <div className="review-item">
              <label>Pricing Index</label>
              <div className="readonly-value">{commitmentData.pricingIndex}</div>
            </div>
            
            <div className="review-item">
              <label>Maturity Date</label>
              <div className="readonly-value">{commitmentData.maturityDate}</div>
            </div>
            
            <div className="review-item">
              <label>Facility Type</label>
              <div className="readonly-value">{commitmentData.facilityType}</div>
            </div>
            
            <div className="review-item">
              <label>Covenant Template</label>
              <div className="readonly-value">{commitmentData.covenantTemplate}</div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Lender Allocations</h3>
          
          <div className="lender-table">
            <table className="grid-table">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Commitment %</th>
                  <th>Voting %</th>
                  <th>Status</th>
                  <th>Accepted Date</th>
                </tr>
              </thead>
              <tbody>
                {lenderAllocations.map((lender, index) => (
                  <tr key={index}>
                    <td>{lender.lender}</td>
                    <td>{lender.commitmentPercent}%</td>
                    <td>{lender.votingPercent}%</td>
                    <td>
                      <span className={`status-badge ${lender.status === 'Accepted' ? 'approved' : 'pending'}`}>
                        {lender.status}
                      </span>
                    </td>
                    <td>{lender.acceptedDate || 'Pending'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="acceptance-progress">
            <h4>Acceptance Progress</h4>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${commitmentData.currentAcceptance}%`}}
                ></div>
              </div>
              <div className="progress-text">
                {commitmentData.currentAcceptance}% / {commitmentData.acceptanceThreshold}% Required
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Your Decision</h3>
          
          <div className="form-field">
            <label>Current Lender</label>
            <input
              type="text"
              value={currentLender}
              readOnly
              className="readonly-field"
            />
          </div>

          <div className="decision-buttons">
            <button
              type="button"
              className={`decision-btn accept ${acceptanceDecision === 'accept' ? 'active' : ''}`}
              onClick={() => handleAcceptance('accept')}
            >
              ✅ Accept Commitment
            </button>
            
            <button
              type="button"
              className={`decision-btn decline ${acceptanceDecision === 'decline' ? 'active' : ''}`}
              onClick={() => handleAcceptance('decline')}
            >
              ❌ Decline Commitment
            </button>
          </div>

          {acceptanceDecision === 'decline' && (
            <div className="comments-section">
              <label className="required">Reason for Decline</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please provide a reason for declining this commitment..."
                rows="4"
                required
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!acceptanceDecision || isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 
             acceptanceDecision === 'accept' ? 'Accept Commitment' : 
             acceptanceDecision === 'decline' ? 'Decline Commitment' : 'Submit Decision'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LenderCommitmentAcceptance; 