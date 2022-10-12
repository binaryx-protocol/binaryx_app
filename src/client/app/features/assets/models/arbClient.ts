import {RpcConfig} from "../../../models/rpcConfigModel";
import {ethers} from "ethers";
import { BcAsset, UiNewAssetFormValues} from "../types";
import {assetsManagerAbi} from "./abis";


export const arbClient = {
  async createAsset($rpcConfig: RpcConfig, formValues: UiNewAssetFormValues): Promise<void> {
    const payload = {
      ...formValues,
      legalDocuments: formValues.legalDocuments.split(',')
    }
    await this.getManagerSc($rpcConfig).createAsset(
      ...Object.values(payload)
    )
  },
  async listAssets($rpcConfig: RpcConfig) {
    return await this.getManagerSc($rpcConfig).listAssets()
  },
  async setStatus($rpcConfig: RpcConfig, args: { id: number, status: number }) {
    return await this.getManagerSc($rpcConfig).setStatus(args.id, args.status)
  },
  async getAsset($rpcConfig: RpcConfig, args: { id: number }): Promise<BcAsset> {
    return await this.getManagerSc($rpcConfig).getAsset(args.id)
  },
  getManagerSc($rpcConfig) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, assetsManagerAbi, provider);
    return manager.connect(provider.getSigner())
  }
}
