import React, { useState } from 'react';

const   FundingRequest = () => {
  const [formData, setFormData] = useState({
    masterCommitmentId: 'MC-2024-001',
    fundingRequestId: 'FR-2024-001',
    drawAmount: '',
    fundingDate: '',
    purposeOfFunds: '',
    purposeOther: '',
    collateralFile: null,
    estimatedCollateralValue: '',
    drawCurrency: 'USD',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      collateralFile: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.drawAmount || parseFloat(formData.drawAmount) <= 0) {
      newErrors.drawAmount = 'Draw amount must be greater than 0';
    }
    if (!formData.fundingDate) {
      newErrors.fundingDate = 'Funding date is required';
    }
    if (!formData.purposeOfFunds) {
      newErrors.purposeOfFunds = 'Purpose of funds is required';
    }
    if (formData.purposeOfFunds === 'Other' && !formData.purposeOther.trim()) {
      newErrors.purposeOther = 'Please specify the purpose';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Funding Request submitted:', formData);
      
      // Simulate API call
      setTimeout(() => {
        alert('Funding Request submitted successfully! Facility Agent will review your request.');
        setIsSubmitting(false);
      }, 2000);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Funding Request</h1>
        <p>Submit a funding request against your approved Master Commitment.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Request Information</h3>
          
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
            <div className="form-field">
              <label>Funding Request ID</label>
              <input
                type="text"
                value={formData.fundingRequestId}
                readOnly
                className="readonly-field"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="required">Draw Amount (USD)</label>
              <input
                type="number"
                value={formData.drawAmount}
                onChange={(e) => handleInputChange('drawAmount', e.target.value)}
                placeholder="5,000,000"
                min="0"
                step="1000"
              />
              {errors.drawAmount && <div className="error-message">{errors.drawAmount}</div>}
            </div>
            <div className="form-field">
              <label className="required">Funding Date</label>
              <input
                type="date"
                value={formData.fundingDate}
                onChange={(e) => handleInputChange('fundingDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                max={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                title="T+0 to T+5 business days"
              />
              {errors.fundingDate && <div className="error-message">{errors.fundingDate}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label className="required">Purpose of Funds</label>
              <select
                value={formData.purposeOfFunds}
                onChange={(e) => handleInputChange('purposeOfFunds', e.target.value)}
              >
                <option value="">Select Purpose</option>
                <option value="Working Capital">Working Capital</option>
                <option value="Origination Funding">Origination Funding</option>
                <option value="Re-advance">Re-advance</option>
                <option value="Other">Other</option>
              </select>
              {errors.purposeOfFunds && <div className="error-message">{errors.purposeOfFunds}</div>}
            </div>
            <div className="form-field">
              <label>Draw Currency</label>
              <select
                value={formData.drawCurrency}
                onChange={(e) => handleInputChange('drawCurrency', e.target.value)}
                disabled
              >
                <option value="USD">USD</option>
                <option value="USDC">USDC</option>
              </select>
            </div>
          </div>

          {formData.purposeOfFunds === 'Other' && (
            <div className="form-field">
              <label className="required">Specify Purpose</label>
              <textarea
                value={formData.purposeOther}
                onChange={(e) => handleInputChange('purposeOther', e.target.value)}
                placeholder="Please describe the purpose of funds..."
                rows="3"
                maxLength="250"
              />
              {errors.purposeOther && <div className="error-message">{errors.purposeOther}</div>}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Collateral Information</h3>
          
          <div className="form-field">
            <label>Collateral Addendum Upload</label>
            <div className="file-upload">
              <input
                type="file"
                accept=".csv,.xlsx,.json"
                onChange={handleFileChange}
              />
              <div>
                <p>Click to upload or drag and drop</p>
                <p>CSV, Excel, JSON files</p>
                <p><em>Optional: Add loans to secure this draw</em></p>
                {formData.collateralFile && (
                  <p>Selected: {formData.collateralFile.name}</p>
                )}
              </div>
            </div>
          </div>

          <div className="form-field">
            <label>Estimated Collateral Value</label>
            <input
              type="text"
              value={formData.estimatedCollateralValue || 'Calculating...'}
              readOnly
              className="readonly-field"
            />
            <small>Auto-calculated based on uploaded collateral and eligibility rules</small>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          
          <div className="form-field">
            <label>Notes / Internal Reference</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information or internal reference..."
              rows="4"
              maxLength="500"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary">
            Save Draft
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Funding Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundingRequest; 