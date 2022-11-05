import { atom } from 'jotai'
import {$rpcConfig, RpcConfig} from "./rpcConfigModel";
import {waitFor} from "../../utils/pageLoadUtiils";
import {UiForm, UiFormErrors} from "../../../../../pkg/formType";

const KNOWN_CHAINS = {
  '0x1': 'Ethereum Main Network (Mainnet)',
  '0x3': 'Ropsten',
  '0x4': 'Rinkeby',
  '0x5': 'Goerli',
  '0x2a': 'Kovan',
  '0x66eeb': 'Arbitrum (Rinkeby)',
}

type KnownChainId = keyof typeof KNOWN_CHAINS
type WalletProgress = 'init' | 'inProgress' | 'finished'

type UiMetaMaskValues = {
  accounts: string[] | null
  chainId: KnownChainId | null
  noExtension: boolean | null
}

type UiMetaMaskForm = Omit<UiForm<UiMetaMaskValues>, 'isSubmitTouched' | 'touches'> & {
  progress: WalletProgress,
}

// stores
export const $metaMaskState = atom<UiMetaMaskForm>({
  values: {
    accounts: null,
    chainId: null,
    noExtension: null,
  },
  errors: {},
  isValid: false,
  progress: 'init',
})

// computed
export const $errorMessages = atom<string[]>((get) => {
  const rpcConfig = get($rpcConfig) as RpcConfig
  const withVariables = (v: string) => v.replace('{chainName}', rpcConfig.chain.chainName) // meh...

  const messages: string[] = []
  const s = get($metaMaskState)

  if (s.progress !== 'finished') {
    return messages;
  }
  if (s.errors.noExtension) {
    s.errors.noExtension.forEach((key) => messages.push(T[key as keyof typeof T]))
  }
  if (s.errors.accounts) {
    s.errors.accounts.forEach((key) => messages.push(T[key as keyof typeof T]))
  }
  if (s.errors.chainId) {
    s.errors.chainId.forEach((key) => messages.push(withVariables(T[key as keyof typeof T])))
  }
  return messages
})

export const $isAccountConnected = atom<boolean>((get) => {
  const s = get($metaMaskState)
  return !!s.values.accounts?.[0]
})

// setters
export const $doUpdateValues = atom(
  null,
  (get, set, object: Partial<UiMetaMaskValues>) => {
    const values = {
      ...get($metaMaskState).values,
      ...object,
    }
    const form = {
      ...get($metaMaskState),
      values,
    }
    set(
      $metaMaskState,
      form,
    )
    set($doValidate, values)
  })

export const $doValidate = atom(
  null,
  (get, set, values: UiMetaMaskValues) => {
    const errors: UiFormErrors<UiMetaMaskValues> = {}
    if (!values.accounts?.[0]) {
      errors.accounts = ['ACCOUNT_NOT_CONNECTED']
    }
    if (values.chainId !== get($rpcConfig)?.chain.chainId) {
      errors.chainId = ['CHAIN_INVALID']
    }
    if (values.noExtension) {
      errors.noExtension = ['EXTENSION_IS_NOT_INTSALLED']
    }
    const isValid = Object.values(errors).length === 0;

    const form = {
      ...get($metaMaskState),
      errors,
      isValid,
    }
    set(
      $metaMaskState,
      form,
    )
  })

export const $doSetProgress = atom(
  null,
  (get, set, arg: WalletProgress) => {
    set(
      $metaMaskState,
      {
        ...get($metaMaskState),
        progress: arg,
      },
    )
  })

export const $onBrowserInit = atom(
  null,
  (get, set) => {
    set($walletConnect)
  }
)

export const $walletConnect = atom(
  null,
  async (get, set) => {
    const ethereum = window.ethereum
    if (!window.ethereum) {
      set($doUpdateValues, { noExtension: true })
      set($doSetProgress, 'finished')
      return;
    }
    if (get($metaMaskState).progress === 'inProgress') {
      console.log('Do not RUSH!');
      return;
    }
    set($doSetProgress, 'inProgress')

    await waitFor(() => !!get($rpcConfig))
    const rpcConfig = get($rpcConfig) as RpcConfig

    // callbacks
    const onAccountsConnectOrDisconnect = (accounts: string[]) => {
      set($doUpdateValues, { accounts })
    }
    const onChainIdChange = (chainId: KnownChainId) => {
      set($doUpdateValues, { chainId })
    }

    // listeners
    ethereum.on('accountsChanged', onAccountsConnectOrDisconnect);
    ethereum.on('chainChanged', onChainIdChange);

    // Switch chain / Add & switch if it's a new chain (network)
    const chainId = await ethereum.request({ method: 'eth_chainId' })

    if (chainId !== rpcConfig.chain.chainId) {
      let isChainAdded = true // we do not know yet
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: rpcConfig.chain.chainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          isChainAdded = false // now we know
        } else {
          console.warn(switchError)
        }
      }
      if (!isChainAdded) {
        try {
          await ethereum.request({ method: 'wallet_addEthereumChain', params: [rpcConfig.chain] })
        } catch (err: any) {
          set($doSetProgress, 'finished')
          return;
        }
      }
    }
    const chainId2 = await ethereum.request({ method: 'eth_chainId' })
    onChainIdChange(chainId2)

    // connect account
    await ethereum.request({ method: 'eth_accounts' })
      .then(onAccountsConnectOrDisconnect)

    const isAuthorized = !!get($metaMaskState).values.accounts?.[0]

    if (!isAuthorized) {
      try {
        await ethereum.request({method: 'eth_requestAccounts'})
          .then(onAccountsConnectOrDisconnect)
      } catch (err: any) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.warn(err);
        }
        set($doSetProgress, 'finished')
        return;
      }
    }

    // exit
    set($doSetProgress, 'finished')

    // !!! Simply uncomment once we start to work with root token

    // Add root asset token
    // if (!isDoneAction('addBnrxRootToken')) {
    //   console.log('wallet_watchAsset')
    //   await ethereum.request({ method: 'wallet_watchAsset', params: rpcConfig.bnrxRootToken })
    //     .then(() => completeAction('addBnrxRootToken'))
    //     .catch((err: any) => {
    //       console.error(err);
    //     });
    // }

    // NOTE: more docs at https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion

    // TODO handle connect & disconnect
    // TODO handle https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods wallet_registerOnboarding
    // TODO wallet_switchEthereumChain https://docs.metamask.io/guide/rpc-api.html#usage-with-wallet-switchethereumchain
  }
)

const T = {
  'ACCOUNT_NOT_CONNECTED': 'Please, connect your wallet',
  'CHAIN_INVALID': 'Please, select the right network ({chainName})',
  'EXTENSION_IS_NOT_INTSALLED': 'Please, install MetaMask',
}
