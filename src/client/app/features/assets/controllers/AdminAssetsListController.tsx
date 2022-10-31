import Link from 'next/link'
import s from './AdminAssetsListController.module.scss'
import Button from "@mui/material/Button";
import * as metaMaskModel from "../../../core/models/metaMaskModel";
import * as assetsModel from "../models/assetsListModel";
import {useAtomValue, useSetAtom} from "jotai";
import {AssetStatuses} from "../types";
import {paths} from "../../../../../../pkg/paths";
import AssetList from '../views/AssetList';
import AssetListItem from '../views/AssetList/AssetListItem';
import SideMenu from '../views/SideMenu';
import SideMenuNavItem from '../views/SideMenu/SideMenuNavItem';
import IconProperty from '../views/SideMenu/icons/IconProperty';
import IconSettings from '../views/SideMenu/icons/IconSettings';
import IconCoins from '../views/SideMenu/icons/IconCoins';
import IconGift from '../views/SideMenu/icons/IconGift';
import IconHistory from '../views/SideMenu/icons/IconHistory';
import IconNotification from '../views/SideMenu/icons/IconNotification';
import SideMenuDivider from '../views/SideMenu/SideMenuDivider';

export const AdminAssetsListController = () => {
  const $blockchainAssets = useAtomValue(assetsModel.$blockchainAssets)
  const $doActivate = useSetAtom(assetsModel.$doActivate)
  const $doDisable = useSetAtom(assetsModel.$doDisable)
  const $errorMessages = useAtomValue(metaMaskModel.$errorMessages)
  const blockchainAssets = $blockchainAssets.state === 'hasData' ? $blockchainAssets.data : null

  console.log('blockchainAssets', blockchainAssets)

  return (
    <div className={s.assetListController}>
      <div className={s.errors}>
        {$errorMessages.join(', ')}
      </div>
      <div className={s.container}>

        <div className={s.crudTopNav}>
          <h1>
            Marketplace
          </h1>
        </div>

        <SideMenu>
          <SideMenuNavItem icon={<IconProperty />} title="Asset Overview" url="/account-v2" />
          <SideMenuNavItem icon={<IconCoins />} title="Marketplace" url="/assets-v2" />
          <SideMenuNavItem icon={<IconGift />} title="Refer and Earn" url="#" />
          <SideMenuNavItem icon={<IconHistory />} title="Transaction" url="#" />
          <SideMenuDivider />
          <SideMenuNavItem icon={<IconSettings />} title="Settings" url="#" />
          <SideMenuNavItem icon={<IconNotification />} title="Notifications" url="#" />
        </SideMenu>
        <AssetList>
          {
            blockchainAssets && blockchainAssets.map((blockchainAsset, index) => (
              <AssetListItem
                key={index}
                id={index+1}
                status={T.status[blockchainAsset.status as keyof typeof T.status]}
                image={{ src: blockchainAsset.propertyInfo_images.split(',')[0] }}
                title={blockchainAsset.title}
                subTitle={blockchainAsset.description}
                irr={20.5}
                coc={blockchainAsset.tokenInfo_apr.toNumber()}
                tokensLeft={1000}
                tokensTotal={blockchainAsset.tokenInfo_totalSupply.toNumber()}
                collected={10}
              />
            ))
          }
        </AssetList>
      </div>
    </div>
  )
}

const T = {
  status: {
    1: 'Upcoming',
    2: 'Active',
    3: 'Sold Out',
    4: 'Disabled',
  }
}
