import React, { useState } from 'react';

const FacilityTokens = () => {
  const [tokens, setTokens] = useState([
    {
      id: 'MC-2024-001',
      borrower: 'ABC Corporation',
      tokenAmount: '$25,000,000',
      tokenBalance: '25,000,000',
      tokenSymbol: 'ABC-CF',
      status: 'Active',
      mintedDate: '2024-01-15',
      maturityDate: '2026-12-31',
      couponRate: '3.5%',
      monthlyCoupon: '$72,917',
      totalCouponsReceived: '$875,000',
      currentValue: '$25,000,000',
      priceChange: '+0.5%',
      priceChangeType: 'positive'
    },
    {
      id: 'MC-2023-015',
      borrower: 'DEF Industries',
      tokenAmount: '$37,500,000',
      tokenBalance: '37,500,000',
      tokenSymbol: 'DEF-CF',
      status: 'Active',
      mintedDate: '2023-11-20',
      maturityDate: '2025-11-20',
      couponRate: '3.0%',
      monthlyCoupon: '$93,750',
      totalCouponsReceived: '$1,125,000',
      currentValue: '$37,500,000',
      priceChange: '+1.2%',
      priceChangeType: 'positive'
    }
  ]);

  const [selectedToken, setSelectedToken] = useState(null);

  const totalTokenValue = tokens.reduce((sum, token) => 
    sum + parseFloat(token.currentValue.replace(/[$,]/g, '')), 0
  );

  const totalMonthlyCoupons = tokens.reduce((sum, token) => 
    sum + parseFloat(token.monthlyCoupon.replace(/[$,]/g, '')), 0
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Facility Tokens</h1>
        <p>Manage your ERC-20 Facility Tokens and track their performance.</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-value">$62.5M</div>
          <div className="stat-label">Total Token Value</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$166.7K</div>
          <div className="stat-label">Monthly Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">$2.0M</div>
          <div className="stat-label">Total Coupons Received</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">+0.8%</div>
          <div className="stat-label">Portfolio Performance</div>
        </div>
      </div>

      <div className="content-section">
        <h3>Token Holdings</h3>
        
        <div className="tokens-grid">
          {tokens.map((token) => (
            <div key={token.id} className="token-card">
              <div className="token-header">
                <div className="token-info">
                  <h4>{token.tokenSymbol}</h4>
                  <p className="borrower-name">{token.borrower}</p>
                  <div className="token-id">{token.id}</div>
                </div>
                <div className="token-status">
                  <span className={`status-badge ${token.status === 'Active' ? 'status-approved' : 'status-pending'}`}>
                    {token.status}
                  </span>
                </div>
              </div>

              <div className="token-details">
                <div className="detail-row">
                  <label>Token Balance:</label>
                  <span className="token-balance">{token.tokenBalance} tokens</span>
                </div>
                <div className="detail-row">
                  <label>Current Value:</label>
                  <span className="token-value">{token.currentValue}</span>
                </div>
                <div className="detail-row">
                  <label>Coupon Rate:</label>
                  <span className="coupon-rate">{token.couponRate}</span>
                </div>
                <div className="detail-row">
                  <label>Monthly Coupon:</label>
                  <span className="monthly-coupon">{token.monthlyCoupon}</span>
                </div>
                <div className="detail-row">
                  <label>Total Coupons:</label>
                  <span className="total-coupons">{token.totalCouponsReceived}</span>
                </div>
                <div className="detail-row">
                  <label>Price Change:</label>
                  <span className={`price-change ${token.priceChangeType}`}>
                    {token.priceChange}
                  </span>
                </div>
              </div>

              <div className="token-actions">
                <button className="btn btn-primary btn-sm">View Details</button>
                <button className="btn btn-secondary btn-sm">Transfer</button>
                <button className="btn btn-outline btn-sm">Trade</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h3>Token Performance</h3>
        
        <div className="performance-metrics">
          <div className="metric-card">
            <h4>Portfolio Overview</h4>
            <div className="metric-grid">
              <div className="metric-item">
                <label>Total Tokens</label>
                <span>2</span>
              </div>
              <div className="metric-item">
                <label>Average Coupon Rate</label>
                <span>3.25%</span>
              </div>
              <div className="metric-item">
                <label>Average Maturity</label>
                <span>2.1 years</span>
              </div>
              <div className="metric-item">
                <label>Yield to Maturity</label>
                <span>3.4%</span>
              </div>
            </div>
          </div>

          <div className="metric-card">
            <h4>Recent Activity</h4>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">💵</div>
                <div className="activity-content">
                  <div className="activity-title">Coupon Payment Received</div>
                  <div className="activity-description">ABC-CF: $72,917</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🪙</div>
                <div className="activity-content">
                  <div className="activity-title">Tokens Minted</div>
                  <div className="activity-description">DEF-CF: 37,500,000 tokens</div>
                  <div className="activity-time">1 day ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">📈</div>
                <div className="activity-content">
                  <div className="activity-title">Price Update</div>
                  <div className="activity-description">ABC-CF: +0.5%</div>
                  <div className="activity-time">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h3>Token Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <h4>What are Facility Tokens?</h4>
            <p>Facility Tokens are ERC-20 tokens representing your ownership in credit facilities. Each token entitles you to:</p>
            <ul>
              <li>Monthly coupon payments based on the facility's interest rate</li>
              <li>Principal repayment at maturity</li>
              <li>Trading and transfer capabilities</li>
              <li>Transparent blockchain-based ownership</li>
            </ul>
          </div>
          <div className="info-item">
            <h4>Token Benefits</h4>
            <ul>
              <li>🔄 <strong>Liquidity:</strong> Trade tokens on secondary markets</li>
              <li>📊 <strong>Transparency:</strong> All transactions on blockchain</li>
              <li>💰 <strong>Yield:</strong> Regular coupon payments</li>
              <li>🛡️ <strong>Security:</strong> Smart contract enforced</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityTokens; 