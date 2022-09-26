import { atom } from 'jotai'
import {ethers} from "ethers";

type TAccountAddress = string
const KNOWN_CHAINS = {
    '0x1': 'Ethereum Main Network (Mainnet)',
    '0x3': 'Ropsten',
    '0x4': 'Rinkeby',
    '0x5': 'Goerli',
    '0x2a': 'Kovan',
    '0x66eeb': 'Arbitrum (Rinkeby)',
}

type TKnownChainId = keyof typeof KNOWN_CHAINS

type TMetaMaskState = {
    accounts: TAccountAddress[] | null
    chainId: TKnownChainId | null
    isConnected: boolean | null
}

export const $metaMaskState = atom<TMetaMaskState>({
    accounts: null,
    chainId: null,
    isConnected: null,
})

export const $onBrowserInit = atom(
    null,
    (get, set) => {
        const update = (object: Partial<TMetaMaskState>) => {
            const prevState = get($metaMaskState)
            set(
                $metaMaskState,
                { ...prevState, ...object }
            )
        }
        const ethereum = window.ethereum

        update({ isConnected: ethereum.isConnected() })

        const onAccountsConnectOrDisconnect = (accounts: TAccountAddress[]) => update({ accounts })
        const onChainIdChange = (chainId: TKnownChainId) => update({ chainId })

        ethereum.on('accountsChanged', onAccountsConnectOrDisconnect);
        ethereum.on('chainChanged', onChainIdChange);

        ethereum.request({ method: 'eth_chainId' })
            .then(onChainIdChange)

        ethereum.request({ method: 'eth_accounts' })
            .then(onAccountsConnectOrDisconnect)

        ethereum.request({ method: 'eth_requestAccounts' })
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

        const chain = {
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
        }

        // ethereum.request({ method: 'wallet_addEthereumChain', params: [chain] })
        //     .then((args) => {
        //         console.log('wallet_addEthereumChain', args)
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

        const token = {
            type: 'ERC20',
            options: {
                address: '0x4e8C6307AF6fC893D76dfAD9198bcE29601Db057',
                symbol: 'BNRX',
                decimals: 18,
                image: '',
            },
        }

        // ethereum.request({ method: 'wallet_watchAsset', params: token })
        //     .then((args) => {
        //         console.log('wallet_watchAsset', args)
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

        // NOTE: more docs at https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion
        // ethereum.request({ method: 'web3_clientVersion' })
        //     .then((args) => {
        //         console.log('web3_clientVersion', args)
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

        // TODO handle connect & disconnect
        // TODO handle https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods wallet_registerOnboarding
        // TODO wallet_switchEthereumChain https://docs.metamask.io/guide/rpc-api.html#usage-with-wallet-switchethereumchain

        const provider = new ethers.providers.Web3Provider(ethereum)


        // The ERC-20 Contract ABI, which is a common contract interface
        // for tokens (this is the Human-Readable ABI format)
        const sgAbi = [
            // Some details about the token
            "function name() view returns (string)",
            "function symbol() view returns (string)",

            // Get the account balance
            "function balanceOf(address) view returns (uint)",

            // Send some of your tokens to someone else
            "function transfer(address to, uint amount)",
            "function approve(address spender, uint256 amount) public virtual override returns (bool)",

            // An event triggered whenever anyone transfers to someone else
            "event Transfer(address indexed from, address indexed to, uint amount)"
        ];
        const vendorAbi = [
            "function swapSgToDai(uint256 amountToBuy) public",
        ];

        const main = async () => {
            // const sgToken = new ethers.Contract('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', sgAbi, provider);
            // const sgTokenSigned = sgToken.connect(provider.getSigner())
            //
            // const approve = await sgTokenSigned.approve('0x0165878A594ca255338adfa4d48449f69242Eb8F', 1e14)
            // console.log('approve', approve)

            const vendorToken = new ethers.Contract('0x0165878A594ca255338adfa4d48449f69242Eb8F', vendorAbi, provider);
            const vendorTokenSigned = vendorToken.connect(provider.getSigner())

            const swapSgToDai = await vendorTokenSigned.swapSgToDai(1e14)
            console.log('swapSgToDai', swapSgToDai)
        };
        main();
    }
)
