import {atom, PrimitiveAtom} from 'jotai'
import {waitFor} from "../../../utils/pageLoadUtiils";
import {onlyFields} from "../../../utils/objectUtils";
import {BigNumber, Contract} from "ethers";
import {BcAsset} from "../../assets/types";
import {
  $assetsTokenSmartContractSigned, $rewardDistributorContractSigned,
  AssetManager
} from "../../assets/models/smartContractsFactory";

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
  propertyInfo_images: string
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
  totalPropertyValue: number
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
    totalPropertyValue: rewards.reduce((acc, r) => acc + r.computed.currentValue, 0),
    totalEarned,
  }
});

// setters
export const $doLoadMyRewards = atom(null, async (get, set) => {
  await waitFor(() => !!get($assetsTokenSmartContractSigned), 3)
  const sc = get($assetsTokenSmartContractSigned) as AssetManager
  const response = await sc.getMyRewardsPerAsset();
  set($apiRewardsResponse, response);
})

// total:{
//   totalRentBalance,
//     currentAccountValue,
//     totalClaimable,
//     propertiesOwned,
//     totalPropertyValue
// }

// asset:{
//   photo,
//     title,
//     address,
//     cocRate,
//     totalEarnedFromAsset,
//     currentRentBalance(avaliable to calim)
// }

export const $doLoadMyRewardsNew = atom(null, async (get, set) => {
  await waitFor(() => !!get($rewardDistributorContractSigned), 3);
  const sc = get($rewardDistributorContractSigned) as Contract;
  const allPools = await sc.registeredAssets(0) //TODO: replace with all pools when contracts be ready
  let totalClaimableRewards = BigNumber.from(0);
  const assetInfo = await Promise.all([allPools].map(async (elem: any) => {
    const signerAddress = sc.signer.getAddress();
    const currentRentBalance = await sc.claimableRewards(signerAddress, [elem]);
    const userInfo = await sc.userInfo(allPools, '0xDC89F9576281e87f78EeF7ddDEBD61f7e7D82f82');
    totalClaimableRewards.add(currentRentBalance[0])
    return {
      photo: 'https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg',
      title: 'Villa Camilla 2',
      address: 'Jl. Pantai Batu Bolong No.44',
      earnedFromAsset: 10,
      currentRentBalance: currentRentBalance[0]
    }
  }))
  const res = {
    total: {},

  }

})

export const $doClaimMyRewards = atom(null, async (get, set) => {
  const sc = get($rewardDistributorContractSigned) as Contract;
  const allPools = await sc.registeredAssets(0)
  try {
    await sc.claim(sc.signer.getAddress(), [allPools]);
  } catch (e) {
    console.log(e)
  }
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
