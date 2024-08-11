import React, { useState, useEffect } from 'react';
import { ISuccessResult, IDKitWidget } from '@worldcoin/idkit';
import axios, { AxiosError } from 'axios';
import styles from '../styles/signup.module.css';
import { useRouter } from 'next/router';

interface VerificationResponse {
  message: string;
}

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const appId = process.env.NEXT_PUBLIC_APP_ID || '';
  const actionId = process.env.NEXT_PUBLIC_ACTION_ID || '';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''; 

  const handleProofSuccess = async (proof: ISuccessResult) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post<VerificationResponse>(`${backendUrl}/api/verify`, { proof });

      if (res.status === 200) {
        console.log("User verified successfully!", res.data);
        window.alert(
          `Successfully verified with World ID!
          Your nullifier hash is: ` + proof.nullifier_hash
        );
        router.push('/payments');
      } else {
        setError('Verification failed.');
      }
    } catch (error) {
      console.error("Sign up failed:", error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Sign Up with World ID</h2>
      {error && <div className={styles.error}>{error}</div>}
      <IDKitWidget
        action={actionId}
        signal="user_identifier"
        onSuccess={handleProofSuccess}
        app_id={appId}
      >
        {({ open }) => (
          <button onClick={open} disabled={loading} className={styles.button}>
            {loading ? "Verifying..." : "Signup"}
          </button>
        )}
      </IDKitWidget>
    </div>
  );
};

export default HomePage;
