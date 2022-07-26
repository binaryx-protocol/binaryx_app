import s from './styles.module.scss';
import Image from "next/image";
import {DesktopCarousel} from "../Gallery/DesktopCarousel";
import {Tabs} from "./Tabs/Tabs";
import {MobileCarousel} from "../Gallery/MobileCarousel";
import {useWindowSize} from "../../../../hooks/useWindowSize";
import {AssetInvest} from "../AssetInvest";
import {UiAssetInvestForm} from "../../types";

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
  location: { lat: number, lng: number };
  form: UiAssetInvestForm,
  onFormSubmit:any,
  onChangeForm: ({
                   values,
                   touches
                 }: { values: UiAssetInvestForm['values'], touches: UiAssetInvestForm['touches'] }) => void
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
                            activeTab,
                            form,
                            onChangeForm,
                            onFormSubmit
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
            <Image src={'/feature/assets/ellipse.svg'} alt={'ellipseIcon'} className={s.ellipseIcon} width={15}
                   height={15}/>
            <p>0x3820...74dc2</p>
          </div>
        </div>
      </div>
      <div className={s.assetInvest}>
        {xs && <AssetInvest form={form} onChangeForm={onChangeForm} coc={coc} id={id} irr={irr}
                            tokensTotalSupply={tokensTotalSupply}
                            tokensLeft={tokensLeft}
                            balance={balance}
                            account={account}
                            onFormSubmit={onFormSubmit}
        />}
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
