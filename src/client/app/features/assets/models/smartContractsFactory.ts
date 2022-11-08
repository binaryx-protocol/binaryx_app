import { atom } from 'jotai'
import {
  $rpcConfig,
  $publicRpcProvider, $userRpcProvider,
} from "../../../core/models/rpcConfigModel";
import {accountManagerAbi, assetsManagerAbi, erc1155Abi} from "../../../core/abis";
import {Contract, ethers} from "ethers";
import {BcAsset} from "../types";
import {UsdtManager} from "../../../shared/usdtToken/smartContractsFactory";

export type AssetManager = Contract & {
  listAssets: () => Promise<[BcAsset[], any]>
}

const abi = [
  ...erc1155Abi,
  ...assetsManagerAbi,
  ...accountManagerAbi,
]

export const $assetsTokenSmartContractPublic = atom<AssetManager | null>((get) => {
  const rpcConfig = get($rpcConfig)
  const provider = get($publicRpcProvider)
  if (!rpcConfig || !provider) {
    return null
  }
  return new ethers.Contract(rpcConfig.assetsTokenAddress, abi, provider) as AssetManager
})

export const $assetsTokenSmartContractSigned = atom<AssetManager | null>((get) => {
  const rpcConfig = get($rpcConfig)
  const provider = get($userRpcProvider)
  if (!rpcConfig || !provider) {
    return null
  }
  const smartContract = new ethers.Contract(rpcConfig.assetsTokenAddress, abi, provider)
  return smartContract.connect(provider.getSigner()) as AssetManager
})
