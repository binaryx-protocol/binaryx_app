/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Window {
        dataLayer: Record<string, unknown>[]
        fbq?: (...args: unknown) => void
        _learnq?: unknown[]
        ethereum?: unknown
    }
}

export {}
