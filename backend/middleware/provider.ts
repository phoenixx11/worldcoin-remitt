// provider.ts
import { ethers } from 'ethers';

// Load the RPC URL from environment variables
const L2_RPC_URL = process.env.L2_RPC_URL || 'https://your-l2-network-rpc-url';

// Create an Ethereum provider pointing to the L2 network
const provider = new ethers.providers.JsonRpcProvider(L2_RPC_URL);

export default provider;
