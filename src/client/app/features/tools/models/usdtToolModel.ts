import { atom } from 'jotai'
import {NewRpcToken} from "../../../core/models/rpcConfigModel";
import {completeAction, isDoneAction} from "../../../utils/isDoneActionLs";
import {$usdtSmartContract} from "../../../shared/usdtToken/smartContractsFactory";

const usdtToolToken: NewRpcToken = {
  type: 'ERC20',
  options: {
    address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    symbol: 'USDTT',
    decimals: 6,
    image: '',
  },
}

export const $doMint = atom(
  null,
  async (get, set, { amount }: { amount: number }) => {
    // watch
    const ethereum = window.ethereum

    if (!isDoneAction('addUsdtToolToken')) {
      await ethereum.request({ method: 'wallet_watchAsset', params: usdtToolToken })
        .then(() => completeAction('addUsdtToolToken'))
        .catch((err: any) => {
          console.error(err);
        });
    }

    // mint
    const manager = get($usdtSmartContract)
    await manager.demoMint(amount)
  }
)
