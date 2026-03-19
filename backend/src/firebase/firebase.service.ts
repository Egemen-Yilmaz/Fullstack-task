import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);

  onModuleInit() {
    const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'firebase-auth.json';
    const absPath = path.resolve(process.cwd(), keyPath);

    try {
      if (!admin.apps.length) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serviceAccount = require(absPath);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
        this.logger.log('Firebase Admin initialized successfully!');
      }
    } catch (err) {
        const msg = (err as any)?.message || String(err);
        this.logger.error(`Failed to initialize Firebase Admin. Checked path: ${absPath}`);
        this.logger.error(msg);
    }
  }

  async sendTransferNotification(payload: { from: string; to: string; amount: number; txHash: string }) {
    const topic = process.env.FIREBASE_TOPIC || 'usdt-large-transfers';

    // Sayıyı formatlayan yardımcı fonksiyon (Binlik ayraçlı ve 2 hane küsuratlı)
    const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(payload.amount);

    const message: admin.messaging.Message = {
    notification: {
      title: 'Large USDT Transfer!',
      // BİLDİRİM KUTUCUĞU İÇİN:
      body: `Amount: ${formattedAmount} USDT\nFrom: ${payload.from.substring(0, 6)}...`
    },
    data: {
      // FRONTEND LİSTESİ İÇİN:
      sender: payload.from,
      receiver: payload.to,
      amount: formattedAmount, // Burada formatlı string gönderiyoruz
      txHash: payload.txHash
    },
    topic
  };

    try {
      const resp = await admin.messaging().send(message);
      this.logger.log(`FCM message sent: ${resp}`);
      return resp;
    } catch (err) {
      this.logger.error('Error sending FCM message: ' + (err as any)?.message);
      throw err;
    }
  }

  async subscribeTokenToTopic(token: string, topic: string) {
    try {
      const resp = await admin.messaging().subscribeToTopic([token], topic);
      this.logger.log(`Token subscribed to topic ${topic}: ${JSON.stringify(resp)}`);
      return resp;
    } catch (err) {
      const msg = (err as any)?.message || String(err);
      this.logger.error('Failed to subscribe token to topic: ' + msg);
      throw err;
    }
  }
}
