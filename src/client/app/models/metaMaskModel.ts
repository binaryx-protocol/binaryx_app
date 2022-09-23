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

export const $onBrowserInit = atom(
    null,
    (get, set) => {
        const update = (object: Partial<TMetaMaskState>) => {
            const prevState = get($metaMaskState)
            set(
                $metaMaskState,
                { ...prevState, ...object }
            )
        }
        const ethereum = window.ethereum

        update({ isConnected: ethereum.isConnected() })

        const onAccountsConnectOrDisconnect = (accounts: TAccountAddress[]) => update({ accounts })
        const onChainIdChange = (chainId: TKnownChainId) => update({ chainId })

        ethereum.on('accountsChanged', onAccountsConnectOrDisconnect);
        ethereum.on('chainChanged', onChainIdChange);

        ethereum.request({ method: 'eth_chainId' })
            .then(onChainIdChange)

        ethereum.request({ method: 'eth_accounts' })
            .then(onAccountsConnectOrDisconnect)

        ethereum.request({ method: 'eth_requestAccounts' })
            .then(onAccountsConnectOrDisconnect)
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
    }
)
