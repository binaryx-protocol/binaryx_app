import {RpcConfig} from "../../../models/rpcConfigModel";
import {getAssetsManagerSc} from "../../../core/smartContractsFactory";

export const rpcClient = {
  async getMyRewardsPerAsset($rpcConfig: RpcConfig): Promise<any> {
    return await getAssetsManagerSc($rpcConfig).getMyRewardsPerAsset()
  },
  async balanceOf($rpcConfig: RpcConfig): Promise<any> {
    return await getAssetsManagerSc($rpcConfig).balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 0)
  },
}
