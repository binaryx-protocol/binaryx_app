import warningIcon from '../../../../public/svg/warning.svg'
import Image from "next/image";
import s from "./WrongNetwork.module.scss";
import {Button} from "./Button";
import {Connector, useDisconnect} from "wagmi";
import {useAtom} from "jotai";
import {$connectorAtom} from "../../../core/models/walletModel";
import {SupportedChainId} from "../../../constants/chainInfo";

export const WrongNetwork = ()=>{
    const {disconnect} = useDisconnect()
    const connectorAtom = useAtom($connectorAtom);
    const connector:Connector = connectorAtom[0];
    const switchChain = async() =>{
        await connector.switchChain!(SupportedChainId.ARBITRUM_ONE)
    }
    return(
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
                    <Button className={s.disconnect} onClick={disconnect}>Disconnect</Button>
                </div>
            </div>
        </div>
    )
}