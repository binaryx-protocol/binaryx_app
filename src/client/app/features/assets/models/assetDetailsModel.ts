import {atom, PrimitiveAtom} from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {BcAsset} from "../types";
import {arbClient} from "./arbClient";
import {waitFor} from "../../../utils/pageLoadUtiils";

export const $asset = atom(null) as PrimitiveAtom<BcAsset | null>;

export const $doLoadAsset = atom(null, async (get,set, args: { id: number }) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  // TODO - move provider into RPC
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)
  const result = await arbClient.getAsset(
    $rpcConfig,
    { id: args.id }
  );
  set($asset, result);
})
