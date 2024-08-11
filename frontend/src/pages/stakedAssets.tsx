import React from 'react';
import Image from 'next/image';
import styles from '../styles/stakedAssets.module.css'; 
import LoanComponent from '../pages/SimpleLoan';

const StakedAsset: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <h2>Earned Badges</h2>
        <div className={styles.badge}>
          <Image src="/images/badge11.jpg" alt="Badge 1" width={100} height={100} />
        </div>
        <div className={styles.badge}>
          <Image src="/images/badge2.jpg" alt="Badge 2" width={100} height={100} />
        </div>
        <div className={styles.badge}>
          <Image src="/images/badge3.jpg" alt="Badge 3" width={100} height={100} />
        </div>
      </div>

      <div className={styles.middleContainer}>
        <h2>Stake Your Badges to Get Loan</h2>
        <div>
            <LoanComponent />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <h2>Community Pool</h2>
        <p>Deposit your tokens in our saving account to earn yields.</p>
      </div>
    </div>
  );
};

export default StakedAsset;
