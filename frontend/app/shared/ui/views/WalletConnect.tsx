import clsx from 'clsx'
import s from "./WalletConnect.module.scss";
import closeIcon from "../../../../public/svg/closeIcon.svg"
import arrowLeftIcon from '../../../../public/svg/ArrowLeft.svg'
import Image from "next/image";
import {Connector, useConnect, useProvider} from "wagmi";
import {getWalletConfig} from "../../walletsConnect";
import {WalletConnectWait} from "./WalletConnectWait";
import {useState} from "react";
import ERC20 from '../../../abis/ERC20.json'
import {Contract} from "ethers";

type Props = {
  setIsOpen: (value: boolean) => void;
  setConnector: any;
  connector: Connector;
}
export const WalletConnect = (props: Props) => {
  const {setIsOpen, setConnector, connector} = props
  const {connectors} = useConnect()
  const [waitComponent, setWaitComponent] = useState(false)
  return (
    <>
      <div className={s.connect}>
        {waitComponent ? <div className={s.close} onClick={() => setWaitComponent(false)}>
          <Image src={arrowLeftIcon} alt='close' width={16} height={16}/>
        </div> : <p className={s.connectWallet}>
          Connect Wallet
        </p>}

        <div className={s.close} onClick={() => setIsOpen(false)}>
          <Image src={closeIcon} alt='close' width={16} height={16}/>
        </div>
      </div>
      {waitComponent ? <WalletConnectWait connector={connector} setIsOpen={setIsOpen}/> :
        <div className={s.wallets}>
          {connectors.map((connector) =>
            (
              <div className={s.walletWrapper} onClick={
                () => {
                  setConnector(connector)
                  setWaitComponent(true)
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
