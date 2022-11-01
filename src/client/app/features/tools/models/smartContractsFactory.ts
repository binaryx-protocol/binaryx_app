import { atom } from 'jotai'
import {$rpcConfig, getProvider, RpcConfig} from "../../../core/models/rpcConfigModel";
import { erc20Abi} from "../../../core/abis";
import {Contract, ethers} from "ethers";
import {$isAccountConnected, $metaMaskState} from "../../../core/models/metaMaskModel";

type UsdtToolManager = Contract & {
  mint: (ids: number[]) => Promise<any>
}

export const $usdtToolSmartContract = atom<UsdtToolManager>((get) => {
  const rpcConfig = get($rpcConfig) as RpcConfig
  const metaMaskState = get($metaMaskState)
  const provider = getProvider()
  const abi = [
    ...erc20Abi,
    `function demoMint(uint256 amount) public`
  ]
  const smartContract = new ethers.Contract(rpcConfig.usdtL2Address, abi, provider);
  const isAccountConnected = get($isAccountConnected)
  if (isAccountConnected) {
    return smartContract.connect(provider.getSigner()) as UsdtToolManager
  } else {
    return smartContract as UsdtToolManager
  }
})
