import { atom } from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import {loadable} from "jotai/utils";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import { AssetStatuses} from "../types";
import {arbClient} from "./arbClient";

export const $doActivate = atom(null, async (get, set, args: { id: number }) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($walletReadiness === 'ready' && $rpcConfig) {
    await arbClient.setStatus(
      $rpcConfig,
      { id: args.id, status: AssetStatuses.active },
    );
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

export const $doDisable = atom(null, async (get, set, args: { id: number }) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($walletReadiness === 'ready' && $rpcConfig) {
    await arbClient.setStatus(
      $rpcConfig,
      { id: args.id, status: AssetStatuses.disabled },
    );
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

export const $blockchainAssetsAsync = atom<any>(async (get) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  get(metaMaskModel.$metaMaskState)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($walletReadiness === 'ready' && $rpcConfig) {
    return await arbClient.listAssets($rpcConfig)
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

export const $blockchainAssets = loadable($blockchainAssetsAsync)
