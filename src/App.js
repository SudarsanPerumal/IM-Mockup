import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RoleBasedDashboard from './components/RoleBasedDashboard';
import Login from './pages/Login';
import BorrowerTermSheet from './pages/BorrowerTermSheet';
import TermSheetReview from './pages/TermSheetReview';
import FundingRequest from './pages/FundingRequest';
import FundingNotice from './pages/FundingNotice';
import FundingNoticeSummary from './pages/FundingNoticeSummary';
import MasterCommitment from './pages/MasterCommitment';
import LenderCommitmentAcceptance from './pages/LenderCommitmentAcceptance';
import Commitments from './pages/Commitments';
import FacilityTokens from './pages/FacilityTokens';
import Coupons from './pages/Coupons';
import LenderCommitment from './pages/LenderCommitment';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedRole && savedEmail) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
      setUserEmail(savedEmail);
    }
  }, []);

  const handleLoginSuccess = (role, email) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserEmail(email);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserEmail('');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/dashboard" />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated && (
          <Sidebar 
            userRole={userRole} 
            userEmail={userEmail} 
            onLogout={handleLogout}
          />
        )}
        
        <div className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Login onLoginSuccess={handleLoginSuccess} />
              } 
            />
            
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <RoleBasedDashboard userRole={userRole} />
                </ProtectedRoute>
              } 
            />

            {/* Step 1: Borrower Creates Term Sheet Application */}
            <Route 
              path="/borrower-term-sheet" 
              element={
                <ProtectedRoute allowedRoles={['Borrower']}>
                  <BorrowerTermSheet />
                </ProtectedRoute>
              } 
            />

            {/* Step 2: Facility Agent Reviews Term Sheet */}
            <Route 
              path="/term-sheet-review/:id" 
              element={
                <ProtectedRoute allowedRoles={['Facility Agent']}>
                  <TermSheetReview />
                </ProtectedRoute>
              } 
            />

            {/* Step 3: Borrower Requests Funding */}
            <Route 
              path="/funding-request" 
              element={
                // <ProtectedRoute allowedRoles={['Borrower']}>
                  <FundingRequest />
                // </ProtectedRoute>
              } 
            />

            {/* Step 3: Facility Agent Creates Master Commitment */}
            <Route 
              path="/master-commitment" 
              element={
                <ProtectedRoute allowedRoles={['Facility Agent']}>
                  <MasterCommitment />
                </ProtectedRoute>
              } 
            />

            {/* Additional Workflow Screens */}
            <Route 
              path="/funding-notice" 
              element={
                <ProtectedRoute allowedRoles={['Facility Agent']}>
                  <FundingNotice />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/funding-notice-summary" 
              element={
                // <ProtectedRoute allowedRoles={['Facility Agent', 'Borrower', 'Lender']}>
                  <FundingNoticeSummary userRole={userRole} />
                // </ProtectedRoute>
              } 
            />

            <Route 
              path="/lender-commitment-acceptance" 
              element={
                <ProtectedRoute allowedRoles={['Lender']}>
                  <LenderCommitmentAcceptance />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/commitments" 
              element={
                <ProtectedRoute allowedRoles={['Lender']}>
                  <Commitments />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/facility-tokens" 
              element={
                <ProtectedRoute allowedRoles={['Lender']}>
                  <FacilityTokens />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/coupons" 
              element={
                <ProtectedRoute allowedRoles={['Lender']}>
                  <Coupons />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/lender-commitment/:id" 
              element={<LenderCommitment />} 
            />

            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

