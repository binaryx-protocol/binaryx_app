import { atom } from 'jotai'

type FeatureFlags = {
    FF_MM: boolean
}

const localStorage = typeof window !== 'undefined'
    ? window.localStorage
    : { getItem(){} }

export const $featureFlags = atom<FeatureFlags>({
    FF_MM: localStorage.getItem('FF_MM') === 'true'
})
