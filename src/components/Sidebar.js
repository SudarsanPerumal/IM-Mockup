import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ userRole, userEmail, onLogout }) => {
  const location = useLocation();

  const getMenuItems = () => {
    switch (userRole) {
      case 'Borrower':
        return [
          { 
            path: '/dashboard', 
            label: 'Dashboard', 
            icon: '📊',
            badge: 2 // Show 2 unread notifications
          },
          { path: '/borrower-term-sheet', label: 'Term Sheet', icon: '📝' },
          { path: '/funding-request', label: 'Funding Request', icon: '📋' }
        ];
      
      case 'Facility Agent':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/term-sheet-review', label: 'Review Term Sheets', icon: '🔍' },
          { path: '/master-commitment', label: 'Create Master Commitment', icon: '⚡' },
          { path: '/funding-notice', label: 'Issue Funding Notice', icon: '📄' },
          // { path: '/funding-notice-summary', label: 'Notice Summary', icon: '📋' }
        ];
      
      case 'Lender':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/lender-commitment-acceptance', label: 'Commitments', icon: '💰' },
          { path: '/facility-tokens', label: 'Facility Tokens', icon: '🪙' },
          { path: '/coupons', label: 'Coupons', icon: '💵' }
        ];
      
      case 'Verification Agent':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' }
        ];
      
      case 'Servicer':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' }
        ];
      
      case 'Trustee':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' }
        ];
      
      case 'Treasury Ops':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' }
        ];
      
      default:
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' }
        ];
    }
  };

  const getRoleDisplayName = () => {
    const roleNames = {
      'Borrower': 'Borrower',
      'Facility Agent': 'Facility Agent',
      'Lender': 'Lender',
      'Verification Agent': 'Verification Agent',
      'Servicer': 'Servicer',
      'Trustee': 'Trustee',
      'Treasury Ops': 'Treasury Ops'
    };
    return roleNames[userRole] || userRole;
  };

  const getRoleIcon = () => {
    const roleIcons = {
      'Borrower': '🏢',
      'Facility Agent': '🏦',
      'Lender': '💰',
      'Verification Agent': '🔍',
      'Servicer': '📊',
      'Trustee': '⚖️',
      'Treasury Ops': '💼'
    };
    return roleIcons[userRole] || '👤';
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>IntainMARKETS</h2>
        <p>Credit Facilities</p>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {getMenuItems().map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {/* {item.badge && (
                  <span className="notification-badge">{item.badge}</span>
                )} */}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-profile">
        <div className="profile-info">
          <div className="profile-icon">{getRoleIcon()}</div>
          <div className="profile-details">
            <div className="profile-role">{getRoleDisplayName()}</div>
            <div className="profile-email">{userEmail}</div>
          </div>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 