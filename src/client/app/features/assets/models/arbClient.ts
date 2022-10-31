import {getProvider, RpcConfig} from "../../../core/models/rpcConfigModel";
import {ethers} from "ethers";
import {BcAsset, BcAssetMetaData, UiNewAssetFormValues} from "../types";
import {assetsManagerAbi, erc1155Abi, erc20Abi} from "../../../core/abis";

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
  async getAssetTokenInfo($rpcConfig: RpcConfig, args: { id: number }): Promise<BcAssetMetaData> {
    return {
      tokensLeft: await this.getManagerSc($rpcConfig).balanceOf($rpcConfig.assetsTokenAddress, args.id)
    }
  },
  async investUsingUsdt($rpcConfig: RpcConfig, args: { id: number, tokensToBuyAmount: number }) {
    return await this.getManagerSc($rpcConfig).investUsingUsdt(args.id, args.tokensToBuyAmount)
  },
  async approveUsdt($rpcConfig: RpcConfig, { amountInMicro }: { amountInMicro: number }) {
    const provider = getProvider()
    const usdtfToken = new ethers.Contract($rpcConfig.usdtL2Address, erc20Abi, provider);
    const usdtfTokenSigned = usdtfToken.connect(provider.getSigner())

    await usdtfTokenSigned.approve($rpcConfig.assetsTokenAddress, amountInMicro)
  },
  getManagerSc($rpcConfig: RpcConfig) {
    const provider = getProvider()
    const abi = [
      ...erc1155Abi,
      ...assetsManagerAbi,
    ]
    const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, abi, provider);
    return manager.connect(provider.getSigner())
  }
}
