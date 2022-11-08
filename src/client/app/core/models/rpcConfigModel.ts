import { atom } from 'jotai'
import {ethers} from "ethers";
import {$featureFlags} from "./featureFlagsModel";

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
}

// static
const l2Goerli: RpcConfig = {
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
      address: '0x7c5180280464edddb48464112bb06a4a136cbdbb', // NOT REAL YET
      symbol: 'BNRX',
      decimals: 18,
      image: '',
    },
  },
  assetsTokenAddress: '0x721BCc10F12dc1E456aa882A9D10aF4570BaCaC1',
  usdtL1Address: '', // not used yet
  usdtL2Address: '0xE026Ff21848c092C75775a0EfF84da486FD58cc9',
}

const localhost: RpcConfig = {
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
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      symbol: 'BNRX',
      decimals: 18,
      image: '',
    },
  },
  assetsTokenAddress: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  usdtL1Address: '', // locally we do not connect to L1
  usdtL2Address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // depends on env // TODO - move into env vars...
}

const all = {
  localhost,
  l2Goerli,
}

// computed
export const $rpcConfig = atom<RpcConfig | null>((get) => {
  if (typeof window === 'undefined') {
    return null
  }
  const configNameByDomain =
    {
      'localhost': 'l2Goerli',
      'i2.binaryx.com': 'l2Goerli',
    }[window.location.hostname]
  const configNameFromFF = get($featureFlags).FF_RPC_NAME
  const rpcName = (configNameFromFF || configNameByDomain) as keyof typeof all
  console.log('Using RPC: ' + rpcName)
  return all[rpcName] || null
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

