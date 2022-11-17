import { atom } from 'jotai'
import {ethers} from "ethers";
import {$featureFlags} from "./featureFlagsModel";
import localhostDeploys from "../../../../../contracts_arbitrum/deploys/localhost.json";
import arbitrumGoerliDeploys from "../../../../../contracts_arbitrum/deploys/arbitrumGoerli.json";

type NewRpcChain = {
  chainId: string
  blockExplorerUrls: string[]
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  iconUrls?: string[]
}

export type NewRpcToken = {
  type: 'ERC20' | 'ERC777' | 'ERC1155',
  options: {
    address: string,
    symbol: string,
    decimals: number,
    image: string,
  },
}

export type RpcConfig = {
  chain: NewRpcChain
  bnrxRootToken: NewRpcToken
  usdtL1Address: string
  usdtL2Address: string
  assetsTokenAddress: string
  controllerAddress: string
}

type DeploysAddresses = {
  Usdt: string
  AssetsManager: string
  SeriesManager: string
  Controller: string
  BNRX: string
}

// static
const arbitrumGoerli = (deploys: DeploysAddresses): RpcConfig => ({
  chain: {
    chainId: `0x${Number(421613).toString(16)}`,
    blockExplorerUrls: ['https://goerli-rollup-explorer.arbitrum.io/'],
    chainName: 'ARB Goerli',
    // iconUrls: [],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc']
  },
  bnrxRootToken: {
    type: 'ERC20',
    options: {
      address: deploys.BNRX, // NOT REAL YET
      symbol: 'BNRX',
      decimals: 18,
      image: '',
    },
  },
  assetsTokenAddress: deploys.AssetsManager,
  usdtL1Address: '', // not used yet
  usdtL2Address: deploys.Usdt,
  controllerAddress: deploys.Controller,
})

const localhost = (deploys: DeploysAddresses): RpcConfig => ({
  chain: {
    // chainId: `0x${Number(421611).toString(16)}`,
    chainId: `0x${Number(31337).toString(16)}`,
    blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io/#/'],
    chainName: 'HH',
    // iconUrls: [],
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['http://127.0.0.1:8545']
  },
  bnrxRootToken: {
    type: 'ERC20',
    options: {
      address: deploys.BNRX,
      symbol: 'BNRX',
      decimals: 18,
      image: '',
    },
  },
  assetsTokenAddress: deploys.AssetsManager,
  usdtL1Address: '', // locally we do not connect to L1
  usdtL2Address: deploys.Usdt, // depends on env // TODO - move into env vars...
  controllerAddress: deploys.Controller,
})


// computed
export const $rpcConfig = atom<RpcConfig | null>((get) => {
  if (typeof window === 'undefined') {
    return null
  }
  const configNameByDomain =
    {
      'localhost': 'localhost',
      'i2.binaryx.com': 'arbitrumGoerli',
    }[window.location.hostname]
  const rpcName = get($featureFlags).FF_RPC_NAME || configNameByDomain
  console.debug('Using RPC: ' + rpcName)
  if (rpcName == 'localhost') {
    console.debug('localhostDeploys', localhostDeploys)
    return localhost(localhostDeploys as unknown as DeploysAddresses)
  }
  if (rpcName == 'arbitrumGoerli') {
    console.debug('arbitrumGoerliDeploys', arbitrumGoerliDeploys)
    return arbitrumGoerli(arbitrumGoerliDeploys as unknown as DeploysAddresses)
  }
  console.error('Unknown RPC name:', rpcName)
  return null
})

export const $publicRpcProvider = atom<ethers.providers.JsonRpcProvider | null>((get) => {
  const rpcConfig = get($rpcConfig)
  if (!rpcConfig) {
    return null
  }
  return new ethers.providers.JsonRpcProvider(rpcConfig.chain.rpcUrls[0])
})

export const $userRpcProvider = atom<ethers.providers.JsonRpcProvider | null>((get) => {
  const rpcConfig = get($rpcConfig)
  if (!rpcConfig) {
    return null
  }
  return new ethers.providers.Web3Provider(window.ethereum)
})

