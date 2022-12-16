import s from './styles.module.scss'
import Image from "next/image";
import {Button} from "../../../../../shared/ui/views/Button";
import {ArrowIconWithoutLine} from "../../../../../shared/ui/views/ArrowIconWithoutLine";
import {AssetListingStatus} from "../../../types";

type Props = {
  onStatusChange: (value: AssetListingStatus) => void;
}

export const WelcomeScreen = (props: Props) =>{
  const {onStatusChange} = props
  return(
    <div className={s.root}>
    <Image src={'/feature/assets/paper.svg'} alt={'paper'} width={100} height={100}/>
      <p className={s.applyToSell}>
        Apply to sell your property on Binaryx
      </p>
      <p className={s.cashOffer}>
        Get a cash offer, sell within a few days.
      </p>
      <div className={s.duration}>
        <Image src={'/feature/assets/clock.svg'} alt={'clock'} width={13} height={13}/>
        <p>
          Duration 5 minutes
        </p>
      </div>
      <Button className={s.continueButton} onClick={()=>onStatusChange(AssetListingStatus.generalInfo)}>
        Continue
        <ArrowIconWithoutLine classname={s.arrowIcon} width={11} height={12}/>
      </Button>
    </div>
  )
}
