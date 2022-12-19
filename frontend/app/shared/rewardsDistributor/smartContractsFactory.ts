import { atom } from 'jotai'
import {
  $rpcConfig,
  $publicRpcProvider, $userRpcProvider,
} from "../../core/models/rpcConfigModel";
import {rewardsDistributorAbi} from "../../core/abis";
import {Contract, ethers} from "ethers";
import { ChainInfo } from "../walletsConnect";

export type RewardsDistributor = Contract;

export const rewardsDistributorSmartContractPublic = atom<RewardsDistributor | null>((get) => {
  const rpcConfig = get($rpcConfig)
  const provider = get($publicRpcProvider)
  if (!rpcConfig || !provider) {
    return null
  }
  return new ethers.Contract(rpcConfig.contractsAddresses.rewardsDistributorAddress, rewardsDistributorAbi, provider) as RewardsDistributor
})

export const rewardsDistributorSmartContractSigned = atom<RewardsDistributor | null>((get) => {
  const rpcConfig = get($rpcConfig) as ChainInfo

  const provider = get($userRpcProvider) as ethers.providers.JsonRpcProvider
  if (!rpcConfig || !provider) {
    return null
  }
  const smartContract = new ethers.Contract(rpcConfig.contractsAddresses.rewardsDistributorAddress, rewardsDistributorAbi, provider);
  return smartContract.connect(provider.getSigner()) as RewardsDistributor
})
