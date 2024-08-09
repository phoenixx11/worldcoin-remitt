import { ChainlinkClient } from '@chainlink/ccip-client';

const ccipConfig = require('./ccip.json'); // Load configuration

export class CCIPService {
  private readonly client: ChainlinkClient;

  constructor() {
    this.client = new ChainlinkClient(ccipConfig.url, ccipConfig.key);
  }

  async sendVerificationResponse(isVerified: boolean): Promise<void> {
    const responsePayload = Buffer.from(abi.encode(isVerified));
    await this.client.sendMessage(responsePayload);
  }
}