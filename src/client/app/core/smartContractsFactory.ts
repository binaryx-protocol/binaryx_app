import {ethers} from "ethers";
import {accountManagerAbi, assetsManagerAbi, erc1155Abi} from "./abis";
import {getProvider, RpcConfig} from "../models/rpcConfigModel";

export const getAssetsManagerSc = ($rpcConfig: RpcConfig) => {
  const provider = getProvider()
  const abi = [
    ...erc1155Abi,
    ...assetsManagerAbi,
    ...accountManagerAbi,
  ]
  const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, abi, provider);
  return manager.connect(provider.getSigner())
}
