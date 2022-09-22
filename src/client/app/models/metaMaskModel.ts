import { atom } from 'jotai'

type TAccountAddress = string
const KNOWN_CHAINS = {
    '0x1': 'Ethereum Main Network (Mainnet)',
    '0x3': 'Ropsten',
    '0x4': 'Rinkeby',
    '0x5': 'Goerli',
    '0x2a': 'Kovan',
}

type TKnownChainId = keyof typeof KNOWN_CHAINS

type TMetaMaskState = {
    accounts: TAccountAddress[] | null
    chainId: TKnownChainId | null
    isConnected: boolean | null
}

export const $metaMaskState = atom<TMetaMaskState>({
    accounts: null,
    chainId: null,
    isConnected: null,
})

export const $onAccountsConnectOrDisconnect = atom(
    null,
    (get, set, accounts: TAccountAddress[]) => {
        console.log('$onAccountsConnectOrDisconnect', accounts)
        const prevState = get($metaMaskState)
        set(
            $metaMaskState,
            { ...prevState, accounts }
        )
    },
)

export const $onChainIdChange = atom(
    null,
    (get, set, chainId: TKnownChainId) => {
        console.log('$onChainIdChange', chainId)
        const prevState = get($metaMaskState)
        set(
            $metaMaskState,
            { ...prevState, chainId }
        )
    },
)

export const $onIsConnectedChange = atom(
    null,
    (get, set, isConnected: boolean) => {
        console.log('$onIsConnectedChange', isConnected)
        const prevState = get($metaMaskState)
        set(
            $metaMaskState,
            { ...prevState, isConnected }
        )
    },
)
