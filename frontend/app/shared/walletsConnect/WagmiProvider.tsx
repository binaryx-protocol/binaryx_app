import {ReactNode, useEffect} from "react";
import {
  useAccount,
  WagmiConfig,
} from 'wagmi'
import {client} from "../../utils/wagmi";
import {useAtom} from "jotai";
import {$connectedAccount} from "../../core/models/walletModel";

export const WagmiProvider = ({children}: { children: ReactNode }) => {
  const {address} = useAccount()
  const walletAddress = address || ''
  const [accountActive, setAccountActive] = useAtom($connectedAccount);
  useEffect(() => {
    setAccountActive(walletAddress);
  }, [address])

  return(
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}
