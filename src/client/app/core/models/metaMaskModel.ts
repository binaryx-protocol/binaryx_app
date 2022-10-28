import { atom } from 'jotai'
import {$rpcConfig, RpcConfig} from "./rpcConfigModel";
import {completeAction, isDoneAction} from "../../utils/isDoneActionLs";
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
type WalletReadiness = 'init' | 'ready' | 'hasError'

type UiMetaMaskValues = {
  accounts: string[] | null
  chainId: KnownChainId | null
  isConnected: boolean | null
}

type UiMetaMaskForm = UiForm<UiMetaMaskValues>

export const $metaMaskState = atom<UiMetaMaskForm>({
  values: {
    accounts: null,
    chainId: null,
    isConnected: null,
  },
  touches: {}, // not used
  errors: {},
  isValid: false,
  isSubmitTouched: false, // means user ended connection flow with a success or rejection
})

export const $errorMessages = atom<string[]>((get) => {
  const messages: string[] = []
  const s = get($metaMaskState)
  if (!s.isSubmitTouched) {
    return messages;
  }
  if (s.errors.chainId) {
    s.errors.chainId.forEach((key) => messages.push(T[key as keyof typeof T]))
  }
  if (s.errors.accounts) {
    s.errors.accounts.forEach((key) => messages.push(T[key as keyof typeof T]))
  }
  if (s.errors.isConnected) {
    s.errors.isConnected.forEach((key) => messages.push(T[key as keyof typeof T]))
  }
  return messages
})

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
    if (values.chainId !== get($rpcConfig)?.chain.chainId) {
      errors.chainId = ['CHAIN_INVALID']
    }
    if (!values.accounts?.[0]) {
      errors.accounts = ['ACCOUNT_NOT_CONNECTED']
    }
    if (!values.isConnected) {
      errors.accounts = ['EXTENSION_IS_NOT_INTSALLED'] // TODO test
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

export const $doExitTheFlow = atom(
  null,
  (get, set) => {
    set(
      $metaMaskState,
      {
        ...get($metaMaskState),
        isSubmitTouched: true,
      },
    )
  })


export const $walletReadiness = atom<WalletReadiness>((get) => {
  const s = get($metaMaskState)
  if (s.isValid) {
    return 'ready'
  }
  return 'init'
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
    console.log('$walletConnect')

    await waitFor(() => !!get($rpcConfig))
    const rpcConfig = get($rpcConfig) as RpcConfig

    const main = async () => {
      const ethereum = window.ethereum

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

      // initial values
      set($doUpdateValues, { isConnected: ethereum.isConnected() })

      // connect account
      await ethereum.request({ method: 'eth_accounts' })
        .then(onAccountsConnectOrDisconnect)

      const isAuthorized = !!get($metaMaskState).values.accounts?.[0]

      if (!isAuthorized) {
        await ethereum.request({method: 'eth_requestAccounts'})
          .then(onAccountsConnectOrDisconnect)
          .catch((err: any) => {
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
              console.log('Please connect to MetaMask.');
            } else {
              console.warn(err);
            }
          });
      }

      const isAuthorizedFinally = !!get($metaMaskState).values.accounts?.[0]

      if (!isAuthorizedFinally) {
        set($doExitTheFlow)
        return;
      }

      // Add chain (network)
      await ethereum.request({ method: 'eth_chainId' })
        .then(onChainIdChange)

      if (!isDoneAction('addRpc')) {
        await ethereum.request({ method: 'wallet_addEthereumChain', params: [rpcConfig.chain] })
          .then(() => completeAction('addRpc'))
          .catch((err: any) => {
            console.warn(err);
          });
      }

      await new Promise(r => setTimeout(r, 200)) // This is NOT a workaround. Just for a better UX. The line can be removed.
      await waitFor(() => !!get($metaMaskState).values.chainId)

      // const isChainValid = get($metaMaskState).values.chainId === rpcConfig.chain.chainId

      set($doExitTheFlow)

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
    }

    main()

    // NOTE: more docs at https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion

    // TODO handle connect & disconnect
    // TODO handle https://docs.metamask.io/guide/rpc-api.html#unrestricted-methods wallet_registerOnboarding
    // TODO wallet_switchEthereumChain https://docs.metamask.io/guide/rpc-api.html#usage-with-wallet-switchethereumchain
  }
)

const T = {
  'ACCOUNT_NOT_CONNECTED': 'Please, connect your wallet',
  'CHAIN_INVALID': 'Please, select the right network',
  'EXTENSION_IS_NOT_INTSALLED': 'Please, install MetaMask',
}
