import {atom} from 'jotai'
import {SyntheticEvent} from "react";
import {waitFor} from "../../../utils/pageLoadUtiils";
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {arbClient} from "./arbClient";
import {BcAsset} from "../types";
import {bnToInt} from "../../../utils/objectUtils";
import {UiInputChangeEvent} from "../../../types/globals";

export const $amount = atom(1);

export const $onAmountChange = atom(null, async (get,set, e: UiInputChangeEvent) => {
  set($amount, parseInt(e.target.value));
})

export const $onSubmit = atom(null, async (get,set, { asset, id, amount }: { asset: BcAsset, id: number, amount: number }) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig)
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
})

const estimateCost = (asset: BcAsset, tokensAmount) => bnToInt(asset.tokenInfo_tokenPrice) * tokensAmount * 10e4;
