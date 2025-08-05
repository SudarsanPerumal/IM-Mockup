import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
import './BorrowerTermSheet.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BorrowerTermSheet = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    termSheetId: '',
    version: 1,
    facilityName: '',
    borrowerEntity: '',
    
    // Requested Terms
    requestedCommitment: '',
    requestedAdvanceRate: '',
    requestedMargin: '350',
    requestedPricingIndex: '',
    requestedFixedRate: '',
    requestedMaturityDate: '',
    requestedDrawFrequency: '',
    
    // Facility Details
    facilityType: '',
    trancheNumber: '',
    isPrimaryFacility: false,
    
    // Documents
    covenantTemplate: '',
    customCovenantFile: null,
    collateralProfile: '',
    collateralFile: null,
    financialsFile: null,
    kycFile: null,
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('draft');
  const [termSheetHistory, setTermSheetHistory] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [isSigned, setIsSigned] = useState(false);
  
  // PDF preview state
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);

  // Generate unique term sheet ID
  const generateTermSheetId = () => {
    return `TS-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  };

  // Handle facility selection/creation
  const handleFacilityChange = (facilityId) => {
    if (facilityId === 'new') {
      const newFacility = {
        id: `FAC-${Date.now()}`,
        name: `Facility ${facilities.length + 1}`,
        type: 'Revolving',
        status: 'draft'
      };
      setFacilities([...facilities, newFacility]);
      setFormData(prev => ({
        ...prev,
        facilityName: newFacility.name,
        facilityId: newFacility.id
      }));
    } else {
      const facility = facilities.find(f => f.id === facilityId);
      setFormData(prev => ({
        ...prev,
        facilityName: facility.name,
        facilityId: facility.id
      }));
    }
  };

  // Create new version of term sheet
  const createNewVersion = () => {
    const newVersion = {
      ...formData,
      version: formData.version + 1,
      termSheetId: formData.termSheetId,
      status: 'draft',
      createdAt: new Date().toISOString(),
      parentVersion: formData.version
    };

    setTermSheetHistory(prev => [...prev, {
      ...formData,
      status: currentStatus,
      updatedAt: new Date().toISOString()
    }]);

    setFormData(newVersion);
    setCurrentStatus('draft');
  };

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

  const handleFileChange = (field, event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.borrowerEntity) {
      newErrors.borrowerEntity = 'Borrower entity is required';
    }
    if (!formData.requestedCommitment || parseFloat(formData.requestedCommitment) <= 0) {
      newErrors.requestedCommitment = 'Commitment amount must be greater than 0';
    }
    if (!formData.requestedAdvanceRate || parseFloat(formData.requestedAdvanceRate) <= 0 || parseFloat(formData.requestedAdvanceRate) > 100) {
      newErrors.requestedAdvanceRate = 'Advance rate must be between 0 and 100';
    }
    if (!formData.requestedMargin || parseFloat(formData.requestedMargin) <= 0 || parseFloat(formData.requestedMargin) > 1000) {
      newErrors.requestedMargin = 'Margin must be between 0 and 1000 bps';
    }
    if (!formData.requestedPricingIndex) {
      newErrors.requestedPricingIndex = 'Pricing index is required';
    }
    if (formData.requestedPricingIndex === 'Fixed' && (!formData.requestedFixedRate || parseFloat(formData.requestedFixedRate) <= 0)) {
      newErrors.requestedFixedRate = 'Fixed rate is required when pricing index is Fixed';
    }
    if (!formData.requestedMaturityDate) {
      newErrors.requestedMaturityDate = 'Maturity date is required';
    }
    if (!formData.requestedDrawFrequency) {
      newErrors.requestedDrawFrequency = 'Draw frequency is required';
    }
    if (!formData.covenantTemplate) {
      newErrors.covenantTemplate = 'Covenant template is required';
    }
    if (formData.covenantTemplate === 'Custom' && !formData.customCovenantFile) {
      newErrors.customCovenantFile = 'Custom covenant file is required';
    }
    if (!formData.collateralProfile) {
      newErrors.collateralProfile = 'Collateral profile is required';
    }
    if (!formData.financialsFile) {
      newErrors.financialsFile = 'Financial statements are required';
    }
    if (!formData.kycFile) {
      newErrors.kycFile = 'KYC documentation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate mock PDF URL
  const generatePdfUrl = () => {
    const mockPdfUrl = `data:application/pdf;base64,${btoa('Mock PDF content')}`;
    return mockPdfUrl;
  };

  // Handle PDF document load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoading(false);
  };

  // Generate PDF preview when status changes to pending
  const generatePdfPreview = () => {
    setPdfLoading(true);
    const url = generatePdfUrl();
    setPdfUrl(url);
  };

  // Handle E-signature
  const handleESignature = () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSigned(true);
      setCurrentStatus('borrower_signed');
      setIsSubmitting(false);
      
      const event = {
        type: 'TERMSHEET_BORROWER_SIGNED',
        data: {
          applicationId: formData.termSheetId,
          termSheetId: formData.termSheetId,
          borrowerEntity: formData.borrowerEntity,
          commitment: formData.requestedCommitment,
          timestamp: new Date().toISOString()
        }
      };
      
      console.log('Frontend Event Emitted:', event);
      alert('Term Sheet signed successfully! Facility Agent has been notified.');
    }, 1500);
  };

  // Handle revision submission
  const handleRevision = () => {
    if (currentStatus === 'declined') {
      createNewVersion();
      alert('New version created. Please review and submit the revised term sheet.');
    }
  };

  // Updated handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      if (!formData.termSheetId) {
        setFormData(prev => ({
          ...prev,
          termSheetId: generateTermSheetId()
        }));
      }

      console.log('Submitting Term Sheet Application:', formData);
      
      setTimeout(() => {
        alert('Term Sheet Application submitted successfully! Generating PDF preview...');
        setIsSubmitting(false);
        setCurrentStatus('pending');
        generatePdfPreview();
      }, 2000);
    }
  };

  return (
    <div className="form-container">
      {/* Status Display */}
      <div className="status-display">
        <span className={`status-badge ${currentStatus}`}>
          {currentStatus === 'draft' ? 'Draft' : 
           currentStatus === 'pending' ? 'Pending Review' :
           currentStatus === 'borrower_signed' ? 'Borrower Signed' :
           currentStatus === 'approved' ? 'Approved' : 
           currentStatus === 'declined' ? 'Declined' :
           currentStatus === 'cfmc_created' ? 'CFMC Created' : 
           currentStatus === 'committed' ? 'Committed' : currentStatus}
        </span>
        {formData.termSheetId && (
          <div className="version-info">
            <span>ID: {formData.termSheetId}</span>
            <span>Version: {formData.version}</span>
          </div>
        )}
      </div>

      {/* Revision Actions */}
      {currentStatus === 'declined' && (
        <div className="revision-actions">
          <button 
            type="button" 
            className="btn btn-warning"
            onClick={handleRevision}
          >
            Create Revised Version
          </button>
        </div>
      )}

      {/* Term Sheet History */}
      {termSheetHistory.length > 0 && (
        <div className="history-section">
          <h3>Version History</h3>
          <div className="history-list">
            {termSheetHistory.map((version, index) => (
              <div key={index} className="history-item">
                <span>Version {version.version}</span>
                <span className={`status-badge ${version.status}`}>
                  {version.status}
                </span>
                <span>{new Date(version.updatedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show Form in Draft Mode */}
      {currentStatus === 'draft' && (
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Borrower Information</h3>
            
            <div className="form-field">
              <label className="required">Borrower Entity</label>
              <select
                value={formData.borrowerEntity}
                onChange={(e) => handleInputChange('borrowerEntity', e.target.value)}
              >
                <option value="">Select Your Entity</option>
                <option value="borrower1">ABC Corporation</option>
                <option value="borrower2">XYZ Holdings</option>
                <option value="borrower3">DEF Industries</option>
              </select>
              {errors.borrowerEntity && <div className="error-message">{errors.borrowerEntity}</div>}
            </div>
          </div>

          <div className="form-section">
            <h3>Requested Terms</h3>
            
            <div className="form-row">
              <div className="form-field">
                <label className="required">Requested Commitment Amount (USD)</label>
                <input
                  type="number"
                  value={formData.requestedCommitment}
                  onChange={(e) => handleInputChange('requestedCommitment', e.target.value)}
                  placeholder="100,000,000"
                  min="0"
                  step="1000000"
                />
                {errors.requestedCommitment && <div className="error-message">{errors.requestedCommitment}</div>}
              </div>
              <div className="form-field">
                <label className="required">Requested Advance Rate (%)</label>
                <input
                type="number"
                  step="0.01"
                  value={formData.requestedAdvanceRate}
                  onChange={(e) => handleInputChange('requestedAdvanceRate', e.target.value)}
                  placeholder="85.00"
                  min="0"
                  max="100"
                />
                {errors.requestedAdvanceRate && <div className="error-message">{errors.requestedAdvanceRate}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="required">Requested Margin (bps)</label>
                <input
                type="number"
                  value={formData.requestedMargin}
                  onChange={(e) => handleInputChange('requestedMargin', e.target.value)}
                  placeholder="350"
                  min="0"
                  max="1000"
                />
                {errors.requestedMargin && <div className="error-message">{errors.requestedMargin}</div>}
              </div>
              <div className="form-field">
                <label className="required">Requested Pricing Index</label>
                <select
                  value={formData.requestedPricingIndex}
                  onChange={(e) => handleInputChange('requestedPricingIndex', e.target.value)}
                >
                  <option value="">Select Index</option>
                  <option value="SOFR 1M">SOFR 1M</option>
                  <option value="SOFR Daily">SOFR Daily</option>
                  <option value="Prime">Prime</option>
                  <option value="Fixed">Fixed</option>
                </select>
                {errors.requestedPricingIndex && <div className="error-message">{errors.requestedPricingIndex}</div>}
              </div>
            </div>

            {formData.requestedPricingIndex === 'Fixed' && (
              <div className="form-field">
                <label className="required">Requested Fixed Rate (%)</label>
                <input
                type="number"
                  step="0.01"
                  value={formData.requestedFixedRate}
                  onChange={(e) => handleInputChange('requestedFixedRate', e.target.value)}
                  placeholder="5.25"
                  min="0"
                  max="100"
                />
                {errors.requestedFixedRate && <div className="error-message">{errors.requestedFixedRate}</div>}
              </div>
            )}

            <div className="form-row">
              <div className="form-field">
                <label className="required">Requested Maturity Date</label>
                <input
                  type="date"
                  value={formData.requestedMaturityDate}
                  onChange={(e) => handleInputChange('requestedMaturityDate', e.target.value)}
                  min={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  title="Typically 12-24 months"
                />
                {errors.requestedMaturityDate && <div className="error-message">{errors.requestedMaturityDate}</div>}
              </div>
              <div className="form-field">
                <label className="required">Requested Draw Frequency</label>
                <select
                  value={formData.requestedDrawFrequency}
                  onChange={(e) => handleInputChange('requestedDrawFrequency', e.target.value)}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Unlimited">Unlimited</option>
                </select>
                {errors.requestedDrawFrequency && <div className="error-message">{errors.requestedDrawFrequency}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="required">Covenant Template</label>
                <select
                  value={formData.covenantTemplate}
                  onChange={(e) => handleInputChange('covenantTemplate', e.target.value)}
                >
                  <option value="">Select Template</option>
                  <option value="Standard">Standard</option>
                  <option value="Custom">Custom</option>
                </select>
                {errors.covenantTemplate && <div className="error-message">{errors.covenantTemplate}</div>}
              </div>
              <div className="form-field">
                <label className="required">Collateral Profile</label>
                <textarea
                  value={formData.collateralProfile}
                  onChange={(e) => handleInputChange('collateralProfile', e.target.value)}
                  placeholder="Describe your collateral profile (e.g., Residential Mortgages, Commercial RE, etc.)"
                  rows="3"
                />
                {errors.collateralProfile && <div className="error-message">{errors.collateralProfile}</div>}
              </div>
            </div>

            {formData.covenantTemplate === 'Custom' && (
              <div className="form-field">
                <label className="required">Custom Covenant Upload</label>
                <div className="file-upload">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => handleFileChange('customCovenantFile', e)}
                  />
                  <div>
                    <p>Click to upload or drag and drop</p>
                    <p>Excel files only (.xlsx, .xls)</p>
                    {formData.customCovenantFile && (
                      <p>Selected: {formData.customCovenantFile.name}</p>
                    )}
                  </div>
                </div>
                {errors.customCovenantFile && <div className="error-message">{errors.customCovenantFile}</div>}
              </div>
            )}
          </div>

          <div className="form-section">
            <h3>Supporting Documentation</h3>
            
            <div className="form-field">
              <label className="required">Financial Statements</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf,.xlsx,.xls"
                  onChange={(e) => handleFileChange('financialsFile', e)}
                />
                <div>
                  <p>Click to upload or drag and drop</p>
                  <p>PDF, Excel files (.pdf, .xlsx, .xls)</p>
                  {formData.financialsFile && (
                    <p>Selected: {formData.financialsFile.name}</p>
                  )}
                </div>
              </div>
              {errors.financialsFile && <div className="error-message">{errors.financialsFile}</div>}
            </div>

            <div className="form-field">
              <label className="required">KYC Documentation</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange('kycFile', e)}
                />
                <div>
                  <p>Click to upload or drag and drop</p>
                  <p>PDF files only (.pdf)</p>
                  {formData.kycFile && (
                    <p>Selected: {formData.kycFile.name}</p>
                  )}
                </div>
              </div>
              {errors.kycFile && <div className="error-message">{errors.kycFile}</div>}
            </div>

            <div className="form-field">
              <label>Collateral Sample Data (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept=".csv,.xlsx,.json"
                  onChange={(e) => handleFileChange('collateralFile', e)}
                />
                <div>
                  <p>Click to upload or drag and drop</p>
                  <p>CSV, Excel, JSON files</p>
                  <p><em>Optional: Sample collateral data for review</em></p>
                  {formData.collateralFile && (
                    <p>Selected: {formData.collateralFile.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-field">
            <label>Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any additional information or special requests..."
              rows="4"
              maxLength="1000"
            />
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
              {isSubmitting ? 'Submitting...' : 'Submit Term Sheet Application'}
            </button>
          </div>
        </form>
      )}

      {/* Show PDF Preview in Pending Review Mode */}
      {currentStatus !== 'draft' && (
        <div className="pdf-preview-section">
          <h3>📄 Term Sheet PDF Preview</h3>
          
          {pdfLoading && (
            <div className="pdf-loading">
              <div className="loading-spinner"></div>
              <p>Generating PDF preview...</p>
            </div>
          )}

          {pdfUrl && !pdfLoading && (
            <div className="pdf-viewer">
              <div className="pdf-controls">
                <button 
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber <= 1}
                  className="btn btn-secondary btn-sm"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {pageNumber} of {numPages}
                </span>
                <button 
                  onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
                  disabled={pageNumber >= numPages}
                  className="btn btn-secondary btn-sm"
                >
                  Next
                </button>
              </div>

              <div className="pdf-container">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) => {
                    console.error('PDF load error:', error);
                    setPdfLoading(false);
                  }}
                >
                  <Page 
                  
                    pageNumber={pageNumber} 
                    width={600}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>

              <div className="pdf-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = pdfUrl;
                    link.download = `term-sheet-${formData.termSheetId}.pdf`;
                    link.click();
                  }}
                >
                  📥 Download PDF
                </button>
                {currentStatus === 'pending' && !isSigned && (
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={handleESignature}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing...' : '✍️ E-Sign Term Sheet'}
                  </button>
                )}
                {isSigned && (
                  <div className="signed-status">
                    ✅ Term Sheet Signed
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BorrowerTermSheet; 