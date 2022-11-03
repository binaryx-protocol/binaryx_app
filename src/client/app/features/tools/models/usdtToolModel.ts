import { atom } from 'jotai'
import {$rpcConfig, NewRpcToken, RpcConfig} from "../../../core/models/rpcConfigModel";
import {completeAction, isDoneAction} from "../../../utils/isDoneActionLs";
import {$usdtSmartContractSigned} from "../../../shared/usdtToken/smartContractsFactory";

const usdtToolToken: NewRpcToken = {
  type: 'ERC20',
  options: {
    address: '',
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
      const rpcConfig = get($rpcConfig) as RpcConfig
      usdtToolToken.options.address = rpcConfig.usdtL2Address
      await ethereum.request({ method: 'wallet_watchAsset', params: usdtToolToken })
        .then(() => completeAction('addUsdtToolToken'))
        .catch((err: any) => {
          console.error(err);
        });
    }

    // mint
    const manager = get($usdtSmartContractSigned)
    await manager.demoMint(amount)
  }
)
