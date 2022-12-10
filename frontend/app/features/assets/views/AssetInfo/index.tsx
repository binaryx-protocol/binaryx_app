import s from './styles.module.scss';
import ellipseIcon from '../../../../../public/feature/assets/ellipse .svg'
import Image from "next/image";
import {DesktopCarousel} from "../Gallery/DesktopCarousel";
import {Tabs} from "./Tabs/Tabs";
import {MobileCarousel} from "../Gallery/MobileCarousel";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {AssetInvest} from "../AssetInvest";

type AssetInfoProps = {
  title: string,
  country: string,
  city: string,
  state: string,
  postalCode: string,
  line1: string,
  line2: string,
  description: string,
  statusLabel: string,
  name: string,
  symbol: string,
  legalDocuments: string[],
  infoItems: { type: string, value: string }[],
  images: any;
  balance: number;
  account: string;
  tokensLeft: number;
  tokensTotalSupply: number;
  irr: number;
  coc: number;
  id: number;
  isFullWidth: boolean;
  setIsFullWidth: (value: boolean) => void;
  currentSlide: number;
  setCurrentSlide: (value: number) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  location: { lat: number, lng: number }
}
export const AssetInfo = ({
                            title,
                            line1,
                            line2,
                            city,
                            state,
                            postalCode,
                            country,
                            description,
                            statusLabel,
                            name,
                            symbol,
                            legalDocuments,
                            infoItems,
                            images,
                            balance,
                            account,
                            coc,
                            tokensLeft,
                            irr,
                            tokensTotalSupply,
                            id,
                            setIsFullWidth,
                            setCurrentSlide,
                            currentSlide,
                            isFullWidth,
                            setActiveTab,
                            location,
                            activeTab
                          }: AssetInfoProps) => {
  const {xs} = useWindowSize()

  return (
    <div className={s.root}>
      <div className={s.propertyAddressWrapper}>
        <div className={s.realAddress}>
          <p className={s.propertyAddress}>{postalCode} {line1}, {city}, {state}</p>
          <div className={s.statusSection}>
            <div className={s.dot}></div>
            <p style={{color: "green", fontSize: '14px'}}>Active</p>
          </div>
        </div>
        <div className={s.blockchainAddress}>
          <p className={s.propertyAddress_text}>Property Address</p>
          <div className={s.blockchainAddress_address}>
            <Image src={ellipseIcon} alt={'ellipseIcon'} className={s.ellipseIcon}/>
            <p>0x3820...74dc2</p>
          </div>
        </div>
      </div>
      <div className={s.assetInvest}>
        {xs && <AssetInvest coc={coc} id={id} irr={irr} tokensTotalSupply={tokensTotalSupply} tokensLeft={tokensLeft}
                            balance={balance}
                            account={account}/>}
      </div>
      <div className={s.carousel}>
        {xs ? <MobileCarousel images={images}/> :
          <DesktopCarousel images={images} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
                           setIsFullWidth={setIsFullWidth} isFullWidth={isFullWidth}/>}
      </div>
      <div className={s.tabs}>
        <Tabs setActiveTab={setActiveTab} activeTab={activeTab} location={location}/>
      </div>
    </div>
  );
};
