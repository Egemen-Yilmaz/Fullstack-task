import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Controller()
export class SubscribeController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('subscribe')
  async subscribe(@Body('token') token: string) {
    if (!token) return { success: false, message: 'token required in body' };
    const topic = process.env.FIREBASE_TOPIC || 'usdt-large-transfers';
    await this.firebaseService.subscribeTokenToTopic(token, topic);
    return { success: true };
  }
}
