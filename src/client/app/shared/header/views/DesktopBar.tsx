import s from "./DesktopBar.module.scss";
import {Button} from "../../ui/views/Button";

export const DesktopBar = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <img
          src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
          alt="company_logo"
          className={s.logo}
        />
        <div>123</div>
        <div>
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </div>
  )
}
