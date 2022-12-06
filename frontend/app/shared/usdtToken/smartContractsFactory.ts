import { atom } from 'jotai'
import {Contract, ethers} from "ethers";
import {$publicRpcProvider, $rpcConfig, $userRpcProvider} from "../../core/models/rpcConfigModel";
import {erc20Abi} from "../../core/abis";
import {loadable} from "jotai/utils";
import {ChainInfo} from "../walletsConnect";
import {$connectedAccount} from "../../core/models/walletModel";

export type UsdtManager = Contract & {
  demoMint: (amount: number) => Promise<void>
}

const abi = [
  ...erc20Abi,
  `function demoMint(uint256 amount) public`
]

export const $usdtSmartContractPublic = atom<UsdtManager>((get) => {
  const rpcConfig = get($rpcConfig) as ChainInfo
  const provider = get($publicRpcProvider) as ethers.providers.JsonRpcProvider
  return new ethers.Contract(rpcConfig.contractsAddresses.usdtL2Address, abi, provider) as UsdtManager
})

export const $usdtSmartContractSigned = atom<UsdtManager>((get) => {
  const rpcConfig = get($rpcConfig) as ChainInfo
  const provider = get($userRpcProvider) as ethers.providers.JsonRpcProvider
  const smartContract = new ethers.Contract(rpcConfig.contractsAddresses.usdtL2Address, abi, provider);
  return smartContract.connect(provider.getSigner()) as UsdtManager
})

// TODO move ?
export const $usdtBalanceAsync = atom<Promise<number>>(async (get) => {
  const isAccountConnected = get($connectedAccount)
  if (!isAccountConnected) {
    return 0;
  }
  const sc = get($usdtSmartContractPublic)
  return (await sc.balanceOf(get($connectedAccount))).toNumber() / 1e6
})

export const $usdtBalance = loadable($usdtBalanceAsync)
//
export const $usdtBnrxBalanceAsync = atom<Promise<number>>(async (get) => {
  const isAccountConnected = get($connectedAccount)
  if (!isAccountConnected) {
    return 0;
  }
  const sc = get($usdtSmartContractPublic)
  const rpcConfig = get($rpcConfig) as ChainInfo
  return (await sc.balanceOf(rpcConfig.contractsAddresses.assetsTokenAddress)).toNumber() / 1e6
})

export const $usdtBnrxBalance = loadable($usdtBnrxBalanceAsync)
