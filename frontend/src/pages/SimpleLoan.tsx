import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
//import SimpleLoan from '../artifacts/contracts/SimpleLoan.sol/SimpleLoan.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your deployed contract address

const styles = {
  container: {
    background: 'linear-gradient(to bottom, #e0f2ff, #ffffff)',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '500px',
    margin: '0 auto', // Center the container horizontally
  },
  input: {
    marginBottom: '10px',
    padding: '5px',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer',
  },
};

const LoanComponent = () => {
  const [amount, setAmount] = useState<number>(0);
  const [loanId, setLoanId] = useState<number | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setProvider(provider);
      setSigner(signer);
    };
    init();
  }, []);

  const createLoan = async () => {
    if (!signer) return;
    const contract = new ethers.Contract(contractAddress, SimpleLoan.abi, signer);
    const tx = await contract.createLoan(ethers.utils.parseEther(amount.toString()));
    await tx.wait();
    alert('Loan created!');
  };

  const payLoan = async () => {
    if (!signer || loanId === null) return;
    const contract = new ethers.Contract(contractAddress, SimpleLoan.abi, signer);
    const tx = await contract.payLoan(loanId);
    await tx.wait();
    alert('Loan paid!');
  };

  return (
    <div style={styles.container}>
      <h1>Loan :</h1>
      <div>
        <input
          type="number"
          placeholder="Loan Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={styles.input}
        />
        <button onClick={createLoan} style={styles.button}>
          Create Loan
        </button>
      </div>
      <div>
        <input
          type="number"
          placeholder="Loan ID or Badge Type"
          value={loanId || ''}
          onChange={(e) => setLoanId(Number(e.target.value))}
          style={styles.input}
        />
        <button onClick={payLoan} style={styles.button}>
          Stake Badge
        </button>
      </div>
    </div>
  );
};

export default LoanComponent;
