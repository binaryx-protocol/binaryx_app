import {atom, PrimitiveAtom} from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {AssetInput} from "../types";
import {arbClient} from "./arbClient";

export const $asset = atom(null) as PrimitiveAtom<AssetInput | null>;

export const $doLoadAsset = atom(null, async (get,set, args: { id: number }) => {
  await new Promise((r) => setTimeout(r, 3000))

  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  })

  // TODO - move provider into RPC
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)
  const result = await arbClient.getAsset(
    $rpcConfig,
    { id: args.id }
  );
  set($asset, result);
})

export const waitFor = async (selector: () => boolean) => {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const result = selector()
      // @ts-ignore
      if (!!result) {
        clearInterval(interval);
        resolve(result);
      }
    }, 5);
  });
};
