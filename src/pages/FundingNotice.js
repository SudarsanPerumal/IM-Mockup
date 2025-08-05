import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FundingNotice = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fundingRequestId: 'FR-2024-001',
    approvedAmount: '',
    fundingDateConfirmed: '',
    pricingIndex: '',
    fixedRate: '',
    facilityMargin: '',
    borrowerFundingAccount: '',
    lenderAllocation: [
      { lender: '', amount: '', margin: '', spreadFloor: '' }
    ]
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
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
  };

  const addLenderRow = () => {
    setFormData(prev => ({
      ...prev,
      lenderAllocation: [...prev.lenderAllocation, { lender: '', amount: '', margin: '', spreadFloor: '' }]
    }));
  };

  const updateLenderRow = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      lenderAllocation: prev.lenderAllocation.map((row, i) => 
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  const removeLenderRow = (index) => {
    setFormData(prev => ({
      ...prev,
      lenderAllocation: prev.lenderAllocation.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.approvedAmount || parseFloat(formData.approvedAmount) <= 0) {
      newErrors.approvedAmount = 'Approved amount must be greater than 0';
    }
    if (!formData.fundingDateConfirmed) {
      newErrors.fundingDateConfirmed = 'Funding date is required';
    }
    if (!formData.pricingIndex) {
      newErrors.pricingIndex = 'Pricing index is required';
    }
    if (formData.pricingIndex === 'Fixed' && (!formData.fixedRate || parseFloat(formData.fixedRate) <= 0)) {
      newErrors.fixedRate = 'Fixed rate is required when pricing index is Fixed';
    }
    if (!formData.facilityMargin || parseFloat(formData.facilityMargin) <= 0) {
      newErrors.facilityMargin = 'Facility margin is required';
    }
    if (!formData.borrowerFundingAccount) {
      newErrors.borrowerFundingAccount = 'Borrower funding account is required';
    }

    // Validate lender allocation
    const totalAmount = formData.lenderAllocation.reduce((sum, row) => 
      sum + (parseFloat(row.amount) || 0), 0
    );
    const approvedAmount = parseFloat(formData.approvedAmount) || 0;
    if (Math.abs(totalAmount - approvedAmount) > 0.01) {
      newErrors.lenderAllocation = 'Total allocation amount must equal approved amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Funding Notice submitted:', formData);
      // Navigate to summary page after successful submission
      navigate('/funding-notice-summary');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Issue Funding Notice</h1>
        <p>Approve and issue a funding notice for a pending funding request.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Linked Request</h3>
          
          <div className="form-field">
            <label className="required">Funding Request ID</label>
            <input
              type="text"
              value={formData.fundingRequestId}
              readOnly
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Approved Draw</h3>
          
          <div className="form-row">
            <div className="form-field">
              <label className="required">Approved Amount (USD)</label>
              <input
                type="number"
                value={formData.approvedAmount}
                onChange={(e) => handleInputChange('approvedAmount', e.target.value)}
                placeholder="5,000,000"
                min="0"
                step="1000"
              />
              {errors.approvedAmount && <div className="error-message">{errors.approvedAmount}</div>}
            </div>
            <div className="form-field">
              <label className="required">Funding Date Confirmed</label>
              <input
                type="date"
                value={formData.fundingDateConfirmed}
                onChange={(e) => handleInputChange('fundingDateConfirmed', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.fundingDateConfirmed && <div className="error-message">{errors.fundingDateConfirmed}</div>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Pricing & Allocation</h3>
          
          <div className="form-row">
            <div className="form-field">
              <label className="required">Pricing Index</label>
              <select
                value={formData.pricingIndex}
                onChange={(e) => handleInputChange('pricingIndex', e.target.value)}
              >
                <option value="">Select Index</option>
                <option value="SOFR 1M">SOFR 1M</option>
                <option value="SOFR Daily Simple">SOFR Daily Simple</option>
                <option value="Prime">Prime</option>
                <option value="Fixed">Fixed</option>
              </select>
              {errors.pricingIndex && <div className="error-message">{errors.pricingIndex}</div>}
            </div>
            {formData.pricingIndex === 'Fixed' && (
              <div className="form-field">
                <label className="required">Fixed Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.fixedRate}
                  onChange={(e) => handleInputChange('fixedRate', e.target.value)}
                  placeholder="5.25"
                />
                {errors.fixedRate && <div className="error-message">{errors.fixedRate}</div>}
              </div>
            )}
          </div>

          <div className="form-field">
            <label className="required">Facility Margin (bps)</label>
            <input
              type="number"
              value={formData.facilityMargin}
              onChange={(e) => handleInputChange('facilityMargin', e.target.value)}
              placeholder="350"
              min="0"
              max="1000"
            />
            {errors.facilityMargin && <div className="error-message">{errors.facilityMargin}</div>}
          </div>

          <div className="form-field">
            <label className="required">Lender Allocation Table</label>
            <table className="grid-table">
              <thead>
                <tr>
                  <th>Lender</th>
                  <th>Amount (USD)</th>
                  <th>Margin (bps)</th>
                  <th>Spread Floor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.lenderAllocation.map((row, index) => (
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
                        value={row.amount}
                        onChange={(e) => updateLenderRow(index, 'amount', e.target.value)}
                        placeholder="1,250,000"
                        min="0"
                        step="1000"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.margin}
                        onChange={(e) => updateLenderRow(index, 'margin', e.target.value)}
                        placeholder="350"
                        min="0"
                        max="1000"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        value={row.spreadFloor}
                        onChange={(e) => updateLenderRow(index, 'spreadFloor', e.target.value)}
                        placeholder="2.50"
                        min="0"
                      />
                    </td>
                    <td>
                      {formData.lenderAllocation.length > 1 && (
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
            {errors.lenderAllocation && <div className="error-message">{errors.lenderAllocation}</div>}
          </div>
        </div>

        <div className="form-section">
          <h3>Settlement</h3>
          
          <div className="form-field">
            <label className="required">Borrower Funding Account</label>
            <select
              value={formData.borrowerFundingAccount}
              onChange={(e) => handleInputChange('borrowerFundingAccount', e.target.value)}
            >
              <option value="">Select Account</option>
              <option value="account1">Bank of America - 1234567890</option>
              <option value="account2">JPMorgan Chase - 0987654321</option>
              <option value="account3">Wells Fargo - 1122334455</option>
            </select>
            {errors.borrowerFundingAccount && <div className="error-message">{errors.borrowerFundingAccount}</div>}
          </div>
        </div>

        <div className="form-section">
          <h3>Review & Sign</h3>
          
          <div className="form-field">
            <label>Funding Notice PDF Preview</label>
            <div className="preview-panel">
              <h4>Funding Notice Preview</h4>
              <p>PDF will be generated automatically when form is complete.</p>
              <p><strong>Notice ID:</strong> FN-2024-001</p>
              <p><strong>Status:</strong> <span className="status-badge status-pending">Draft</span></p>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Approve & Issue Notice
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundingNotice; 