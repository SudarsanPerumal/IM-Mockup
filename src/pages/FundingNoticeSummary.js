import React from 'react';
import { Link } from 'react-router-dom';

const FundingNoticeSummary = ({ userRole }) => {
  const noticeDetails = {
    fundingNoticeId: 'FN-2024-001',
    fundingRequestId: 'FR-2024-001',
    masterCommitmentId: 'MC-2024-001',
    approvedAmount: '$5,000,000',
    requestedAmount: '$5,000,000',
    fundingDate: '2024-01-15',
    borrower: 'ABC Corporation',
    purpose: 'Working Capital'
  };

  const facilityToken = {
    tokenSymbol: 'IMCF-MC001-001',
    tokenSupply: '5,000,000',
    mintTxId: '0x1234567890abcdef1234567890abcdef12345678',
    tokenContract: '0xabcdef1234567890abcdef1234567890abcdef12',
    blockNumber: '18456789',
    timestamp: '2024-01-15 14:30:25 UTC'
  };

  const documents = [
    { name: 'Funding Notice PDF', type: 'pdf', size: '245 KB' },
    { name: 'Allocation CSV', type: 'csv', size: '12 KB' },
    { name: 'Settlement Instructions', type: 'pdf', size: '156 KB' }
  ];

  const borrowerDocuments = [
    { name: 'Funding Request Confirmation', type: 'pdf', size: '156 KB' },
    { name: 'Approval Notice', type: 'pdf', size: '89 KB' },
    { name: 'Settlement Instructions', type: 'pdf', size: '156 KB' }
  ];

  const lenderDocuments = [
    { name: 'Funding Notice PDF', type: 'pdf', size: '245 KB' },
    { name: 'Settlement Instructions', type: 'pdf', size: '156 KB' },
    { name: 'Facility Token Allocation', type: 'csv', size: '8 KB' }
  ];

  // Role-based content rendering
  const renderBorrowerContent = () => (
    <>
      <div className="form-header">
        <h1>Funding Request Summary</h1>
        <p>Your funding request has been approved and processed successfully.</p>
      </div>

      <div className="summary-sections">
        <div className="form-section">
          <h3>Request Details</h3>
          
          <div className="summary-grid">
            <div className="summary-item">
              <label>Funding Request ID</label>
              <span className="summary-value">{noticeDetails.fundingRequestId}</span>
            </div>
            <div className="summary-item">
              <label>Master Commitment ID</label>
              <span className="summary-value">{noticeDetails.masterCommitmentId}</span>
            </div>
            <div className="summary-item">
              <label>Requested Amount (USD)</label>
              <span className="summary-value">{noticeDetails.requestedAmount}</span>
            </div>
            <div className="summary-item">
              <label>Draw Amount (USD)</label>
              <span className="summary-value">{noticeDetails.approvedAmount}</span>
            </div>
            <div className="summary-item">
              <label>Funding Date</label>
              <span className="summary-value">{noticeDetails.fundingDate}</span>
            </div>
            <div className="summary-item">
              <label>Purpose of Funds</label>
              <span className="summary-value">{noticeDetails.purpose}</span>
            </div>
          </div>
        </div>

        {/* <div className="form-section">
          <h3>Facility Token</h3>
          
          <div className="token-details">
            <div className="token-header">
              <div className="token-icon">🪙</div>
              <div className="token-info">
                <h4>{facilityToken.tokenSymbol}</h4>
                <p>Facility Token minted for your approved draw</p>
              </div>
              <div className="token-status">
                <span className="status-badge status-approved">Minted</span>
              </div>
            </div>
            
            <div className="token-grid">
              <div className="token-item">
                <label>Token Symbol</label>
                <span className="token-value">{facilityToken.tokenSymbol}</span>
              </div>
              <div className="token-item">
                <label>Token Supply</label>
                <span className="token-value">{facilityToken.tokenSupply}</span>
              </div>
              <div className="token-item">
                <label>Mint Transaction ID</label>
                <span className="token-value tx-link">
                  <a href={`https://explorer.intainmarkets.com/tx/${facilityToken.mintTxId}`} target="_blank" rel="noopener noreferrer">
                    {facilityToken.mintTxId.substring(0, 10)}...{facilityToken.mintTxId.substring(facilityToken.mintTxId.length - 8)}
                  </a>
                </span>
              </div>
              <div className="token-item">
                <label>Block Number</label>
                <span className="token-value">{facilityToken.blockNumber}</span>
              </div>
              <div className="token-item">
                <label>Timestamp</label>
                <span className="token-value">{facilityToken.timestamp}</span>
              </div>
            </div>
          </div>
        </div> */}

        <div className="form-section">
          <h3>Documents & Settlement</h3>
          
          <div className="documents-list">
            {borrowerDocuments.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  {doc.type === 'pdf' ? '📄' : '📊'}
                </div>
                <div className="document-info">
                  <div className="document-name">{doc.name}</div>
                  <div className="document-meta">{doc.type.toUpperCase()} • {doc.size}</div>
                </div>
                <div className="document-actions">
                  <button className="btn-download">Download</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="settlement-status">
            <h4>Settlement Status</h4>
            <div className="status-timeline">
              <div className="timeline-item completed">
                <div className="timeline-icon">✅</div>
                <div className="timeline-content">
                  <div className="timeline-title">Funding Request Approved</div>
                  <div className="timeline-time">14:30:25 UTC</div>
                </div>
              </div>
              <div className="timeline-item completed">
                <div className="timeline-icon">✅</div>
                <div className="timeline-content">
                  <div className="timeline-title">Facility Token Minted</div>
                  <div className="timeline-time">14:30:28 UTC</div>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-icon">⏳</div>
                <div className="timeline-content">
                  <div className="timeline-title">Funds Arriving</div>
                  <div className="timeline-time">Expected: 14:35:00 UTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderFacilityAgentContent = () => (
    <>
      <div className="form-header">
        <h1>Funding Notice Summary</h1>
        <p>Funding Notice has been successfully issued and Facility Token minted.</p>
      </div>

      <div className="summary-sections">
        <div className="form-section">
          <h3>Notice Details</h3>
          
          <div className="summary-grid">
            <div className="summary-item">
              <label>Funding Notice ID</label>
              <span className="summary-value">{noticeDetails.fundingNoticeId}</span>
            </div>
            <div className="summary-item">
              <label>Master Commitment ID</label>
              <span className="summary-value">{noticeDetails.masterCommitmentId}</span>
            </div>
            <div className="summary-item">
              <label>Approved Amount (USD)</label>
              <span className="summary-value">{noticeDetails.approvedAmount}</span>
            </div>
            <div className="summary-item">
              <label>Funding Date</label>
              <span className="summary-value">{noticeDetails.fundingDate}</span>
            </div>
            <div className="summary-item">
              <label>Borrower</label>
              <span className="summary-value">{noticeDetails.borrower}</span>
            </div>
            <div className="summary-item">
              <label>Purpose</label>
              <span className="summary-value">{noticeDetails.purpose}</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Facility Token</h3>
          
          <div className="token-details">
            <div className="token-header">
              <div className="token-icon">🪙</div>
              <div className="token-info">
                <h4>{facilityToken.tokenSymbol}</h4>
                <p>Facility Token successfully minted on IM-Chain</p>
              </div>
              <div className="token-status">
                <span className="status-badge status-approved">Minted</span>
              </div>
            </div>
            
            <div className="token-grid">
              <div className="token-item">
                <label>Token Symbol</label>
                <span className="token-value">{facilityToken.tokenSymbol}</span>
              </div>
              <div className="token-item">
                <label>Token Supply</label>
                <span className="token-value">{facilityToken.tokenSupply}</span>
              </div>
              <div className="token-item">
                <label>Mint Transaction ID</label>
                <span className="token-value tx-link">
                  <a href={`https://explorer.intainmarkets.com/tx/${facilityToken.mintTxId}`} target="_blank" rel="noopener noreferrer">
                    {facilityToken.mintTxId.substring(0, 10)}...{facilityToken.mintTxId.substring(facilityToken.mintTxId.length - 8)}
                  </a>
                </span>
              </div>
              <div className="token-item">
                <label>Token Contract</label>
                <span className="token-value tx-link">
                  <a href={`https://explorer.intainmarkets.com/address/${facilityToken.tokenContract}`} target="_blank" rel="noopener noreferrer">
                    {facilityToken.tokenContract.substring(0, 10)}...{facilityToken.tokenContract.substring(facilityToken.tokenContract.length - 8)}
                  </a>
                </span>
              </div>
              <div className="token-item">
                <label>Block Number</label>
                <span className="token-value">{facilityToken.blockNumber}</span>
              </div>
              <div className="token-item">
                <label>Timestamp</label>
                <span className="token-value">{facilityToken.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Documents & Settlement</h3>
          
          <div className="documents-list">
            {documents.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  {doc.type === 'pdf' ? '📄' : '📊'}
                </div>
                <div className="document-info">
                  <div className="document-name">{doc.name}</div>
                  <div className="document-meta">{doc.type.toUpperCase()} • {doc.size}</div>
                </div>
                <div className="document-actions">
                  <button className="btn-download">Download</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="settlement-status">
            <h4>Settlement Status</h4>
            <div className="status-timeline">
              <div className="timeline-item completed">
                <div className="timeline-icon">✅</div>
                <div className="timeline-content">
                  <div className="timeline-title">Funding Notice Issued</div>
                  <div className="timeline-time">14:30:25 UTC</div>
                </div>
              </div>
              <div className="timeline-item completed">
                <div className="timeline-icon">✅</div>
                <div className="timeline-content">
                  <div className="timeline-title">Facility Token Minted</div>
                  <div className="timeline-time">14:30:28 UTC</div>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-icon">⏳</div>
                <div className="timeline-content">
                  <div className="timeline-title">Settlement Processing</div>
                  <div className="timeline-time">Expected: 14:35:00 UTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderLenderContent = () => (
    <>
      <div className="form-header">
        <h1>Funding Notice Summary</h1>
        <p>Funding Notice received and Facility Token allocated to your wallet.</p>
      </div>

      <div className="summary-sections">
        <div className="form-section">
          <h3>Notice Details</h3>
          
          <div className="summary-grid">
            <div className="summary-item">
              <label>Funding Notice ID</label>
              <span className="summary-value">{noticeDetails.fundingNoticeId}</span>
            </div>
            <div className="summary-item">
              <label>Master Commitment ID</label>
              <span className="summary-value">{noticeDetails.masterCommitmentId}</span>
            </div>
            <div className="summary-item">
              <label>Total Draw Amount (USD)</label>
              <span className="summary-value">{noticeDetails.approvedAmount}</span>
            </div>
            <div className="summary-item">
              <label>Your Allocation (USD)</label>
              <span className="summary-value">$1,250,000</span>
            </div>
            <div className="summary-item">
              <label>Funding Date</label>
              <span className="summary-value">{noticeDetails.fundingDate}</span>
            </div>
            <div className="summary-item">
              <label>Borrower</label>
              <span className="summary-value">{noticeDetails.borrower}</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Facility Token Allocation</h3>
          
          <div className="token-details">
            <div className="token-header">
              <div className="token-icon">🪙</div>
              <div className="token-info">
                <h4>{facilityToken.tokenSymbol}</h4>
                <p>Facility Token allocated to your wallet</p>
              </div>
              <div className="token-status">
                <span className="status-badge status-approved">Allocated</span>
              </div>
            </div>
            
            <div className="token-grid">
              <div className="token-item">
                <label>Token Symbol</label>
                <span className="token-value">{facilityToken.tokenSymbol}</span>
              </div>
              <div className="token-item">
                <label>Your Token Amount</label>
                <span className="token-value">1,250,000</span>
              </div>
              <div className="token-item">
                <label>Your Wallet Address</label>
                <span className="token-value tx-link">
                  <a href={`https://explorer.intainmarkets.com/address/0x1234567890abcdef1234567890abcdef12345678`} target="_blank" rel="noopener noreferrer">
                    0x1234...5678
                  </a>
                </span>
              </div>
              <div className="token-item">
                <label>Allocation Transaction</label>
                <span className="token-value tx-link">
                  <a href={`https://explorer.intainmarkets.com/tx/${facilityToken.mintTxId}`} target="_blank" rel="noopener noreferrer">
                    {facilityToken.mintTxId.substring(0, 10)}...{facilityToken.mintTxId.substring(facilityToken.mintTxId.length - 8)}
                  </a>
                </span>
              </div>
              <div className="token-item">
                <label>Block Number</label>
                <span className="token-value">{facilityToken.blockNumber}</span>
              </div>
              <div className="token-item">
                <label>Timestamp</label>
                <span className="token-value">{facilityToken.timestamp}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Documents & Settlement</h3>
          
          <div className="documents-list">
            {lenderDocuments.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  {doc.type === 'pdf' ? '📄' : '📊'}
                </div>
                <div className="document-info">
                  <div className="document-name">{doc.name}</div>
                  <div className="document-meta">{doc.type.toUpperCase()} • {doc.size}</div>
                </div>
                <div className="document-actions">
                  <button className="btn-download">Download</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="settlement-status">
            <h4>Settlement Instructions</h4>
            <div className="status-timeline">
              <div className="timeline-item completed">
                <div className="timeline-icon">✅</div>
                <div className="timeline-content">
                  <div className="timeline-title">Funding Notice Received</div>
                  <div className="timeline-time">14:30:25 UTC</div>
                </div>
              </div>
              <div className="timeline-item completed">
                <div className="timeline-icon">✅</div>
                <div className="timeline-content">
                  <div className="timeline-title">Facility Token Allocated</div>
                  <div className="timeline-time">14:30:28 UTC</div>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-icon">⏳</div>
                <div className="timeline-content">
                  <div className="timeline-title">Wire Transfer Required</div>
                  <div className="timeline-time">Due: 14:35:00 UTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Render content based on user role
  const renderContent = () => {
    switch (userRole) {
      case 'Borrower':
        return renderBorrowerContent();
      case 'Facility Agent':
        return renderFacilityAgentContent();
      case 'Lender':
        return renderLenderContent();
      default:
        return renderFacilityAgentContent(); // Default fallback
    }
  };

  return (
    <div className="form-container">
      {renderContent()}
      
      <div className="form-actions">
        <Link to="/" className="btn btn-secondary">
          Back to Dashboard
        </Link>
        <button className="btn btn-primary">
          {userRole === 'Borrower' ? 'View All Requests' : 
           userRole === 'Lender' ? 'View All Notices' : 'View All Notices'}
        </button>
      </div>
    </div>
  );
};

export default FundingNoticeSummary; 