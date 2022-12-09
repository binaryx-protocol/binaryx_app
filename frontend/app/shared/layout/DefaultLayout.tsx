import s from './DefaultLayout.module.scss'
import {HeaderController} from "../header";
import {useConnect} from "wagmi";
import SideMenuNavItem from "../../features/assets/views/SideMenu/SideMenuNavItem";
import IconProperty from "../../features/assets/views/SideMenu/icons/IconProperty";
import {paths} from "../../../pkg/paths";
import IconCoins from "../../features/assets/views/SideMenu/icons/IconCoins";
import IconGift from "../../features/assets/views/SideMenu/icons/IconGift";
import IconHistory from "../../features/assets/views/SideMenu/icons/IconHistory";
import SideMenuDivider from "../../features/assets/views/SideMenu/SideMenuDivider";
import IconSettings from "../../features/assets/views/SideMenu/icons/IconSettings";
import IconNotification from "../../features/assets/views/SideMenu/icons/IconNotification";
import SideMenu from "../../features/assets/views/SideMenu";

export const DefaultLayout = ({ children }: { children: any }) => {
    const {isError, error} = useConnect()

  return (
    <div className={s.defaultLayout}>
      <div className={s.header}>
        <HeaderController />
      </div>
      <div className={s.contentWrapper}>
      <SideMenu className={s.pageMenu}>
        <SideMenuNavItem icon={<IconProperty/>} title="Asset Overview" url={paths.account()}/>
        <SideMenuNavItem icon={<IconCoins/>} title="Marketplace" url={paths.listAssets()}/>
        <SideMenuNavItem icon={<IconGift/>} title="Refer and Earn" url="#"/>
        <SideMenuNavItem icon={<IconHistory/>} title="Transaction" url="#"/>
        <SideMenuDivider/>
        <SideMenuNavItem icon={<IconSettings/>} title="Settings" url="#"/>
        <SideMenuNavItem icon={<IconNotification/>} title="Notifications" url="#"/>
      </SideMenu>
      {
          isError
        ? <div className={s.errors}>
            {`${error}`}
          </div>
          : null
      }
      {children}
      </div>
    </div>
  )
}
