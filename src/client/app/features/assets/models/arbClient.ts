import {RpcConfig} from "../../../models/rpcConfigModel";
import {ethers} from "ethers";
import {AssetAddress, AssetInput, AssetStatuses} from "../types";
import {assetsManagerAbi} from "./abis";


export const arbClient = {
  async createAsset($rpcConfig: RpcConfig, args: any): Promise<void> {
    console.log('args', args)
    args.originalOwner = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    const argsArr = Object.values(args)
    console.log('argsArr', argsArr)
    await this.getManagerSc($rpcConfig).createAsset(
      ...argsArr
    )
  },
  async listAssets($rpcConfig: RpcConfig) {
    return await this.getManagerSc($rpcConfig).listAssets()
  },
  async setStatus($rpcConfig: RpcConfig, args: { id: number, status: number }) {
    return await this.getManagerSc($rpcConfig).setStatus(args.id, args.status)
  },
  async getAsset($rpcConfig: RpcConfig, args: { id: number }): Promise<AssetInput> {
    console.log('args.id', args.id)
    return await this.getManagerSc($rpcConfig).getAsset(args.id)
  },
  getManagerSc($rpcConfig) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, assetsManagerAbi, provider);
    return manager.connect(provider.getSigner())
  }
}
