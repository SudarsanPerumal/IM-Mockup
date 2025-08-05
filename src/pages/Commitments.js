import React, { useState } from 'react';

const Commitments = () => {
  const [commitments, setCommitments] = useState([
    {
      id: 'MC-2024-001',
      borrower: 'ABC Corporation',
      commitmentAmount: '$100,000,000',
      myAllocation: '$25,000,000',
      status: 'Active',
      acceptedDate: '2024-01-15',
      maturityDate: '2026-12-31',
      advanceRate: '85%',
      margin: '350 bps',
      facilityType: 'Revolver',
      covenantTemplate: 'Standard',
      facilityTokens: '$25,000,000',
      monthlyCoupon: '$72,917'
    },
    {
      id: 'MC-2024-002',
      borrower: 'XYZ Holdings',
      commitmentAmount: '$75,000,000',
      myAllocation: '$18,750,000',
      status: 'Pending',
      acceptedDate: null,
      maturityDate: '2026-06-30',
      advanceRate: '80%',
      margin: '400 bps',
      facilityType: 'Delayed Draw Term',
      covenantTemplate: 'Custom',
      facilityTokens: '$0',
      monthlyCoupon: '$0'
    },
    {
      id: 'MC-2023-015',
      borrower: 'DEF Industries',
      commitmentAmount: '$150,000,000',
      myAllocation: '$37,500,000',
      status: 'Active',
      acceptedDate: '2023-11-20',
      maturityDate: '2025-11-20',
      advanceRate: '90%',
      margin: '300 bps',
      facilityType: 'Revolver',
      covenantTemplate: 'Standard',
      facilityTokens: '$37,500,000',
      monthlyCoupon: '$93,750'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCommitments = commitments.filter(commitment => {
    if (filterStatus === 'all') return true;
    return commitment.status.toLowerCase() === filterStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active': return 'status-approved';
      case 'Pending': return 'status-pending';
      case 'Matured': return 'status-completed';
      default: return 'status-pending';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>My Commitments</h1>
        <p>Track all your credit facility commitments and their performance.</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">$81.25M</div>
          <div className="stat-label">Total Commitments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$62.5M</div>
          <div className="stat-label">Active Tokens</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$166.7K</div>
          <div className="stat-label">Monthly Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Total Facilities</div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h3>Commitment Details</h3>
          <div className="filter-controls">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="matured">Matured</option>
            </select>
          </div>
        </div>

        <div className="commitments-table">
          <table className="data-table">
            <thead>
              <tr>
                <th>Commitment ID</th>
                <th>Borrower</th>
                <th>Total Facility</th>
                <th>My Allocation</th>
                <th>Status</th>
                <th>Facility Tokens</th>
                <th>Monthly Coupon</th>
                <th>Maturity Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommitments.map((commitment) => (
                <tr key={commitment.id}>
                  <td>
                    <div className="commitment-id">
                      <strong>{commitment.id}</strong>
                      <div className="facility-type">{commitment.facilityType}</div>
                    </div>
                  </td>
                  <td>{commitment.borrower}</td>
                  <td>{commitment.commitmentAmount}</td>
                  <td>{commitment.myAllocation}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(commitment.status)}`}>
                      {commitment.status}
                    </span>
                  </td>
                  <td>
                    <div className="token-amount">
                      {commitment.facilityTokens}
                      {commitment.status === 'Active' && (
                        <div className="token-indicator">🪙</div>
                      )}
                    </div>
                  </td>
                  <td>{commitment.monthlyCoupon}</td>
                  <td>{commitment.maturityDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-primary">View Details</button>
                      {commitment.status === 'Pending' && (
                        <button className="btn btn-sm btn-secondary">Review</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <h3>Commitment Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <label>Active Commitments</label>
            <span className="summary-value">2</span>
          </div>
          <div className="summary-item">
            <label>Pending Commitments</label>
            <span className="summary-value">1</span>
          </div>
          <div className="summary-item">
            <label>Total Facility Tokens</label>
            <span className="summary-value">$62.5M</span>
          </div>
          <div className="summary-item">
            <label>Average Coupon Rate</label>
            <span className="summary-value">3.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Commitments; 