import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Button, 
  Paper, 
  Typography, 
  Box,
  Chip,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';
import { 
  Add as PlusIcon,
  GetApp as FundingIcon,
  Visibility as ViewIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { Modal, Form, Input, Select, DatePicker, Upload, message, InputNumber } from 'antd';
import { UploadOutlined, CalculatorOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const creditFacilities = [
  {
    id: 'CF001',
    facilityName: 'Facility A',
    stage: 'Term Sheet',
    status: 'Awaiting FA Approval',
    advanceRate: '80%',
    borrowingBase: '$10M',
    availableLimit: '$8M',
    lastActionDate: '2025-08-01'
  },
  {
    id: 'CF002',
    facilityName: 'Facility B',
    stage: 'Master Commit',
    status: 'Pending Lender Commitment',
    advanceRate: '75%',
    borrowingBase: '$12M',
    availableLimit: '$9M',
    lastActionDate: '2025-07-25'
  },
  {
    id: 'CF003',
    facilityName: 'Facility C',
    stage: 'Funding',
    status: 'Funded',
    advanceRate: '70%',
    borrowingBase: '$15M',
    availableLimit: '$0M',
    lastActionDate: '2025-08-03'
  },
  {
    id: 'CF003',
    facilityName: 'Facility C',
    stage: 'Funding',
    status: 'Acitve',
    advanceRate: '70%',
    borrowingBase: '$15M',
    availableLimit: '$8M',
    lastActionDate: '2025-08-03'
  }
];

const BorrowerDashboard = () => {
  // Add back the missing state variables
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    borrowerEntity: '',
    requestedCommitment: '',
    requestedAdvanceRate: '',
    requestedMargin: '350',
    requestedPricingIndex: '',
    requestedFixedRate: '',
    requestedMaturityDate: '',
    requestedDrawFrequency: '',
    covenantTemplate: '',
    customCovenantFile: null,
    collateralProfile: '',
    collateralFile: null,
    financialsFile: null,
    kycFile: null
  });

  // Add these new states for Funding Request modal
  const [isFundingModalVisible, setIsFundingModalVisible] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // Funding Request form data (from FundingRequest.js)
  const [fundingData, setFundingData] = useState({
    masterCommitmentId: '',
    fundingRequestId: '',
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

  // Add back the missing functions for term sheet modal
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      console.log('Term Sheet submitted:', values);
      message.success('Term Sheet submitted successfully!');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit term sheet');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Add this new function for Funding Request
  const handleFundingRequest = (facility) => {
    setSelectedFacility(facility);
    setFundingData({
      masterCommitmentId: facility.id,
      fundingRequestId: `FR-${Date.now()}`,
      drawAmount: '',
      fundingDate: '',
      purposeOfFunds: '',
      purposeOther: '',
      collateralFile: null,
      estimatedCollateralValue: '',
      drawCurrency: 'USD',
      notes: ''
    });
    setIsFundingModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    setFundingData(prev => ({
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
    setFundingData(prev => ({
      ...prev,
      collateralFile: file
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fundingData.drawAmount || parseFloat(fundingData.drawAmount) <= 0) {
      newErrors.drawAmount = 'Draw amount must be greater than 0';
    }
    if (!fundingData.fundingDate) {
      newErrors.fundingDate = 'Funding date is required';
    }
    if (!fundingData.purposeOfFunds) {
      newErrors.purposeOfFunds = 'Purpose of funds is required';
    }
    if (fundingData.purposeOfFunds === 'Other' && !fundingData.purposeOther.trim()) {
      newErrors.purposeOther = 'Please specify the purpose';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFundingSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Funding Request submitted:', fundingData);
      
      // Simulate API call
      setTimeout(() => {
        message.success('Funding Request submitted successfully! Facility Agent will review your request.');
        setIsSubmitting(false);
        setIsFundingModalVisible(false);
      }, 2000);
    }
  };

  const handleFundingCancel = () => {
    setIsFundingModalVisible(false);
    setFundingData({
      masterCommitmentId: '',
      fundingRequestId: '',
      drawAmount: '',
      fundingDate: '',
      purposeOfFunds: '',
      purposeOther: '',
      collateralFile: null,
      estimatedCollateralValue: '',
      drawCurrency: 'USD',
      notes: ''
    });
    setErrors({});
  };

  const handleViewDetails = (facilityId) => {
    console.log(`Viewing details for facility ${facilityId}`);
    // window.location.href = `/facility-details/${facilityId}`;
    alert(`Viewing details for facility ${facilityId}`);
  };

  const handleEditTermSheet = (facilityId) => {
    console.log(`Editing term sheet for facility ${facilityId}`);
    // window.location.href = `/term-sheet/${facilityId}`;
    alert(`Editing term sheet for facility ${facilityId}`);
  };

  // Modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(prev => ({ ...prev, ...allValues }));
    console.log('Pricing Index changed:', allValues.requestedPricingIndex); // Debug
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'Awaiting FA Approval':
        return (
          <Chip
            label="Awaiting FA Approval"
            color="warning"
            size="small"
            variant="filled"
          />
        );
      case 'Pending Lender Commitment':
        return (
          <Chip
            label="Pending Lender Commitment"
            color="info"
            size="small"
            variant="filled"
          />
        );
      case 'Funded':
        return (
          <Chip
            label="Funded"
            color="success"
            size="small"
            variant="filled"
          />
        );
      default:
        return (
          <Chip
            label={status}
            color="default"
            size="small"
            variant="outlined"
          />
        );
    }
  };

  const getStageChip = (stage) => {
    switch (stage) {
      case 'Term Sheet':
        return (
          <Chip
            label="Term Sheet"
            color="primary"
            size="small"
            variant="outlined"
          />
        );
      case 'Master Commit':
        return (
          <Chip
            label="Master Commit"
            color="secondary"
            size="small"
            variant="outlined"
          />
        );
      case 'Funding':
        return (
          <Chip
            label="Funding"
            color="success"
            size="small"
            variant="outlined"
          />
        );
      default:
        return (
          <Chip
            label={stage}
            color="default"
            size="small"
            variant="outlined"
          />
        );
    }
  };

  const getActionButton = (facility) => {
    if (facility.stage === 'Funding' && parseFloat(facility.availableLimit.replace(/[$,]/g, '')) > 0) {
      return (
        <Button
          variant="contained"
          color="primary"
          startIcon={<FundingIcon />}
          onClick={() => handleFundingRequest(facility)}
          size="small"
        >
          Funding Request
        </Button>
      );
    }
    
    switch (facility.stage) {
      case 'Term Sheet':
        return (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={() => handleEditTermSheet(facility.id)}
            size="small"
          >
            Edit Term Sheet
          </Button>
        );
      case 'Master Commit':
        return (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ViewIcon />}
            onClick={() => handleViewDetails(facility.id)}
            size="small"
          >
            View Details
          </Button>
        );
      case 'Funding':
        return (
          <Tooltip title="No available limit for funding requests">
            <span>
              <Button
                variant="outlined"
                color="disabled"
                startIcon={<ViewIcon />}
                onClick={() => handleViewDetails(facility.id)}
                size="small"
                disabled
              >
                View Details
              </Button>
            </span>
          </Tooltip>
        );
      default:
        return (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ViewIcon />}
            onClick={() => handleViewDetails(facility.id)}
            size="small"
          >
            View Details
          </Button>
        );
    }
  };

  const isFundingEligible = (facility) => {
    return facility.stage === 'Funding' && parseFloat(facility.availableLimit.replace(/[$,]/g, '')) > 0;
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 3 
      }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Credit Facilities Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<PlusIcon />}
          onClick={showModal}
        >
          New Term Sheet
        </Button>
      </Box>


      {/* Table Card */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent sx={{ padding: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Facility ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Facility Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Stage</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Advance Rate</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Borrowing Base</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Available Limit</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Last Action</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditFacilities.map((facility) => (
                <TableRow 
                  key={facility.id}
                  sx={{
                    backgroundColor: isFundingEligible(facility) ? '#f8fff8' : 'inherit',
                    '&:hover': {
                      backgroundColor: isFundingEligible(facility) ? '#f0fff0' : '#f5f5f5'
                    }
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                      {facility.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {facility.facilityName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getStageChip(facility.stage)}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(facility.status)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {facility.advanceRate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {facility.borrowingBase}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant="body2" 
                      fontWeight="bold"
                      color={facility.availableLimit === '$0M' ? 'text.secondary' : 'success.main'}
                    >
                      {facility.availableLimit}
                      {isFundingEligible(facility) && (
                        <Typography variant="caption" display="block" color="success.main">
                          Available for Funding
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {facility.lastActionDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {getActionButton(facility)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ant Design Modal for Term Sheet Creation - Matching BorrowerTermSheet */}
      <Modal
        title="Create New Term Sheet"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          onValuesChange={handleFormChange}
          initialValues={formData}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Basic Information */}
            <Form.Item
              name="borrowerEntity"
              label="Borrower Entity"
              rules={[{ required: true, message: 'Please select borrower entity' }]}
            >
              <Select placeholder="Select Borrower">
                <Option value="borrower1">ABC Corporation</Option>
                <Option value="borrower2">XYZ Holdings</Option>
                <Option value="borrower3">DEF Industries</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="requestedCommitment"
              label="Requested Commitment Amount"
              rules={[{ required: true, message: 'Please enter commitment amount' }]}
            >
              <Input placeholder="100,000,000" addonBefore="$" />
            </Form.Item>

            <Form.Item
              name="requestedAdvanceRate"
              label="Requested Advance Rate"
              rules={[{ required: true, message: 'Please enter advance rate' }]}
            >
              <Input placeholder="85.00" addonAfter="%" />
            </Form.Item>

            <Form.Item
              name="requestedMargin"
              label="Requested Margin"
              rules={[{ required: true, message: 'Please enter margin' }]}
            >
              <Input placeholder="350" addonAfter="bps" />
            </Form.Item>

            <Form.Item
              name="requestedPricingIndex"
              label="Requested Pricing Index"
              rules={[{ required: true, message: 'Please select pricing index!' }]}
            >
              <Select placeholder="Select pricing index">
                <Option value="SOFR 1M">SOFR 1M</Option>
                <Option value="SOFR 3M">SOFR 3M</Option>
                <Option value="Fixed">Fixed</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="requestedFixedRate"
              label="Requested Fixed Rate"
              rules={[
                { 
                  required: formData.requestedPricingIndex === 'Fixed', 
                  message: 'Fixed rate is required when pricing index is Fixed!' 
                }
              ]}
            >
              <Input 
                placeholder="Enter fixed rate" 
                disabled={formData.requestedPricingIndex !== 'Fixed'}
                suffix="%"
              />
            </Form.Item>

            <Form.Item
              name="requestedMaturityDate"
              label="Requested Maturity Date"
              rules={[{ required: true, message: 'Please select maturity date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="requestedDrawFrequency"
              label="Requested Draw Frequency"
              rules={[{ required: true, message: 'Please select draw frequency' }]}
            >
              <Select placeholder="Select Frequency">
                <Option value="Daily">Daily</Option>
                <Option value="Weekly">Weekly</Option>
                <Option value="Monthly">Monthly</Option>
                <Option value="Unlimited">Unlimited</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="covenantTemplate"
              label="Covenant Template"
              rules={[{ required: true, message: 'Please select covenant template' }]}
            >
              <Select placeholder="Select Template">
                <Option value="Standard">Standard</Option>
                <Option value="Custom">Custom</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="collateralProfile"
              label="Collateral Profile"
              rules={[{ required: true, message: 'Please enter collateral profile' }]}
            >
              <Input placeholder="Residential Mortgages, Commercial RE" />
            </Form.Item>
          </div>

          {/* File Uploads */}
          <Form.Item
            name="financialsFile"
            label="Financial Statements"
            rules={[{ required: true, message: 'Please upload financial statements' }]}
          >
            <Upload
              listType="text"
              maxCount={1}
              beforeUpload={() => false}
              accept=".pdf,.doc,.docx"
            >
              <Button icon={<UploadOutlined />}>Upload Financial Statements</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="kycFile"
            label="KYC Documents"
            rules={[{ required: true, message: 'Please upload KYC documents' }]}
          >
            <Upload
              listType="text"
              maxCount={1}
              beforeUpload={() => false}
              accept=".pdf,.doc,.docx"
            >
              <Button icon={<UploadOutlined />}>Upload KYC Documents</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="collateralFile"
            label="Collateral Data"
            rules={[{ required: true, message: 'Please upload collateral data' }]}
          >
            <Upload
              listType="text"
              maxCount={1}
              beforeUpload={() => false}
              accept=".xlsx,.xls,.csv"
            >
              <Button icon={<UploadOutlined />}>Upload Collateral Data</Button>
            </Upload>
          </Form.Item>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit Term Sheet Application
            </Button>
          </div>
        </Form>
      </Modal>
      
      {/* Funding Request Modal - Using FundingRequest.js code */}
      <Modal
        title="Funding Request"
        open={isFundingModalVisible}
        onCancel={handleFundingCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <div className="">
          <div className="form-header">
            <h3>Submit a funding request against your approved Master Commitment.</h3>
          </div>

          <form onSubmit={handleFundingSubmit}>
            <div className="form-section">
              <h4>Request Information</h4>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label>Master Commitment ID</label>
                  <input
                    type="text"
                    value={fundingData.masterCommitmentId}
                    readOnly
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Funding Request ID</label>
                  <input
                    type="text"
                    value={fundingData.fundingRequestId}
                    readOnly
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: 'red' }}>*</label>
                  <label>Draw Amount (USD)</label>
                  <input
                    type="number"
                    value={fundingData.drawAmount}
                    onChange={(e) => handleInputChange('drawAmount', e.target.value)}
                    placeholder="5,000,000"
                    min="0"
                    step="1000"
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px' }}
                  />
                  {errors.drawAmount && <div style={{ color: 'red', fontSize: '12px' }}>{errors.drawAmount}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ color: 'red' }}>*</label>
                  <label>Funding Date</label>
                  <input
                    type="date"
                    value={fundingData.fundingDate}
                    onChange={(e) => handleInputChange('fundingDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    title="T+0 to T+5 business days"
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px' }}
                  />
                  {errors.fundingDate && <div style={{ color: 'red', fontSize: '12px' }}>{errors.fundingDate}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: 'red' }}>*</label>
                  <label>Purpose of Funds</label>
                  <select
                    value={fundingData.purposeOfFunds}
                    onChange={(e) => handleInputChange('purposeOfFunds', e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px' }}
                  >
                    <option value="">Select Purpose</option>
                    <option value="Working Capital">Working Capital</option>
                    <option value="Origination Funding">Origination Funding</option>
                    <option value="Re-advance">Re-advance</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.purposeOfFunds && <div style={{ color: 'red', fontSize: '12px' }}>{errors.purposeOfFunds}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Draw Currency</label>
                  <select
                    value={fundingData.drawCurrency}
                    onChange={(e) => handleInputChange('drawCurrency', e.target.value)}
                    disabled
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
                  >
                    <option value="USD">USD</option>
                    <option value="USDC">USDC</option>
                  </select>
                </div>
              </div>

              {fundingData.purposeOfFunds === 'Other' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ color: 'red' }}>*</label>
                  <label>Specify Purpose</label>
                  <textarea
                    value={fundingData.purposeOther}
                    onChange={(e) => handleInputChange('purposeOther', e.target.value)}
                    placeholder="Please describe the purpose of funds..."
                    rows="3"
                    maxLength="250"
                    style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px' }}
                  />
                  {errors.purposeOther && <div style={{ color: 'red', fontSize: '12px' }}>{errors.purposeOther}</div>}
                </div>
              )}
            </div>

            <div className="form-section">
              <h4>Collateral Information</h4>
              
              <div style={{ marginBottom: '16px' }}>
                <label>Collateral Addendum Upload</label>
                <div style={{ border: '2px dashed #d9d9d9', padding: '20px', textAlign: 'center', borderRadius: '6px' }}>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileChange}
                    style={{ marginBottom: '10px' }}
                  />
                  <div>
                    <p>Click to upload or drag and drop</p>
                    <p>CSV, Excel, JSON files</p>
                    <p><em>Optional: Add loans to secure this draw</em></p>
                    {fundingData.collateralFile && (
                      <p>Selected: {fundingData.collateralFile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>Estimated Collateral Value</label>
                <input
                  type="text"
                  value={fundingData.estimatedCollateralValue || 'Calculating...'}
                  readOnly
                  style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px', backgroundColor: '#f5f5f5' }}
                />
                <small>Auto-calculated based on uploaded collateral and eligibility rules</small>
              </div>
            </div>

            <div className="form-section">
              <h4>Additional Information</h4>
              
              <div style={{ marginBottom: '16px' }}>
                <label>Notes / Internal Reference</label>
                <textarea
                  value={fundingData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional information or internal reference..."
                  rows="4"
                  maxLength="500"
                  style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '6px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '20px' }}>
              <Button onClick={handleFundingCancel}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Funding Request'}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </Box>
  );
};

export default BorrowerDashboard;
