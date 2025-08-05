import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MasterCommitment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const termSheet = location.state?.termSheet;

  const [formData, setFormData] = useState({
    // U0 Master Commitment Setup UI - BRD Specification
    masterCommitmentId: 'MC-2024-001', // Auto-generated
    borrowerEntity: '', // Field 2 - Pre-filled, READ-ONLY
    facilityType: '', // Field 3 - Pre-filled, READ-ONLY
    commitmentAmount: '', // Field 4 - Pre-filled, READ-ONLY
    advanceRate: '', // Field 5 - Pre-filled, READ-ONLY
    margin: '350', // Field 6 - Pre-filled, READ-ONLY
    pricingIndex: '', // Field 7 - Pre-filled, READ-ONLY
    fixedRate: '', // Field 8 - Pre-filled, READ-ONLY
    maturityDate: '', // Field 9 - Pre-filled, READ-ONLY
    drawFrequencyLimit: '', // Field 10 - Pre-filled, READ-ONLY
    covenantTemplate: '', // Field 11 - Pre-filled, READ-ONLY
    customCovenantFile: null, // Field 11 - Pre-filled, READ-ONLY
    lenderGroup: [
      { lender: '', commitmentPercent: '', votingPercent: '' }
    ], // Field 12 - FA CAN EDIT
    collateralEligibilityRules: '', // Field 13 - FA CAN EDIT
    trustee: '' // Field 14 - FA CAN EDIT
  });

  const [errors, setErrors] = useState({});
  const [showCollateralModal, setShowCollateralModal] = useState(false);

  // Pre-fill form data from Term Sheet when component mounts
  useEffect(() => {
    if (termSheet) {
      setFormData(prev => ({
        ...prev,
        borrowerEntity: termSheet.borrowerEntity,
        facilityType: 'Revolver', // Default, could be from term sheet
        commitmentAmount: termSheet.requestedCommitment,
        advanceRate: termSheet.requestedAdvanceRate,
        margin: termSheet.requestedMargin,
        pricingIndex: termSheet.requestedPricingIndex,
        fixedRate: termSheet.requestedFixedRate || '',
        maturityDate: termSheet.requestedMaturityDate,
        drawFrequencyLimit: termSheet.requestedDrawFrequency,
        covenantTemplate: termSheet.covenantTemplate,
        // lenderGroup, collateralEligibilityRules, trustee remain empty for FA to fill
      }));
    }
  }, [termSheet]);

  const handleInputChange = (field, value) => {
    // Only allow changes to FA-editable fields
    const faEditableFields = ['lenderGroup', 'collateralEligibilityRules', 'trustee'];
    
    if (faEditableFields.includes(field)) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      customCovenantFile: file
    }));
  };

  const addLenderRow = () => {
    setFormData(prev => ({
      ...prev,
      lenderGroup: [...prev.lenderGroup, { lender: '', commitmentPercent: '', votingPercent: '' }]
    }));
  };

  const updateLenderRow = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      lenderGroup: prev.lenderGroup.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  const removeLenderRow = (index) => {
    setFormData(prev => ({
      ...prev,
      lenderGroup: prev.lenderGroup.filter((_, i) => i !== index)
    }));
  };

  const openCollateralModal = () => {
    setShowCollateralModal(true);
  };

  const closeCollateralModal = () => {
    setShowCollateralModal(false);
  };

  const validateForm = () => {
    const newErrors = {};

    // Only validate FA-editable fields
    if (!formData.trustee) newErrors.trustee = 'Trustee is required';
    if (!formData.collateralEligibilityRules) newErrors.collateralEligibilityRules = 'Collateral eligibility rules are required';

    // Validate lender group (Field 12)
    const totalCommitment = formData.lenderGroup.reduce((sum, row) => 
      sum + (parseFloat(row.commitmentPercent) || 0), 0
    );
    if (Math.abs(totalCommitment - 100) > 0.01) {
      newErrors.lenderGroup = 'Total commitment percentage must equal 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Creating Master Commitment:', formData);
      console.log('Creating CFDeal on chain...');
      console.log('Emitting MC_CREATED event...');
      alert('Master Commitment created successfully! CFDeal created on chain.');
    }
  };

  // If no term sheet data, show error
  if (!termSheet) {
    return (
      <div className="form-container">
        <div className="form-header">
          <h1>No Term Sheet Data</h1>
          <p>Please approve a Term Sheet first to create a Master Commitment.</p>
        </div>
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Create Master Commitment</h1>
        <p>Set up a new credit facility with borrower terms and lender allocations.</p>
        <div className="term-sheet-info">
          <p><strong>Based on Term Sheet:</strong> {termSheet.id} - {termSheet.borrowerName}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Facility Basics (Pre-filled from Term Sheet)</h3>
          
          {/* Field 1: Master Commitment ID */}
          <div className="form-row">
            <div className="form-field">
              <label>Master Commitment ID</label>
              <input
                type="text"
                value={formData.masterCommitmentId}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 2: Borrower Entity - READ ONLY */}
            <div className="form-field">
              <label>Borrower Entity</label>
              <input
                type="text"
                value={formData.borrowerEntity}
                readOnly
                className="readonly-field"
              />
            </div>
          </div>

          {/* Field 3: Facility Type - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Facility Type</label>
              <input
                type="text"
                value={formData.facilityType}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 4: Commitment Amount - READ ONLY */}
            <div className="form-field">
              <label>Commitment Amount (USD)</label>
              <input
                type="text"
                value={`$${parseInt(formData.commitmentAmount).toLocaleString()}`}
                readOnly
                className="readonly-field"
              />
            </div>
          </div>

          {/* Field 5: Advance Rate - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Advance Rate (%)</label>
              <input
                type="text"
                value={`${formData.advanceRate}%`}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 6: Margin - READ ONLY */}
            <div className="form-field">
              <label>Margin (bps)</label>
              <input
                type="text"
                value={`${formData.margin} bps`}
                readOnly
                className="readonly-field"
              />
            </div>
          </div>

          {/* Field 7: Pricing Index - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Pricing Index</label>
              <input
                type="text"
                value={formData.pricingIndex}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 8: Fixed Rate - READ ONLY (if applicable) */}
            {formData.fixedRate && (
              <div className="form-field">
                <label>Fixed Rate (%)</label>
                <input
                  type="text"
                  value={`${formData.fixedRate}%`}
                  readOnly
                  className="readonly-field"
                />
              </div>
            )}
          </div>

          {/* Field 9: Maturity Date - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Maturity Date</label>
              <input
                type="text"
                value={formData.maturityDate}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 10: Draw Frequency Limit - READ ONLY */}
            <div className="form-field">
              <label>Draw Frequency Limit</label>
              <input
                type="text"
                value={formData.drawFrequencyLimit}
                readOnly
                className="readonly-field"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>FA Editable Fields</h3>
          
          {/* Field 11: Covenant Template - READ ONLY */}
          <div className="form-row">
            <div className="form-field">
              <label>Covenant Template</label>
              <input
                type="text"
                value={formData.covenantTemplate}
                readOnly
                className="readonly-field"
              />
            </div>
            {/* Field 14: Trustee/Custodian - FA CAN EDIT */}
            <div className="form-field">
              <label className="required">Trustee / Custodian</label>
              <select
                value={formData.trustee}
                onChange={(e) => handleInputChange('trustee', e.target.value)}
              >
                <option value="">Select Trustee</option>
                <option value="trustee1">Bank of America</option>
                <option value="trustee2">JPMorgan Chase</option>
                <option value="trustee3">Wells Fargo</option>
              </select>
              {errors.trustee && <div className="error-message">{errors.trustee}</div>}
            </div>
          </div>

          {/* Field 12: Lender Group Table - FA CAN EDIT */}
          <div className="form-field">
            <label className="required">Lender Group Table</label>
            <table className="grid-table">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Commitment %</th>
                  <th>Voting %</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.lenderGroup.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <select
                        value={row.lender}
                        onChange={(e) => updateLenderRow(index, 'lender', e.target.value)}
                      >
                        <option value="">Select Lender</option>
                        <option value="lender1">Goldman Sachs</option>
                        <option value="lender2">Morgan Stanley</option>
                        <option value="lender3">Citigroup</option>
                        <option value="lender4">Deutsche Bank</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        value={row.commitmentPercent}
                        onChange={(e) => updateLenderRow(index, 'commitmentPercent', e.target.value)}
                        placeholder="25.00"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        value={row.votingPercent}
                        onChange={(e) => updateLenderRow(index, 'votingPercent', e.target.value)}
                        placeholder="25.00"
                        min="0"
                        max="100"
                      />
                    </td>
                    <td>
                      {formData.lenderGroup.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLenderRow(index)}
                          style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={addLenderRow}>
              + Add Lender
            </button>
            {errors.lenderGroup && <div className="error-message">{errors.lenderGroup}</div>}
          </div>

          {/* Field 13: Collateral Eligibility Rules - FA CAN EDIT */}
          <div className="form-field">
            <label className="required">Collateral Eligibility Rules</label>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={openCollateralModal}
              style={{ width: 'auto', marginTop: '8px' }}
            >
              Configure Collateral Rules
            </button>
            {formData.collateralEligibilityRules && (
              <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f0f8ff', borderRadius: '4px', fontSize: '12px' }}>
                <strong>Configured Rules:</strong> {formData.collateralEligibilityRules}
              </div>
            )}
            {errors.collateralEligibilityRules && <div className="error-message">{errors.collateralEligibilityRules}</div>}
          </div>
        </div>

        {/* Field 15: Create Master Commitment Button */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Master Commitment
          </button>
        </div>
      </form>

      {/* Collateral Eligibility Rules Modal */}
      {showCollateralModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Configure Collateral Eligibility Rules</h3>
              <button 
                type="button" 
                className="modal-close"
                onClick={closeCollateralModal}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="rule-group">
                <h4>Rule Group 1: Loan Type Eligibility</h4>
                <div className="rule-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Residential Mortgages
                  </label>
                  <div className="rule-details">
                    <span>Min FICO: 680</span>
                    <span>Max LTV: 80%</span>
                    <span>Min Loan Amount: $50,000</span>
                  </div>
                </div>
                <div className="rule-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Commercial Real Estate
                  </label>
                  <div className="rule-details">
                    <span>Min DSCR: 1.25</span>
                    <span>Max LTV: 75%</span>
                    <span>Property Type: Office, Retail, Industrial</span>
                  </div>
                </div>
              </div>

              <div className="rule-group">
                <h4>Rule Group 2: Geographic Restrictions</h4>
                <div className="rule-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Primary Markets Only
                  </label>
                  <div className="rule-details">
                    <span>States: CA, NY, TX, FL, IL</span>
                    <span>MSA Population: ≥ 500,000</span>
                  </div>
                </div>
              </div>

              <div className="rule-group">
                <h4>Rule Group 3: Performance Criteria</h4>
                <div className="rule-item">
                  <label>
                    <input type="checkbox" defaultChecked />
                    No Delinquency History
                  </label>
                  <div className="rule-details">
                    <span>No 30+ day delinquencies in past 12 months</span>
                    <span>No bankruptcies in past 7 years</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={closeCollateralModal}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => {
                  handleInputChange('collateralEligibilityRules', '3 rule groups configured: Loan Type, Geographic, Performance');
                  closeCollateralModal();
                }}
              >
                Apply Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterCommitment; 