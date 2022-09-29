import { atom } from 'jotai'

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

type NewRpcAsset = {
    type: 'ERC20' | 'ERC777' | 'ERC1155',
    options: {
        address: string,
        symbol: string,
        decimals: number,
        image: string,
    },
}

type RpcConfig = {
    chain: NewRpcChain
    bnrxAsset: NewRpcAsset
    usdtL1Address: string
    usdtL2Address: string
}

const localhost: RpcConfig = {
    chain: {
        chainId: `0x${Number(421611).toString(16)}`,
        blockExplorerUrls: ['https://rinkeby-explorer.arbitrum.io/#/'],
        chainName: 'Arbitrum Rinkeby',
        // iconUrls: [],
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: ['https://rinkeby.arbitrum.io/rpc']
    },
    bnrxAsset: {
        type: 'ERC20',
        options: {
            address: '0x4e8C6307AF6fC893D76dfAD9198bcE29601Db057',
            symbol: 'BNRX',
            decimals: 18,
            image: '',
        },
    },
    usdtL1Address: '0xD92E713d051C37EbB2561803a3b5FBAbc4962431', // Rinkeby
    usdtL2Address: '0x66b49d8593aAcD1b52b045d9834eBD5E8F02bf07', // Arb Rinkeby
}

const configByDomain = typeof window !== 'undefined' ?
    {
        'localhost': localhost,
    }[window.location.hostname]
    : null

export const $rpcConfig = atom<RpcConfig | null>(configByDomain)

