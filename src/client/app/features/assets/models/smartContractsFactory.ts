import { atom } from 'jotai'
import {$rpcConfig, getProvider, RpcConfig} from "../../../core/models/rpcConfigModel";
import {accountManagerAbi, assetsManagerAbi, erc1155Abi} from "../../../core/abis";
import {Contract, ethers} from "ethers";
import {BcAsset} from "../types";

type AssetManager = Contract & {
  listAssets: () => Promise<BcAsset[]>
}

export const $assetsTokenSmartContract = atom<AssetManager>((get) => {
  const rpcConfig = get($rpcConfig) as RpcConfig
  const provider = getProvider()
  const abi = [
    ...erc1155Abi,
    ...assetsManagerAbi,
    ...accountManagerAbi,
  ]
  const smartContract = new ethers.Contract(rpcConfig.assetsTokenAddress, abi, provider);
  const signer = provider.getSigner()
  if (signer._address) {
    return smartContract.connect(provider.getSigner()) as AssetManager
  } else {
    return smartContract as AssetManager
  }
})
