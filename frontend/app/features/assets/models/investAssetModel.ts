import {atom} from 'jotai'
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {BcAsset} from "../types";
import {bnToInt} from "../../../utils/objectUtils";
import {$usdtSmartContractSigned, UsdtManager} from "../../../shared/usdtToken/smartContractsFactory";
import {$assetsTokenSmartContractSigned, AssetManager} from "./smartContractsFactory";
import {ChainInfo} from "../../../shared/walletsConnect";

export const $onSubmit = atom(null, async (get,set, { asset, id, amount, then }: { asset: BcAsset, id: number, amount: number, then: () => void }) => {
  const rpcConfig = get(rpcConfigModel.$rpcConfig) as ChainInfo
  const usdtfTokenSigned = get($usdtSmartContractSigned) as UsdtManager
  const assetsTokenSigned = get($assetsTokenSmartContractSigned) as AssetManager

  // calc
  if (!amount) {
    throw new Error('amount is required')
  }
  const amountInMicro = estimateCost(asset, amount)
  if (!amountInMicro) {
    throw new Error('amountInMicro is required')
  }

  // TRX #1
  await usdtfTokenSigned.approve(rpcConfig.contractsAddresses.assetsTokenAddress, amountInMicro)

  // TRX #2
  await assetsTokenSigned.investUsingUsdt(id, amount)
  then()
})

const estimateCost = (asset: BcAsset, tokensAmount: number) => bnToInt(asset.tokenInfo_tokenPriceDe6) * tokensAmount * 1e4;

