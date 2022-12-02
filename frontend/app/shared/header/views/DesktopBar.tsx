import s from "./DesktopBar.module.scss";
import {Button} from "../../ui/views/Button";
import {paths} from "../../../../pkg/paths";
import Link from "next/link";
import {Container} from "../../ui/views/Container";
import {useState} from "react";
import {WalletConnect} from "../../ui/views/WalletConnect";
import arrowIcon from '../../../../public/svg/arrow.svg'
import Image from "next/image";
import {WalletInfo} from "../../ui/views/WalletInfo";
import {Connector, useNetwork} from "wagmi";
import {walletAddressFormatted} from "../../../utils/walletAddressFormatted";
import {BaseModal} from "../../ui/views/BaseModal";
import {WrongNetwork} from "../../ui/views/WrongNetwork";

type Props = {
    account: string
    isConnected: boolean
    connector: Connector | undefined;
}

export const DesktopBar = ({account, isConnected, connector}: Props) => {
    const [isOpenWalletModal, setIsOpenWalletModal] = useState(false)
    const [isOpenWalletInfo, setIsOpenWalletInfo] = useState(false)
    const {chain} = useNetwork()
    const unsupportedChain = chain !== undefined ? chain.unsupported : false;
    return (
        <div className={s.root}>
            <Container className={s.container}>
                <Link href={paths.home()} passHref>
                    <a className={s.logo}>
                        <img
                            src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
                            alt="Binaryx"
                        />
                    </a>
                </Link>
                <div className={s.nav}>
                    <Link href={paths.home()} passHref>
                        <a>
                            Home
                        </a>
                    </Link>
                    <Link href={paths.listAssets()} passHref>
                        <a>
                            Marketplace
                        </a>
                    </Link>
                    <Link href={paths.home()} passHref>
                        <a>
                            Oracles
                        </a>
                    </Link>
                    <Link href={paths.home()} passHref>
                        <a>
                            Governance
                        </a>
                    </Link>
                </div>
                <div className={s.buttons}>
                    <Link href={paths.newAsset()}>
                        <Button color="light">
                            List Property
                        </Button>
                    </Link>
                    {
                        isConnected
                            ? (
                                <>
                                    <div className={s.wallet} onClick={() => {
                                        setIsOpenWalletInfo(!isOpenWalletInfo)
                                    }}>
                                        <WalletIcon/>
                                        <span className={s.accountAddress}>{walletAddressFormatted(account)}</span>
                                        <Image src={arrowIcon} alt={'arrow'}/>
                                    </div>
                                    {isOpenWalletInfo &&
                                        <WalletInfo connector={connector} account={account}
                                                    setIsOpen={setIsOpenWalletInfo}/>}
                                </>
                            )
                            :
                            <Button onClick={() => setIsOpenWalletModal(true)}>
                                Connect Wallet
                            </Button>
                    }
                    {isOpenWalletModal &&
                        <BaseModal setIsOpen={setIsOpenWalletModal}>
                            <WalletConnect setIsOpen={setIsOpenWalletModal}/>
                        </BaseModal>}
                    {unsupportedChain && <BaseModal setIsOpen={() => unsupportedChain}>
                        <WrongNetwork/>
                    </BaseModal>}
                </div>
            </Container>
        </div>
    )
}

const WalletIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="16" fill="#101113"/>
        <path
            d="M21.5 12.5H11.5C11.3674 12.5 11.2402 12.4473 11.1464 12.3536C11.0527 12.2598 11 12.1326 11 12C11 11.8674 11.0527 11.7402 11.1464 11.6464C11.2402 11.5527 11.3674 11.5 11.5 11.5H20C20.1326 11.5 20.2598 11.4473 20.3536 11.3536C20.4473 11.2598 20.5 11.1326 20.5 11C20.5 10.8674 20.4473 10.7402 20.3536 10.6464C20.2598 10.5527 20.1326 10.5 20 10.5H11.5C11.1027 10.5016 10.7221 10.6602 10.4412 10.9412C10.1602 11.2221 10.0016 11.6027 10 12V20C10.0016 20.3973 10.1602 20.7779 10.4412 21.0588C10.7221 21.3398 11.1027 21.4984 11.5 21.5H21.5C21.7652 21.5 22.0196 21.3946 22.2071 21.2071C22.3946 21.0196 22.5 20.7652 22.5 20.5V13.5C22.5 13.2348 22.3946 12.9804 22.2071 12.7929C22.0196 12.6054 21.7652 12.5 21.5 12.5ZM19.25 17.75C19.1017 17.75 18.9567 17.706 18.8333 17.6236C18.71 17.5412 18.6139 17.4241 18.5571 17.287C18.5003 17.15 18.4855 16.9992 18.5144 16.8537C18.5434 16.7082 18.6148 16.5746 18.7197 16.4697C18.8246 16.3648 18.9582 16.2933 19.1037 16.2644C19.2492 16.2355 19.4 16.2503 19.537 16.3071C19.6741 16.3639 19.7912 16.46 19.8736 16.5833C19.956 16.7067 20 16.8517 20 17C20 17.1989 19.921 17.3897 19.7803 17.5303C19.6397 17.671 19.4489 17.75 19.25 17.75Z"
            fill="white"/>
    </svg>
)
