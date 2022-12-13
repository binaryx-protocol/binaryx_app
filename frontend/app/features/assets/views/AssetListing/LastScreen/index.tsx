import s from './styles.module.scss'
import Image from "next/image";
import {Button} from "../../../../../shared/ui/views/Button";
import {ArrowIconWithoutLine} from "../../ArrowIconWithoutLine";
import {AssetListingStatus} from "../../../types";
type Props = {
  onStatusChange: (value: AssetListingStatus) => void;
}
export const LastScreen = (props: Props) =>{
  const {onStatusChange} = props

  return(
    <div className={s.root}>
      <div className={s.ellipseOutside}>
        <div className={s.ellipseInside}>
          <Image src={'/feature/assets/check.svg'} alt={'checkIcon'} width={30} height={30}/>
        </div>
      </div>
      <p className={s.success}>
        Success
      </p>
     <p className={s.propertyText}>Once we have reviewed your property information, we will contact you via <br/>
       email if your property meets our criteria.</p>
      <Button className={s.continueButton} onClick={()=>onStatusChange(AssetListingStatus.welcome)}>
        Continue
        <ArrowIconWithoutLine classname={s.arrowIcon} width={11} height={12}/>
      </Button>
    </div>
  )
}
