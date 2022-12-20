import s from './BurgerMenu.module.scss'
import SideMenuNavItem from "../../../features/assets/views/SideMenu/SideMenuNavItem";
import IconProperty from "../../../features/assets/views/SideMenu/icons/IconProperty";
import {paths} from "../../../../pkg/paths";
import IconCoins from "../../../features/assets/views/SideMenu/icons/IconCoins";
import IconGift from "../../../features/assets/views/SideMenu/icons/IconGift";
import IconHistory from "../../../features/assets/views/SideMenu/icons/IconHistory";
import SideMenuDivider from "../../../features/assets/views/SideMenu/SideMenuDivider";
import IconSettings from "../../../features/assets/views/SideMenu/icons/IconSettings";
import IconNotification from "../../../features/assets/views/SideMenu/icons/IconNotification";
import SideMenu from "../../../features/assets/views/SideMenu";

type Props = {
  onBurgerMenuOpen: (value: boolean) => void;
}
export const BurgerMenu = (props: Props) =>{
  const {onBurgerMenuOpen} = props;
  const closeMenu = () =>{
    onBurgerMenuOpen(false);
  }
  return(
    <div className={s.root}>
      <div className={s.darkness} onClick={closeMenu}/>
      <div className={s.content}>
        <SideMenu className={s.pageMenu}>
          <SideMenuNavItem icon={<IconProperty/>} title="Asset Overview" url={paths.account()} onClick={closeMenu}/>
          <SideMenuNavItem icon={<IconCoins/>} title="Marketplace" url={paths.listAssets()} onClick={closeMenu}/>
          <SideMenuNavItem icon={<IconGift/>} title="Refer and Earn" url="#" onClick={closeMenu}/>
          <SideMenuNavItem icon={<IconHistory/>} title="Transaction" url="#" onClick={closeMenu}/>
          <SideMenuDivider/>
          <SideMenuNavItem icon={<IconSettings/>} title="Settings" url="#" onClick={closeMenu}/>
          <SideMenuNavItem icon={<IconNotification/>} title="Notifications" url="#" onClick={closeMenu}/>
        </SideMenu>
      </div>
    </div>
  )
}
