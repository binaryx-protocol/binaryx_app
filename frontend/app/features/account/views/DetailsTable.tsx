import s from "./DetailsTable.module.scss";
import clsx from "clsx";
import walletIcon from '../../../../public/svg/accountOverview/wallet.svg'
import graphicIcon from '../../../../public/svg/accountOverview/graphic.svg'
import Image from "next/image";
import IconCoins from "../../assets/views/SideMenu/icons/IconCoins";
import IconProperty from "../../assets/views/SideMenu/icons/IconProperty";
import {UiAccountInfo} from "../models/accountModel";

type Props = {
  property: UiAccountInfo;
}

export const DetailsTable = (props: Props) => {
  const {property} = props
  return (
    <table className={s.tableDetails}>
      <tbody>
      <tr className={s.trFirst}>
        <td className={clsx(s.accountDetails, s.horizontalBorder)}>
          <div>
            <div className={s.iconWrapper}>
              <Image src={walletIcon} alt={'walletIcon'}/>
            </div>
          </div>
          <div>
            <p className={s.details_text_grey}>Current Account Value</p>
            <p className={s.details_text_purple}>$1 380.37</p>
          </div>
        </td>
        <td className={s.accountDetails}>
          <div>
            <div className={s.iconWrapper}>
              <IconProperty color={'#6F4DC4'}/>
            </div>
          </div>
          <div>
            <p className={s.details_text_grey}>Properties Ownew</p>
            <p className={s.details_text_purple}>{property.rewards.length}</p>
          </div>
        </td>
      </tr>
      <tr className={s.trSecond}>
        <td className={clsx(s.accountDetails, s.horizontalBorder)}>
          <div>
            <div className={s.iconWrapper}>
              <IconCoins width={20} height={20} color={'#6F4DC4'}/>
            </div>
          </div>
          <div>
            <p className={s.details_text_grey}>Total Rent Earned</p>
            <p className={s.details_text_purple}>+ ${property.totalEarned}</p>
          </div>
        </td>
        <td className={s.accountDetails}>
          <div>
            <div className={s.iconWrapper}>
              <Image src={graphicIcon} alt={'graphicIcon'}/>
            </div>
          </div>
          <div>
            <p className={s.details_text_grey}>Total Property Value</p>
            <p className={s.details_text_purple}>${property.totalPropertyValue}</p>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  )
}
