import {DesktopBar} from "../views/DesktopBar";
import {Connector, useAccount} from "wagmi";
import {InjectedConnector} from "wagmi/connectors/injected";

export const HeaderController = () => {
    const {address, connector, isConnected} = useAccount()
    const walletAddress = address || '';
  return (
            <DesktopBar isConnected={isConnected} account={walletAddress} />
    )
}
