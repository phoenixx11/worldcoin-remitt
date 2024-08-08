import React, { useState } from 'react';
import { ISuccessResult, IDKitWidget } from '@worldcoin/idkit';
import axios from 'axios';
import styles from '../styles/homepage.module.css';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
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
        window.alert(
          `Successfully verified with World ID!
          Your nullifier hash is: ` + proof.nullifier_hash
        );
        router.push('/payments');
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
    <div className={styles.container}>
      <h2 className={styles.heading}>Sign Up with World ID</h2>
      <IDKitWidget
        action={actionId} 
        signal="user_identifier" 
        onSuccess={handleProofSuccess}
        app_id={appId}
      >
         {({ open }) => (
          <button 
            onClick={open} 
            disabled={loading} 
            className={styles.button}
          >
            {loading ? "Verifying..." : "Sign Up"}
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default HomePage;









 





