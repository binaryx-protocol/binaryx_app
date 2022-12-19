import { DesktopBar } from "../views";
import { useAccount, useDisconnect, useSwitchNetwork } from "wagmi";
import { useAtom } from "jotai";
import { $connectorAtom, $connectedAccount } from "../../../core/models/walletModel";
import { useEffect, useState } from "react";
import { AdminBar } from "../views";

export const HeaderController = () => {
  const { isConnected } = useAccount()
  const { switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()
  const [showAdminBar, setShowAdminBar] = useState(false);
  const [isOpenWalletModal, setIsOpenWalletModal] = useState(false)
  const [isOpenWalletInfo, setIsOpenWalletInfo] = useState(false)
  const [isOpenWalletWait, setIsOpenWalletWait] = useState(false);
  const [connectError, setConnectError] = useState(false);
  const [connector, setConnector] = useAtom($connectorAtom);
  const account = useAtom($connectedAccount)

  useEffect(() => {
    if (typeof window !== 'undefined') {
    window.localStorage.getItem('admin') === 'true' && setShowAdminBar(true)
    }
  }, []);

  return (
    <>
      {showAdminBar && <AdminBar/>}
      <DesktopBar isConnected={ isConnected } account={ account[0] }
                  onWalletInfoClick={ setIsOpenWalletInfo }
                  isOpenWalletInfo={ isOpenWalletInfo } connector={ connector }
                  onWalletConnectClick={ setIsOpenWalletModal }
                  isOpenWalletModal={ isOpenWalletModal } setConnector={ setConnector }
                  connectError={ connectError }
                  isOpenWalletWait={ isOpenWalletWait } setConnectError={ setConnectError }
                  onCurrentWalletClick={ setIsOpenWalletWait } switchNetwork={ switchNetwork }
                  disconnect={ disconnect }/>
    </>
  )
}
