import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RoleBasedDashboard = ({ userRole }) => {
  const getDashboardContent = () => {
    switch (userRole) {
      case 'Borrower':
        return <BorrowerDashboard />;
      case 'Facility Agent':
        return <FacilityAgentDashboard />;
      case 'Lender':
        return <LenderDashboard />;
      case 'verification_agent':
        return <VerificationAgentDashboard />;
      case 'servicer':
        return <ServicerDashboard />;
      case 'trustee':
        return <TrusteeDashboard />;
      case 'treasury_ops':
        return <TreasuryOpsDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <div className="dashboard">
      {getDashboardContent()}
    </div>
  );
};

const BorrowerDashboard = () => {
  // Mock deal data with term sheets
  const [deals] = useState([
    {
      dealId: "DEAL-2024-001",
      dealName: "ABC Corp Credit Facility",
      borrower: "ABC Corporation",
      totalCommitment: "$150M",
      status: "Active",
      termSheets: [
        {
          id: "TS-2024-001",
          version: 1,
          status: "Approved",
          facilityType: "Revolving",
          commitment: "$100M",
          createdAt: "2024-01-15",
          approvedAt: "2024-01-20"
        },
        {
          id: "TS-2024-002", 
          version: 1,
          status: "Draft",
          facilityType: "Term Loan",
          commitment: "$50M",
          createdAt: "2024-01-25"
        }
      ]
    },
    {
      dealId: "DEAL-2024-002",
      dealName: "XYZ Holdings Facility",
      borrower: "XYZ Holdings",
      totalCommitment: "$75M",
      status: "Pending",
      termSheets: [
        {
          id: "TS-2024-003",
          version: 2,
          status: "Changes_Requested",
          facilityType: "Revolving",
          commitment: "$75M",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-22"
        }
      ]
    },
    {
      dealId: "DEAL-2024-003",
      dealName: "DEF Industries Facility",
      borrower: "DEF Industries",
      totalCommitment: "$200M",
      status: "Active",
      termSheets: [
        {
          id: "TS-2024-004",
          version: 1,
          status: "Approved",
          facilityType: "Revolving",
          commitment: "$150M",
          createdAt: "2024-01-05",
          approvedAt: "2024-01-12"
        },
        {
          id: "TS-2024-005",
          version: 1,
          status: "Approved",
          facilityType: "Term Loan",
          commitment: "$50M",
          createdAt: "2024-01-05",
          approvedAt: "2024-01-12"
        }
      ]
    }
  ]);

  const stats = [
    { label: 'Active Deals', value: deals.length.toString(), change: '+1', changeType: 'positive' },
    { label: 'Total Commitment', value: '$425M', change: '+$25M', changeType: 'positive' },
    { label: 'Pending Term Sheets', value: '2', change: '-1', changeType: 'negative' },
    { label: 'Approved Term Sheets', value: '3', change: '+1', changeType: 'positive' },
  ];

  const getTermSheetNotifications = () => {
    const notifications = [];
    deals.forEach(deal => {
      deal.termSheets.forEach(ts => {
        if (ts.status === 'Changes_Requested' || ts.status === 'Approved') {
          notifications.push({
            id: ts.id,
            dealId: deal.dealId,
            dealName: deal.dealName,
            status: ts.status,
            title: `Term Sheet ${ts.status === 'Approved' ? 'Approved' : 'Changes Requested'}`,
            message: `${deal.dealName} - ${ts.facilityType} facility`,
            time: ts.updatedAt || ts.createdAt,
            priority: ts.status === 'Changes_Requested' ? 'high' : 'low',
            action: ts.status === 'Approved' ? 'Create CFMC' : 'Review Changes'
          });
        }
      });
    });
    return notifications;
  };

  const recentActivities = [
    { id: 1, type: 'Funding Request', description: 'MC-2024-001: $5M request submitted', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'Draw Approved', description: 'MC-2024-002: $3.2M draw approved', time: '1 day ago', status: 'approved' },
    { id: 3, type: 'Collateral Upload', description: 'New loan tape uploaded', time: '2 days ago', status: 'completed' },
    { id: 4, type: 'Covenant Check', description: 'Monthly compliance passed', time: '1 week ago', status: 'approved' },
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1>Borrower Dashboard</h1>
        <p>Manage your credit facilities and funding requests.</p>
      </div>

      {/* Deals and Term Sheets Table */}
      <div className="deals-table-section">
        <div className="table-header">
          {/* <h3>📋 Deals & Term Sheets</h3>
          <div className="table-actions">
            <Link to="/deal/new" className="btn btn-primary btn-sm">
              New Deal
            </Link>
            <Link to="/borrower-term-sheet" className="btn btn-secondary btn-sm">
              New Term Sheet
            </Link>
          </div> */}
        </div>
        
        <div className="table-container">
          <table className="deals-table">
            <thead>
              <tr>
                <th>Deal ID</th>
                <th>Deal Name</th>
                <th>Borrower</th>
                <th>Total Commitment</th>
                <th>Deal Status</th>
                <th>Term Sheets</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <React.Fragment key={deal.dealId}>
                  <tr className="deal-row">
                    <td className="deal-id">{deal.dealId}</td>
                    <td className="deal-name">{deal.dealName}</td>
                    <td>{deal.borrower}</td>
                    <td className="commitment">{deal.totalCommitment}</td>
                    <td>
                      <span className={`status-badge ${deal.status.toLowerCase()}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="term-sheets-count">
                      {deal.termSheets.length} term sheet{deal.termSheets.length !== 1 ? 's' : ''}
                    </td>
                    <td className="actions">
                      <Link to={`/deal/${deal.dealId}`} className="btn btn-primary btn-xs">
                        View
                      </Link>
                      <Link to={`/term-sheet/new?dealId=${deal.dealId}`} className="btn btn-secondary btn-xs">
                        Add TS
                      </Link>
                    </td>
                  </tr>
                  {deal.termSheets.map((ts) => (
                    <tr key={ts.id} className="term-sheet-row">
                      <td></td>
                      <td className="term-sheet-info">
                        <div className="ts-details">
                          <span className="ts-id">{ts.id}</span>
                          <span className="ts-facility">({ts.facilityType})</span>
                        </div>
                      </td>
                      <td></td>
                      <td className="ts-commitment">{ts.commitment}</td>
                      <td>
                        <span className={`status-badge ${ts.status.toLowerCase().replace('_', '-')}`}>
                          {ts.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="ts-version">v{ts.version}</td>
                      <td className="actions">
                        <Link to={`/term-sheet/${ts.id}`} className="btn btn-primary btn-xs">
                          View
                        </Link>
                        {ts.status === 'Draft' && (
                          <Link to={`/term-sheet/${ts.id}/edit`} className="btn btn-secondary btn-xs">
                            Edit
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Term Sheet Notifications */}
      {/* {getTermSheetNotifications().length > 0 && (
        <div className="notifications-section">
          <h3>📢 Term Sheet Notifications</h3>
          <div className="notification-list">
            {getTermSheetNotifications().map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.priority}`}
                data-status={notification.status}
              >
                <div className="notification-icon">
                  {notification.status === 'Approved' && '✅'}
                  {notification.status === 'Rejected' && '❌'}
                  {notification.status === 'Changes_Requested' && '🔄'}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
                <div className="notification-actions">
                  <Link to={`/term-sheet/${notification.id}`} className="btn btn-primary btn-sm">
                    {notification.action}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div> */}

      {/* <div className="dashboard-content">
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <Link to="/funding-request" className="btn btn-secondary">
              New Funding Request
            </Link>
            <Link to="/collateral-upload" className="btn btn-secondary">
              Upload Collateral
            </Link>
            <Link to="/facility-overview" className="btn btn-secondary">
              View Facilities
            </Link>
          </div>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'Funding Request' && '💰'}
                  {activity.type === 'Draw Approved' && '✅'}
                  {activity.type === 'Collateral Upload' && '📁'}
                  {activity.type === 'Covenant Check' && '📊'}
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.type}</div>
                  <div className="activity-description">{activity.description}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
                <div className={`activity-status status-${activity.status}`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

const FacilityAgentDashboard = () => {
  const navigate = useNavigate();
  
  const pendingTermSheets = [
    {
      id: "TS-2024-001",
      borrower: "ABC Corporation",
      commitment: "$100M",
      status: "Pending Review",
      submittedAt: "2024-01-20",
      facility: "Revolving",
      version: 1,
    },
    {
      id: "TS-2024-002",
      borrower: "XYZ Holdings", 
      commitment: "$75M",
      status: "Pending Review",
      submittedAt: "2024-01-22",
      facility: "Term Loan",
      version: 2,
    }
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1>Facility Agent Dashboard</h1>
        <p>Review and approve pending term sheets.</p>
      </div>

      <div className="pending-termsheets-section">
        {/* <h3>📋 Pending Term Sheets</h3> */}
        <div className="table-container">
          <table className="pending-termsheets-table">
            <thead>
              <tr>
                <th>Term Sheet ID</th>
                <th>Borrower</th>
                <th>Facility</th>
                <th>Commitment</th>
                <th>Version</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {pendingTermSheets.map(ts => (
                <tr key={ts.id}>
                  <td>{ts.id}</td>
                  <td>{ts.borrower}</td>
                  <td>{ts.facility}</td>
                  <td>{ts.commitment}</td>
                  <td>v{ts.version}</td>
                  <td>{ts.submittedAt}</td>
                  <td>
                    <span className="status-badge pending">Pending Review</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => navigate(`/term-sheet-review/${ts.id}`)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const LenderDashboard = () => {
  const pendingCommitments = [
    {
      id: 'MC-2024-001',
      borrowerName: 'ABC Corporation',
      commitmentAmount: '$100,000,000',
      status: 'Pending_Lender',
      submittedDate: '2024-01-15',
      currentAcceptance: 75,
      acceptanceThreshold: 100
    },
    {
      id: 'MC-2024-002', 
      borrowerName: 'XYZ Holdings',
      commitmentAmount: '$75,000,000',
      status: 'Pending_Lender',
      submittedDate: '2024-01-20',
      currentAcceptance: 50,
      acceptanceThreshold: 100
    }
  ];

  return (
    <div className="">
      <h2>Lender Dashboard</h2>
      
      <div className="deals-table-section">
        <div className="table-header" style={{marginTop: '20px'}}>
          <h3>Pending Lender Commitments</h3>
        </div>
        
        <div className="table-container">
          <table className="deals-table">
            <thead>
              <tr>
                <th>Master Commitment ID</th>
                <th>Borrower</th>
                <th>Commitment Amount</th>
                <th>Submitted Date</th>
                {/* <th>Acceptance Progress</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingCommitments.map((commitment) => (
                <tr key={commitment.id}>
                  <td>{commitment.id}</td>
                  <td>{commitment.borrowerName}</td>
                  <td>{commitment.commitmentAmount}</td>
                  <td>{commitment.submittedDate}</td>
                  {/* <td>
                    <div className="progress-mini">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${commitment.currentAcceptance}%`}}
                        ></div>
                      </div>
                      <span>{commitment.currentAcceptance}%</span>
                    </div>
                  </td> */}
                  <td>
                    <span className={`status-badge ${commitment.status.toLowerCase().replace('_', '-')}`}>
                      {commitment.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/lender-commitment/${commitment.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      🔍 View Commitment
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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
    { label: 'Active Facilities', value: '15', change: '+2', changeType: 'positive' },
    { label: 'Collections This Month', value: '$45M', change: '+$8M', changeType: 'positive' },
    { label: 'Performance Data', value: 'Updated', change: 'Today', changeType: 'positive' },
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
    { label: 'Settlements Today', value: '8', change: '+2', changeType: 'positive' },
    { label: 'Total Settled', value: '$25M', change: '+$5M', changeType: 'positive' },
    { label: 'Pending Settlements', value: '3', change: '-1', changeType: 'negative' },
  ];

  return (
    <>
      <div className="dashboard-header">
        <h1>Treasury Operations Dashboard</h1>
        <p>Manage payments, calculations, and settlement reconciliation.</p>
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
            <Link to="/settlements" className="btn btn-primary">
              View Settlements
            </Link>
            <Link to="/payment-calculations" className="btn btn-secondary">
              Payment Calculations
            </Link>
            <Link to="/reconciliation" className="btn btn-secondary">
              Reconciliation
            </Link>
          </div>
        </div>
      </div>
    </>
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

export default RoleBasedDashboard; 