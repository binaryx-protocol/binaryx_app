import {atom, PrimitiveAtom} from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {bnToInt, onlyFields} from "../../../utils/objectUtils";
import {rpcClient} from "./rpcClient";

// stores
export const $rewards = atom(null) as PrimitiveAtom<any | null>;

// getters
export const $accountInfo = atom<any | null>((get) => {

});

// setters
export const $doLoadMyRewards = atom(null, async (get) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig)
  const rewards = await rpcClient.getMyRewardsPerAsset(
    $rpcConfig
  );

  console.log('rewards', rewards)
})
