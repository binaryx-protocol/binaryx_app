import { atom } from 'jotai'
import {$rpcConfig, $rpcProvider, getProvider, RpcConfig} from "../../../core/models/rpcConfigModel";
import {accountManagerAbi, assetsManagerAbi, erc1155Abi} from "../../../core/abis";
import {Contract, ethers} from "ethers";
import {BcAsset} from "../types";
import {$isAccountConnected} from "../../../core/models/metaMaskModel";

type AssetManager = Contract & {
  listAssets: () => Promise<[BcAsset[], any]>
}

export const $assetsTokenSmartContract = atom<AssetManager | null>((get) => {
  const rpcConfig = get($rpcConfig)
  const provider = get($rpcProvider)
  if (!rpcConfig || !provider) {
    return null
  }
  const abi = [
    ...erc1155Abi,
    ...assetsManagerAbi,
    ...accountManagerAbi,
  ]
  return new ethers.Contract(rpcConfig.assetsTokenAddress, abi, provider) as AssetManager
})

export const $assetsTokenSmartContractSigned = atom<AssetManager>((get) => {
  const rpcConfig = get($rpcConfig)
  const isAccountConnected = get($isAccountConnected)
  const provider = get($rpcProvider)
  // if (!provider) {
  //   return null
  // }
  const abi = [
    ...erc1155Abi,
    ...assetsManagerAbi,
    ...accountManagerAbi,
  ]
  const smartContract = new ethers.Contract(rpcConfig.assetsTokenAddress, abi, provider);
  if (isAccountConnected) {
    return smartContract.connect(provider.getSigner()) as AssetManager
  } else {
    return smartContract as AssetManager
  }
})
