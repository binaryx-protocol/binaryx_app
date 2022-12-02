import s from './WalletInfo.module.scss'
import Image from "next/image";
import exploreIcon from '../../../../public/svg/wallet/explore.svg'
import copyIcon from '../../../../public/svg/wallet/copy.svg'
import disconnectIcon from '../../../../public/svg/wallet/disconnect.svg'
import clsx from 'clsx'
import {Connector, useDisconnect} from "wagmi";
import {getWalletConfig} from "../../walletsConnect";
import {useNetwork} from 'wagmi'
import {walletAddressFormatted} from "../../../utils/walletAddressFormatted";
import {copyDataToClipboard} from "../../../utils/copyDataToClipboard";
import {CHAIN_INFO, SupportedChainId} from "../../walletsConnect";

type Props = {
  connector: Connector;
  account: string;
  setIsOpen: any;
}

export const WalletInfo = (props: Props) => {
  const {connector, account} = props;
  const {disconnect} = useDisconnect()
  const {chain} = useNetwork()
  const activeChain = chain?.id !== undefined ? chain.id : SupportedChainId.ARBITRUM_ONE
  const explorerLink = `${CHAIN_INFO[activeChain as keyof typeof CHAIN_INFO]?.blockExplorers.default.url}address/${account}`;
  return (
    <div className={s.root}>
      <div className={s.address}>
        <Image src={getWalletConfig(connector?.id)?.icon} alt={'wallet'} width={24} height={24}/>
        <p>{walletAddressFormatted(account)}</p>
      </div>
      <div className={s.actionSection}>
        <div className={s.action} onClick={() => copyDataToClipboard(account)}>
          <Image src={copyIcon} alt={'copyIcon'}/>
          <p>Copy</p>
        </div>
        <a className={s.action} href={explorerLink} target="_blank">
          <Image src={exploreIcon} alt={'exploreIcon'}/>
          <p>Explore</p>
        </a>
        <div className={clsx(s.action, s.disconnect)}
          // @ts-ignore
             onClick={disconnect}>
          <Image src={disconnectIcon} alt={'disconnectIcon'}/>
          <p>Disconnect</p>
        </div>
      </div>
    </div>
  )
}
