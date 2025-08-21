import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// Import components
// import RoleBasedDashboard from './components/RoleBasedDashboard';
// import BorrowerDashboard from './components/BorrowerDashboard';
// import BorrowerTermSheet from './pages/BorrowerTermSheet';
// import TermSheetReview from './pages/TermSheetReview';
// import MasterCommitment from './pages/MasterCommitment';
// import LenderCommitment from './pages/LenderCommitment';
// import LenderCommitmentAcceptance from './pages/LenderCommitmentAcceptance';
// import LenderFundingNotice from './pages/LenderFundingNotice';
// import FundingRequestReview from './pages/FundingRequestReview';
// import Login from './pages/Login';
// import IssuerUIMockup from './pages/IssuerUIMockup';
import InvestorConsole from './pages/InvestorConsole';
import InvestorCondoleBRD from './pages/InvestorCondoleBRD';

// Navigation Component
function NavigationButtons() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '20px',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <h1 style={{
        color: '#1e293b',
        marginBottom: '40px',
        fontSize: '2.5rem',
        fontWeight: 'bold'
      }}>
        IntainMARKETS — Investor Console
      </h1>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => navigate('/investor-console')}
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '250px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
          }}
        >
        Investor Console as per Code in Google Drive
        </button>

        <button
          onClick={() => navigate('/investor-console-brd')}
          style={{
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s ease',
            minWidth: '250px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
          }}
        >
         Investor Console as per BRD
        </button>
      </div>

      <div style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#64748b',
        maxWidth: '600px'
      }}>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <strong>Code in Google Drive:</strong> Basic implementation with core functionality
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          <strong>Code as Per BRD:</strong> Complete implementation following Business Requirements Document specifications
        </p>
      </div>
    </div>
  );
}

function App() {
  // const [userRole, setUserRole] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // // Check for existing session on app load
  // useEffect(() => {
  //   const savedRole = localStorage.getItem('userRole');
  //   const savedEmail = localStorage.getItem('userEmail');
    
  //   if (savedRole && savedEmail) {
  //     setUserRole(savedRole);
  //     setUserEmail(savedEmail);
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  // const handleLoginSuccess = (role, email) => {
  //   setUserRole(role);
  //   setUserEmail(email);
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   setUserRole('');
  //   setUserEmail('');
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('userRole');
  //   localStorage.removeItem('userEmail');
  // };

  return (
    <Router>
      <div className="App">
        {/* {!isAuthenticated ? (
          // Show Login when not authenticated
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          // Show authenticated content
          <>
            <div style={{
              background: 'white',
              padding: '10px 20px',
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                  Welcome, {userEmail} ({userRole})
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div> */}

        <Routes>
          {/* Main Navigation Route */}
          <Route path="/" element={<NavigationButtons />} />

          {/* Main Dashboard Route */}
          {/* <Route 
            path="/" 
            element={
              userRole === 'Borrower' ? 
                <BorrowerDashboard /> : 
                <RoleBasedDashboard userRole={userRole} />
            } 
          /> */}
          
          {/* Dashboard Route */}
          {/* <Route 
            path="/dashboard" 
            element={
              userRole === 'Borrower' ? 
                <BorrowerDashboard /> : 
                <RoleBasedDashboard userRole={userRole} />
            } 
          /> */}

          {/* Term Sheet Routes */}
          {/* <Route path="/term-sheet/create" element={<BorrowerTermSheet />} />
          <Route path="/term-sheet/:id" element={<BorrowerTermSheet />} /> */}

          {/* Term Sheet Review Route */}
          {/* <Route path="/term-sheet-review/:id" element={<TermSheetReview />} /> */}

          {/* Master Commitment Route */}
          {/* <Route path="/master-commitment" element={<MasterCommitment />} /> */}

          {/* Lender Commitment Routes */}
          {/* <Route path="/lender-commitment/:id" element={<LenderCommitment />} />
          <Route path="/lender-commitment-acceptance/:id" element={<LenderCommitmentAcceptance />} /> */}

          {/* Pool Routes */}
          {/* <Route path="/pools" element={<BorrowerDashboard />} />
          <Route path="/pool-details/:id" element={<BorrowerDashboard />} /> */}

          {/* Funding Request Routes */}
          {/* <Route path="/funding-request/create/:poolId" element={<FundingRequestCreate />} />
          <Route path="/funding-requests" element={<FundingRequestsList />} /> */}
          
          {/* Funding Notice Routes */}
          {/* <Route path="/lender-funding-notice/:id" element={<LenderFundingNotice />} />
          <Route path="/lender-funding-notice" element={<LenderFundingNotice />} /> */}

          {/* Add Funding Request Review Route for Facility Agent */}
          {/* <Route path="/funding-request-review/:id" element={<FundingRequestReview />} /> */}

          {/* Issuer UI Mockup Route */}
          {/* <Route path="/issuer-ui" element={<IssuerUIMockup />} /> */}

          {/* Investor Console Routes */}
          <Route path="/investor-console" element={<InvestorConsole />} />
          <Route path="/investor-console-brd" element={<InvestorCondoleBRD />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* </> */}
        {/* )} */}
      </div>
    </Router>
  );
}

// Placeholder components for routes that need to be implemented
// const FundingRequestCreate = () => (
//   <div style={{ padding: '20px', textAlign: 'center' }}>
//     <h2>Create Funding Request</h2>
//     <p>Funding request creation form will be implemented here.</p>
//     <button 
//       onClick={() => window.history.back()}
//       style={{
//         padding: '10px 20px',
//         background: '#FFC000',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer'
//       }}
//     >
//       Back to Dashboard
//     </button>
//   </div>
// );

// const FundingRequestsList = () => (
//   <div style={{ padding: '20px', textAlign: 'center' }}>
//     <h2>Funding Requests</h2>
//     <p>Funding requests list will be implemented here.</p>
//     <button 
//       onClick={() => window.history.back()}
//       style={{
//         padding: '10px 20px',
//         background: '#FFC000',
//         border: 'none',
//         borderRadius: '6px',
//         cursor: 'pointer'
//       }}
//     >
//       Back to Dashboard
//     </button>
//   </div>
// );

export default App;