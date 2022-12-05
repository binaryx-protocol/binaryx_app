import {ReactNode} from "react";
import {
  WagmiConfig,
} from 'wagmi'
import {client} from "../../utils/wagmi";

export const WagmiProvider = ({children}: { children: ReactNode }) => {

  return(
    <WagmiConfig client={client}>
      {children}
    </WagmiConfig>
  )
}
