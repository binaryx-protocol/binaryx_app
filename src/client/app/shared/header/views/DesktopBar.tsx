import s from "./DesktopBar.module.scss";
import {Button} from "../../ui/views/Button";
import {paths} from "../../../../../../pkg/paths";
import Link from "next/link";

type Props = {
  account: string
  hasAddress: boolean
  onWalletConnect: () => void
}

export const DesktopBar = ({ account, onWalletConnect, hasAddress }: Props) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
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
          <Link href={paths.home()} passHref>
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
          <Link href={paths.home()}>
            <Button color="light">
              List Property
            </Button>
          </Link>
          {
            hasAddress
              ? <span className={s.accountAddress}>{account}</span>
              :
              <Button onClick={onWalletConnect}>
                Connect Wallet
              </Button>
          }
        </div>
      </div>
    </div>
  )
}
