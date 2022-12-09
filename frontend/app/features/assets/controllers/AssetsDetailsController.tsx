import s from './AssetsDetailsController.module.scss'
import {AssetInvest} from "../views/AssetInvest";
import {AssetInfo} from "../views/AssetInfo";
import * as assetDetailsModel from "../models/assetDetailsModel";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {bnToInt} from "../../../utils/objectUtils";
import clsx from "clsx";
import {AssetInvestDetails} from "../views/AssetInvestDetails";
import {$usdtBalance} from "../../../shared/usdtToken/smartContractsFactory";
import {$connectedAccount} from "../../../core/models/walletModel";
import {useWindowSize} from "../../../hooks/useWindowSize";
import {Tab} from "../views/AssetInfo/Tabs/Tab";
import {TabContent} from "../views/AssetInfo/Tabs/TabContent";


export const AssetsDetailsController = () => {
  const id = parseInt(useRouter().query.id as string);
  const $asset = useAtomValue(assetDetailsModel.$asset)
  const $assetMetaData = useAtomValue(assetDetailsModel.$assetMetaData)
  const $assetComputed = useAtomValue(assetDetailsModel.$assetComputed)
  const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)
  const usdtBalance = useAtomValue($usdtBalance)
  const account = useAtomValue($connectedAccount)
  const balance = usdtBalance.state === 'hasData' ? usdtBalance.data : 0;
  const {xs} = useWindowSize()
  const [activeTab, setActiveTab] = useState("propertyInfo");

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
    xs ?
      <>
        <div className={s.root}>
          <div className={s.tabs}>
            <Tab id={'propertyInfo'} title={'Property Info'} activeTab={activeTab} setActiveTab={setActiveTab} withUnderline/>
            <Tab id={'financials'} title={'Financials'} activeTab={activeTab} setActiveTab={setActiveTab} withUnderline/>
          </div>
          <div className="outlet">
            <TabContent id="propertyInfo" activeTab={activeTab}>
              <div className={clsx(s.assetInfo, s.container)}>
                  <AssetInfo {...assetInfo} images={images} balance={balance} account={account}/>
              </div>
            </TabContent>
            <TabContent id="financials" activeTab={activeTab}>
              <div className={clsx(s.assetInvestDetails, s.container)}>
                <AssetInvestDetails/>
              </div>
            </TabContent>
          </div>
        </div>
      </> :
      <div className={s.root}>
        <div className={clsx(s.assetInfo, s.container)}>
          <div className={s.navigation}><span className={s.navigationDisabled}>Home</span> · <span
            className={s.navigationDisabled}>Marketplace</span> · <span
            className={s.navigationActive}>Property page</span></div>
          <div>
            <AssetInfo {...assetInfo} images={images} balance={balance} account={account}/>
          </div>
        </div>
        <div className={s.assetInvest}>
          <div className={clsx(s.assetInvestBuy, s.container)}>
              <AssetInvest coc={22} id={2} irr={22} progress={88} tokensLeft={10} balance={balance} account={account}/>
          </div>
          <div className={clsx(s.assetInvestDetails, s.container)}>
            <AssetInvestDetails/>
          </div>
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
//         <AssetInvest {...investInfo} />
//       </Grid>
//     </Grid>
//   </MuiContainer>
// </div>
