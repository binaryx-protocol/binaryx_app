// @ts-nocheck

import { atom } from 'jotai'
import {ethers} from "ethers";
import {ChainInfo, getActiveConfig} from "../../shared/walletsConnect";
import {$featureFlags} from "./featureFlagsModel";

// computed
export const $rpcConfig = atom<ChainInfo | null>((get) => {
  const featureFlags = get($featureFlags)
  return getActiveConfig(featureFlags.FF_RPC_NAME)
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

