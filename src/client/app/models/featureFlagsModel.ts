import { atom } from 'jotai'

type TFeatureFlags = {
    FF_MM: boolean
}

const localStorage = typeof window !== 'undefined'
    ? window.localStorage
    : { getItem(){} }

export const $featureFlags = atom<TFeatureFlags>({
    FF_MM: localStorage.getItem('FF_MM') === 'true'
})
