// src/components/WhaleCard/WhaleCard.tsx
import styles from './WhaleCard.module.css';

interface WhaleCardProps {
  title: string;
  amount: string;
  from: string;
  to: string;
  txHash: string;
  isNewest: boolean;
}

const WhaleCard = ({ title, amount, from, to, txHash, isNewest }: WhaleCardProps) => {
  return (
    <div className={`${styles.card} ${isNewest ? styles.newest : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.content}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Amount:</span>
          <span className={styles.amountValue}>{amount} USDT</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>From:</span>
          <span className={styles.addressValue}>{from}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>To:</span>
          <span className={styles.addressValue}>{to}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Hash:</span>
          <span className={styles.hashValue}>{txHash}</span>
        </div>
      </div>
      
      <div className={styles.footer}>
        <span className={styles.status}>Confirmed on Ethereum Mainnet</span>
      </div>
    </div>
  );
};

export default WhaleCard;