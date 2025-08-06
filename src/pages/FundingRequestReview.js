import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Alert
} from '@mui/material';
import { 
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const FundingRequestReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock funding request data
  const mockFundingRequests = {
    'FR-2024-001': {
      id: 'FR-2024-001',
      masterCommitmentId: 'MC-2024-001',
      borrowerName: 'ABC Corporation',
      drawAmount: 5000000,
      fundingDate: '2024-02-15',
      purposeOfFunds: 'Working Capital',
      drawCurrency: 'USD',
      status: 'Pending Review',
      submittedDate: '2024-02-10',
      notes: 'Funding request for Q1 working capital needs',
      collateralFile: 'collateral_data.csv',
      estimatedCollateralValue: 7500000,
      availableCapacity: 8000000,
      borrowingBase: 10000000,
      advanceRate: '80%'
    }
  };

  const [fundingRequest, setFundingRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const request = mockFundingRequests[id];
    if (request) {
      setFundingRequest(request);
    }
  }, [id]);

  const handleApprove = async () => {
    setIsSubmitting(true);
    console.log('Approving funding request:', fundingRequest.id);
    
    // Simulate API call
    setTimeout(() => {
      alert('Funding request approved successfully!');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleReject = async () => {
    setIsSubmitting(true);
    console.log('Rejecting funding request:', fundingRequest.id);
    
    // Simulate API call
    setTimeout(() => {
      alert('Funding request rejected.');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleRequestChanges = async () => {
    setIsSubmitting(true);
    console.log('Requesting changes for funding request:', fundingRequest.id);
    
    // Simulate API call
    setTimeout(() => {
      alert('Changes requested. Borrower will be notified.');
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 2000);
  };

  if (!fundingRequest) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5">Funding Request Not Found</Typography>
        <Button onClick={() => navigate('/dashboard')} style={{ marginTop: '20px' }}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Review Funding Request</Typography>
        <Chip 
          label={fundingRequest.status} 
          color={fundingRequest.status === 'Pending Review' ? 'warning' : 'default'}
        />
      </Box>

      <Alert severity="info" style={{ marginBottom: '20px' }}>
        <strong>Task:</strong> Review Funding Request {fundingRequest.id}
        <br />
        <strong>Borrower:</strong> {fundingRequest.borrowerName}
        <br />
        <strong>Submitted:</strong> {fundingRequest.submittedDate}
      </Alert>

      <Box display="flex" gap={2} mb={3}>
        <Card style={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Request Details</Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell><strong>Funding Request ID:</strong></TableCell>
                  <TableCell>{fundingRequest.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Master Commitment ID:</strong></TableCell>
                  <TableCell>{fundingRequest.masterCommitmentId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Draw Amount:</strong></TableCell>
                  <TableCell>${fundingRequest.drawAmount.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Funding Date:</strong></TableCell>
                  <TableCell>{fundingRequest.fundingDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Purpose:</strong></TableCell>
                  <TableCell>{fundingRequest.purposeOfFunds}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Currency:</strong></TableCell>
                  <TableCell>{fundingRequest.drawCurrency}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card style={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Facility Information</Typography>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell><strong>Available Capacity:</strong></TableCell>
                  <TableCell>${fundingRequest.availableCapacity.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Borrowing Base:</strong></TableCell>
                  <TableCell>${fundingRequest.borrowingBase.toLocaleString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Advance Rate:</strong></TableCell>
                  <TableCell>{fundingRequest.advanceRate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Collateral Value:</strong></TableCell>
                  <TableCell>${fundingRequest.estimatedCollateralValue.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Box>

      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Additional Information</Typography>
          <Typography variant="body2" paragraph>
            <strong>Notes:</strong> {fundingRequest.notes}
          </Typography>
          <Typography variant="body2">
            <strong>Collateral File:</strong> {fundingRequest.collateralFile}
            <Button 
              startIcon={<DownloadIcon />} 
              size="small" 
              style={{ marginLeft: '10px' }}
            >
              Download
            </Button>
          </Typography>
        </CardContent>
      </Card>

      <Divider style={{ margin: '20px 0' }} />

      <Box display="flex" gap={2} justifyContent="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<ApproveIcon />}
          onClick={handleApprove}
          disabled={isSubmitting}
          size="large"
        >
          {isSubmitting ? 'Processing...' : 'Approve Request'}
        </Button>
        
        <Button
          variant="outlined"
          color="warning"
          startIcon={<EditIcon />}
          onClick={handleRequestChanges}
          disabled={isSubmitting}
          size="large"
        >
          {isSubmitting ? 'Processing...' : 'Request Changes'}
        </Button>
        
        <Button
          variant="contained"
          color="error"
          startIcon={<RejectIcon />}
          onClick={handleReject}
          disabled={isSubmitting}
          size="large"
        >
          {isSubmitting ? 'Processing...' : 'Reject Request'}
        </Button>
      </Box>
    </div>
  );
};

export default FundingRequestReview; 