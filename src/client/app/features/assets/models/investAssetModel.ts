import {atom} from 'jotai'
import {SyntheticEvent} from "react";
import {waitFor} from "../../../utils/pageLoadUtiils";
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {arbClient} from "./arbClient";
import {BcAsset} from "../types";

export const $amount = atom(1);

export const $onAmountChange = atom(null, async (get,set, e: SyntheticEvent) => {
  set($amount, parseInt(e.target.value));
})

export const $onSubmit = atom(null, async (get,set, args: { asset: BcAsset }) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  const amountInMicro = estimateCost(args.asset, get($amount))
  if (!amountInMicro) {
    throw new Error('Amount is required')
  }
  await arbClient.approveUsdt(
    $rpcConfig,
    { amountInMicro }
  );
})

const estimateCost = (asset: BcAsset, tokensAmount) => asset.tokenInfo_tokenPrice * tokensAmount * 10e4;
