import React from 'react';
import { useRouter } from 'next/router'; 
import styles from '../styles/LandingPage.module.css'; 

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleVerifyClick = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Send Money</h1>
          <h1 className={styles.title}>Receive Money</h1>
        </div>
        <button className={styles.verifyButton} onClick={handleVerifyClick}>
          Get Verified by World ID
        </button>
      </header>
      <main className={styles.mainContent}>
        <h2 className={styles.heading}>Get Verified by World ID</h2>
        <p className={styles.subheading}>To get transaction priority and gas subsidies</p>
      </main>
    </div>
  );
};

export default LandingPage;

 





