import {configureChains, createClient} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";
import {SUPPORTED_CHAINS} from "../shared/walletsConnect";

const { chains, provider } = configureChains(SUPPORTED_CHAINS, [
    jsonRpcProvider({
        rpc: (chain) => {
            return {http: chain.rpcUrls.default}
        },
    })
])

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const client = createClient({
  autoConnect: false,
  provider,
  connectors: [
    metaMaskConnector,
    injectedConnector,
  ],
})
