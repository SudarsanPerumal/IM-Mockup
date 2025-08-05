import React, { useState } from 'react';

const Coupons = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 'CP-2024-001',
      facilityId: 'MC-2024-001',
      borrower: 'ABC Corporation',
      tokenSymbol: 'ABC-CF',
      couponAmount: '$72,917',
      paymentDate: '2024-01-15',
      status: 'Paid',
      transactionHash: '0x1234567890abcdef...',
      couponRate: '3.5%',
      period: 'Jan 2024',
      principalAmount: '$25,000,000'
    },
    {
      id: 'CP-2024-002',
      facilityId: 'MC-2023-015',
      borrower: 'DEF Industries',
      tokenSymbol: 'DEF-CF',
      couponAmount: '$93,750',
      paymentDate: '2024-01-15',
      status: 'Paid',
      transactionHash: '0xabcdef1234567890...',
      couponRate: '3.0%',
      period: 'Jan 2024',
      principalAmount: '$37,500,000'
    },
    {
      id: 'CP-2023-015',
      facilityId: 'MC-2024-001',
      borrower: 'ABC Corporation',
      tokenSymbol: 'ABC-CF',
      couponAmount: '$72,917',
      paymentDate: '2023-12-15',
      status: 'Paid',
      transactionHash: '0x9876543210fedcba...',
      couponRate: '3.5%',
      period: 'Dec 2023',
      principalAmount: '$25,000,000'
    },
    {
      id: 'CP-2023-014',
      facilityId: 'MC-2023-015',
      borrower: 'DEF Industries',
      tokenSymbol: 'DEF-CF',
      couponAmount: '$93,750',
      paymentDate: '2023-12-15',
      status: 'Paid',
      transactionHash: '0xba9876543210fedc...',
      couponRate: '3.0%',
      period: 'Dec 2023',
      principalAmount: '$37,500,000'
    }
  ]);

  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCoupons = coupons.filter(coupon => {
    const periodMatch = filterPeriod === 'all' || coupon.period.includes(filterPeriod);
    const statusMatch = filterStatus === 'all' || coupon.status.toLowerCase() === filterStatus;
    return periodMatch && statusMatch;
  });

  const totalCoupons = filteredCoupons.reduce((sum, coupon) => 
    sum + parseFloat(coupon.couponAmount.replace(/[$,]/g, '')), 0
  );

  const upcomingCoupons = [
    {
      facilityId: 'MC-2024-001',
      borrower: 'ABC Corporation',
      expectedAmount: '$72,917',
      dueDate: '2024-02-15',
      tokenSymbol: 'ABC-CF'
    },
    {
      facilityId: 'MC-2023-015',
      borrower: 'DEF Industries',
      expectedAmount: '$93,750',
      dueDate: '2024-02-15',
      tokenSymbol: 'DEF-CF'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Coupon Payments</h1>
        <p>Track all your coupon payments and upcoming payments from credit facilities.</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">$332.3K</div>
          <div className="stat-label">Total Coupons (2024)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$166.7K</div>
          <div className="stat-label">Monthly Average</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$2.0M</div>
          <div className="stat-label">Total Received</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$166.7K</div>
          <div className="stat-label">Next Payment</div>
        </div>
      </div>

      <div className="content-section">
        <h3>Upcoming Payments</h3>
        <div className="upcoming-coupons">
          {upcomingCoupons.map((coupon, index) => (
            <div key={index} className="upcoming-coupon-card">
              <div className="coupon-header">
                <div className="coupon-info">
                  <h4>{coupon.tokenSymbol}</h4>
                  <p className="borrower-name">{coupon.borrower}</p>
                  <div className="facility-id">{coupon.facilityId}</div>
                </div>
                <div className="coupon-amount">
                  <span className="amount">{coupon.expectedAmount}</span>
                  <span className="due-date">Due: {coupon.dueDate}</span>
                </div>
              </div>
              <div className="coupon-status">
                <span className="status-badge status-pending">Scheduled</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h3>Payment History</h3>
          <div className="filter-controls">
            <select 
              value={filterPeriod} 
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Periods</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="coupons-table">
          <table className="data-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Facility</th>
                <th>Borrower</th>
                <th>Token</th>
                <th>Amount</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>
                    <div className="payment-id">
                      <strong>{coupon.id}</strong>
                      <div className="period">{coupon.period}</div>
                    </div>
                  </td>
                  <td>{coupon.facilityId}</td>
                  <td>{coupon.borrower}</td>
                  <td>
                    <div className="token-info">
                      <span className="token-symbol">{coupon.tokenSymbol}</span>
                      <span className="coupon-rate">{coupon.couponRate}</span>
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">
                      <span className="amount">{coupon.couponAmount}</span>
                      <div className="principal">Principal: {coupon.principalAmount}</div>
                    </div>
                  </td>
                  <td>{coupon.paymentDate}</td>
                  <td>
                    <span className={`status-badge ${coupon.status === 'Paid' ? 'status-approved' : 'status-pending'}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-primary">View Details</button>
                      <button className="btn btn-sm btn-outline">Blockchain</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="summary-row">
          <div className="summary-item">
            <label>Total Payments Shown:</label>
            <span className="summary-value">{filteredCoupons.length}</span>
          </div>
          <div className="summary-item">
            <label>Total Amount:</label>
            <span className="summary-value">${totalCoupons.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h3>Payment Analytics</h3>
        
        <div className="analytics-grid">
          <div className="analytics-card">
            <h4>Monthly Trends</h4>
            <div className="trend-chart">
              <div className="chart-bar" style={{height: '60px', backgroundColor: '#28a745'}}>
                <span>Jan: $166.7K</span>
              </div>
              <div className="chart-bar" style={{height: '50px', backgroundColor: '#17a2b8'}}>
                <span>Dec: $166.7K</span>
              </div>
              <div className="chart-bar" style={{height: '45px', backgroundColor: '#6f42c1'}}>
                <span>Nov: $166.7K</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h4>Facility Breakdown</h4>
            <div className="breakdown-list">
              <div className="breakdown-item">
                <span className="facility-name">ABC Corporation</span>
                <span className="facility-amount">$145.8K</span>
                <span className="facility-percentage">44%</span>
              </div>
              <div className="breakdown-item">
                <span className="facility-name">DEF Industries</span>
                <span className="facility-amount">$187.5K</span>
                <span className="facility-percentage">56%</span>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h4>Payment Schedule</h4>
            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-date">Feb 15, 2024</div>
                <div className="schedule-amount">$166.7K</div>
                <div className="schedule-status">Scheduled</div>
              </div>
              <div className="schedule-item">
                <div className="schedule-date">Mar 15, 2024</div>
                <div className="schedule-amount">$166.7K</div>
                <div className="schedule-status">Scheduled</div>
              </div>
              <div className="schedule-item">
                <div className="schedule-date">Apr 15, 2024</div>
                <div className="schedule-amount">$166.7K</div>
                <div className="schedule-status">Scheduled</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons; 