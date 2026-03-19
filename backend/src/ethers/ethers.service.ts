import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { FirebaseService } from '../firebase/firebase.service';
import * as url from 'url';

const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const USDT_ABI = [
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function decimals() view returns (uint8)'
];

@Injectable()
export class EthersService implements OnModuleInit {
  private readonly logger = new Logger(EthersService.name);
  private provider!: any;
  private contract!: any;
  private decimals = 6; // fallback

  constructor(private readonly firebaseService: FirebaseService) {}

  async onModuleInit() {
    const alchemyUrl = process.env.ALCHEMY_URL;
    if (!alchemyUrl) {
      this.logger.error('ALCHEMY_URL is not set. Please set it in .env');
      return;
    }

    try {
      const parsed = url.parse(alchemyUrl);
      if (parsed.protocol && parsed.protocol.startsWith('ws')) {
        this.provider = new ethers.providers.WebSocketProvider(alchemyUrl);
        this.logger.log('Using WebSocketProvider for realtime events');
      } else {
        this.provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
        this.logger.log('Using JsonRpcProvider');
      }
    } catch (err) {
      this.logger.warn('Invalid ALCHEMY_URL, falling back to JsonRpcProvider');
      this.provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
    }

    this.contract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, this.provider as any);

    try {
      const d: number = Number(await this.contract.decimals());
      if (!Number.isNaN(d)) this.decimals = d;
      this.logger.log(`USDT decimals: ${this.decimals}`);
    } catch (err) {
      this.logger.warn('Could not fetch decimals(), using default 6');
    }

    this.contract.on('Transfer', (from: string, to: string, value: ethers.BigNumber, event: any) => {
      this.handleTransfer(from, to, value, event).catch(e => this.logger.error(e));
    });

    this.logger.log('Started listening to USDT Transfer events');
  }

  private async handleTransfer(from: string, to: string, value: ethers.BigNumber, event: any) {
    try {

      const amount = Number(ethers.utils.formatUnits(value, this.decimals));
      const threshold = 100000; // 100k USDT

      // Log if amount is above 100k USDT
      if (amount >= threshold) {

        this.logger.log(`Big Transfer Detected! Amount: ${amount.toLocaleString()} USDT`);
        this.logger.log(`   From: ${from}`);
        this.logger.log(`   To:   ${to}`);
        this.logger.log(`   Hash: ${event.transactionHash}`);

        await this.firebaseService.sendTransferNotification({ from, to, amount, txHash: event.transactionHash });
      }
    } catch (err: any) {
        this.logger.error('Error handling transfer: ' + (err?.message || String(err)));
    }
  }
}
