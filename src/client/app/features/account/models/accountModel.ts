import {atom, PrimitiveAtom} from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {bnToInt, onlyFields} from "../../../utils/objectUtils";
import {rpcClient} from "./rpcClient";
import {BigNumber} from "ethers";
import {BcAsset} from "../../assets/types";
import {RpcConfig} from "../../../models/rpcConfigModel";

export type BcReward = {
  asset: BcAsset,
  assetId: BigNumber,
  multiplier: BigNumber,
  rewardAmount: BigNumber,
}

export type BcRewardsResponse = [
  BcReward[],
  BigNumber
]

export type UIAsset = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  tokenInfo_totalSupply: number,
  tokenInfo_apr: number,
  tokenInfo_tokenPrice: number,
}

export type UIReward = {
  asset: UIAsset,
  assetId: number,
  multiplier: number,
  rewardAmount: number,
}

export type UiAccountInfo = {
  rewards: UIReward[],
  totalRewards: number
}

// stores
export const $apiRewardsResponse = atom(null) as PrimitiveAtom<BcRewardsResponse | null>;

// getters
export const $accountInfo = atom<UiAccountInfo | null>((get) => {
  const apiRewardsResponse = get($apiRewardsResponse)
  if (!apiRewardsResponse) {
    return null
  }
  const rewards = apiRewardsResponse[0].map(transformRewardBcToUi).map<UIReward>(onlyFields)
  return {
    rewards,
    totalRewards: apiRewardsResponse[1].toNumber(),
  }
});

// setters
export const $doLoadMyRewards = atom(null, async (get, set) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig) as RpcConfig
  const response = await rpcClient.getMyRewardsPerAsset(
    $rpcConfig
  );
  console.log('response', response)

  set($apiRewardsResponse, response);
})

const transformAssetBcToUi = (bcAsset: BcAsset): UIAsset => {
  return {
    ...bcAsset,
    tokenInfo_totalSupply: bcAsset.tokenInfo_totalSupply.toNumber(),
    tokenInfo_apr: bcAsset.tokenInfo_apr.toNumber(),
    tokenInfo_tokenPrice: bcAsset.tokenInfo_tokenPrice.toNumber(),
  }
}

const transformRewardBcToUi = (r: BcReward): UIReward => ({
  asset: transformAssetBcToUi(r.asset),
  assetId: r.assetId.toNumber(),
  rewardAmount: r.rewardAmount.toNumber(),
  multiplier: r.multiplier.toNumber(),
})