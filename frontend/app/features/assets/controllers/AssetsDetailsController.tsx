import s from './AssetsDetailsController.module.scss'
import {Gallery} from "../views/Gallery";
import {InvestBlock} from "../views/InvestBlock";
import MuiContainer from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {AssetInfo} from "../views/AssetInfo";
import * as assetDetailsModel from "../models/assetDetailsModel";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {bnToInt} from "../../../utils/objectUtils";
import {paths} from "../../../../pkg/paths";
import SideMenuNavItem from "../../assets/views/SideMenu/SideMenuNavItem";
import SideMenuDivider from "../../assets/views/SideMenu/SideMenuDivider";
import SideMenu from '../../assets/views/SideMenu'
import IconNotification from "../../assets/views/SideMenu/icons/IconNotification";
import IconProperty from "../../assets/views/SideMenu/icons/IconProperty";
import IconCoins from "../../assets/views/SideMenu/icons/IconCoins";
import IconGift from "../../assets/views/SideMenu/icons/IconGift";
import IconHistory from "../../assets/views/SideMenu/icons/IconHistory";
import IconSettings from "../../assets/views/SideMenu/icons/IconSettings";
import clsx from "clsx";


export const AssetsDetailsController = () => {
  const id = parseInt(useRouter().query.id as string);
  const $asset = useAtomValue(assetDetailsModel.$asset)
  const $assetMetaData = useAtomValue(assetDetailsModel.$assetMetaData)
  const $assetComputed = useAtomValue(assetDetailsModel.$assetComputed)
  const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)

  useEffect(() => {
    if (Number.isInteger(id)) {
      $doLoadAsset({id})
    }
  }, [id])

  if (!$asset || !$assetMetaData || !$assetComputed) {
    return null // TODO skeleton loader
  }

  const images = [
    {src: 'https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg'},
    {src: 'https://api.time.com/wp-content/uploads/2022/07/Worlds-Greatest-Places-2022-BaliIndonesia.jpeg'},
    {src: 'https://pix10.agoda.net/hotelImages/234/234432/234432_15121813170038609147.jpg?ca=6&ce=1&s=1024x768'},
    {src: 'https://assets.architecturaldigest.in/photos/60083c58d0435267a8df8fdc/master/w_1920,h_1080,c_limit/Bali-villa-Uluwatu-SAOTA.jpg'},
  ]
  const investInfo = {
    tokensLeft: $assetComputed.tokensLeft,
    progress: $assetComputed.progress,
    irr: 20.5,
    coc: bnToInt($asset.tokenInfo_apr),
    id,
  }
  const assetInfo = {
    title: $asset.title,
    name: $asset.name,
    symbol: $asset.symbol,
    description: $asset.description,
    legalDocuments: [],
    statusLabel: T.status[$asset.status as keyof typeof T.status],
    country: 'Indonesia',
    city: 'Canggu',
    state: 'Kuta Utara',
    postalCode: '80351',
    line1: 'Jl. Pantai Batu Bolong No.44',
    line2: '',
    infoItems: [
      {type: 'string', value: 'TV'},
      {type: 'string2', value: 'WiFi'}
    ],
  }

  return (
    <div className={s.root}>
      <SideMenu className={s.pageMenu}>
        <SideMenuNavItem icon={<IconProperty/>} title="Asset Overview" url={paths.account()}/>
        <SideMenuNavItem icon={<IconCoins/>} title="Marketplace" url={paths.listAssets()}/>
        <SideMenuNavItem icon={<IconGift/>} title="Refer and Earn" url="#"/>
        <SideMenuNavItem icon={<IconHistory/>} title="Transaction" url="#"/>
        <SideMenuDivider/>
        <SideMenuNavItem icon={<IconSettings/>} title="Settings" url="#"/>
        <SideMenuNavItem icon={<IconNotification/>} title="Notifications" url="#"/>
      </SideMenu>
      <div className={clsx(s.assetInfo, s.container)}>
        <div className={s.navigation}><span className={s.navigationDisabled}>Home</span> · <span
          className={s.navigationDisabled}>Marketplace</span> · <span className={s.navigationActive}>Property page</span></div>
       <div>
         <AssetInfo {...assetInfo} />
       </div>
      </div>
      <div className={s.assetInvest}>
          <div className={clsx(s.assetInvestBuy, s.container)}></div>
          <div className={clsx(s.assetInvestDetails, s.container)}></div>
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

// <div className={s.asset}>
//   <Gallery images={images} />
//   <MuiContainer maxWidth="lg">
//     <Grid container spacing={0} maxWidth={1600}>
//       <Grid item xs={8}>
//         <AssetInfo {...assetInfo} />
//       </Grid>
//       <Grid item xs={3}>
//         <InvestBlock {...investInfo} />
//       </Grid>
//     </Grid>
//   </MuiContainer>
// </div>
