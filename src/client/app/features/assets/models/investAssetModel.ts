// @ts-nocheck
import {atom} from 'jotai'
import {waitFor} from "../../../utils/pageLoadUtiils";
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {arbClient} from "./arbClient";
import {BcAsset} from "../types";
import {bnToInt} from "../../../utils/objectUtils";
import {RpcConfig} from "../../../core/models/rpcConfigModel";

// export const $amount = atom(1);
//
// export const $onAmountChange = atom(null, async (get,set, e: UiInputChangeEvent) => {
//   set($amount, parseInt(e.target.value));
// })

export const $onSubmit = atom(null, async (get,set, { asset, id, amount, then }: { asset: BcAsset, id: number, amount: number, then: () => void }) => {
  await waitFor(() => {
    return !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig) as RpcConfig
  if (!amount) {
    throw new Error('amount is required')
  }
  const amountInMicro = estimateCost(asset, amount)
  if (!amountInMicro) {
    throw new Error('amountInMicro is required')
  }
  await arbClient.approveUsdt(
    $rpcConfig,
    { amountInMicro }
  );

  // TODO 0 -> asset.id
  await arbClient.investUsingUsdt($rpcConfig, { id, tokensToBuyAmount: amount })
  then()
})

const estimateCost = (asset: BcAsset, tokensAmount: number) => bnToInt(asset.tokenInfo_tokenPrice) * tokensAmount * 1e4;
