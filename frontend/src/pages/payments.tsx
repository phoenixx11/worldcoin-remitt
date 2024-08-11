import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import { connectToMetaMask } from '../utils/metamask'; 

const Payments: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [gasPrice, setGasPrice] = useState<string>('Loading...');
  const [gasSubsidy, setGasSubsidy] = useState<string>('0');

  useEffect(() => {
    // Fetch the real-time gas price
    const fetchGasPrice = async () => {
      const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_L2_RPC_URL);
      const gasPriceOracleAddress = 'YOUR_GAS_PRICE_ORACLE_CONTRACT_ADDRESS'; 
      const gasPriceOracleABI = [
        "function getLatestGasPrice() public view returns (int256)"
      ];

      const gasPriceOracle = new ethers.Contract(gasPriceOracleAddress, gasPriceOracleABI, provider);

      try {
        const price = await gasPriceOracle.getLatestGasPrice();
        setGasPrice(ethers.utils.formatUnits(price, 'gwei') + ' Gwei');
      } catch (error) {
        console.error('Error fetching gas price:', error);
        setGasPrice('Error');
      }
    };

    fetchGasPrice();
  }, []);

  const handleMakePayment = async () => {
    try {
      const provider = await connectToMetaMask();

      const signer = provider.getSigner();
      const transaction = await signer.sendTransaction({
        to: 'RECIPIENT_ADDRESS',
        value: ethers.utils.parseEther(amount), 
      });

      console.log('Transaction hash:', transaction.hash);
    } catch (error) {
      console.error('Error making payment via MetaMask:', error);
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>Payment Dashboard</h1>
      
      <Image src="/images/tg.jpg" alt="Dashboard Image" width={200} height={200} />

      <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', marginTop: '20px', width: '300px', textAlign: 'center' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Add Amount:</label>
          <input 
            type="text" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Real-Time Gas Price:</label>
          <input 
            type="text" 
            value={gasPrice} 
            readOnly 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Gas Subsidy Amount:</label>
          <input 
            type="text" 
            value={gasSubsidy} 
            onChange={(e) => setGasSubsidy(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
        </div>

        <button 
          onClick={handleMakePayment} 
          style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#0070f3', color: '#fff', cursor: 'pointer', border: 'none' }}>
          Make Payment via Metamask
        </button>
      </div>
    </div>
  );
};

export default Payments;






