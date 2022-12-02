import {DesktopBar} from "../views/DesktopBar";
import {useAtomValue, useSetAtom} from "jotai";
import {useAccount} from "wagmi";
import {WalletInfo} from "../../ui/views/WalletInfo";
import {useState} from "react";

export const HeaderController = () => {
    const {address, connector, isConnected} = useAccount()
    const walletAddress = address || ''

    return (
            <DesktopBar isConnected={isConnected} account={walletAddress} connector={connector}/>
    )
}
