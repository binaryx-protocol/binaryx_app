import {getProvider, RpcConfig} from "../../../models/rpcConfigModel";
import {BigNumber, ethers} from "ethers";
import { BcAsset, UiNewAssetFormValues} from "../types";
import {assetsManagerAbi, erc20Abi} from "./abis";


export const arbClient = {
  async createAsset($rpcConfig: RpcConfig, formValues: UiNewAssetFormValues): Promise<void> {
    await this.getManagerSc($rpcConfig).createAsset(
      ...Object.values(formValues)
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
  async investUsingUsdt($rpcConfig: RpcConfig, args: { id: number, tokensToBuyAmount: number }) {
    return await this.getManagerSc($rpcConfig).investUsingUsdt(args.id, args.tokensToBuyAmount)
  },
  async approveUsdt($rpcConfig: RpcConfig, args: { amountInMicro: number }) {
    const provider = getProvider()
    const usdtfToken = new ethers.Contract($rpcConfig.usdtL2Address, erc20Abi, provider);
    const usdtfTokenSigned = usdtfToken.connect(provider.getSigner())

    await usdtfTokenSigned.approve($rpcConfig.assetsTokenAddress, args.amountInMicro)
  },
  getManagerSc($rpcConfig) {
    const provider = getProvider()
    const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, assetsManagerAbi, provider);
    return manager.connect(provider.getSigner())
  }
}
