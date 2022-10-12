import { atom } from 'jotai'
import {$rpcConfig} from "./rpcConfigModel";
import {completeAction, isDoneAction} from "../utils/isDoneActionLs";

type AccountAddress = string
const KNOWN_CHAINS = {
    '0x1': 'Ethereum Main Network (Mainnet)',
    '0x3': 'Ropsten',
    '0x4': 'Rinkeby',
    '0x5': 'Goerli',
    '0x2a': 'Kovan',
    '0x66eeb': 'Arbitrum (Rinkeby)',
}

type KnownChainId = keyof typeof KNOWN_CHAINS
type WalletReadiness = 'init' | 'ready'

type MetaMaskState = {
    accounts: AccountAddress[] | null
    chainId: KnownChainId | null
    isConnected: boolean | null
}

export const $metaMaskState = atom<MetaMaskState>({
    accounts: null,
    chainId: null,
    isConnected: null,
})

export const $walletReadiness = atom<WalletReadiness>((get) => {
  const s = get($metaMaskState)
  if (s.isConnected && s.accounts?.[0] && s.chainId) {
    return 'ready'
  }
  return 'init'
})

export const $onBrowserInit = atom(
    null,
    (get, set) => {
        set($walletConnect)
    }
)

export const $walletConnect = atom(
    null,
    (get, set) => {
        console.log('$walletConnect')

        const rpcConfig = get($rpcConfig)
        if (rpcConfig === null) {
            console.error('rpcConfig is missing')
            return
        }

        const update = (object: Partial<MetaMaskState>) => {
            const prevState = get($metaMaskState)
            set(
                $metaMaskState,
                { ...prevState, ...object }
            )
        }

        const main = async () => {
            const ethereum = window.ethereum
            update({ isConnected: ethereum.isConnected() })
            const onAccountsConnectOrDisconnect = (accounts: AccountAddress[]) => update({ accounts })
            const onChainIdChange = (chainId: KnownChainId) => update({ chainId })

            await ethereum.request({ method: 'eth_requestAccounts' })
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

            if (!isDoneAction('addRpc')) {
                await ethereum.request({ method: 'wallet_addEthereumChain', params: [rpcConfig.chain] })
                    .then(() => completeAction('addRpc'))
                    .catch((err) => {
                        console.error(err);
                    });

            }

            if (!isDoneAction('addBnrxRootToken')) {
                await ethereum.request({ method: 'wallet_watchAsset', params: rpcConfig.bnrxRootToken })
                    .then(() => completeAction('addBnrxRootToken'))
                    .catch((err) => {
                        console.error(err);
                    });
            }

            await ethereum.request({ method: 'eth_accounts' })
                .then(onAccountsConnectOrDisconnect)

            await ethereum.request({ method: 'eth_chainId' })
                .then(onChainIdChange)

            ethereum.on('accountsChanged', onAccountsConnectOrDisconnect);
            ethereum.on('chainChanged', onChainIdChange);
        }

        main()

        // NOTE: more docs at https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion

        // TODO handle connect & disconnect
        // TODO handle https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods wallet_registerOnboarding
        // TODO wallet_switchEthereumChain https://docs.metamask.io/guide/rpc-api.html#usage-with-wallet-switchethereumchain
    }
)
