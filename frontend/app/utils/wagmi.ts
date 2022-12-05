import {arbitrumFork, getActiveConfig} from 'shared/walletsConnect';
import {configureChains, createClient} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import {jsonRpcProvider} from "wagmi/providers/jsonRpc";

const activeConfig = getActiveConfig();
const supportedChains = activeConfig !== undefined ? activeConfig.chainInfo : arbitrumFork;
const { chains, provider } = configureChains([supportedChains!], [
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
