import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const TransactionForm: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransaction = async () => {
    try {
      // Connect to the modified Ethereum client
      const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
      const signer = provider.getSigner();
      
      // Create and send the transaction
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
        gasPrice: ethers.utils.parseUnits('1', 'gwei'), // Adjust based on your logic
      });

      await tx.wait();
      alert('Transaction successful');
    } catch (error) {
      console.error('Transaction failed:', error);
    }
  };

  return (
    <div>
      <h2>Remit Funds</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransaction}>Remit</button>
    </div>
  );
};

export default TransactionForm;







