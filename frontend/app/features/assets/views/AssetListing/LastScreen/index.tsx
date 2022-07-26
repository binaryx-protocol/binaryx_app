import s from './styles.module.scss'
import Image from "next/image";
import {Button} from "../../../../../shared/ui/views/Button";
import {ArrowIconWithoutLine} from "../../../../../shared/ui/views/ArrowIconWithoutLine";
type Props = {
  returnHome: () => void;
}
export const LastScreen = (props: Props) =>{
  const {returnHome} = props

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
      <Button className={s.continueButton} onClick={returnHome}>
        Continue
        <ArrowIconWithoutLine classname={s.arrowIcon} width={11} height={12}/>
      </Button>
    </div>
  )
}
