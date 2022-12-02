import {toHex} from "../utils/toHex";
import {Chain} from "wagmi";

export enum SupportedChainId {
  ARBITRUM_ONE = 42161,
}

export type ChainsInfo = {
  [key in SupportedChainId]: any;
}

const arbitrum: Chain = {
  id: SupportedChainId.ARBITRUM_ONE,
  rpcUrls: {
    default: `https://arb1.arbitrum.io/rpc`,
  },
  name: 'Arbitrum',
  network: 'Arbitrum',
  nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
  blockExplorers: {
    default: {
      url: 'https://arbiscan.io/',
      name: 'arbiscan'
    }
  }
}

export const CHAIN_INFO: ChainsInfo = {
  [SupportedChainId.ARBITRUM_ONE]:{
    ...arbitrum,
    usdtL2Address:'',
  },
}

export const SUPPORTED_CHAINS = [arbitrum];

