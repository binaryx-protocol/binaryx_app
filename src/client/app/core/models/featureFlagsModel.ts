import { atom } from 'jotai'
import getUrlParams from '../../utils/getUrlParams';

type FeatureFlags = {
    FF_MM: boolean;
    FF_LP_PARALLAX: boolean;
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

const isStaging = window.location.hostname === 'i2.binaryx.com'

export const $featureFlags = atom<FeatureFlags>({
    FF_MM: isStaging || getFlag('FF_MM') === 'true',
    FF_LP_PARALLAX: getFlag('FF_LP_PARALLAX') === 'true'
})
