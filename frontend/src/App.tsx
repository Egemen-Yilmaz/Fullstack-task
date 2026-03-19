import { useEffect, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging, VAPID_KEY } from './firebase';
import './App.css';

import WhaleList from './components/WhaleList/WhaleList';

// Tip tanımını fonksiyon dışına taşıyarak daha temiz bir yapı kuruyoruz
interface WhaleNotification {
  title?: string;
  body?: string;
  amount?: string;
  from?: string;
  to?: string;
  txHash?: string;
}

function App() {
  const [notifications, setNotifications] = useState<WhaleNotification[]>([]);

  const sendTokenToBackend = async (token: string) => {
    try {
      await fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      console.log('Token sent to backend successfully');
    } catch (error) {
      console.error('Error sending token to backend', error);
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging, { vapidKey: VAPID_KEY });
          if (token) {
            console.log('FCM Token:', token);
            await sendTokenToBackend(token);
          }
        }
      } catch (error) {
        console.error('Permission error:', error);
      }
    };

    requestPermission();

    const unsubscribe = onMessage(messaging, (payload) => {
      if (payload.data) {
        const newNotif: WhaleNotification = {
          title: payload.notification?.title || 'Whale Alert',
          body: payload.notification?.body || '',
          amount: payload.data.amount,
          from: payload.data.sender,
          to: payload.data.receiver,
          txHash: payload.data.txHash,
        };

        setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>USDT Whale Tracker 🐋</h1>
        <p>Latest 10 transactions above 100,000 USDT</p>
      </header>
      
      <main>
        <WhaleList notifications={notifications} />
      </main>
    </div>
  );
}

export default App;