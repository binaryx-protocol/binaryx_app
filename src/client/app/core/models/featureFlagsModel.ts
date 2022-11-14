import { atom } from 'jotai'
import getUrlParams from '../../utils/getUrlParams';

type FeatureFlags = {
  FF_MM: boolean;
  FF_LP_PARALLAX: boolean;
  FF_RPC_NAME: string;
}

const localStorage = typeof window !== 'undefined'
  ? window.localStorage
  : { getItem(){} }

function getFlagFromUrl(flagName: string) {
  return getUrlParams().get(flagName);
}

function getFlag(flagName: string) {
  return getFlagFromUrl(flagName) || localStorage.getItem(flagName);
}

const isStaging = typeof window !== 'undefined' &&  window.location.hostname === 'i2.binaryx.com'
const isLocalhost = typeof window !== 'undefined' &&  window.location.hostname === 'localhost'

export const $featureFlags = atom<FeatureFlags>({
  FF_MM: isLocalhost || isStaging || getFlag('FF_MM') === 'true',
  FF_LP_PARALLAX: getFlag('FF_LP_PARALLAX') === 'true',
  FF_RPC_NAME: getFlag('FF_RPC_NAME') || '',
})
