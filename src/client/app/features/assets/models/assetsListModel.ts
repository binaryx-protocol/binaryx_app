import { atom } from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import {loadable} from "jotai/utils";
import {ethers} from "ethers";
import {assetsManagerAbi} from "./abis";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {RpcConfig} from "../../../models/rpcConfigModel";
import {AssetAddress, BcAsset, AssetStatuses} from "../types";
import {arbClient} from "./arbClient";

const assetAddressAttrs  = (): AssetAddress => ({
  country: 'UA',
  state: 'Che',
  city: 'Cherkassy',
  postalCode: '19600',
  addressLine1: 'Khreschatik 1',
  addressLine2: '5th floor',
})

const defaultAttrs = (): BcAsset => ({
  name: 'Name',
  symbol: 'SYM',
  title: 'Title ' + Math.random(),
  description: 'Description is a long story to tell you about the asset. Let\'s write it another time.',
  status: AssetStatuses.upcoming,
  originalOwner: 'REPLACE_ME',
  legalDocuments: ['https://google.com', 'https://mit.com'],
  // propertyAddress: assetAddressAttrs(),
})

export const $doCreateAsset = atom(null, async (get) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($walletReadiness === 'ready' && $rpcConfig) {
    await arbClient.createAsset(
      $rpcConfig,
      defaultAttrs()
    );
  } else {
    throw new Error("Wallet is not connected or config is not provided");
  }
})

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
