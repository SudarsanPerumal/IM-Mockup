import React from 'react';
import './TermSheetStatus.css';

const TermSheetStatus = ({ status, currentStep, onStatusChange }) => {
  const steps = [
    { id: 'draft', label: 'Draft', description: 'Borrower creates Term Sheet' },
    { id: 'pending', label: 'Pending Review', description: 'Submitted to Facility Agent' },
    { id: 'approved', label: 'Approved', description: 'Facility Agent approved' },
    { id: 'cfmc_created', label: 'CFMC Created', description: 'Master Commitment created' },
    { id: 'committed', label: 'Committed', description: 'Lender accepted commitment' }
  ];

  const getStepIndex = (stepId) => {
    return steps.findIndex(step => step.id === stepId);
  };

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div className="status-container">
      {/* <div className="status-header">
        <h2>Term Sheet Status</h2>
        <div className="current-status">
          Current Status: <span className={`status-badge ${currentStep}`}>{currentStep}</span>
        </div>
      </div>
      
      <div className="workflow-steps">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className={`workflow-step ${index <= currentStepIndex ? 'completed' : ''} ${step.id === currentStep ? 'current' : ''}`}
          >
            <div className="step-indicator">
              <div className="step-number">{index + 1}</div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
            <div className="step-content">
              <h4>{step.label}</h4>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* {currentStep === 'draft' && (
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => onStatusChange('pending')}
          >
            Submit to Facility Agent
          </button>
        </div>
      )}

      {currentStep === 'pending' && (
        <div className="action-buttons">
          <button 
            className="btn btn-success"
            onClick={() => onStatusChange('approved')}
          >
            Approve
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => onStatusChange('declined')}
          >
            Decline
          </button>
        </div>
      )}

      {currentStep === 'approved' && (
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => onStatusChange('cfmc_created')}
          >
            Create Master Commitment (CFMC)
          </button>
        </div>
      )}

      {currentStep === 'cfmc_created' && (
        <div className="action-buttons">
          <button 
            className="btn btn-success"
            onClick={() => onStatusChange('committed')}
          >
            Accept Commitment
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => onStatusChange('rejected')}
          >
            Reject Commitment
          </button>
        </div>
      )} */}
    </div>
  );
};

export default TermSheetStatus; 