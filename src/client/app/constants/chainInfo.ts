import {toHex} from "../utils/toHex";
import {Chain} from "wagmi";

export enum SupportedChainId {
  ARBITRUM_ONE = 42161,
}

export type ChainInfo = {
  [key in SupportedChainId]: Chain;
}

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.ARBITRUM_ONE]:{
    id: SupportedChainId.ARBITRUM_ONE,
    rpcUrls:{
      default: `https://arb1.arbitrum.io/rpc`,
    },
    name: 'Arbitrum',
    network: 'Arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorers:{
      default:{
        url: 'https://arbiscan.io/',
        name:'arbiscan'
      }
    }
  }
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId).filter(
  (id) => typeof id === 'number'
) as SupportedChainId[];

