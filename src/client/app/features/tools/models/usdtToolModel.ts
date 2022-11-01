import { atom } from 'jotai'
import {waitFor} from "../../../utils/pageLoadUtiils";
import {$rpcConfig, NewRpcToken, RpcConfig} from "../../../core/models/rpcConfigModel";
import {completeAction, isDoneAction} from "../../../utils/isDoneActionLs";
import {$usdtToolSmartContract} from "./smartContractsFactory";
import {$isAccountConnected} from "../../../core/models/metaMaskModel";

const usdtToolToken: NewRpcToken = {
  type: 'ERC20',
  options: {
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    symbol: 'USDTT',
    decimals: 6,
    image: '',
  },
}

export const $doWatchUsdtTool = atom(
  null,
  async (get, set) => {
    await waitFor(() => !!get($rpcConfig))
    const rpcConfig = get($rpcConfig) as RpcConfig
    const ethereum = window.ethereum

    if (!isDoneAction('addUsdtToolToken')) {
      await ethereum.request({ method: 'wallet_watchAsset', params: usdtToolToken })
        .then(() => completeAction('addUsdtToolToken'))
        .catch((err: any) => {
          console.error(err);
        });
    }
  }
)

export const $doMint = atom(
  null,
  async (get, set, { amount }: { amount: number }) => {
    await waitFor(() => get($isAccountConnected))

    const manager = get($usdtToolSmartContract)
    await manager.demoMint(amount)
  }
)
