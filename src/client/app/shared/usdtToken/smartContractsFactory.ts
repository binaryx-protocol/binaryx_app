import { atom } from 'jotai'
import {Contract, ethers} from "ethers";
import {$publicRpcProvider, $rpcConfig, $userRpcProvider, RpcConfig} from "../../core/models/rpcConfigModel";
import {erc20Abi} from "../../core/abis";
import {$isAccountConnected, $metaMaskState} from "../../core/models/metaMaskModel";
import {loadable} from "jotai/utils";

export type UsdtManager = Contract & {
  demoMint: (amount: number) => Promise<void>
}

const abi = [
  ...erc20Abi,
  `function demoMint(uint256 amount) public`
]

export const $usdtSmartContractPublic = atom<UsdtManager>((get) => {
  const rpcConfig = get($rpcConfig) as RpcConfig
  const provider = get($publicRpcProvider) as ethers.providers.JsonRpcProvider
  return new ethers.Contract(rpcConfig.usdtL2Address, abi, provider) as UsdtManager
})

export const $usdtSmartContractSigned = atom<UsdtManager>((get) => {
  const rpcConfig = get($rpcConfig) as RpcConfig
  const provider = get($userRpcProvider) as ethers.providers.JsonRpcProvider
  const smartContract = new ethers.Contract(rpcConfig.usdtL2Address, abi, provider);
  return smartContract.connect(provider.getSigner()) as UsdtManager
})

export const $usdtBalanceAsync = atom<Promise<number>>(async (get) => {
  const isAccountConnected = get($isAccountConnected)
  if (!isAccountConnected) {
    return 0;
  }
  const sc = get($usdtSmartContractPublic)
  return (await sc.balanceOf(get($metaMaskState).values.accounts?.[0])).toNumber() / 1e6
})

export const $usdtBalance = loadable($usdtBalanceAsync)
