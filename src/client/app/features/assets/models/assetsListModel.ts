import { atom } from 'jotai'
import {loadable} from "jotai/utils";
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {AssetStatuses, BcAsset} from "../types";
import {arbClient} from "./arbClient";
import {$assetsTokenSmartContract} from "./smartContractsFactory";

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

export const $blockchainAssetsAsync = atom<Promise<BcAsset[]>>(async (get) => {
  const manager = get($assetsTokenSmartContract)
  return await manager.listAssets()
})

export const $blockchainAssets = loadable($blockchainAssetsAsync)
