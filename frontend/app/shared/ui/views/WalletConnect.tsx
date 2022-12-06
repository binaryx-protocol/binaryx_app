import clsx from 'clsx'
import s from "./WalletConnect.module.scss";
import closeIcon from "../../../../public/svg/closeIcon.svg"
import arrowLeftIcon from '../../../../public/svg/ArrowLeft.svg'
import Image from "next/image";
import {Connector, useConnect} from "wagmi";
import {getWalletConfig} from "../../walletsConnect";
import {WalletConnectWait} from "./WalletConnectWait";

type Props = {
  onWalletConnectClick: (value: boolean) => void;
  onCurrentWalletClick: (value: boolean) => void;
  setConnector: (value: Connector) => void;
  connector: Connector;
  isOpenWalletWait: boolean;
  connectError: boolean;
  setConnectError: (value: boolean) => void;
}
export const WalletConnect = (props: Props) => {
  const {
    onWalletConnectClick,
    setConnector,
    connector,
    onCurrentWalletClick,
    isOpenWalletWait,
    setConnectError,
    connectError,
  } = props
  const {connectors} = useConnect()
  return (
    <>
      <div className={s.connect}>
        {isOpenWalletWait ? <div className={s.close} onClick={() => onCurrentWalletClick(false)}>
          <Image src={arrowLeftIcon} alt='close' width={16} height={16}/>
        </div> : <p className={s.connectWallet}>
          Connect Wallet
        </p>}

        <div className={s.close} onClick={() => onWalletConnectClick(false)}>
          <Image src={closeIcon} alt='close' width={16} height={16}/>
        </div>
      </div>
      {isOpenWalletWait ?
        <WalletConnectWait connector={connector} onWalletConnectClick={onWalletConnectClick}
                           setConnectError={setConnectError}
                           connectError={connectError}/> :
        <div className={s.wallets}>
          {connectors.map((connector) =>
            (
              <div className={s.walletWrapper} onClick={
                () => {
                  onCurrentWalletClick(true)
                  setConnector(connector)
                }}
                   key={getWalletConfig(connector.id).title}>
                <div className={s.wallet}>
                  <div className={clsx(s.walletIcon, s[getWalletConfig(connector.id).id])}>
                    <Image src={getWalletConfig(connector.id).icon}
                           alt={connector.id} width={24} height={24}/>
                  </div>
                  <p className={s.walletName}>{getWalletConfig(connector.id).title}</p>
                </div>
              </div>
            )
          )}
        </div>}
      <div className={s.privacyPolice}>
        <p className={s.privacyPoliceContent}>
          By connecting your wallet, you agree to our <a href='#'>Terms of
          Service</a> and our <a href='#'>Privacy Policy.</a>
        </p>
      </div>
    </>
  )
}
