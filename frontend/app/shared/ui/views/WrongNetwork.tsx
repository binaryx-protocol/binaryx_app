import warningIcon from '../../../../public/svg/warning.svg'
import Image from "next/image";
import s from "./WrongNetwork.module.scss";
import {Button} from "./Button";
import {getActiveConfig} from "../../walletsConnect";

type Props = {
  switchNetwork: ((chainId_?: number | undefined) => void) | undefined
  disconnect: () => void;
}

export const WrongNetwork = (props: Props) => {
  const {switchNetwork, disconnect} = props;
  const chainConfig = getActiveConfig();
  const switchChain = async () => {
    if (switchNetwork && chainConfig) {
      switchNetwork(chainConfig.chainInfo.id)
    }
  }
  return (
    <div className={s.root}>
      <div className={s.outsideCircle}>
        <div className={s.insideCircle}>
          <Image src={warningIcon} alt={'warningIcon'} width={48} height={48}/>
        </div>
      </div>
      <div className={s.warningContent}>
        <p className={s.header}>Wrong Network</p>
        <div className={s.buttons}>
          <Button onClick={switchChain}>Switch Chain</Button>
          <Button className={s.disconnect}
            // @ts-ignore
                  onClick={disconnect}>Disconnect</Button>
        </div>
      </div>
    </div>
  )
}
