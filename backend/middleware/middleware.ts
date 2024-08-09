import { ethers } from 'ethers';
import provider from './provider';

interface Transaction {
    from: string;
    to: string;
    data?: string;
    gasLimit: number;
    gasPrice?: ethers.BigNumber;
}

interface GasSubsidyContract extends ethers.Contract {
    applyGasSubsidy: (user: string, gasAmount: ethers.BigNumber) => Promise<ethers.ContractTransaction>;
    verifiedUsers: (user: string) => Promise<boolean>;
}

interface GasPriceOracleContract extends ethers.Contract {
    getLatestGasPrice: () => Promise<ethers.BigNumber>;
}

// Initialize wallet
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);

//  deployed contracts
const gasSubsidyAddress: string = 'YOUR_GAS_SUBSIDY_CONTRACT_ADDRESS';
const gasPriceOracleAddress: string = 'YOUR_GAS_PRICE_ORACLE_CONTRACT_ADDRESS';

// ABI for GasSubsidy 
const gasSubsidyABI = [
    "function applyGasSubsidy(address user, uint256 gasAmount) external",
    "function verifiedUsers(address user) public view returns (bool)"
];

// ABI for realtimegasprice
const gasPriceOracleABI = [
    "function getLatestGasPrice() public view returns (int256)"
];

const gasSubsidy: GasSubsidyContract = new ethers.Contract(gasSubsidyAddress, gasSubsidyABI, wallet) as GasSubsidyContract;
const gasPriceOracle: GasPriceOracleContract = new ethers.Contract(gasPriceOracleAddress, gasPriceOracleABI, provider) as GasPriceOracleContract;

// Middleware function
async function checkVerificationAndApplySubsidy(tx: Transaction): Promise<ethers.providers.TransactionResponse> {
    try {
        const isVerified: boolean = await gasSubsidy.verifiedUsers(tx.from);
        if (!isVerified) {
            throw new Error("User not verified");
        }

        // Fetch the latest gas price from the oraclee
        const latestGasPrice = await gasPriceOracle.getLatestGasPrice();

        // Set the transaction gas pricee if not provided
        if (!tx.gasPrice) {
            tx.gasPrice = latestGasPrice;
        }

        // Apply gassubsidy
        
        const gasAmountToSubsidize = ethers.utils.parseUnits('1.0', 'gwei'); 

        const subsidyTx = await gasSubsidy.applyGasSubsidy(tx.from, gasAmountToSubsidize);
        await subsidyTx.wait(); 

        const txResponse = await wallet.sendTransaction(tx);
        return txResponse;
    } catch (error) {
        console.error("Error in checkVerificationAndApplySubsidy:", error);
        throw error;
    }
}

export { checkVerificationAndApplySubsidy };

