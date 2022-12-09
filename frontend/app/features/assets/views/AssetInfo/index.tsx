import s from './styles.module.scss';
import ellipseIcon from '../../../../../public/feature/assets/ellipse .svg'
import Image from "next/image";
import {DesktopCarousel} from "../Gallery/DesktopCarousel";
import {Tabs} from "./Tabs/Tabs";
import {IconWrapper} from "../IconWrapper";
import bedAIcon from '../../../../../public/feature/assets/bed.svg'
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
                            account
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
        {xs && <AssetInvest  coc={22} id={2} irr={22} progress={88} tokensLeft={10} balance={balance} account={account}/>}
      </div>
      <div className={s.carousel}>
        {xs ? <MobileCarousel images={images}/> : <DesktopCarousel images={images}/>}
      </div>
      <div className={s.tabs}>
        <Tabs/>
      </div>
    </div>
  );
};


// <div className={s.info}>
//   <h2 className={s.title}>{title}</h2>
//   <div>{description} ({statusLabel})</div>
//   <div className={s.addressLine1}>
//     {name} {symbol}
//   </div>
//   <div className={s.addressLine1}>
//     {line1} {line2}
//   </div>
//   <div className={s.addressLine2}>
//     {city}, {state} {postalCode} {country}
//   </div>
//   <ul className={s.infoItems}>
//     {infoItems.map((infoItem) => (
//       <li key={infoItem.type} className={s.infoItem}>
//         {infoItem.value}
//       </li>
//     ))}
//   </ul>
//   <Tabs legalDocuments={legalDocuments} />
// </div>
