import {atom, PrimitiveAtom} from 'jotai'
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {BcAsset, BcAssetMetaData, UiAssetComputed} from "../types";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {RpcConfig} from "../../../core/models/rpcConfigModel";
import {$assetsTokenSmartContractPublic, AssetManager} from "./smartContractsFactory";

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
  await waitFor(() => !!get($assetsTokenSmartContractPublic), 3)

  const manager = get($assetsTokenSmartContractPublic) as AssetManager
  const bcAsset = await manager.getAsset(args.id);

  const rpcConfig = get(rpcConfigModel.$rpcConfig) as RpcConfig
  const tokensLeft = await manager.balanceOf(rpcConfig.assetsTokenAddress, args.id)

  set($asset, bcAsset);
  set($assetMetaData, {
    tokensLeft
  });
})
