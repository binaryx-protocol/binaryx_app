import {Chain} from "wagmi";
import deploysArbitrumGoerli from '../../../deploys/arbitrumGoerli.json'
import deploysLocalhost from '../../../deploys/localhost.json'

export enum SupportedChainId {
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,
}

export type ContractAddresses = {
  bnrxRootToken: string;
  usdtL1Address: string;
  usdtL2Address: string;
  assetsTokenAddress: string;
  controllerAddress: string;
}

export type ChainInfo = {
  chainInfo: Chain,
  contractsAddresses: ContractAddresses
}
export type ChainsInfo = {
  [key in SupportedChainId]: ChainInfo;
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

export const arbitrumFork: Chain = {
  id: SupportedChainId.ARBITRUM_ONE,
  rpcUrls: {
    default: `http://127.0.0.1:8545/`,
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

export const arbitrumGoerli: Chain = {
  id: SupportedChainId.ARBITRUM_GOERLI,
  rpcUrls: {
    default: 'https://goerli-rollup.arbitrum.io/rpc',
  },
  name: 'Arbitrum_Goerli',
  network: 'Arbitrum_Goerli',
  nativeCurrency: {name: 'AGOR', symbol: 'AGOR', decimals: 18},
  blockExplorers: {
    default: {
      url: 'https://goerli.arbiscan.io/',
      name: 'arbiscan_goerli'
    }
  }
}

export const CHAIN_INFO: ChainsInfo = {
  [SupportedChainId.ARBITRUM_ONE]: {
    chainInfo: arbitrum,
    contractsAddresses: {
      bnrxRootToken: deploysLocalhost.BNRXToken,
      usdtL1Address: '',
      usdtL2Address: deploysLocalhost.Usdt,
      assetsTokenAddress: deploysLocalhost.AssetsManager,
      controllerAddress: deploysLocalhost.Controller
    }
  },
  [SupportedChainId.ARBITRUM_GOERLI]: {
    chainInfo: arbitrumGoerli,
    contractsAddresses: {
      bnrxRootToken: deploysArbitrumGoerli.BNRXToken,
      usdtL1Address: '',
      usdtL2Address: deploysArbitrumGoerli.Usdt,
      assetsTokenAddress: deploysArbitrumGoerli.AssetsManager,
      controllerAddress: deploysArbitrumGoerli.Controller
    },
  }
}
export const getActiveConfig = () :ChainInfo | null => {
  if (typeof window !== "undefined") {
    const configNameByDomain =
      {
        'localhost': CHAIN_INFO[SupportedChainId.ARBITRUM_GOERLI],
        'dev.binaryx.com': CHAIN_INFO[SupportedChainId.ARBITRUM_GOERLI],
        'staging.binaryx.com': CHAIN_INFO[SupportedChainId.ARBITRUM_GOERLI],
        'i2.binaryx.com': CHAIN_INFO[SupportedChainId.ARBITRUM_GOERLI],
      }[window.location.hostname];
    return configNameByDomain!;
  }
  return null;
}

