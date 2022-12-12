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
import {tokenAmountValidator} from "../models/tokenBuyValidator";

export const AssetsDetailsController = (): JSX.Element => {
  const id = parseInt(useRouter().query.id as string);
  const $contractError = useAtomValue(assetDetailsModel.$contractError)
  const $asset = useAtomValue(assetDetailsModel.$asset)
  const $assetMetaData = useAtomValue(assetDetailsModel.$assetMetaData)
  const $assetComputed = useAtomValue(assetDetailsModel.$assetComputed)
  const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)
  const usdtBalance = useAtomValue($usdtBalance)
  const account = useAtomValue($connectedAccount)
  const balance = usdtBalance.state === 'hasData' ? usdtBalance.data : 0;
  const {xs} = useWindowSize()
  const [activeTabMobile, setActiveTabMobile] = useState("propertyInfo");
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("details");
  const [investAmount, setInvestAmount] = useState(0)
  const [validationInvestError, setValidationInvestError] = useState<string>('')
  const location = {
    lat: 50.450001,
    lng: 30.523333,
  }

  useEffect(() => {
    if (Number.isInteger(id)) {
      $doLoadAsset({id})
    }
  }, [id])
  if ($contractError) { // @ts-ignore
    return <p>{`Contract error: ${$contractError.reason}`}</p>
  }
  if (!$asset || !$assetMetaData || !$assetComputed) {
    return <div/> // TODO skeleton loader
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
    tokensTotalSupply: $assetComputed.tokensTotalSupply,
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
  const tokenPrice = 50;
  const validateInvestInput = async (e: any) => {
    const amount = Number(e.target.value);
    const res = await tokenAmountValidator.isAmountValid({amount}, investInfo.tokensLeft, balance, tokenPrice)
    if (typeof res === 'string') {
      setValidationInvestError(res);
    } else {
      setValidationInvestError('')
    }
  }
  return (
    xs ?
      <>
        <div className={s.root}>
          <div className={s.tabs}>
            <Tab id={'propertyInfo'} title={'Property Info'} activeTab={activeTabMobile}
                 setActiveTab={setActiveTabMobile}
                 withUnderline/>
            <Tab id={'financials'} title={'Financials'} activeTab={activeTabMobile} setActiveTab={setActiveTabMobile}
                 withUnderline/>
          </div>
          <div className="outlet">
            <TabContent id="propertyInfo" activeTab={activeTabMobile}>
              <div className={clsx(s.assetInfo, s.container)}>
                <AssetInfo {...assetInfo} images={images} balance={balance} account={account} {...investInfo}
                           currentSlide={currentSlide} isFullWidth={isFullWidth} setIsFullWidth={setIsFullWidth}
                           setCurrentSlide={setCurrentSlide} setActiveTab={setActiveTab} activeTab={activeTab}
                           location={location} validationInvestError={validationInvestError}
                           validateInvestInput={validateInvestInput} investAmount={investAmount}
                           setInvestAmount={setInvestAmount}/>
              </div>
            </TabContent>
            <TabContent id="financials" activeTab={activeTabMobile}>
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
            <AssetInfo currentSlide={currentSlide} {...assetInfo} {...investInfo}
                       images={images} balance={balance}
                       account={account} isFullWidth={isFullWidth} setIsFullWidth={setIsFullWidth}
                       setCurrentSlide={setCurrentSlide} setActiveTab={setActiveTab} activeTab={activeTab}
                       location={location} validationInvestError={validationInvestError}
                       validateInvestInput={validateInvestInput} investAmount={investAmount}
                       setInvestAmount={setInvestAmount}/>
          </div>
        </div>
        <div className={s.assetInvest}>
          <div className={clsx(s.assetInvestBuy, s.container)}>
            <AssetInvest {...investInfo} balance={balance} account={account}
                         validationInvestError={validationInvestError} investAmount={investAmount}
                         setInvestAmount={setInvestAmount} validateInvestInput={validateInvestInput}/>
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
