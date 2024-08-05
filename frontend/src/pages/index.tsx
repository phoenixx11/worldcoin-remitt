import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [worldIDProof, setWorldIDProof] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    try {
      setLoading(true);
      //  actual World ID SDK 
      const proof = await getWorldIDProof();
      setWorldIDProof(proof);

      
      const response = await axios.post('/api/verify', { proof });
      console.log(response.data.message); 
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up with World ID</h1>
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? "Verifying..." : "Sign Up"}
      </button>
    </div>
  );
};

export default HomePage;

async function getWorldIDProof(): Promise<string> {
  // World ID SDK integration to get proof
  return "mockWorldIDProof";
}
