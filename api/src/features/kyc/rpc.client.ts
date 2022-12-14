import { ethers } from "ethers";

const abi = [
  "function isApproved(address userAddress) public view returns(bool)",
  "function approve(address userAddress, string calldata id) onlyOwner public",
  "function disable(address userAddress) onlyOwner public",
  "function owner() public view returns(address)",
];

import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class RpcClient {
  private wallet;
  private kycSc;
  private kycScSigned;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>('PRC_URL')
    const provider = new ethers.providers.JsonRpcProvider(url);
    this.wallet = new ethers.Wallet(
      this.config.get<string>('PRIVATE_KEY_KYC_STORE_CONTROLLER'),
      provider
    )
    this.kycSc = new ethers.Contract(this.config.get<string>('A_KYC_STORE'), abi, provider);
    this.kycScSigned = this.kycSc.connect(this.wallet)
  }

  async approve(address: string, clientId: string) {
    this.kycScSigned.approve(address, clientId)
  }
}
