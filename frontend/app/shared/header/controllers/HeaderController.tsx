import {DesktopBar} from "../views/DesktopBar";
import {useAccount} from "wagmi";
import {useAtom} from "jotai";
import {$isConnected} from "../../../core/models/walletModel";
import {useEffect} from "react";

export const HeaderController = () => {
  const {address, isConnected} = useAccount()
  const walletAddress = address || ''
  const [accountActive, setAccountActive] = useAtom($isConnected)
  useEffect(() => {
    setAccountActive(walletAddress);
  }, [address])
  return (
    <DesktopBar isConnected={isConnected} account={accountActive}/>
  )
}
