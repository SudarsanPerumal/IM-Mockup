import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { label: 'Active Commitments', value: '12', change: '+2', changeType: 'positive' },
    { label: 'Total Facility Value', value: '$2.4B', change: '+$120M', changeType: 'positive' },
    { label: 'Pending Requests', value: '5', change: '-1', changeType: 'negative' },
    { label: 'This Month Draws', value: '$180M', change: '+$45M', changeType: 'positive' },
  ];

  const recentActivities = [
    { id: 1, type: 'Funding Notice', description: 'MC-2024-001: $5M draw approved', time: '2 hours ago', status: 'approved' },
    { id: 2, type: 'Funding Request', description: 'MC-2024-002: $3.2M request submitted', time: '4 hours ago', status: 'pending' },
    { id: 3, type: 'Master Commitment', description: 'New facility MC-2024-003 created', time: '1 day ago', status: 'approved' },
    { id: 4, type: 'Covenant Check', description: 'MC-2024-001: Monthly compliance passed', time: '2 days ago', status: 'approved' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, Facility Agent. Here's your overview.</p>
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
            <Link to="/master-commitment" className="btn btn-primary">
              Create Master Commitment
            </Link>
            <Link to="/funding-request" className="btn btn-secondary">
              New Funding Request
            </Link>
            <Link to="/funding-notice" className="btn btn-secondary">
              Issue Funding Notice
            </Link>
          </div>
        </div>

        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  {activity.type === 'Funding Notice' && '📄'}
                  {activity.type === 'Funding Request' && '💰'}
                  {activity.type === 'Master Commitment' && '📋'}
                  {activity.type === 'Covenant Check' && '✅'}
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
      </div>
    </div>
  );
};

export default Dashboard; 