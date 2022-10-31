import {DesktopBar} from "../views/DesktopBar";
import {useAtomValue, useSetAtom} from "jotai";
import * as metaMaskModel from "../../../core/models/metaMaskModel";

export const HeaderController = () => {
  const $walletConnect = useSetAtom(metaMaskModel.$walletConnect)
  const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  const $isAccountConnected = useAtomValue(metaMaskModel.$isAccountConnected)
  // const $errorMessages = useAtomValue(metaMaskModel.$errorMessages)

  const walletAddress = $metaMaskState.values.accounts?.[0] || ''
  const walletAddressFormatted = walletAddress.substr(0, 5) + '...' + walletAddress.substr(walletAddress.length-3, 3)

  return (
    <DesktopBar hasAddress={$isAccountConnected || $metaMaskState.progress === 'inProgress'} account={walletAddressFormatted} onWalletConnect={$walletConnect} />
  )
}
