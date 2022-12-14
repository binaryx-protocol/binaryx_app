import { atom } from 'jotai'
import {
  $rpcConfig,
  $publicRpcProvider,
} from "../../../core/models/rpcConfigModel";
import {Contract, ethers} from "ethers";

export type KycStoreSc = Contract & {
  isApproved: (userAddress: string) => Promise<boolean>
}

const abi = [
  "function isApproved(address userAddress) public view returns(bool)",
]

export const $kycStoreScPublic = atom<KycStoreSc | null>((get) => {
  const rpcConfig = get($rpcConfig)
  const provider = get($publicRpcProvider)
  if (!rpcConfig || !provider) {
    return null
  }
  return new ethers.Contract(rpcConfig.contractsAddresses.kycStoreAddress, abi, provider) as KycStoreSc
})
