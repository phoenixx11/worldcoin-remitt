import { ethers } from 'ethers';


export const connectToMetaMask = async () => {
  try {
    if (!(window as any).ethereum) {
      throw new Error('MetaMask is not installed!');
    }

    
    await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    return provider;
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
};
