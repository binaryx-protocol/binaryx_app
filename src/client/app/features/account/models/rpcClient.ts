import {RpcConfig} from "../../../models/rpcConfigModel";
import {getAssetsManagerSc} from "../../../core/smartContractsFactory";

export const rpcClient = {
  async getMyRewardsPerAsset($rpcConfig: RpcConfig): Promise<any> {
    return await getAssetsManagerSc($rpcConfig).getAsset(0)
    // return await getAssetsManagerSc($rpcConfig).getMyRewardsPerAsset()
  }
}
