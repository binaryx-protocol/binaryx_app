import {Chain} from "wagmi";
import deploysArbitrumGoerli from '../../../deploys/arbitrumGoerli.json'
import deploysLocalhost from '../../../deploys/localhost.json'

export enum SupportedChainId {
  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,
  LOCALHOST = 31337,
}

export type ContractAddresses = {
  bnrxRootToken: string;
  usdtL1Address: string;
  usdtL2Address: string;
  assetsTokenAddress: string;
  controllerAddress: string; // deprecated
  kycStoreAddress: string;
}

export type ChainInfo = {
  chainInfo: Chain,
  contractsAddresses: ContractAddresses
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

export const localhost: Chain = {
  id: SupportedChainId.LOCALHOST,
  rpcUrls: {
    default: `http://127.0.0.1:8545/`,
  },
  name: 'Localhost',
  network: 'Localhost',
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

function deployedAddresses(deploys): ContractAddresses {
  return {
    bnrxRootToken: deploys.BNRXToken,
    usdtL1Address: '',
    usdtL2Address: deploys.Usdt,
    assetsTokenAddress: deploys.AssetsManager,
    controllerAddress: deploys.Controller,
    kycStoreAddress: deploys.KycStore,
  }
}

export const chainInfo = {
  // arbitrumMain: {
  //   chainInfo: arbitrum,
  //   contractsAddresses: deployedAddresses(?)
  // },
  arbitrumGoerli: {
    chainInfo: arbitrumGoerli,
    contractsAddresses: deployedAddresses(deploysArbitrumGoerli as any)
  },
  localhost: {
    chainInfo: localhost,
    contractsAddresses: deployedAddresses(deploysLocalhost as any)
  }
}

export const getActiveConfig = (preferredRpcName: string) :ChainInfo | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const rpcName = preferredRpcName || {
    'localhost': 'arbitrumGoerli',
    'localhost.com': 'arbitrumGoerli',
    'dev.binaryx.com': 'arbitrumGoerli',
    'staging.binaryx.com': 'arbitrumGoerli',
    'i2.binaryx.com': 'arbitrumGoerli',
  }[window.location.hostname];

  return chainInfo[rpcName || 'arbitrumGoerli']!;
}

