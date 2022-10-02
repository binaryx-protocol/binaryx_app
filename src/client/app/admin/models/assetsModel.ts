import { atom } from 'jotai'
import * as metaMaskModel from "../../models/metaMaskModel";
import {loadable} from "jotai/utils";

export const $blockchainAssetsAsync = atom<any>(async (get) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  if ($walletReadiness === 'ready') {
    console.log('Getting assets')
  } else {
    console.log('waiting for wallet')
  }
})

export const $blockchainAssets = loadable($blockchainAssetsAsync)
