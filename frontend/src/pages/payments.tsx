import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import abi from '../path/to/GasSubsidyAndPriority.json'; // Adjust the path
import styles from '../styles/payments.module.css';

const Payments = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [verified, setVerified] = useState<boolean>(false);

  const contractAddress = 'your_contract_address_here'; 

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);

      const accounts = await web3Provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);

      const signer = web3Provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
    } else {
      alert('Metamask is not installed. Please install it to use this feature.');
    }
  };

  const verifyUser = async () => {
    if (!contract) return;
    
    try {
      const token = 'your_jwt_token_here'; // Replace 
      
      const tx = await contract.verifyUser(token);
      await tx.wait();
      setVerified(true);
      alert('User successfully verified on-chain.');
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed.');
    }
  };

  const applyGasSubsidy = async () => {
    if (!contract) return;

    try {
      const tx = await contract.applyGasSubsidy();
      await tx.wait();
      alert('Gas subsidy applied successfully.');
    } catch (error) {
      console.error('Gas subsidy failed:', error);
      alert('Gas subsidy application failed.');
    }
  };

  const applyTransactionPriority = async () => {
    if (!contract) return;

    try {
      const tx = await contract.applyTransactionPriority();
      await tx.wait();
      alert('Transaction priority applied successfully.');
    } catch (error) {
      console.error('Transaction priority failed:', error);
      alert('Transaction priority application failed.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.connectButton} onClick={connectWallet}>
          {account ? `Connected: ${account.substring(0, 6)}...` : 'Connect to Metamask'}
        </button>
      </div>

      <h2 className={styles.heading}>Manage Your Transactions</h2>

      <div className={styles.buttonContainer}>
        <button className={styles.actionButton} onClick={verifyUser} disabled={!account}>
          Verify User
        </button>

        <button className={styles.actionButton} onClick={applyGasSubsidy} disabled={!verified}>
          Apply Gas Subsidy
        </button>

        <button className={styles.actionButton} onClick={applyTransactionPriority} disabled={!verified}>
          Apply Transaction Priority
        </button>
      </div>
    </div>
  );
};

export default Payments;


