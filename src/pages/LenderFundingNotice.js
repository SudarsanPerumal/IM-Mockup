import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Chip } from "@mui/material";

export default function LenderFundingNoticeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Mock API call simulation
  useEffect(() => {
    // Simulated fetch delay
    setTimeout(() => {
      const mockData = {
        id,
        dealName: "ABC Credit Facility",
        amount: 5000000,
        dueDate: "2025-08-07",
        bankDetails: "Bank of America, Account: 123456789, IFSC: BOFA000123",
        borrower: "XYZ Corp",
        status: "Notice Issued",
        wireInstructions: {
          bankName: "Bank of America",
          accountNumber: "123456789",
          routingNumber: "021000021",
          swiftCode: "BOFAUS3N",
          reference: `FN-${id}-ABC-Corp`
        }
      };
      setNotice(mockData);
    }, 500);
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Notice Issued":
        return "warning";
      case "Funds Confirmed":
        return "info";
      case "Treasury Verified":
        return "success";
      case "Completed":
        return "success";
      default:
        return "default";
    }
  };

  const handleConfirmWire = async () => {
    setIsConfirming(true);
    
    // Simulate API call to update status
    setTimeout(() => {
      setNotice(prev => ({
        ...prev,
        status: "Funds Confirmed"
      }));
      
      console.log("Confirmed wire for:", notice);
      alert("Funds confirmed as wired. Treasury Operations will verify the transfer.");
      setIsConfirming(false);
      
      // Simulate Treasury verification after 3 seconds
      setTimeout(() => {
        setNotice(prev => ({
          ...prev,
          status: "Treasury Verified"
        }));
        alert("Treasury Operations has verified your wire transfer. Funding is complete!");
      }, 3000);
      
    }, 2000);
  };

  if (!notice) return <Typography>Loading...</Typography>;

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: "0 auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Funding Notice Details
      </Typography>
      
      {/* Status Display */}
      <div style={{ marginBottom: "20px" }}>
        <Chip 
          label={notice.status} 
          color={getStatusColor(notice.status)}
          size="large"
        />
      </div>

      {/* Basic Details */}
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>Deal Information</Typography>
        <Typography><strong>Funding Notice ID:</strong> {notice.id}</Typography>
        <Typography><strong>Deal Name:</strong> {notice.dealName}</Typography>
        <Typography><strong>Borrower:</strong> {notice.borrower}</Typography>
        <Typography><strong>Amount:</strong> ${notice.amount.toLocaleString()}</Typography>
        <Typography><strong>Due Date:</strong> {notice.dueDate}</Typography>
      </div>

      {/* Wire Instructions */}
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>Wire Transfer Instructions</Typography>
        <Typography><strong>Bank Name:</strong> {notice.wireInstructions.bankName}</Typography>
        <Typography><strong>Account Number:</strong> {notice.wireInstructions.accountNumber}</Typography>
        <Typography><strong>Routing Number:</strong> {notice.wireInstructions.routingNumber}</Typography>
        <Typography><strong>SWIFT Code:</strong> {notice.wireInstructions.swiftCode}</Typography>
        <Typography><strong>Reference:</strong> {notice.wireInstructions.reference}</Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: "10px" }}>
          <strong>Important:</strong> Please include the reference code in your wire transfer to ensure proper allocation.
        </Typography>
      </div>

      {/* Status Flow */}
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="h6" gutterBottom>Funding Status</Typography>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Chip 
            label="Notice Issued" 
            color={notice.status === "Notice Issued" ? "warning" : "default"}
            variant={notice.status === "Notice Issued" ? "filled" : "outlined"}
          />
          <Chip 
            label="Funds Confirmed" 
            color={notice.status === "Funds Confirmed" ? "info" : "default"}
            variant={notice.status === "Funds Confirmed" ? "filled" : "outlined"}
          />
          <Chip 
            label="Treasury Verified" 
            color={notice.status === "Treasury Verified" ? "success" : "default"}
            variant={notice.status === "Treasury Verified" ? "filled" : "outlined"}
          />
          <Chip 
            label="Completed" 
            color={notice.status === "Completed" ? "success" : "default"}
            variant={notice.status === "Completed" ? "filled" : "outlined"}
          />
        </div>
      </div>

      {/* Action Button */}
      {notice.status === "Notice Issued" && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmWire}
          disabled={isConfirming}
          sx={{ mt: 3 }}
        >
          {isConfirming ? "Confirming..." : "Confirm Funds Sent"}
        </Button>
      )}

      {notice.status === "Funds Confirmed" && (
        <Typography variant="body2" color="info.main" sx={{ mt: 2 }}>
          ✅ Funds confirmed. Waiting for Treasury verification...
        </Typography>
      )}

      {notice.status === "Treasury Verified" && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          ✅ Treasury verification complete. Funding is successful!
        </Typography>
      )}

      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => navigate("/dashboard")}
        sx={{ mt: 3, ml: 2 }}
      >
        Back to Dashboard
      </Button>
    </Paper>
  );
} 