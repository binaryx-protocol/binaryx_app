// @ts-nocheck
import {atom, PrimitiveAtom} from 'jotai'
import * as metaMaskModel from "../../../core/models/metaMaskModel";
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {BcAsset, BcAssetMetaData, UiAssetComputed} from "../types";
import {arbClient} from "./arbClient";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {bnToInt, onlyFields} from "../../../utils/objectUtils";
import {RpcConfig} from "../../../core/models/rpcConfigModel";

// stores
export const $asset = atom(null) as PrimitiveAtom<BcAsset | null>;
export const $assetMetaData = atom(null) as PrimitiveAtom<BcAssetMetaData | null>;

// getters
export const $assetComputed = atom<UiAssetComputed | null>((get) => {
  const asset = get($asset)
  const assetMetaData = get($assetMetaData)
  if (!asset || !assetMetaData) {
    return null
  }
  const tokensTotalSupply = bnToInt(asset.tokenInfo_totalSupply)
  const tokensLeft = bnToInt(assetMetaData.tokensLeft)
  const tokensSold = tokensTotalSupply - tokensLeft
  const progress = (tokensSold / tokensTotalSupply)
  const result = {
    tokensSold,
    tokensLeft,
    progress,
  }
  return result
});

// setters
export const $doLoadAsset = atom(null, async (get,set, args: { id: number }) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  // TODO - move provider into RPC
  const $rpcConfig = get(rpcConfigModel.$rpcConfig) as RpcConfig
  const bcAsset = await arbClient.getAsset(
    $rpcConfig,
    { id: args.id }
  );

  // TODO - move provider into RPC
  const tokenInfo = await arbClient.getAssetTokenInfo(
    $rpcConfig,
    { id: args.id }
  );

  set($asset, onlyFields(bcAsset));
  set($assetMetaData, tokenInfo);
})
