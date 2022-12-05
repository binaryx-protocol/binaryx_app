import s from './WalletConnectWait.module.scss'
import Image from "next/image";
import hourglassIcon from '../../../../public/svg/wallet/Hourglass.svg'
import {ConnectorNames, getWalletConfig} from "../../walletsConnect";
import {useEffect, useState} from "react";
import {Connector, useAccount, useConnect} from "wagmi";
import {QRCode} from "./QRCode";

type Props = {
    connector: Connector;
    setIsOpen: (value: boolean) => void;
    connectError: boolean;
    setConnectError: (value: boolean) => void;
}

export const MetamaskError = () => {
    return (
        <>
            <div>
                Please Install Metamask
            </div>
            <QRCode image={getWalletConfig(ConnectorNames.MetaMask).imageLink}
                    url={getWalletConfig(ConnectorNames.MetaMask).downloadLink}/>
        </>
    )
}

export const TrustWalletError = () => {
    return (
        <>
            <div>
                Please Install Trust Wallet
            </div>
            <QRCode image={getWalletConfig(ConnectorNames.Injected).imageLink}
                    url={getWalletConfig(ConnectorNames.Injected).downloadLink}/>
        </>

    )
}

export const Loading = () => {
    return (
        <>
            <div className={s.hourglassOutside}>
                <div className={s.hourglassInside}>
                    <Image src={hourglassIcon} alt={'hourglassIcon'} width={48} height={48}/>
                </div>
            </div>
            <div className={s.waitingContent}>
                <p className={s.header}>Waiting for connection</p>
                <p className={s.description}>You need to confirm the connection in your wallet</p>
            </div>
        </>
    )
}

export const WalletConnectWait = (props: Props) => {
    const {connector, setIsOpen, setConnectError, connectError} = props
    const {connect} = useConnect()
    const {address} = useAccount()
    useEffect(() => {
        if (address) setIsOpen(false);
    }, [address])


    useEffect(() => {
        if (connector.id === ConnectorNames.MetaMask) {
            if (!window.ethereum?.isMetaMask && window.ethereum?.isTrustWallet) {
              setConnectError(true)
            }else{
                connect({connector})
            }
        } else {
            if (window.ethereum?.isMetaMask && !window.ethereum?.isTrustWallet) {
              setConnectError(true)
            }else{
                connect({connector})
            }
        }
    },[connector])

    return (
        <div className={s.root}>
            {connectError ? (connector.id === ConnectorNames.MetaMask ? <MetamaskError/> : <TrustWalletError/>) : <Loading/>}
        </div>
    )
}
