import React, { useState } from 'react';
import { ISuccessResult, IDKitWidget } from '@worldcoin/idkit';
import axios from 'axios';
import styles from '../styles/homepage.module.css';

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const appId = process.env.NEXT_PUBLIC_APP_ID || '';
  const actionId = process.env.NEXT_PUBLIC_ACTION_ID || '';

  const handleProofSuccess = async (proof: ISuccessResult) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/verify', {
        proof: proof,
      });

      if (res.status === 200) {
        console.log("User verified successfully!", res.data);
      } else {
        console.log("Verification failed.");
      }
    } catch (error) {
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign Up with World ID</h1>
      <IDKitWidget
        action={actionId} 
        signal="user_identifier" 
        onSuccess={handleProofSuccess}
        app_id={appId}
      >
        {({ open }) => (
          <button onClick={open} disabled={loading}>
            {loading ? "Verifying..." : "Sign Up"}
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default HomePage;




 





