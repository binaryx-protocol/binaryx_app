import {atom, PrimitiveAtom} from 'jotai'
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {onlyFields} from "../../../utils/objectUtils";
// import {rpcClient} from "./rpcClient";
import {BigNumber} from "ethers";
import {BcAsset} from "../../assets/types";
import {RpcConfig} from "../../../core/models/rpcConfigModel";
import {$assetsTokenSmartContract} from "../../assets/models/smartContractsFactory";
import formatLongNumber from "../../../utils/formatNumber";

export type BcReward = {
  asset: BcAsset
  assetId: BigNumber
  multiplier: BigNumber
  rewardAmountDe6: BigNumber
  balance: BigNumber
}

export type BcRewardsResponse = [
  BcReward[],
  BigNumber,
  BigNumber,
]

export type UIAsset = {
  name: string
  symbol: string
  title: string
  description: string
  status: number
  tokenInfo_totalSupply: number
  tokenInfo_apr: number
  tokenInfo_tokenPriceDe6: number
}

export type UIReward = {
  asset: UIAsset
  assetId: number
  multiplier: number
  rewardAmountDe6: number
  balance: number
  computed: UIRewardComputed
}

export type UIRewardComputed = {
  currentValue: number
}

export type UiAccountInfo = {
  rewards: UIReward[]
  totalRewards: number
  totalValue: number
  totalEarned: number
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
  const totalEarned = apiRewardsResponse[2].toNumber() / 1e6
  const totalRewards = apiRewardsResponse[1].toNumber() / 1e6 - totalEarned
  return {
    rewards,
    totalRewards: totalRewards,
    totalValue: rewards.reduce((acc, r) => acc + r.computed.currentValue, 0),
    totalEarned,
  }
});

// setters
export const $doLoadMyRewards = atom(null, async (get, set) => {
  await waitFor(() => {
    return !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const sc = get($assetsTokenSmartContract)
  const response = await sc.getMyRewardsPerAsset();
  set($apiRewardsResponse, response);
})

export const $doClaimMyRewards = atom(null, async (get, set) => {
  await waitFor(() => {
    return !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const sc = get($assetsTokenSmartContract)
  await sc.claimRewardsInUsdt();
})

const transformAssetBcToUi = (bcAsset: BcAsset): UIAsset => {
  return {
    ...bcAsset,
    tokenInfo_totalSupply: bcAsset.tokenInfo_totalSupply.toNumber(),
    tokenInfo_apr: bcAsset.tokenInfo_apr.toNumber(),
    tokenInfo_tokenPriceDe6: bcAsset.tokenInfo_tokenPriceDe6.toNumber() / 1e6,
  }
}

const transformRewardBcToUi = (r: BcReward): UIReward => ({
  asset: transformAssetBcToUi(r.asset),
  assetId: r.assetId.toNumber(),
  rewardAmountDe6: r.rewardAmountDe6.toNumber() / 1e6,
  multiplier: r.multiplier.toNumber(),
  balance: r.balance.toNumber(),
  computed: computeReward(r),
})

const computeReward = (r: BcReward) => ({
  currentValue: r.balance.toNumber() * r.asset.tokenInfo_tokenPriceDe6.toNumber() / 1e6,
})
