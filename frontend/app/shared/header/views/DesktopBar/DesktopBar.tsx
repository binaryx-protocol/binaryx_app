import s from "./DesktopBar.module.scss";
import {Button} from "../../../ui/views/Button";
import {paths} from "../../../../../pkg/paths";
import Link from "next/link";
import {Container} from "../../../ui/views/Container";
import {WalletConnect} from "../../../ui/views/WalletConnect";
import arrowIcon from '../../../../../public/svg/arrow.svg'
import Image from "next/image";
import {WalletInfo} from "../../../ui/views/WalletInfo";
import {Connector, useNetwork} from "wagmi";
import {walletAddressFormatted} from "../../../../utils/walletAddressFormatted";
import {BaseModal} from "../../../ui/views/BaseModal";
import {WrongNetwork} from "../../../ui/views/WrongNetwork";
import {useEffect, useState} from "react";
import {PlusIcon} from "../../../ui/views/PlusIcon";
import {BurgerMenu} from "../../../ui/views/BurgerMenu";

type Props = {
  account: string
  isConnected: boolean
  onWalletInfoClick: (value: boolean) => void;
  isOpenWalletInfo: boolean;
  connector: Connector;
  onWalletConnectClick: (value: boolean) => void;
  isOpenWalletModal: boolean;
  setConnector: () => void;
  onCurrentWalletClick: (value: boolean) => void;
  isOpenWalletWait: boolean;
  setConnectError: (value: boolean) => void;
  connectError: boolean;
  disconnect: () => void;
  burgerOpen: boolean;
  onClickBurgerOpen: (value: boolean) => void;
  switchNetwork: ((chainId_?: number | undefined) => void) | undefined;
}

export const DesktopBar = (props: Props) => {
  const {
    account,
    isConnected,
    onWalletInfoClick,
    isOpenWalletInfo,
    connector,
    onWalletConnectClick,
    isOpenWalletModal,
    setConnector,
    onCurrentWalletClick,
    isOpenWalletWait,
    setConnectError,
    connectError,
    disconnect,
    switchNetwork,
    onClickBurgerOpen,
    burgerOpen
  } = props
  const {chain} = useNetwork()
  const unsupportedChain = chain !== undefined ? chain.unsupported : false;
  useEffect(() => {
    if (!account) onCurrentWalletClick(false);
  }, [account])
  return (
    <>
      {burgerOpen && <BurgerMenu onBurgerMenuOpen={onClickBurgerOpen}/>}
      <div className={s.root}>
        <Container className={s.container}>
          <Link href={paths.home()} passHref>
            <a className={s.logo}>
              <img
                src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
                alt="Binaryx"
              />
            </a>
          </Link>
          <div className={s.nav}>
            <Link href={paths.home()} passHref>
              <a>
                Home
              </a>
            </Link>
            <Link href={paths.listAssets()} passHref>
              <a>
                Marketplace
              </a>
            </Link>
            <Link href={paths.home()} passHref>
              <a>
                Oracles
              </a>
            </Link>
            <Link href={paths.home()} passHref>
              <a>
                Governance
              </a>
            </Link>
          </div>
          <div className={s.buttons}>
            {
              isConnected
                ? (
                  <>
                    <div className={s.wallet} onClick={() => {
                      onWalletInfoClick(true)
                    }}>
                      <WalletIcon classname={s.walletIcon}/>
                      <span className={s.accountAddress}>{walletAddressFormatted(account)}</span>
                      <Image src={arrowIcon} alt={'arrow'}/>
                    </div>
                    {isOpenWalletInfo &&
                      <WalletInfo connector={connector} account={account}
                                  onWalletInfoClick={onWalletInfoClick} disconnect={disconnect}/>}
                  </>
                )
                :
                <Button onClick={() => onWalletConnectClick(true)} className={s.walletConnectButton}>
                  <p>
                    Connect Wallet
                  </p>
                </Button>
            }
            <div className={s.burger} onClick={() => onClickBurgerOpen(true)}>
              <Image src={'/svg/burger.svg'} alt={'burger'} width={15} height={15}/>
            </div>
            <Link href={paths.newAsset()}>
              <Button color="light" className={s.listPropertyButton} disabled={!account}>
                <PlusIcon width={15} height={15} classname={account && s.activePlusIcon}/>
                <p>
                  List Property
                </p>
              </Button>
            </Link>
            {isOpenWalletModal &&
              <BaseModal setIsOpen={onWalletConnectClick}>
                <WalletConnect onWalletConnectClick={onWalletConnectClick} setConnector={setConnector}
                               connector={connector}
                               isOpenWalletWait={isOpenWalletWait} onCurrentWalletClick={onCurrentWalletClick}
                               connectError={connectError} setConnectError={setConnectError}/>
              </BaseModal>}
            {unsupportedChain && <BaseModal setIsOpen={() => unsupportedChain}>
              <WrongNetwork disconnect={disconnect} switchNetwork={switchNetwork}/>
            </BaseModal>}
          </div>
        </Container>
      </div>
    </>
  )
}

const WalletIcon = ({classname = '', width = 16, height = 16}) => (
  <svg width={width} height={height} className={classname} viewBox="0 0 13 12" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.5 2.5H1.5C1.36739 2.5 1.24021 2.44732 1.14645 2.35355C1.05268 2.25979 1 2.13261 1 2C1 1.86739 1.05268 1.74021 1.14645 1.64645C1.24021 1.55268 1.36739 1.5 1.5 1.5H10C10.1326 1.5 10.2598 1.44732 10.3536 1.35355C10.4473 1.25979 10.5 1.13261 10.5 1C10.5 0.867392 10.4473 0.740215 10.3536 0.646447C10.2598 0.552679 10.1326 0.5 10 0.5H1.5C1.10268 0.501645 0.722106 0.660209 0.441158 0.941158C0.160209 1.22211 0.00164523 1.60268 0 2V10C0.00164523 10.3973 0.160209 10.7779 0.441158 11.0588C0.722106 11.3398 1.10268 11.4984 1.5 11.5H11.5C11.7652 11.5 12.0196 11.3946 12.2071 11.2071C12.3946 11.0196 12.5 10.7652 12.5 10.5V3.5C12.5 3.23478 12.3946 2.98043 12.2071 2.79289C12.0196 2.60536 11.7652 2.5 11.5 2.5ZM9.25 7.75C9.10166 7.75 8.95666 7.70601 8.83332 7.6236C8.70999 7.54119 8.61386 7.42406 8.55709 7.28701C8.50033 7.14997 8.48547 6.99917 8.51441 6.85368C8.54335 6.7082 8.61478 6.57456 8.71967 6.46967C8.82456 6.36478 8.9582 6.29335 9.10368 6.26441C9.24917 6.23547 9.39997 6.25033 9.53701 6.30709C9.67406 6.36386 9.79119 6.45999 9.8736 6.58332C9.95601 6.70666 10 6.85166 10 7C10 7.19891 9.92098 7.38968 9.78033 7.53033C9.63968 7.67098 9.44891 7.75 9.25 7.75Z"
      fill="#101113"/>
  </svg>

)
