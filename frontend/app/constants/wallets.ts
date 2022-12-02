import {metaMaskConnector} from "../utils/wagmi";
import metamaskIcon from '../../public/svg/metamask.svg'
import twtIcon from '../../public/svg/twt.svg'

export enum ConnectorNames {
    MetaMask = 'metaMask',
    Injected = 'injected',
}

export interface WalletConfig  {
    id: string;
    title: string;
    icon: string;
    connectorId: ConnectorNames;
    downloadLink: string;
    imageLink: string;
}
export type WalletsConfig = {
    [key in ConnectorNames]: WalletConfig
}

export const walletsConfig:WalletsConfig = {
    [ConnectorNames.MetaMask]: {
        id: 'metamask',
        title: 'Metamask',
        icon: metamaskIcon,
        connectorId: ConnectorNames.MetaMask,
        downloadLink: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ru',
        imageLink: 'https://raw.githubusercontent.com/MetaMask/brand-resources/c3c894bb8c460a2e9f47c07f6ef32e234190a7aa/SVG/metamask-fox.svg'
    },
    [ConnectorNames.Injected]:{
        id: 'trust',
        title: 'Trust Wallet',
        icon: twtIcon,
        connectorId: ConnectorNames.Injected,
        downloadLink: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph/related',
        imageLink: 'https://trustwallet.com/assets/images/media/assets/trust_platform.svg'
    }
}


export const getWalletConfig = (connectorId: string) =>{
    return walletsConfig[connectorId as keyof typeof walletsConfig];
}
