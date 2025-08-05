import { ethers } from 'ethers';

// Mock contract ABI - replace with actual contract ABI
const CFMC_ABI = [
  "function createCFMC(address borrowerAddr, uint256 commitment, uint256 advanceRate, uint256 margin, string memory pricingIndex, uint256 maturity, uint256 drawLimit, string memory ipfsHash) external returns (uint256)",
  "function getCFMCStatus(uint256 cfmcId) external view returns (uint8)",
  "event CFMCCreated(uint256 indexed cfmcId, address indexed borrower, uint256 commitment)"
];

export class ContractInterface {
  constructor(provider, contractAddress) {
    this.provider = provider;
    this.contract = new ethers.Contract(contractAddress, CFMC_ABI, provider);
  }

  async createCFMC(termSheetData) {
    try {
      const signer = this.provider.getSigner();
      const contractWithSigner = this.contract.connect(signer);
      
      // Convert values to proper format for ethers v6
      const commitmentWei = ethers.parseEther(termSheetData.commitment.toString());
      const advanceRateBps = ethers.toBigInt(termSheetData.advanceRate * 100); // Convert to basis points
      const marginBps = ethers.toBigInt(termSheetData.margin);
      const maturityTimestamp = ethers.toBigInt(Math.floor(new Date(termSheetData.maturity).getTime() / 1000));
      const drawLimitWei = ethers.parseEther(termSheetData.drawLimit.toString());
      
      const tx = await contractWithSigner.createCFMC(
        termSheetData.borrowerAddr,
        commitmentWei,
        advanceRateBps,
        marginBps,
        termSheetData.pricingIndex,
        maturityTimestamp,
        drawLimitWei,
        termSheetData.ipfsHash
      );

      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      console.error('Error creating CFMC:', error);
      throw error;
    }
  }

  async uploadToIPFS(file) {
    // Mock IPFS upload - replace with actual IPFS implementation
    const mockCID = `Qm${Math.random().toString(36).substring(2)}`;
    return mockCID;
  }

  // Helper method to format ether values
  formatEther(value) {
    return ethers.formatEther(value);
  }

  // Helper method to parse ether values
  parseEther(value) {
    return ethers.parseEther(value);
  }
}

// Export a default instance for easy use
export default ContractInterface; 