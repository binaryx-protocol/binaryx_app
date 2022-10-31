// @ts-nocheck
import { atom } from 'jotai'
import * as metaMaskModel from "../../../core/models/metaMaskModel";
import {loadable} from "jotai/utils";
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {AssetStatuses, BcAsset} from "../types";
import {arbClient} from "./arbClient";

export const $doActivate = atom(null, async (get, set, args: { id: number }) => {
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($rpcConfig) {
    await arbClient.setStatus(
      $rpcConfig,
      { id: args.id, status: AssetStatuses.active },
    );
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

export const $doDisable = atom(null, async (get, set, args: { id: number }) => {
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($rpcConfig) {
    await arbClient.setStatus(
      $rpcConfig,
      { id: args.id, status: AssetStatuses.disabled },
    );
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

export const $blockchainAssetsAsync = atom<BcAsset[]>(async (get) => {
  get(metaMaskModel.$metaMaskState)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($rpcConfig) {
    console.log('listAssets')
    return await arbClient.listAssets($rpcConfig)
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

export const $blockchainAssets = loadable($blockchainAssetsAsync)
