import { Module } from '@nestjs/common';
import { EthersService } from './ethers/ethers.service';
import { FirebaseService } from './firebase/firebase.service';
import { SubscribeController } from './subscribe/subscribe.controller';

@Module({
  imports: [],
  controllers: [SubscribeController],
  providers: [FirebaseService, EthersService]
})
export class AppModule {}
