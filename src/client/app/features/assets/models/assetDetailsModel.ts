import {atom, PrimitiveAtom} from 'jotai'
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {BcAsset, BcAssetMetaData, UiAssetComputed} from "../types";
import {arbClient} from "./arbClient";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {RpcConfig} from "../../../core/models/rpcConfigModel";
import {$assetsTokenSmartContract} from "./smartContractsFactory";

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
  const tokensTotalSupply = asset.tokenInfo_totalSupply.toNumber()
  const tokensLeft = assetMetaData.tokensLeft.toNumber()
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
  // TODO check what if no MM connected
  await waitFor(() => {
    return !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const rpcConfig = get(rpcConfigModel.$rpcConfig) as RpcConfig
  const manager = get($assetsTokenSmartContract)
  const bcAsset = await manager.getAsset(args.id);
  const tokensLeft = await manager.balanceOf(rpcConfig.assetsTokenAddress, args.id)

  set($asset, bcAsset);
  set($assetMetaData, {
    tokensLeft
  });
})
