import {DesktopBar} from "../views/DesktopBar";
import {useAccount, useDisconnect, useSwitchNetwork} from "wagmi";
import {useAtom} from "jotai";
import {$connectorAtom, $isConnectedAccount} from "../../../core/models/walletModel";
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
  const account = useAtom($isConnectedAccount)
  return (
    <DesktopBar isConnected={isConnected} account={account[0]} setIsOpenWalletInfo={setIsOpenWalletInfo}
                isOpenWalletInfo={isOpenWalletInfo} connector={connector} setIsOpenWalletModal={setIsOpenWalletModal}
                isOpenWalletModal={isOpenWalletModal} setConnector={setConnector} connectError={connectError}
                isOpenWalletWait={isOpenWalletWait} setConnectError={setConnectError}
                setIsOpenWalletWait={setIsOpenWalletWait} switchNetwork={switchNetwork} disconnect={disconnect}/>
  )
}
