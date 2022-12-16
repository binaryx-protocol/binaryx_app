import Image from "next/image";
import IMAGE from '../../../../public/img2.png'
import s from './PropertyCard.module.scss'
import {Button} from "./Button";
import arrowIcon from '../../../../public/svg/arrow.svg'
import clsx from "clsx";
import {useState} from "react";
import {UIReward} from "../../../features/account/models/accountModel";
import {useWindowSize} from "../../../hooks/useWindowSize";

type Props = {
  property: UIReward;
}

export const PropertyCard = (props: Props) => {
  const {property} = props
  // TODO: replace in controller after MVP
  const [isActive, setIsActive] = useState<boolean>(false)
  const {xs} = useWindowSize()
  return (
    <>
      <div className={clsx(s.propertyCard, isActive ? s.purpleBorder : s.grayBorder)}>
        <div className={s.mainInfo}>
          <img src={property.asset.propertyInfo_images} alt={'image'} className={s.propertyImage} width={123}
                 height={92}/>
          <div className={s.propertyNameAddr}>
            <p className={clsx(s.propertyName, s.upperText)}>{property.asset.name}</p>
            <p className={s.greyText}>{property.asset.name}</p>
          </div>
          {xs ? <div className={s.propertyInfo}>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>CoC</p>
                <p className={s.purpleText}>{property.asset.tokenInfo_apr}%</p>
              </div>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>Total</p>
                <p className={s.purpleText}>$2.236</p>
              </div>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>Current Rent Balance</p>
                <p className={s.purpleText}>${property.rewardAmountDe6}</p>
              </div>
            </div> :
            <>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>CoC</p>
                <p className={s.purpleText}>{property.asset.tokenInfo_apr}%</p>
              </div>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>Total</p>
                <p className={s.purpleText}>$2.236</p>
              </div>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>Current Rent Balance</p>
                <p className={s.purpleText}>${property.rewardAmountDe6}</p>
              </div>
            </>}
          {/*<Button className={s.claimButton}>*/}
          {/*  Claim*/}
          {/*</Button>*/}
          {/*<div className={s.arrowWrapper} onClick={()=>setIsActive(!isActive)}>*/}
          {/*  <Image src={arrowIcon} alt={'arrowIcon'}/>*/}
          {/*</div>*/}
        </div>
        {isActive && <div className={clsx(s.detailInfo, isActive ? s.active : '')}>
          <div className={s.separateLine}/>
          <div className={s.assetIDWrapper}>
            <div className={s.assetID}>
              <div>
                <p className={clsx(s.greyText, s.upperText)}>DAO LLC Documents</p>
                <p className={clsx(s.purpleText, s.underlineText)}>LFTY0135</p>
              </div>
              <div className={s.assetIDText}>
                <p className={clsx(s.greyText, s.upperText)}>Asset ID</p>
                <p className={clsx(s.purpleText, s.underlineText)}>708906045 (LFTY0135)</p>
              </div>
            </div>
            <Button className={s.viewTxButton}>
              View Transactions
            </Button>
          </div>
        </div>}
      </div>
    </>
  )
}
