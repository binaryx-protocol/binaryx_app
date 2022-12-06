import s from './AdminAssetsListController.module.scss'
import * as assetsModel from "../models/assetsListModel";
import {useAtomValue} from "jotai";
import AssetList from '../views/AssetList';
import SideMenu from '../views/SideMenu';
import SideMenuNavItem from '../views/SideMenu/SideMenuNavItem';
import IconProperty from '../views/SideMenu/icons/IconProperty';
import IconSettings from '../views/SideMenu/icons/IconSettings';
import IconCoins from '../views/SideMenu/icons/IconCoins';
import IconGift from '../views/SideMenu/icons/IconGift';
import IconHistory from '../views/SideMenu/icons/IconHistory';
import IconNotification from '../views/SideMenu/icons/IconNotification';
import SideMenuDivider from '../views/SideMenu/SideMenuDivider';
import {Container} from "../../../shared/ui/views/Container";
import {NanoLoader} from "../../../shared/ui/views/NanoLoader";

export const AdminAssetsListController = () => {
  const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null
  const [assets, balances] = blockchainAssets || []
  return (
    <div className={s.root}>
      <Container>
        <div className={s.contentWrapper}>
          <SideMenu className={s.pageMenu}>
            <SideMenuNavItem icon={<IconProperty/>} title="Asset Overview" url="/account-v2"/>
            <SideMenuNavItem icon={<IconCoins/>} title="Marketplace" url="/assets-v2"/>
            <SideMenuNavItem icon={<IconGift/>} title="Refer and Earn" url="#"/>
            <SideMenuNavItem icon={<IconHistory/>} title="Transaction" url="#"/>
            <SideMenuDivider/>
            <SideMenuNavItem icon={<IconSettings/>} title="Settings" url="#"/>
            <SideMenuNavItem icon={<IconNotification/>} title="Notifications" url="#"/>
          </SideMenu>

          <div className={s.pageContent}>
            <div className={s.crudTopNav}>
              <h1>
                Marketplace
              </h1>
            </div>
            <NanoLoader isLoading={!assets?.length} className={s.loader}>
              <AssetList assets={assets || []} balances={balances || []}/>
            </NanoLoader>
          </div>
        </div>
      </Container>
    </div>
  )
}
