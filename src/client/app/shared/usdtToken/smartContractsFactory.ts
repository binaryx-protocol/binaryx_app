import { atom } from 'jotai'
import {Contract, ethers} from "ethers";
import {$rpcConfig, getProvider, RpcConfig} from "../../core/models/rpcConfigModel";
import {erc20Abi} from "../../core/abis";
import {$isAccountConnected, $metaMaskState} from "../../core/models/metaMaskModel";
import {loadable} from "jotai/utils";

type UsdtManager = Contract & {
  demoMint: (amount: number) => Promise<void>
}

export const $usdtSmartContract = atom<UsdtManager>((get) => {
  const rpcConfig = get($rpcConfig) as RpcConfig
  const provider = getProvider()
  const abi = [
    ...erc20Abi,
    `function demoMint(uint256 amount) public`
  ]
  const smartContract = new ethers.Contract(rpcConfig.usdtL2Address, abi, provider);
  const isAccountConnected = get($isAccountConnected)
  if (isAccountConnected) {
    return smartContract.connect(provider.getSigner()) as UsdtManager
  } else {
    return smartContract as UsdtManager
  }
})

export const $usdtBalanceAsync = atom<Promise<number>>(async (get) => {
  const isAccountConnected = get($isAccountConnected)
  if (!isAccountConnected) {
    return 0;
  }
  const sc = get($usdtSmartContract)
  return (await sc.balanceOf(get($metaMaskState).values.accounts?.[0])).toNumber() / 1e6
})

export const $usdtBalance = loadable($usdtBalanceAsync)
