// @ts-nocheck

import { atom } from 'jotai'
import {ethers} from "ethers";
import {ChainInfo, getActiveConfig} from "../../shared/walletsConnect";

// computed
export const $rpcConfig = atom<ChainInfo | null>((get) => {
  return getActiveConfig()
})

export const $publicRpcProvider = atom<ethers.providers.JsonRpcProvider | null>((get) => {
  const rpcConfig = get($rpcConfig)
  if (!rpcConfig) {
    return null
  }
  return new ethers.providers.JsonRpcProvider(rpcConfig.chainInfo.rpcUrls.default)
})

export const $userRpcProvider = atom<ethers.providers.JsonRpcProvider | null>((get) => {
  const rpcConfig = get($rpcConfig)
  if (!rpcConfig) {
    return null
  }
  return new ethers.providers.Web3Provider(window.ethereum)
})

