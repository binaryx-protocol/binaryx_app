import { atom } from 'jotai'
import {loadable} from "jotai/utils";
import {BcAsset} from "../types";
import {$assetsTokenSmartContractPublic, AssetManager} from "./smartContractsFactory";
import {waitFor} from "../../../utils/pageLoadUtiils";

// export const $doActivate = atom(null, async (get, set, args: { id: number }) => {
//   const $rpcConfig = get(rpcConfigModel.$rpcConfig)
//
//   if ($rpcConfig) {
//     await arbClient.setStatus(
//       $rpcConfig,
//       { id: args.id, status: AssetStatuses.active },
//     );
//   } else {
//     throw new Error("Wallet is not connected or config is not provided");
//   }
// })

export const $blockchainAssetsAsync = atom<Promise<[BcAsset[], any] | null>>(async (get) => {
  await waitFor(() => !!get($assetsTokenSmartContractPublic))
  const manager = get($assetsTokenSmartContractPublic) as AssetManager
  return await manager.listAssets()
})

export const $blockchainAssets = loadable($blockchainAssetsAsync)
