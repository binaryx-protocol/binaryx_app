import {atom, PrimitiveAtom} from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {AssetInput} from "../types";
import {arbClient} from "./arbClient";

export const $asset = atom(null) as PrimitiveAtom<AssetInput | null>;

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

export const waitFor = async (selector: () => boolean, timeout: number = 30) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const result = selector()
      // @ts-ignore
      if (!!result) {
        clearInterval(interval);
        resolve(result);
      }
    }, 5);
    setTimeout(() => {
      reject()
      clearInterval(interval);
    }, timeout * 1000)
  });
};
