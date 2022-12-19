import {DesktopBar} from "../views/DesktopBar";
import {useAccount, useDisconnect, useSwitchNetwork} from "wagmi";
import {useAtom} from "jotai";
import {$connectorAtom, $connectedAccount} from "../../../core/models/walletModel";
import {useEffect, useState} from "react";

export const HeaderController = () => {
  const {isConnected} = useAccount()
  const {switchNetwork} = useSwitchNetwork()
  const {disconnect} = useDisconnect()
  const [isOpenWalletModal, setIsOpenWalletModal] = useState(false)
  const [isOpenWalletInfo, setIsOpenWalletInfo] = useState(false)
  const [isOpenWalletWait, setIsOpenWalletWait] = useState(false);
  const [connectError, setConnectError] = useState(false);
  const [connector, setConnector] = useAtom($connectorAtom);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const account = useAtom($connectedAccount)
  return (
    <DesktopBar isConnected={isConnected} account={account[0]} onWalletInfoClick={setIsOpenWalletInfo}
                isOpenWalletInfo={isOpenWalletInfo} connector={connector} onWalletConnectClick={setIsOpenWalletModal}
                isOpenWalletModal={isOpenWalletModal} setConnector={setConnector} connectError={connectError}
                isOpenWalletWait={isOpenWalletWait} setConnectError={setConnectError}
                onCurrentWalletClick={setIsOpenWalletWait} switchNetwork={switchNetwork} disconnect={disconnect}
                onClickBurgerOpen={setBurgerOpen} burgerOpen={burgerOpen}/>
  )
}
