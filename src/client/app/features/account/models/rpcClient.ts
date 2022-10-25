import {RpcConfig} from "../../../models/rpcConfigModel";
import {getAssetsManagerSc} from "../../../core/smartContractsFactory";

export const rpcClient = {
  async getMyRewardsPerAsset($rpcConfig: RpcConfig): Promise<any> {
    return await getAssetsManagerSc($rpcConfig).getMyRewardsPerAsset()
  },
  async claimRewardsInUsdt($rpcConfig: RpcConfig): Promise<any> {
    return await getAssetsManagerSc($rpcConfig).claimRewardsInUsdt()
  },
}
