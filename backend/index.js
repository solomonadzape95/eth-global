// ---
// This is your ENTIRE backend server.
// Run: `node index.js`
// ---

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const lighthouse = require('@lighthouse-web3/sdk');
const abi = require('./IdentityRegistry.json').abi; // ABI from smart contract

// --- Environment Variables Check ---
// We need these keys to run.
const {
  BACKEND_WALLET_PRIVATE_KEY,
  BASE_SEPOLIA_RPC_URL,
  CONTRACT_ADDRESS,
  LIGHTHOUSE_API_KEY
} = process.env;

if (!BACKEND_WALLET_PRIVATE_KEY || !BASE_SEPOLIA_RPC_URL || !CONTRACT_ADDRESS || !LIGHTHOUSE_API_KEY) {
  console.error("FATAL ERROR: Missing environment variables.");
  console.log("Please set BACKEND_WALLET_PRIVATE_KEY, BASE_SEPOLIA_RPC_URL, CONTRACT_ADDRESS, and LIGHTHOUSE_API_KEY in your .env file.");
  process.exit(1);
}

// --- Ethers.js Setup ---
// We need two "connections" to the blockchain:
// 1. A "Provider" to read data (it's free, anyone can do it)
const readOnlyProvider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL);

// 2. A "Wallet" (Signer) to write data (this costs gas)
const backendWallet = new ethers.Wallet(BACKEND_WALLET_PRIVATE_KEY, readOnlyProvider);

// --- Contract Setup ---
// This is our connection to the deployed IdentityRegistry smart contract.
// We create one instance for reading and one for writing.
const readOnlyContract = new ethers.Contract(CONTRACT_ADDRESS, abi, readOnlyProvider);
const writeContract = new ethers.Contract(CONTRACT_ADDRESS, abi, backendWallet);

console.log(`Connected to IdentityRegistry contract at: ${CONTRACT_ADDRESS}`);


// --- Express Server Setup ---
const app = express();
app.use(cors()); // Allow requests from your frontend
app.use(express.json()); // Allow server to read JSON bodies

// ---
// HELPER FUNCTIONS FOR COMPOSITE DOCUMENT STRATEGY
// ---

// Fetch existing composite document from IPFS
async function fetchFromIPFS(cid) {
  try {
    const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
}

// Upload composite document to IPFS
async function uploadToIPFS(data, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const buffer = Buffer.from(JSON.stringify(data));
      const response = await lighthouse.uploadBuffer(buffer, LIGHTHOUSE_API_KEY);
      return response.data.Hash;
    } catch (error) {
      console.warn(`IPFS upload attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Get existing attestation CID for a user
async function getExistingAttestation(walletAddress) {
  try {
    const verificationTypes = await readOnlyContract.getUserVerificationTypes(walletAddress);
    if (verificationTypes.length === 0) return null;
    
    // Get the latest verification type's CID
    const latestType = verificationTypes[verificationTypes.length - 1];
    return await readOnlyContract.getUserAttestation(walletAddress, latestType);
  } catch (error) {
    console.error('Error getting existing attestation:', error);
    return null;
  }
}

// Simulate verification based on type
async function simulateVerification(verificationType) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
  
  const baseData = {
    status: "Verified",
    verified_at: new Date().toISOString()
  };
  
  switch (verificationType) {
    case 'identity-verification':
      return {
        ...baseData,
        is_over_18: true,
        country: "US",
        document_type: "passport"
      };
    case 'student':
      return {
        ...baseData,
        university: "MIT",
        student_id: "12345",
        graduation_year: "2025"
      };
    case 'proof-of-address':
      return {
        ...baseData,
        address: "123 Main St, Boston, MA",
        document_type: "utility_bill"
      };
    case 'selfie':
      return {
        ...baseData,
        biometric_verified: true,
        liveness_score: 0.95
      };
    case 'employment':
      return {
        ...baseData,
        company: "Tech Corp",
        position: "Software Engineer",
        salary_range: "100k-150k"
      };
    default:
      return baseData;
  }
}

// Add verification to composite document with enhanced error handling
async function addVerification(walletAddress, verificationType, verificationData) {
  try {
    // 1. Get existing composite document
    const existingCid = await getExistingAttestation(walletAddress);
    let existingData = {
      walletAddress: walletAddress,
      verifications: {},
      last_updated: new Date().toISOString()
    };
    
    if (existingCid) {
      try {
        existingData = await fetchFromIPFS(existingCid);
      } catch (error) {
        console.warn('Could not fetch existing data, creating new document:', error);
      }
    }
    
    // 2. Update composite document (we'll add txHash after blockchain transaction)
    existingData.verifications[verificationType] = verificationData;
    existingData.last_updated = new Date().toISOString();
    
    // 3. Upload initial composite document with retry logic
    let newCid;
    try {
      newCid = await uploadToIPFS(existingData);
    } catch (error) {
      throw new Error(`IPFS upload failed: ${error.message}`);
    }
    
    // 4. Update smart contract with gas estimation and timeout
    let tx, receipt;
    try {
      // Estimate gas first
      const gasEstimate = await writeContract.mintAttestation.estimateGas(walletAddress, verificationType, newCid);
      
      // Convert BigInt to Number for calculation, then back to BigInt
      const gasLimit = BigInt(Math.floor(Number(gasEstimate) * 1.2));
      
      // Send transaction with gas buffer
      tx = await writeContract.mintAttestation(walletAddress, verificationType, newCid, {
        gasLimit: gasLimit
      });
      
      // Wait for confirmation with timeout
      receipt = await Promise.race([
        tx.wait(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Transaction timeout')), 120000) // 2 minutes
        )
      ]);
      
    } catch (error) {
      if (error.message.includes('timeout')) {
        throw new Error('Blockchain transaction timeout. Please try again.');
      } else if (error.message.includes('gas')) {
        throw new Error('Insufficient gas for transaction. Please try again.');
      } else {
        throw new Error(`Blockchain transaction failed: ${error.message}`);
      }
    }
    
    // 5. Add transaction hash to verification data and re-upload to IPFS
    existingData.verifications[verificationType].baseTxHash = tx.hash;
    existingData.last_updated = new Date().toISOString();
    
    try {
      newCid = await uploadToIPFS(existingData);
    } catch (error) {
      console.warn('Failed to re-upload with txHash, but transaction was successful:', error);
    }
    
    return {
      cid: newCid,
      txHash: tx.hash,
      verificationData: verificationData
    };
  } catch (error) {
    console.error('Error adding verification:', error);
    throw error;
  }
}

// ---
// ENDPOINT 1: THE VERIFICATION FLOW (UPDATED)
// This is what your main frontend app will call.
// ---
app.post('/verify', async (req, res) => {
  try {
    const { walletAddress, verificationType = 'identity-verification' } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ error: 'walletAddress is required' });
    }

    console.log(`[1/4] Received verification request for: ${walletAddress}, type: ${verificationType}`);

    // --- STEP 1: Simulate the Verification Check ---
    const verificationData = await simulateVerification(verificationType);
    console.log(`[2/4] Simulated ${verificationType} check: SUCCESS`);

    // --- STEP 2: Add to Composite Document ---
    console.log(`[3/4] Adding verification to composite document...`);
    const result = await addVerification(walletAddress, verificationType, verificationData);
    console.log(`[4/4] Updated composite document. CID: ${result.cid}`);

    console.log(`✅ SUCCESS! Verification complete for ${walletAddress}. TxHash: ${result.txHash}`);
    
    // Log activity for verification creation
    console.log(`[ACTIVITY] User ${walletAddress} added ${verificationType} verification at ${req.activityInfo.timestamp}`);
    
    res.status(200).json({
      success: true,
      cid: result.cid,
      transactionHash: result.txHash,
      verification_type: verificationType,
      verified_at: verificationData.verified_at
    });

  } catch (error) {
    console.error("Verification failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ---
// MISSING ENDPOINTS FOR THIRD-PARTY INTEGRATION
// ---

// GET /verifications - Get all verifications for a user with consent checking
app.get('/verifications', async (req, res) => {
  try {
    const { address, requestedBy } = req.query;
    if (!address) {
      return res.status(400).json({ error: 'address parameter is required' });
    }

    console.log(`[API] Getting verifications for ${address}, requested by: ${requestedBy || 'anonymous'}`);

    // Get all verification types for user
    const verificationTypes = await readOnlyContract.getUserVerificationTypes(address);
    const verifications = [];

    for (const verificationType of verificationTypes) {
      try {
        // Get the CID for this verification type
        const cid = await readOnlyContract.getUserAttestation(address, verificationType);
        
        if (cid && cid.length > 0) {
          // Check if not revoked
          const isRevoked = await readOnlyContract.isRevoked(cid);
          
          if (!isRevoked) {
            // Check consent status (for information only)
            const hasConsented = await readOnlyContract.hasConsented(address, verificationType);
            
            // Fetch verification data from IPFS
            try {
              const compositeData = await fetchFromIPFS(cid);
              const verificationData = compositeData.verifications[verificationType];
              
              verifications.push({
                verification_type: verificationType,
                is_verified: true,
                cid: cid,
                verified_at: verificationData.verified_at,
                consented: hasConsented,
                baseTxHash: verificationData.baseTxHash || verificationData.transactionHash,
                ...verificationData
              });
            } catch (ipfsError) {
              console.warn(`Could not fetch IPFS data for ${verificationType}:`, ipfsError);
              verifications.push({
                verification_type: verificationType,
                is_verified: true,
                cid: cid,
                consented: hasConsented,
                baseTxHash: 'N/A',
                error: 'Could not fetch verification details'
              });
            }
          }
        }
      } catch (error) {
        console.warn(`Error processing verification type ${verificationType}:`, error);
      }
    }

    // Log activity for third-party requests
    if (requestedBy && requestedBy !== 'keystone') {
      console.log(`[ACTIVITY] Third-party request from ${requestedBy} for ${address} at ${req.activityInfo.timestamp}`);
      // In a real app, you'd store this in a database
      // For now, we'll just log it
    }

    res.json({
      walletAddress: address,
      verifications: verifications,
      requestedBy: requestedBy || 'anonymous'
    });

  } catch (error) {
    console.error("Get verifications failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /start-verification - Start verification process (alias for /verify)
app.post('/start-verification', async (req, res) => {
  try {
    const { walletAddress, verificationType = 'identity-verification' } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ error: 'walletAddress is required' });
    }

    console.log(`[API] Start verification request for: ${walletAddress}, type: ${verificationType}`);

    // Use the same logic as /verify endpoint
    const verificationData = await simulateVerification(verificationType);
    const result = await addVerification(walletAddress, verificationType, verificationData);

    res.status(200).json({
      status: "Verified",
      walletAddress: walletAddress,
      verification_type: verificationType,
      verified_at: verificationData.verified_at,
      cid: result.cid,
      baseTxHash: result.txHash
    });

  } catch (error) {
    console.error("Start verification failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /simple-status - Simple status check without signature requirement
app.get('/simple-status', async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: 'address parameter is required' });
    }

    console.log(`[API] Simple status check for ${address}`);

    // Check if user has any valid verification
    const hasAnyVerification = await readOnlyContract.hasAnyVerification(address);
    
    if (hasAnyVerification) {
      const cid = await readOnlyContract.getLatestAttestation(address);
      res.json({ isVerified: true, cid: cid });
    } else {
      res.json({ isVerified: false });
    }

  } catch (error) {
    console.error("Simple status check failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ---
// ENDPOINT 2: THE 3RD-PARTY API (Verification Check with Signature)
// This is what the "Demo dApp" will call.
// ---
app.get('/check-status', async (req, res) => {
  try {
    const { walletAddress, signature } = req.query;
    if (!walletAddress || !signature) {
      return res.status(400).json({ error: 'walletAddress and signature are required' });
    }

    // --- STEP 1: Verify the Signature ---
    const message = "Allow this dApp to check my verification status.";
    
    let recoveredAddress;
    try {
      recoveredAddress = ethers.verifyMessage(message, signature);
    } catch (sigError) {
      console.warn(`Invalid signature received for ${walletAddress}`);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      console.warn(`Signature mismatch. Expected ${walletAddress}, got ${recoveredAddress}`);
      return res.status(401).json({ error: 'Signature does not match wallet address' });
    }

    console.log(`[API] Verified signature for ${walletAddress}`);

    // --- STEP 2: Check if user has any valid verification ---
    const hasAnyVerification = await readOnlyContract.hasAnyVerification(walletAddress);
    
    if (!hasAnyVerification) {
      console.log(`[API] No record found for ${walletAddress}`);
      return res.json({ isVerified: false, message: 'No attestation found' });
    }
    
    const cid = await readOnlyContract.getLatestAttestation(walletAddress);
    console.log(`[API] Found valid attestation for ${walletAddress}. CID: ${cid}`);
    
    res.json({ isVerified: true, cid: cid });

  } catch (error) {
    console.error("Check-status failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ---
// ERROR HANDLING MIDDLEWARE
// ---

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  if (error.message.includes('blockchain') || error.message.includes('transaction')) {
    res.status(503).json({ 
      error: 'Blockchain service unavailable', 
      retry: true,
      message: 'Please try again in a few moments'
    });
  } else if (error.message.includes('IPFS') || error.message.includes('Lighthouse')) {
    res.status(503).json({ 
      error: 'Storage service unavailable', 
      retry: true,
      message: 'Please try again in a few moments'
    });
  } else if (error.message.includes('signature')) {
    res.status(401).json({ 
      error: 'Invalid signature',
      message: 'Please sign the message with your wallet'
    });
  } else {
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    });
  }
});

// GET /activity - Get user activity (for demo purposes, returns mock data)
app.get('/activity', async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: 'address parameter is required' });
    }

    // In a real app, this would query a database
    // For demo purposes, we'll return mock activity data
    const mockActivity = [
      {
        id: '1',
        type: 'verification_added',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        description: 'Added student verification',
        verificationType: 'student',
        status: 'completed'
      },
      {
        id: '2',
        type: 'third_party_request',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        description: 'Third-party app requested verification data',
        appName: 'DeFi App',
        status: 'granted'
      },
      {
        id: '3',
        type: 'verification_added',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        description: 'Added identity verification',
        verificationType: 'identity-verification',
        status: 'completed'
      }
    ];

    res.json({
      walletAddress: address,
      activities: mockActivity,
      total: mockActivity.length
    });

  } catch (error) {
    console.error("Get activity failed:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Activity tracking middleware
app.use((req, res, next) => {
  // Track API requests for activity logging
  const timestamp = new Date().toISOString();
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress;
  
  // Store request info for activity tracking
  req.activityInfo = {
    timestamp,
    userAgent,
    ip,
    endpoint: req.path,
    method: req.method
  };
  
  next();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: `The endpoint ${req.method} ${req.path} does not exist`
  });
});

// --- Start the Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
  console.log("Ready to receive verification requests.");
  console.log(`Available endpoints:`);
  console.log(`  POST /verify - Start verification process`);
  console.log(`  POST /start-verification - Start verification process (alias)`);
  console.log(`  GET /verifications?address=0x... - Get user verifications with consent`);
  console.log(`  GET /simple-status?address=0x... - Simple status check`);
  console.log(`  GET /check-status?address=0x...&signature=0x... - Status check with signature`);
  console.log(`  GET /activity?address=0x... - Get user activity log`);
});
