import WhaleCard from '../WhaleCard/WhaleCard';
import styles from './WhaleList.module.css';

// Interface tanımını props ile uyumlu hale getirelim
interface NotificationLike {
  title?: string | null;
  body?: string | null;
  amount?: string | number | null;
  from?: string | null;
  to?: string | null;
  txHash?: string | null;
}

interface WhaleListProps {
  notifications: NotificationLike[];
}

const WhaleList = ({ notifications }: WhaleListProps) => {
  return (
    <div className={styles.container}>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <WhaleCard 
            key={index} 
            title={notif.title || 'Whale Alert'} 
            // Tüm yeni propları buraya ekledik:
            amount={String(notif.amount || '0')}
            from={notif.from || 'Unknown'}
            to={notif.to || 'Unknown'}
            txHash={notif.txHash || 'N/A'}
            isNewest={index === 0} 
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>No transactions detected yet. Monitoring Ethereum Mainnet...</p>
        </div>
      )}
    </div>
  );
};

export default WhaleList;