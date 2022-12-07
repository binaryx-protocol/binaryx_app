import {atom, PrimitiveAtom} from 'jotai'
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {BcAsset, BcAssetMetaData, UiAssetComputed} from "../types";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {$assetsTokenSmartContractPublic, AssetManager} from "./smartContractsFactory";
import {truncatePercentage} from "../../../utils/formatNumber";
import {ChainInfo} from "../../../shared/walletsConnect";

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
  const progress = truncatePercentage((tokensSold / tokensTotalSupply) * 100)
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

  const rpcConfig = get(rpcConfigModel.$rpcConfig) as ChainInfo
  const tokensLeft = await manager.balanceOf(rpcConfig.contractsAddresses.assetsTokenAddress, args.id)

  set($asset, bcAsset);
  set($assetMetaData, {
    tokensLeft
  });
})
