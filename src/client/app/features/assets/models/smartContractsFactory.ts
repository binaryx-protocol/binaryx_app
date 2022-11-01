import { atom } from 'jotai'
import {$rpcConfig, getProvider, RpcConfig} from "../../../core/models/rpcConfigModel";
import {accountManagerAbi, assetsManagerAbi, erc1155Abi} from "../../../core/abis";
import {Contract, ethers} from "ethers";
import {BcAsset} from "../types";
import {$isAccountConnected} from "../../../core/models/metaMaskModel";

type AssetManager = Contract & {
  listAssets: () => Promise<[BcAsset[], any]>
  balanceOfBatch: (ids: number[]) => Promise<any>
}

export const $assetsTokenSmartContract = atom<AssetManager>((get) => {
  console.log('$assetsTokenSmartContract')
  const rpcConfig = get($rpcConfig) as RpcConfig
  const isAccountConnected = get($isAccountConnected)
  const provider = getProvider()
  console.log('provider', provider)
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
